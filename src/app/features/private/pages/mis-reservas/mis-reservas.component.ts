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

  // Estados que se muestran en la pestaña "Próximas"
  private readonly ESTADOS_ACTIVOS: EstadoReserva[] = [
    EstadoReserva.PENDIENTE_PAGO,
    EstadoReserva.CONFIRMADA,
    EstadoReserva.EN_PROCESO,
  ];

  // =====================================================
  // PESTAÑA ACTIVA
  // =====================================================

  tab = signal<TabReservas>('reservas');

  private historialCargado = false;

  // =====================================================
  // ESTADO: RESERVAS
  // =====================================================

  reservas = signal<Reserva[]>([]);
  loadingReservas = signal(false);
  totalReservas = signal(0);
  rowsReservas = signal(10);
  firstReservas = signal(0);

  dialogNuevaReserva = signal(false);

  mostrarConfirmacion = signal(false);
  reservaPorCancelar: Reserva | null = null;
  mensajeConfirmacion = '';

  // =====================================================
  // ESTADO: HISTORIAL
  // =====================================================

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

    // Permite abrir directo el historial:
    // /mi-cuenta/reservas/mis-reservas?tab=historial
    if (this.route.snapshot.queryParamMap.get('tab') === 'historial') {
      this.cambiarTab('historial');
    }
  }

  // =====================================================
  // TABS
  // =====================================================

  cambiarTab(tab: TabReservas): void {
    this.tab.set(tab);

    // El historial se carga la primera vez que se abre la pestaña
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
          } else {
            this.reservas.set([]);
          }
        },
        error: (err) => {
          console.error('Error cargando mis reservas:', err);
          this.reservas.set([]);
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
    this.dialogNuevaReserva.set(true);
  }

  onReservaCreada(): void {
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

  // =====================================================
  // RESERVAS: REGLAS DE INTERFAZ
  // =====================================================

  puedePagar(reserva: Reserva): boolean {
    return reserva.estadoReserva === EstadoReserva.PENDIENTE_PAGO;
  }

  puedeCancelar(reserva: Reserva): boolean {
    return reserva.estadoReserva === EstadoReserva.PENDIENTE_PAGO;
  }

  // =====================================================
  // HISTORIAL: CARGA
  // =====================================================

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

  // =====================================================
  // HISTORIAL: FILTROS Y DETALLE
  // =====================================================

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
}