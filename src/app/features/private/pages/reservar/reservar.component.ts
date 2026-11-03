import { Component, inject, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators, } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
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

// ── Componente ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, DatePickerModule, CheckboxModule,
    TableModule, PaginatorModule,
    ModalComponent, ButtonComponent, MonedaPipe, DateFormatPipe
  ],
  templateUrl: './reservar.html',
})
export class ReservarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);
  private readonly tokenService = inject(TokenService);
  private readonly barberoService = inject(BarberoService);
  private readonly servicioService = inject(ServicioService);
  private readonly reservaService = inject(ReservaService);

  visible = model(false);
  creada = output<void>();
  guardando = signal(false);

  readonly usuarioNombre = this.tokenService.getUserDisplayName();

  // ── Calendario ──
  readonly minDate = new Date();
  readonly maxDate = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d;
  })();

  // ── Barberos (tarjetas) ──
  barberos = signal<BarberoVista[]>([]);
  cargandoBarberos = signal(false);
  barberoSel = signal<BarberoVista | null>(null);
  private barberosCargados = false;

  // ── Servicios (tabla paginada) ──
  servicios = signal<Servicio[]>([]);
  cargandoServicios = signal(false);
  totalServicios = signal(0);
  rowsServicios = signal(5);
  firstServicios = signal(0);
  /** Se guarda aparte para que la selección sobreviva al cambiar de página */
  servicioSel = signal<Servicio | null>(null);

  citaForm = this.fb.group({
    barberoId: [null as number | null, [Validators.required]],
    servicioId: [null as number | null, [Validators.required]],
    fechaHora: [null as Date | null, [Validators.required, fechaHoraValida]],
    notas: ['', [Validators.maxLength(300)]],
    aceptaTerminos: [false, [Validators.requiredTrue]],
  });

  // ── Apertura / cierre ──────────────────────────────────────────────────────

  alAbrir(): void {
    this.citaForm.reset({ notas: '', aceptaTerminos: false });
    this.barberoSel.set(null);
    this.servicioSel.set(null);

    if (!this.barberosCargados) this.cargarBarberos();

    this.firstServicios.set(0);
    this.cargarServicios();
  }

  alCambiarVisible(visible: boolean): void {
    if (visible) this.alAbrir();
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
          this.barberos.set([]);
          this.notify.showHttpError(error, 'Error cargando barberos');
        },
      });
  }

  seleccionarBarbero(barbero: BarberoVista): void {
    this.barberoSel.set(barbero);
    this.citaForm.controls.barberoId.setValue(barbero.barberoId);
    this.citaForm.controls.barberoId.markAsDirty();
    this.citaForm.controls.barberoId.markAsTouched();
  }

  esBarberoSel(barbero: BarberoVista): boolean {
    return this.barberoSel()?.barberoId === barbero.barberoId;
  }

  // ── Servicios: tabla paginada desde el back ────────────────────────────────

  cargarServicios(): void {
    const size = this.rowsServicios();
    const page = Math.floor(this.firstServicios() / size);

    this.cargandoServicios.set(true);

    this.servicioService
      .obtenerServicioPublicos({ page, size })
      .pipe(finalize(() => this.cargandoServicios.set(false)))
      .subscribe({
        next: (res) => {
          this.servicios.set(res?.data?.content ?? []);
          // Si tu PageResponse nombra distinto el total, ajusta aquí
          this.totalServicios.set(res?.data?.totalElements ?? 0);
        },
        error: (error) => {
          this.servicios.set([]);
          this.totalServicios.set(0);
          this.notify.showHttpError(error, 'Error cargando servicios');
        },
      });
  }

  onPaginatorServicios(event: PaginatorState): void {
    this.rowsServicios.set(event.rows ?? this.rowsServicios());
    this.firstServicios.set(event.first ?? 0);
    this.cargarServicios();
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

  // ── Fecha y hora (la elige el cliente en el calendario) ────────────────────

  marcarFechaHoraTocada(): void {
    this.citaForm.controls.fechaHora.markAsTouched();
    this.citaForm.controls.fechaHora.markAsDirty();
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