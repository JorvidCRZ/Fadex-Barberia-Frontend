import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { Reserva } from '@/app/core/models/operaciones/Reserva.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { ReservaDetalleComponent } from '../reservas-detalle/reserva-detalle.component';

/** Una sola fuente para los colores de la grilla y la leyenda */
const ESTADOS_CALENDARIO = [
  { estados: ['CONFIRMADA'], etiqueta: 'Confirmada', clase: 'border-success/40 bg-success/10' },
  { estados: ['PENDIENTE', 'PENDIENTE_PAGO'], etiqueta: 'Pendiente', clase: 'border-warning/40 bg-warning/10' },
  { estados: ['EN_PROCESO'], etiqueta: 'En proceso', clase: 'border-info/40 bg-info/10' },
  { estados: ['FINALIZADA'], etiqueta: 'Finalizada', clase: 'border-emerald-500/40 bg-emerald-500/10' },
  { estados: ['CANCELADA'], etiqueta: 'Cancelada', clase: 'border-danger/40 bg-danger/10' },
];
const CLASE_SIN_ESTADO = 'border-ui-border bg-ui-elevated';

@Component({
  selector: 'app-calendar-reservas',
  standalone: true,
  imports: [ButtonComponent, EmptyStateComponent, ModalComponent, ReservaDetalleComponent],
  templateUrl: './reserva-calendar.html',
})
export class CalendarReservas implements OnInit {
  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);
  private cd = inject(ChangeDetectorRef);

  isLoading = false;
  fechaActual = new Date();
  todasLasReservas: Reserva[] = [];
  reservasDelDia: Reserva[] = [];
  barberos: string[] = [];
  showDetalle = false;
  reservaSeleccionada: Reserva | null = null;

  readonly leyenda = [{ etiqueta: 'Sin estado', clase: CLASE_SIN_ESTADO }, ...ESTADOS_CALENDARIO];

  readonly horasGrilla = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30',
  ];

  ngOnInit(): void {
    this.cargarReservas();
  }

  /** yyyy-MM-dd en hora LOCAL (toISOString usa UTC y desfasa el día) */
  private aISO(fecha: Date): string {
    const p = (n: number) => String(n).padStart(2, '0');
    return `${fecha.getFullYear()}-${p(fecha.getMonth() + 1)}-${p(fecha.getDate())}`;
  }

  get fechaTexto(): string {
    return this.fechaActual.toLocaleDateString('es-PE', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  get fechaCorta(): string {
    return this.fechaActual.toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });
  }

  get esHoy(): boolean {
    return this.aISO(this.fechaActual) === this.aISO(new Date());
  }

  cargarReservas(): void {
    this.isLoading = true;
    this.reservaService.getReservas(0, 1000)
      .pipe(finalize(() => { this.isLoading = false; this.cd.detectChanges(); }))
      .subscribe({
        next: (resp) => {
          this.todasLasReservas = resp?.data?.content ?? [];
          this.filtrarPorFecha();
        },
        error: (err) => this.notify.showHttpError(err?.message ?? 'No se pudieron cargar las reservas'),
      });
  }

  filtrarPorFecha(): void {
    const fechaStr = this.aISO(this.fechaActual);
    this.reservasDelDia = this.todasLasReservas.filter(r => this.fechaReservaISO(r.fecha) === fechaStr);
    this.barberos = [...new Set(this.reservasDelDia.map(r => r.barberoNombre))];
  }

  private fechaReservaISO(fecha: unknown): string {
    return fecha instanceof Date ? this.aISO(fecha) : String(fecha ?? '').substring(0, 10);
  }

  cambiarDia(dias: number): void {
    const nueva = new Date(this.fechaActual);
    nueva.setDate(nueva.getDate() + dias);
    this.fechaActual = nueva;
    this.filtrarPorFecha();
  }

  irAHoy(): void {
    this.fechaActual = new Date();
    this.filtrarPorFecha();
  }

  getReserva(barbero: string, hora: string): Reserva | null {
    return this.reservasDelDia.find(
      r => r.barberoNombre === barbero && String(r.horaInicio).substring(0, 5) === hora,
    ) ?? null;
  }

  claseEstado(estado: string | null): string {
    return ESTADOS_CALENDARIO.find(e => e.estados.includes(estado ?? ''))?.clase ?? CLASE_SIN_ESTADO;
  }

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
    this.showDetalle = true;
  }
}