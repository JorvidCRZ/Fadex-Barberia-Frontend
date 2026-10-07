import { Component, inject, model, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Servicio } from '../../../../core/models/catalogos/servicios.model';
import { Barbero } from '../../../../core/models/gestion/barbero/barbero.model';
import { ReservaRequest } from '../../../../core/models/reserva/reservaRequest';
import { TokenService } from '../../../../core/services/auth/token.service';
import { ServicioService } from '../../../../core/services/catalogos/servicio.service';
import { BarberoService } from '../../../../core/services/gestion/barbero.service';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';

// TODO: ajusta la ruta a donde tengas DialogHeaderComponent

// ── Helpers ──────────────────────────────────────────────────────────────────

const fechaValida = (control: AbstractControl): ValidationErrors | null => {
  const fecha = control.value as Date | null;
  if (!fecha) return null;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const f = new Date(fecha);
  f.setHours(0, 0, 0, 0);

  if (f < hoy) return { fechaInvalida: true };
  if (f.getDay() === 0) return { domingo: true };
  return null;
};

/** 09:00 → 18:30 cada 30 min */
const HORARIOS = Array.from({ length: 20 }, (_, i) => {
  const mins = 9 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const mm = String(m).padStart(2, '0');
  return {
    value: `${String(h).padStart(2, '0')}:${mm}`,
    label: `${String(h % 12 || 12).padStart(2, '0')}:${mm} ${h < 12 ? 'AM' : 'PM'}`,
  };
});

// ── Componente ───────────────────────────────────────────────────────────────

/**
 * Usa el MessageService del componente padre (debe tener <p-toast /> y
 * `providers: [MessageService]`, como ya lo tiene MisReservas).
 */
@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, SelectModule, DatePickerModule, CheckboxModule],
  templateUrl: './reservar.html',
})
export class ReservarComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly tokenService = inject(TokenService);
  private readonly barberoService = inject(BarberoService);
  private readonly servicioService = inject(ServicioService);
  private readonly reservaService = inject(ReservaService);

  /** Se usa con [(visible)] desde el padre */
  visible = model(false);
  /** Se emite al crear la reserva, para que el padre recargue la tabla */
  creada = output<void>();

  guardando = signal(false);

  usuarioNombre = ''; // TODO: nombre del usuario logueado

  diasDisponibles: { valor: string; label: string; fecha: Date }[] = [];

  barberos$!: Observable<any[]>;
  servicios$!: Observable<Servicio[]>;
  private barberosCache: any[] = [];
  private serviciosCache: Servicio[] = [];
  private datosCargados = false;

  readonly minDate = this.hoy();
  readonly maxDate = this.hoy(3);
  horariosDisponibles = HORARIOS;

  citaForm = this.fb.group({
    barberoId: [null as number | null, [Validators.required]],
    servicioId: [null as number | null, [Validators.required]],
    fecha: [null as Date | null, [Validators.required, fechaValida]],
    hora: [null as string | null, [Validators.required]],
    notas: ['', [Validators.maxLength(300)]],
    aceptaTerminos: [false, [Validators.requiredTrue]],
  });

  ngOnInit(): void {
    this.generarDias();
  }

  private generarDias(cantidad = 5): void {
    const dias = [];
    const d = new Date();
    while (dias.length < cantidad) {
      if (d.getDay() !== 0) {
        const nombre = d.toLocaleDateString('es-PE', { weekday: 'long' });
        dias.push({
          valor: d.toDateString(),
          label: nombre.charAt(0).toUpperCase() + nombre.slice(1),
          fecha: new Date(d),
        });
      }
      d.setDate(d.getDate() + 1);
    }
    this.diasDisponibles = dias;
  }

  esDiaActivo(dia: { fecha: Date }): boolean {
    const f = this.citaForm.controls.fecha.value;
    return !!f && new Date(f).toDateString() === dia.fecha.toDateString();
  }

  elegirDia(dia: { fecha: Date }): void {
    this.citaForm.controls.fecha.setValue(dia.fecha);
    this.citaForm.controls.fecha.markAsDirty();
    this.alCambiarFecha();
  }

  elegirHora(valor: string): void {
    this.citaForm.controls.hora.setValue(valor);
    this.citaForm.controls.hora.markAsDirty();
  }

  chipClass(activo: boolean): string {
    return 'rounded-lg px-4 py-2 text-sm font-semibold transition-colors ' +
      (activo ? 'bg-brand-gold text-black' : 'bg-white/5 text-text-primary hover:bg-white/10');
  }

  // ── Apertura / cierre ──────────────────────────────────────────────────────

  alAbrir(): void {
    if (!this.datosCargados) this.cargarDatos();
    this.citaForm.reset({ notas: '', aceptaTerminos: false });

    if (this.barberosCache.length > 0) {
      this.citaForm.patchValue({ barberoId: this.barberosCache[0].barberoId });
    }

    this.horariosDisponibles = HORARIOS;
  }

  private crearBarberosPorDefecto(): any[] {
    return [
      {
        barberoId: 1001,
        experiencia: 5,
        fechaIngreso: '2024-01-10',
        ocupado: false,
        sueldo: 0,
        comision: 0,
        descripcion: 'Barbero principal',
        persona: {
          personaId: 1001,
          nombre: 'Carlos',
          apellido: 'Ramírez',
          telefono: '999111222',
          email: 'carlos@fadex.com',
          usuario: { idUsuario: 1001, user: 'carlos', qrToken: 'demo-1' },
        },
        nombreCompleto: 'Carlos Ramírez',
      },
      {
        barberoId: 1002,
        experiencia: 4,
        fechaIngreso: '2024-02-14',
        ocupado: false,
        sueldo: 0,
        comision: 0,
        descripcion: 'Barbero de cortes premium',
        persona: {
          personaId: 1002,
          nombre: 'Carlos ',
          apellido: 'Ramírez',
          telefono: '999333444',
          email: 'miguel@fadex.com',
          usuario: { idUsuario: 1002, user: 'miguel', qrToken: 'demo-2' },
        },
        nombreCompleto: 'Carlos Ramírez',
      },
      {
        barberoId: 1003,
        experiencia: 3,
        fechaIngreso: '2024-03-21',
        ocupado: false,
        sueldo: 0,
        comision: 0,
        descripcion: 'Barbero de estilo moderno',
        persona: {
          personaId: 1003,
          nombre: 'Ana',
          apellido: 'Gómez',
          telefono: '999555666',
          email: 'ana@fadex.com',
          usuario: { idUsuario: 1003, user: 'ana', qrToken: 'demo-3' },
        },
        nombreCompleto: 'Ana Gómez',
      },
    ];
  }

  cerrar(): void {
    this.visible.set(false);
  }

  // ── Carga de datos (solo la primera vez que se abre) ───────────────────────

  private cargarDatos(): void {
    this.datosCargados = true;

    this.barberos$ = this.barberoService.listar(0, 1000).pipe(
      map((res) => {
        const data = (res?.data?.content ?? []) as Barbero[];
        this.barberosCache = data.length > 0
          ? data.map((b: Barbero) => ({
              ...b,
              nombreCompleto: `${b.persona?.nombre ?? ''} ${b.persona?.apellido ?? ''}`.trim(),
            }))
          : this.crearBarberosPorDefecto();

        if (!this.citaForm.controls.barberoId.value && this.barberosCache.length > 0) {
          this.citaForm.patchValue({ barberoId: this.barberosCache[0].barberoId });
        }

        return this.barberosCache;
      }),
      catchError(() => {
        this.barberosCache = this.crearBarberosPorDefecto();
        if (!this.citaForm.controls.barberoId.value && this.barberosCache.length > 0) {
          this.citaForm.patchValue({ barberoId: this.barberosCache[0].barberoId });
        }
        this.toast('error', 'Error', 'No se pudieron cargar los barberos, se muestran los predeterminados');
        return of(this.barberosCache);
      }),
    );

    this.servicios$ = this.servicioService.obtenerServicioPublicos({ size: 1000, page: 0 }).pipe(
      map((res) => {
        this.serviciosCache = res?.data?.content ?? [];
        return this.serviciosCache;
      }),
      catchError(() => {
        this.toast('error', 'Error', 'No se pudieron cargar los servicios');
        return of([]);
      }),
    );
  }

  // ── Fecha / horarios ───────────────────────────────────────────────────────

  alCambiarFecha(): void {
    this.citaForm.controls.hora.reset();
    this.horariosDisponibles = this.calcularHorarios();
  }

  /** Si la fecha es hoy, solo muestra horas posteriores a la actual */
  private calcularHorarios() {
    const fecha = this.citaForm.controls.fecha.value;
    const ahora = new Date();
    if (!fecha || fecha.toDateString() !== ahora.toDateString()) return HORARIOS;

    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
    return HORARIOS.filter((h) => {
      const [hh, mm] = h.value.split(':').map(Number);
      return hh * 60 + mm > minutosAhora;
    });
  }

  // ── Resumen ────────────────────────────────────────────────────────────────

  get barberoSel() {
    const id = this.citaForm.controls.barberoId.value;
    return this.barberosCache.find((b) => b.barberoId === id);
  }

  get servicioSel() {
    const id = this.citaForm.controls.servicioId.value;
    return this.serviciosCache.find((s) => s.servicioId === id);
  }

  // ── Validación en template ─────────────────────────────────────────────────

  invalido(campo: string): boolean {
    const c = this.citaForm.get(campo);
    return !!c?.invalid && c.touched;
  }

  get errorFecha(): string {
    const errors = this.citaForm.controls.fecha.errors;
    if (errors?.['fechaInvalida']) return 'La fecha no puede ser anterior a hoy';
    if (errors?.['domingo']) return 'No atendemos los domingos';
    return 'La fecha es requerida';
  }

  // ── Guardar ────────────────────────────────────────────────────────────────

  guardar(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    if (!this.tokenService.isLogged()) {
      this.toast('error', 'Sesión no válida', 'Por favor inicia sesión nuevamente');
      this.router.navigate(['/login']);
      return;
    }

    const f = this.citaForm.getRawValue();
    const fecha = f.fecha as Date;

    const request: ReservaRequest = {
      clienteId: Number(this.tokenService.getUserId()),
      barberoId: f.barberoId!,
      servicioId: f.servicioId!,
      fecha: [
        fecha.getFullYear(),
        String(fecha.getMonth() + 1).padStart(2, '0'),
        String(fecha.getDate()).padStart(2, '0'),
      ].join('-'),
      horaInicio: f.hora!,
      observacion: f.notas ?? '',
    };

    this.guardando.set(true);

    this.reservaService
      .guardarReserva(request)
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: () => {
          this.toast('success', '¡Cita agendada!', 'Tu cita fue agendada exitosamente');
          this.cerrar();
          this.creada.emit();
        },
        error: (error) => {
          this.toast('error', 'Error del servidor', error?.error?.message ?? 'Ocurrió un error al agendar la cita.');
        },
      });
  }

  // ── Utils ──────────────────────────────────────────────────────────────────

  private hoy(mesesExtra = 0): Date {
    const d = new Date();
    d.setMonth(d.getMonth() + mesesExtra);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private toast(severity: 'success' | 'error', summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}