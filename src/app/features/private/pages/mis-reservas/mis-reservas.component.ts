import { finalize } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FILTROS_HISTORIAL } from '../../../../core/config/filtros.config';
import { Reserva } from '../../../../core/models/operaciones/Reserva.model';
import {
  HistorialClienteFiltro,
  HistorialClienteModel,
} from '../../../../core/models/operaciones/historial-cliente.model';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { ReservarComponent } from '../reservar/reservar.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ConfirmPopoverComponent } from '../../../../shared/components/confirm-popover/confirm-popover.component';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { EstadoReserva } from '@/app/core/models/operaciones/EstadoReserva';

type TabReservas = 'reservas' | 'historial';

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
    FiltrosComponent,
    ModalComponent,
  ],

  templateUrl: './mis-reservas.html',
})
export class MisReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly ESTADOS_ACTIVOS: EstadoReserva[] = [
    EstadoReserva.PENDIENTE_PAGO,
    EstadoReserva.CONFIRMADA,
    EstadoReserva.EN_PROCESO,
  ];

  tab = signal<TabReservas>('reservas');

  private historialCargado = false;

  reservas = signal<Reserva[]>([]);
  loadingReservas = signal(false);
  totalReservas = signal(0);
  rowsReservas = signal(10);
  firstReservas = signal(0);

  dialogNuevaReserva = signal(false);

  /** Servicio que llega preseleccionado desde el detalle (?servicioId=X). null = sin preselección */
  servicioIdInicial = signal<number | null>(null);

  mostrarConfirmacion = signal(false);
  reservaPorCancelar: Reserva | null = null;
  mensajeConfirmacion = '';

  historial = signal<HistorialClienteModel[]>([]);
  loadingHistorial = signal(false);
  totalHistorial = signal(0);
  rowsHistorial = signal(10);
  firstHistorial = signal(0);

  filtrosFields = [...FILTROS_HISTORIAL];
  filtros = signal<HistorialClienteFiltro>({});

  hayFiltrosActivos = computed(() => {
    const f = this.filtros();
    return !!(f.estado || f.desde || f.hasta);
  });

  displayModal = signal(false);
  reservaSeleccionada = signal<HistorialClienteModel | null>(null);
  descargandoBoleta = signal<number | null>(null);

  ngOnInit(): void {
    this.cargarMisReservas();

    const params = this.route.snapshot.queryParamMap;

    // /mi-cuenta/reservas/mis-reservas?nueva=1&servicioId=5
    const servicioId = params.get('servicioId');
    if (servicioId) {
      this.servicioIdInicial.set(Number(servicioId));
    }

    if (params.has('nueva')) {
      this.dialogNuevaReserva.set(true);
    }

    if (params.get('tab') === 'historial') {
      this.cambiarTab('historial');
    }

    // Limpia la URL para que un F5 no vuelva a abrir el modal
    if (params.has('nueva') || servicioId) {
      this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
    }
  }


  cambiarTab(tab: TabReservas): void {
    this.tab.set(tab);
    if (tab === 'historial' && !this.historialCargado) {
      this.cargarHistorial();
    }
  }

  recargar(): void {
    if (this.tab() === 'reservas') {
      this.cargarMisReservas();
    } else {
      this.cargarHistorial();
    }
  }

  cargarMisReservas(): void {
    this.loadingReservas.set(true);

    this.reservaService
      .getMisReservas(0, 200)
      .pipe(finalize(() => this.loadingReservas.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const activas = response.data.content
              .filter(r => this.ESTADOS_ACTIVOS.includes(r.estadoReserva))
              .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

            this.reservas.set(activas);
            this.totalReservas.set(activas.length);
          } else {
            this.reservas.set([]);
            this.totalReservas.set(0);
          }
        },
        error: (err) => {
          console.error('Error cargando mis reservas:', err);
          this.reservas.set([]);
          this.totalReservas.set(0);
          this.notify.showHttpError(err);
        },
      });
  }

  onPaginatorReservas(event: PaginatorState): void {
    this.rowsReservas.set(event.rows ?? this.rowsReservas());
    this.firstReservas.set(event.first ?? 0);
    this.cargarMisReservas();
  }

  // =====================================================
  // RESERVAS: NUEVA
  // =====================================================

  abrirNuevaReserva(): void {
    this.servicioIdInicial.set(null); // apertura manual: sin servicio preseleccionado
    this.dialogNuevaReserva.set(true);
  }

  onReservaCreada(): void {
    this.servicioIdInicial.set(null);
    this.firstReservas.set(0);
    this.cambiarTab('reservas');
    this.cargarMisReservas();
  }

  // =====================================================
  // RESERVAS: CANCELAR
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
    this.loadingReservas.set(true);

    this.reservaService
      .cancelarReserva(id)
      .pipe(finalize(() => this.loadingReservas.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) return;

          this.notify.showSuccess('Tu reserva ha sido cancelada exitosamente', 'Reserva cancelada');

          if (this.reservas().length === 1 && this.firstReservas() > 0) {
            this.firstReservas.set(Math.max(0, this.firstReservas() - this.rowsReservas()));
          }

          this.cargarMisReservas();

          // La reserva cancelada pasa al historial: forzar recarga la próxima vez
          this.historialCargado = false;
        },
        error: (err) => {
          console.error('Error cancelando reserva:', err);
          this.notify.showHttpError(err);
        },
      });
  }

  // =====================================================
  // RESERVAS: PAGAR
  // =====================================================

  irAPagar(reserva: Reserva): void {
    this.router.navigate(['/mi-cuenta/pago', reserva.reservaId]);
  }

  puedePagar(reserva: Reserva): boolean {
    return reserva.estadoReserva === EstadoReserva.PENDIENTE_PAGO;
  }

  puedeCancelar(reserva: Reserva): boolean {
    return reserva.estadoReserva === EstadoReserva.PENDIENTE_PAGO;
  }

puedeDescargarBoleta(reserva: HistorialClienteModel): boolean {
  return reserva.ventaId != null;
}
  cargarHistorial(): void {
    const size = this.rowsHistorial();
    const page = Math.floor(this.firstHistorial() / size);
    const { estado, desde, hasta } = this.filtros();

    this.loadingHistorial.set(true);

    this.reservaService
      .getHistorialCliente(page, size, estado, desde, hasta)
      .pipe(finalize(() => this.loadingHistorial.set(false)))
      .subscribe({
        next: (response) => {
          this.historialCargado = true;

          if (response.success && response.data) {
            this.historial.set(response.data.content);
            this.totalHistorial.set(response.data.totalElements);
          } else {
            this.historial.set([]);
            this.totalHistorial.set(0);
          }
        },
        error: (err) => {
          console.error('Error cargando el historial:', err);
          this.historial.set([]);
          this.totalHistorial.set(0);
          this.notify.showHttpError(err);
        },
      });
  }

  onPaginatorHistorial(event: PaginatorState): void {
    this.rowsHistorial.set(event.rows ?? this.rowsHistorial());
    this.firstHistorial.set(event.first ?? 0);
    this.cargarHistorial();
  }

  onBuscar(filtros: HistorialClienteFiltro): void {
    this.filtros.set(filtros);
    this.firstHistorial.set(0);
    this.cargarHistorial();
  }

  onLimpiar(): void {
    this.filtros.set({});
    this.firstHistorial.set(0);
    this.cargarHistorial();
  }

  verDetalle(reserva: HistorialClienteModel): void {
    this.reservaSeleccionada.set(reserva);
    this.displayModal.set(true);
  }

  descargarBoleta(reserva: HistorialClienteModel): void {
    const ventaId = reserva.ventaId;
if (ventaId == null) {
  this.notify.showError('Esta reserva aún no tiene boleta. La boleta se genera al pagar la reserva.');
  return;
}

    this.descargandoBoleta.set(ventaId);

    this.reservaService
      .descargarBoleta(ventaId, reserva.serieComprobante, reserva.numeroComprobante)
      .pipe(finalize(() => this.descargandoBoleta.set(null)))
      .subscribe({
        next: (blob) => {
          this.reservaService.iniciarDescargaBoleta(
            blob,
            ventaId,
            reserva.serieComprobante,
            reserva.numeroComprobante,
          );
        },
        error: (err) => {
          console.error('Error descargando la boleta de la reserva:', err);
          this.notify.showError('No se pudo descargar la boleta de esta reserva. Inténtalo nuevamente.');
        },
      });
  }

  /** Acepta "09:00:00", "09:00" o Date y devuelve "09:00". */
  horaCorta(valor: unknown): string {
    if (!valor) return '';
    if (valor instanceof Date) return valor.toTimeString().slice(0, 5);
    return String(valor).slice(0, 5);
  }
}