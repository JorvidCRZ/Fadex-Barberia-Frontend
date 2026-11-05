import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FILTROS_HISTORIAL } from '../../../../core/config/filtros.config';
import { Reserva } from '../../../../core/models/operaciones/Reserva.model';
import { HistorialClienteFiltro, HistorialClienteModel,} from '../../../../core/models/operaciones/historial-cliente.model';
import { Venta } from '../../../../core/models/ventas/venta.model';
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
import { VentaService } from '@/app/core/services/venta/venta.service';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';

type TabReservas = 'reservas' | 'historial';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,

  imports: [ PaginatorComponent, TableModule, PaginatorModule, ReservarComponent, StatusBadgeComponent, DateFormatPipe, MonedaPipe,
     ButtonComponent, PageHeaderComponent, ConfirmPopoverComponent, FiltrosComponent, ModalComponent,
  ],

  templateUrl: './mis-reservas.html',
})
export class MisReservasComponent implements OnInit {
  private reservaService = inject(ReservaService);
  private ventaService = inject(VentaService);
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

    if (params.has('nueva') || servicioId) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab: params.get('tab') },
        replaceUrl: true,
      });
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

  // =====================================================
  // RESERVAS: PRÓXIMAS
  // =====================================================

  cargarMisReservas(): void {
    this.loadingReservas.set(true);

    this.reservaService
      .getMisReservas(0, 200)
      .pipe(finalize(() => this.loadingReservas.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            const activas = response.data.content
              .filter((r) => this.ESTADOS_ACTIVOS.includes(r.estadoReserva))
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

  // =====================================================
  // HISTORIAL
  // =====================================================

  cargarHistorial(): void {
    const size = this.rowsHistorial();
    const page = Math.floor(this.firstHistorial() / size);
    const { estado, desde, hasta } = this.filtros();

    this.loadingHistorial.set(true);

    // Se pide el historial y, en paralelo, las ventas del cliente (mismo endpoint de Mis Compras)
    // para saber a qué venta corresponde cada reserva pagada. Si las ventas fallan,
    // el historial se muestra igual, solo que sin botón de boleta.
    forkJoin({
      historial: this.reservaService.getHistorialCliente(page, size, estado, desde, hasta),
      compras: this.ventaService.obtenerMisCompras().pipe(catchError(() => of(null))),
    })
      .pipe(finalize(() => this.loadingHistorial.set(false)))
      .subscribe({
        next: ({ historial, compras }) => {
          this.historialCargado = true;

          if (!historial.success || !historial.data) {
            this.historial.set([]);
            this.totalHistorial.set(0);
            return;
          }

          const ventas = compras?.success && Array.isArray(compras.data) ? compras.data : [];
          const ventaPorReserva = new Map<number, Venta>();
          for (const venta of ventas) {
            const reservaId = this.reservaIdDeVenta(venta);
            if (reservaId != null) ventaPorReserva.set(reservaId, venta);
          }

          const content = historial.data.content.map((item) => {
            // Si el backend ya manda la venta en el historial, se respeta
            if (item.ventaId != null) return item;

            const venta = ventaPorReserva.get(this.reservaIdDeHistorial(item));
            return venta
              ? {
                  ...item,
                  ventaId: venta.ventaId,
                  serieComprobante: venta.serieComprobante,
                  numeroComprobante: venta.numeroComprobante,
                }
              : item;
          });

          this.historial.set(content);
          this.totalHistorial.set(historial.data.totalElements);
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

  // =====================================================
  // HISTORIAL: BOLETA
  // =====================================================

  puedeDescargarBoleta(reserva: HistorialClienteModel): boolean {
    return reserva.ventaId != null;
  }

  descargarBoleta(reserva: HistorialClienteModel): void {
    const ventaId = reserva.ventaId;
    if (ventaId == null) {
      this.notify.showError(
        'Esta reserva aún no tiene boleta. La boleta se genera al pagar la reserva.',
      );
      return;
    }

    this.descargandoBoleta.set(ventaId);

    this.ventaService
      .descargarComprobantePdf(ventaId)
      .pipe(finalize(() => this.descargandoBoleta.set(null)))
      .subscribe({
        next: (blob) => this.guardarArchivo(blob, this.nombreBoleta(reserva, ventaId)),
        error: (err) => {
          console.error('Error descargando la boleta de la reserva:', err);
          this.notify.showError(
            'No se pudo descargar la boleta de esta reserva. Inténtalo nuevamente.',
          );
        },
      });
  }

  private nombreBoleta(reserva: HistorialClienteModel, ventaId: number): string {
    return reserva.serieComprobante && reserva.numeroComprobante
      ? `boleta-${reserva.serieComprobante}-${reserva.numeroComprobante}.pdf`
      : `boleta-${ventaId}.pdf`;
  }

  private guardarArchivo(blob: Blob, nombre: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = nombre;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // =====================================================
  // HELPERS
  // =====================================================

  /** Id de la reserva que originó la venta (si el backend lo envía en la venta). */
  private reservaIdDeVenta(venta: Venta): number | null {
    return (venta as Venta & { reservaId?: number | null }).reservaId ?? null;
  }

  /**
   * Id de la reserva en un item del historial.
   * Ajusta el nombre del campo si en HistorialClienteModel se llama distinto.
   */
  private reservaIdDeHistorial(item: HistorialClienteModel): number {
    const modelo = item as HistorialClienteModel & { reservaId?: number; id?: number };
    return modelo.reservaId ?? modelo.id ?? -1;
  }

  /** Acepta "09:00:00", "09:00" o Date y devuelve "09:00". */
  horaCorta(valor: unknown): string {
    if (!valor) return '';
    if (valor instanceof Date) return valor.toTimeString().slice(0, 5);
    return String(valor).slice(0, 5);
  }
}