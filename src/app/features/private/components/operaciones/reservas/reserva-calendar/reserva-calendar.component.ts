import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { finalize } from 'rxjs';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { Reserva } from '@/app/core/models/operaciones/Reserva.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';

@Component({
  selector: 'app-calendar-reservas',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonComponent, StatusBadgeComponent,ModalComponent, MonedaPipe],
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

  horasGrilla = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
  ];

  ngOnInit(): void {
    this.cargarReservas();
  }

  /** yyyy-MM-dd en hora LOCAL (toISOString usa UTC y desfasa el día) */
  private aISO(fecha: Date): string {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  get fechaTexto(): string {
    return this.fechaActual.toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  get fechaCorta(): string {
    return this.fechaActual.toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });
  }

  cargarReservas(): void {
    this.isLoading = true;
    this.reservaService
      .getReservas(0, 1000)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.detectChanges();
        }),
      )
      .subscribe({
        next: (resp) => {
          this.todasLasReservas = resp?.data?.content ?? [];
          this.filtrarPorFecha();
        },
        error: (err) =>
          this.notify.showHttpError(err?.message ?? 'No se pudieron cargar las reservas'),
      });
  }

  filtrarPorFecha(): void {
    const fechaStr = this.aISO(this.fechaActual);
    this.reservasDelDia = this.todasLasReservas.filter(
      (r) => this.fechaReservaISO(r.fecha) === fechaStr,
    );
    this.barberos = [...new Set(this.reservasDelDia.map((r) => r.barberoNombre))];
  }

  /** Normaliza la fecha de la reserva a yyyy-MM-dd, sea string o Date */
  private fechaReservaISO(fecha: unknown): string {
    if (fecha instanceof Date) {
      return this.aISO(fecha);
    }
    return String(fecha ?? '').substring(0, 10);
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

  get esHoy(): boolean {
    return this.aISO(this.fechaActual) === this.aISO(new Date());
  }

  getReserva(barbero: string, hora: string): Reserva | null {
    return (
      this.reservasDelDia.find(
        (r) => r.barberoNombre === barbero && String(r.horaInicio).substring(0, 5) === hora,
      ) ?? null
    );
  }

  getColorEstado(estado: string | null): string {
    switch (estado) {
      case 'CONFIRMADA':
        return 'bg-success/10 border border-success/40';
      case 'PENDIENTE':
      case 'PENDIENTE_PAGO':
        return 'bg-warning/10 border border-warning/40';
      case 'CANCELADA':
        return 'bg-danger/10 border border-danger/40';
      default:
        return 'bg-ui-elevated border border-ui-border';
    }
  }

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
    this.showDetalle = true;
  }
}
