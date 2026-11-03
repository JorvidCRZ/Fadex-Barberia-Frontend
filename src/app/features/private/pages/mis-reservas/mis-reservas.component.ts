
import { finalize } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { Reserva } from '../../../../core/models/operaciones/Reserva.model';

import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { NotificationService } from '../../../../core/services/common/notification.service';

import { ReservarComponent } from '../reservar/reservar.component';

import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ConfirmPopoverComponent } from '../../../../shared/components/confirm-popover/confirm-popover.component';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,

  imports: [
    TableModule,
    PaginatorModule,
    ReservarComponent,
    StatusBadgeComponent,
    DateFormatPipe,
    MonedaPipe,
    ButtonComponent,
    PageHeaderComponent,
    ConfirmPopoverComponent,
  ],

  templateUrl: './mis-reservas.html',
})
export class MisReservasComponent implements OnInit {

  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // =====================================================
  // ESTADOS
  // =====================================================

  reservas = signal<Reserva[]>([]);

  loading = signal(false);

  totalRecords = signal(0);

  rows = signal(10);

  first = signal(0);

  dialogNuevaReserva = signal(false);

  mostrarConfirmacion = signal(false);
  reservaPorCancelar: Reserva | null = null;
  mensajeConfirmacion = '';

  // =====================================================
  // INICIALIZACIÓN
  // =====================================================

  ngOnInit(): void {

    this.cargarMisReservas();

    // Permite abrir el modal desde otras pantallas:
    // /mi-cuenta/reservas/mis-reservas?nueva=1

    if (this.route.snapshot.queryParamMap.has('nueva')) {
      this.dialogNuevaReserva.set(true);
    }
  }

  // =====================================================
  // CARGA DE RESERVAS
  // =====================================================

  cargarMisReservas(): void {

    const size = this.rows();

    const page = Math.floor(this.first() / size);

    this.loading.set(true);

    this.reservaService.getMisReservas(page, size)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: (response) => {

          if (response.success && response.data) {

            this.reservas.set(response.data.content);

            this.totalRecords.set(
              response.data.totalElements
            );

          } else {

            this.reservas.set([]);

            this.totalRecords.set(0);
          }
        },

        error: (err) => {

          console.error(
            'Error cargando mis reservas:',
            err
          );

          this.reservas.set([]);

          this.totalRecords.set(0);

          this.notify.showHttpError(err);
        }
      });
  }

  // =====================================================
  // PAGINACIÓN
  // =====================================================

  onPaginatorChange(event: PaginatorState): void {

    const size = event.rows ?? this.rows();

    const first = event.first ?? 0;

    this.rows.set(size);

    this.first.set(first);

    this.cargarMisReservas();
  }

  // =====================================================
  // RECARGAR
  // =====================================================

  recargar(): void {

    this.cargarMisReservas();
  }

  // =====================================================
  // NUEVA RESERVA
  // =====================================================

  abrirNuevaReserva(): void {

    this.dialogNuevaReserva.set(true);
  }

  onReservaCreada(): void {

    this.first.set(0);

    this.cargarMisReservas();
  }

  // =====================================================
  // CANCELAR RESERVA
  // =====================================================

  cancelarReserva(reserva: Reserva): void {
    this.reservaPorCancelar = reserva;
    this.mensajeConfirmacion = `¿Cancelar la reserva del servicio "${reserva.servicio}"?`;
    this.mostrarConfirmacion.set(true);
  }

  cerrarConfirmacion(): void {
    this.mostrarConfirmacion.set(false);
    this.reservaPorCancelar = null;
  }

  confirmarCancelacion(): void {
    const reserva = this.reservaPorCancelar;
    if (!reserva) return;

    const id = reserva.reservaId || reserva.id;
    this.cerrarConfirmacion();
    this.loading.set(true);

    this.reservaService.cancelarReserva(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) return;

          this.notify.showSuccess(
            'Tu reserva ha sido cancelada exitosamente',
            'Reserva cancelada'
          );

          if (this.reservas().length === 1 && this.first() > 0) {
            this.first.set(Math.max(0, this.first() - this.rows()));
          }

          this.cargarMisReservas();
        },
        error: (err) => {
          console.error('Error cancelando reserva:', err);
          this.notify.showHttpError(err);
        }
      });
  }

  // =====================================================
  // PAGAR RESERVA
  // =====================================================

  irAPagar(reserva: Reserva): void {

    this.router.navigate([
      '/mi-cuenta/checkout',
      reserva.reservaId
    ]);
  }

  // =====================================================
  // REGLAS DE INTERFAZ
  // =====================================================

  puedePagar(reserva: Reserva): boolean {

    return reserva.estadoReserva === 'PENDIENTE_PAGO';
  }

  puedeCancelar(reserva: Reserva): boolean {

    return reserva.estadoReserva === 'PENDIENTE_PAGO';
  }

}
