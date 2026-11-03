import { Component, computed, effect, inject, model, output, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators, } from '@angular/forms';
import { PrimeNG } from 'primeng/config';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { Servicio } from '../../../../core/models/catalogos/servicios.model';
import { Barbero } from '../../../../core/models/gestion/barbero/barbero.model';
import { ReservaRequest } from '../../../../core/models/reserva/reservaRequest';
import { TokenService } from '../../../../core/services/auth/token.service';
import { ServicioService } from '../../../../core/services/catalogos/servicio.service';
import { BarberoService } from '../../../../core/services/gestion/barbero.service';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { NotificationService } from '@/app/core/services/common/notification.service';

type BarberoVista = Barbero & { nombreCompleto: string };

const APERTURA = 9 * 60;
const CIERRE = 19 * 60;
const PASO_MINUTOS = 30;

const fechaHoraValida = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value as Date | null;
  if (!valor) return null;

  const f = new Date(valor);
  if (f.getTime() < Date.now()) return { fechaPasada: true };
  if (f.getDay() === 0) return { domingo: true };

  const minutos = f.getHours() * 60 + f.getMinutes();
  if (minutos < APERTURA || minutos >= CIERRE) return { fueraHorario: true };

  return null;
};

const pad = (n: number): string => String(n).padStart(2, '0');
const toIsoDate = (f: Date): string => `${f.getFullYear()}-${pad(f.getMonth() + 1)}-${pad(f.getDate())}`;
const toHora = (f: Date): string => `${pad(f.getHours())}:${pad(f.getMinutes())}`;

/** Minúsculas y sin tildes, para que "corte" encuentre "Córte" */
const normalizar = (t: string): string =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

interface Horario {
  valor: string;     // "09:30"  (lo que se guarda)
  etiqueta: string;  // "09:30 AM" (lo que se ve)
  minutos: number;   // minutos desde las 00:00
}

/** 09:00, 09:30 ... 18:30 (la última cita empieza 30 min antes del cierre) */
const HORARIOS: Horario[] = (() => {
  const out: Horario[] = [];
  for (let m = APERTURA; m < CIERRE; m += PASO_MINUTOS) {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    out.push({
      valor: `${pad(hh)}:${pad(mm)}`,
      etiqueta: `${pad(h12)}:${pad(mm)} ${hh < 12 ? 'AM' : 'PM'}`,
      minutos: m,
    });
  }
  return out;
})();

const esMismoDia = (a: Date, b: Date): boolean => a.toDateString() === b.toDateString();

// ── Componente ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, DatePickerModule, CheckboxModule, SelectModule, TableModule,
    ModalComponent, ButtonComponent, MonedaPipe, DateFormatPipe
  ],
  templateUrl: './reservar.html',
  styles: [`
    /* El calendario inline ocupa todo el ancho de su columna */
    ::ng-deep .reservar-datepicker { display: block; width: 100%; }
    ::ng-deep .reservar-datepicker .p-datepicker-inline { width: 100%; }
  `],
})
export class ReservarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);
  private readonly tokenService = inject(TokenService);
  private readonly barberoService = inject(BarberoService);
  private readonly servicioService = inject(ServicioService);
  private readonly reservaService = inject(ReservaService);
  private readonly primeng = inject(PrimeNG);

  visible = model(false);
  creada = output<void>();
  guardando = signal(false);

  readonly usuarioNombre = this.tokenService.getUserDisplayName();

  // ── Calendario y horarios ──
  readonly minDate = new Date();
  readonly maxDate = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d;
  })();

  readonly horarios = HORARIOS;

  /** Solo el calendario (fecha). La hora se elige aparte con los botones. */
  fechaCtrl = new FormControl<Date | null>(null);
  fechaSel = signal<Date | null>(null);
  horaSel = signal<string | null>(null);

  // ── Barberos (select con búsqueda) ──
  barberos = signal<BarberoVista[]>([]);
  cargandoBarberos = signal(false);
  barberoSel = signal<BarberoVista | null>(null);
  private barberosCargados = false;

  // ── Servicios (tabla con búsqueda y paginación en el cliente) ──
  servicios = signal<Servicio[]>([]);
  cargandoServicios = signal(false);
  busquedaServicio = signal('');
  firstServicios = signal(0);
  readonly rowsServicios = 5;
  /** La selección vive aparte, así sobrevive a la búsqueda y al cambio de página */
  servicioSel = signal<Servicio | null>(null);

  serviciosFiltrados = computed(() => {
    const q = normalizar(this.busquedaServicio());
    if (!q) return this.servicios();
    return this.servicios().filter((s) => normalizar(s.nombre ?? '').includes(q));
  });

  citaForm = this.fb.group({
    barberoId: [null as number | null, [Validators.required]],
    servicioId: [null as number | null, [Validators.required]],
    fechaHora: [null as Date | null, [Validators.required, fechaHoraValida]],
    notas: ['', [Validators.maxLength(300)]],
    aceptaTerminos: [false, [Validators.requiredTrue]],
  });

  constructor() {
    this.configurarIdioma();

    // Cada vez que el modal pasa a visible (lo abra quien lo abra), se carga todo.
    effect(() => {
      if (this.visible()) {
        untracked(() => this.alAbrir());
      }
    });
  }

  /**
   * Calendario en español, semana desde el lunes.
   * Es global: afecta a todos los calendarios de la app. Si prefieres,
   * muévelo a app.config.ts para configurarlo una sola vez.
   */
  private configurarIdioma(): void {
    this.primeng.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Limpiar',
      weekHeader: 'Sm',
    });
  }

  // ── Apertura / cierre ──────────────────────────────────────────────────────

  alAbrir(): void {
    this.citaForm.reset({ notas: '', aceptaTerminos: false });
    this.barberoSel.set(null);
    this.servicioSel.set(null);
    this.busquedaServicio.set('');
    this.firstServicios.set(0);
    this.fechaCtrl.reset();
    this.fechaSel.set(null);
    this.horaSel.set(null);

    if (!this.barberosCargados) this.cargarBarberos();
    this.cargarServicios();
  }

  cerrar(): void {
    this.visible.set(false);
  }

  // ── Barberos ───────────────────────────────────────────────────────────────

  private cargarBarberos(): void {
    this.cargandoBarberos.set(true);
    this.barberoService
      .listar(0, 100)
      .pipe(finalize(() => this.cargandoBarberos.set(false)))
      .subscribe({
        next: (res) => {
          const data = (res?.data?.content ?? []) as Barbero[];
          this.barberos.set(
            data.map((b) => ({
              ...b,
              nombreCompleto: `${b.persona?.nombre ?? ''} ${b.persona?.apellido ?? ''}`.trim(),
            })),
          );
          this.barberosCargados = true;
        },
        error: (error) => {
          console.error('Error cargando barberos:', error);
          this.barberos.set([]);
          this.notify.showHttpError(error, 'Error cargando barberos');
        },
      });
  }

  onBarberoChange(id: number | null): void {
    this.barberoSel.set(this.barberos().find((b) => b.barberoId === id) ?? null);
  }

  // ── Servicios ──────────────────────────────────────────────────────────────

  private cargarServicios(): void {
    this.cargandoServicios.set(true);

    this.servicioService
      .obtenerServicioPublicos({ page: 0, size: 100 })
      .pipe(finalize(() => this.cargandoServicios.set(false)))
      .subscribe({
        next: (res) => {
          this.servicios.set(res?.data?.content ?? []);
        },
        error: (error) => {
          console.error('Error cargando servicios:', error);
          this.servicios.set([]);
          this.notify.showHttpError(error, 'Error cargando servicios');
        },
      });
  }

  onBuscarServicio(valor: string): void {
    this.busquedaServicio.set(valor);
    this.firstServicios.set(0);
  }

  onPageServicios(event: { first?: number }): void {
    this.firstServicios.set(event.first ?? 0);
  }

  seleccionarServicio(servicio: Servicio): void {
    this.servicioSel.set(servicio);
    this.citaForm.controls.servicioId.setValue(servicio.servicioId);
    this.citaForm.controls.servicioId.markAsDirty();
    this.citaForm.controls.servicioId.markAsTouched();
  }

  esServicioSel(servicio: Servicio): boolean {
    return this.servicioSel()?.servicioId === servicio.servicioId;
  }

  /**
   * URL de la imagen de un servicio.
   * AJUSTAR: cambia esta línea por el campo real de tu modelo Servicio
   * (por ejemplo `servicio.imagenUrl` o `servicio.imagenes?.[0]?.url`).
   */
  imagenServicio(servicio: Servicio | null): string | null {
    if (!servicio) return null;
    const s = servicio as any;
    const url = s.imagenUrl ?? s.imagen ?? s.urlImagen ?? s.imagenes?.[0]?.url ?? s.imagenes?.[0] ?? null;
    return typeof url === 'string' && url.length > 0 ? url : null;
  }

  /** Si la imagen no carga, se oculta en vez de mostrar el icono roto */
  ocultarImagen(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  // ── Fecha (calendario) y hora (botones) ────────────────────────────────────

  onFechaSelect(fecha: Date | null): void {
    this.fechaSel.set(fecha);

    // Si la hora elegida ya pasó en el nuevo día (por ejemplo, hoy), se descarta
    const hora = this.horaSel();
    if (hora && this.horaDeshabilitada(hora)) {
      this.horaSel.set(null);
    }

    this.actualizarFechaHora();
  }

  seleccionarHora(valor: string): void {
    if (this.horaDeshabilitada(valor)) return;
    this.horaSel.set(valor);
    this.actualizarFechaHora();
  }

  /** Una hora no se puede elegir si aún no hay fecha, o si es hoy y ya pasó */
  horaDeshabilitada(valor: string): boolean {
    const fecha = this.fechaSel();
    if (!fecha) return true;

    const horario = this.horarios.find((h) => h.valor === valor);
    if (!horario) return true;

    const ahora = new Date();
    if (esMismoDia(fecha, ahora)) {
      const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
      return horario.minutos <= minutosAhora;
    }
    return false;
  }

  /** Une fecha + hora en el control del formulario (el validador sigue igual) */
  private actualizarFechaHora(): void {
    const control = this.citaForm.controls.fechaHora;
    const fecha = this.fechaSel();
    const hora = this.horaSel();

    if (!fecha || !hora) {
      control.setValue(null);
    } else {
      const [hh, mm] = hora.split(':').map(Number);
      const combinada = new Date(fecha);
      combinada.setHours(hh, mm, 0, 0);
      control.setValue(combinada);
    }

    control.markAsDirty();
    control.markAsTouched();
  }

  get errorFechaHora(): string {
    const errors = this.citaForm.controls.fechaHora.errors;
    if (errors?.['fechaPasada']) return 'La fecha y hora no pueden ser anteriores a este momento';
    if (errors?.['domingo']) return 'No atendemos los domingos';
    if (errors?.['fueraHorario']) return 'Atendemos de 09:00 AM a 07:00 PM (última cita 06:30 PM)';
    return 'Selecciona la fecha y la hora';
  }

  // ── Validación en template ─────────────────────────────────────────────────

  invalido(campo: string): boolean {
    const c = this.citaForm.get(campo);
    return !!c?.invalid && c.touched;
  }

  // ── Guardar ────────────────────────────────────────────────────────────────

  guardar(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    if (!this.tokenService.isLogged()) {
      this.notify.showError('Por favor inicia sesión nuevamente', 'Sesión no válida');
      this.router.navigate(['/login']);
      return;
    }

    const f = this.citaForm.getRawValue();
    const fechaHora = f.fechaHora as Date;

    const request: ReservaRequest = {
      clienteId: Number(this.tokenService.getUserId()),
      barberoId: f.barberoId!,
      servicioId: f.servicioId!,
      fecha: toIsoDate(fechaHora),
      horaInicio: toHora(fechaHora),
      observacion: f.notas ?? '',
    };

    this.guardando.set(true);

    this.reservaService
      .guardarReserva(request)
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: () => this.alGuardar(),
        error: (error) => {
          this.notify.showHttpError(error, 'Error del servidor');
        },
      });
  }

  private alGuardar(): void {
    this.notify.showSuccess('Tu cita fue agendada exitosamente', '¡Cita agendada!');
    this.cerrar();
    this.creada.emit();
  }


}