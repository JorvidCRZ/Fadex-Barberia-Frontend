import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { FILTROS_HISTORIAL } from '../../../../core/config/filtros.config';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { HistorialClienteModel, HistorialClienteFiltro } from '../../../../core/models/operaciones/historial-cliente.model';
import { NotificationService } from '../../../../core/services/common/notification.service';

@Component({
  selector: 'app-cliente-historial',
  standalone: true,
  imports: [
    CommonModule, TableModule, DialogModule,
    StatusBadgeComponent, FiltrosComponent, ButtonComponent, PageHeaderComponent,
    MonedaPipe,
  ],
  templateUrl: './historial.html',
})
export class ClienteHistorialComponent {
  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);

  historial: HistorialClienteModel[] = [];
  totalRecords = 0;
  loading = true;
  descargandoBoletaId: number | null = null;

  currentPage = 0;
  pageSize = 10;

  filtrosFields = [...FILTROS_HISTORIAL];
  filtros: HistorialClienteFiltro = {};

  displayModal = false;
  displayPago = false;
  reservaSeleccionada: HistorialClienteModel | null = null;
  pagoSeleccionado: HistorialClienteModel | null = null;

  trackByHistorial = (_index: number, item: HistorialClienteModel) => `${item.tipo ?? 'RESERVA'}-${item.id}`;

  cargarHistorial(): void {
    this.loading = true;

    this.reservaService.getHistorialCliente(
      this.currentPage,
      this.pageSize,
      this.filtros.estado,
      this.filtros.desde,
      this.filtros.hasta
    ).subscribe({
      next: (response) => {
        this.historial = this.normalizarHistorial(response.data?.content ?? []);
        this.totalRecords = response.data?.totalElements ?? this.historial.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el historial', err);
        this.historial = [];
        this.totalRecords = 0;
        this.loading = false;
      }
    });
  }

  private normalizarHistorial(items: HistorialClienteModel[]): HistorialClienteModel[] {
    return items.map(item => {
      const tipo = item.tipo ?? 'RESERVA';
      return {
        ...item,
        tipo,
        horaInicio: this.normalizarHora(item.horaInicio),
        horaFin: this.normalizarHora(item.horaFin),
        nombreBarbero: tipo === 'COMPRA' ? '—' : (item.nombreBarbero ?? '—'),
        nombreServicio: item.nombreServicio || 'Sin detalle',
        estadoReserva: item.estadoReserva ?? 'PENDIENTE',
        tipoReserva: tipo === 'COMPRA' ? null : (item.tipoReserva ?? null),
        observacion: item.observacion ?? null,
      };
    });
  }

  private normalizarHora(value?: string | null): string | null {
    if (!value) return null;
    const texto = value.toString().trim();
    return texto.length >= 5 ? texto.substring(0, 5) : texto;
  }

  getTipoTexto(item: HistorialClienteModel): string {
    return item.tipo === 'COMPRA' ? 'Compra' : 'Reserva';
  }

  getTipoReservaTexto(item: HistorialClienteModel): string {
    if (item.tipo === 'COMPRA' || !item.tipoReserva) {
      return '—';
    }
    return item.tipoReserva.toString();
  }

  getHorarioTexto(item: HistorialClienteModel): string {
    const inicio = this.formatearHora(item.horaInicio);
    if (!item.horaFin) {
      return inicio;
    }
    const fin = this.formatearHora(item.horaFin);
    return fin === '--:--' ? inicio : `${inicio} - ${fin}`;
  }
  getProductos(item: HistorialClienteModel): { nombre: string; cantidad: number | null }[] {
  return (item.nombreServicio ?? '')
    .split(', ')
    .filter((p) => p.trim())
    .map((p) => {
      const m = p.match(/^(.*) x(\d+)$/);
      return m ? { nombre: m[1], cantidad: Number(m[2]) } : { nombre: p, cantidad: null };
    });
}

  formatearFechaHora(fecha?: string | null, horaInicio?: string | null): string {
    if (!fecha) return '—';

    const [anio, mes, dia] = fecha.split('-');
    if (!anio || !mes || !dia) return '—';

    const fechaTexto = `${dia}/${mes}/${anio}`;
    if (!horaInicio) return fechaTexto;

    const hora = horaInicio.toString().trim().substring(0, 5);
    return `${fechaTexto} ${hora}`;
  }

  formatearHora(hora?: string | null): string {
    if (!hora) return '--:--';
    const valor = hora.toString().trim();
    const match = valor.match(/(\d{1,2}):(\d{2})/);
    if (!match) return '--:--';
    return `${match[1].padStart(2, '0')}:${match[2]}`;
  }

  get hayFiltrosActivos(): boolean {
    return !!(this.filtros.estado || this.filtros.desde || this.filtros.hasta);
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.pageSize = event.rows ?? 10;
    this.currentPage = Math.floor((event.first ?? 0) / this.pageSize);
    this.cargarHistorial();
  }

  onBuscar(filtros: HistorialClienteFiltro): void {
    this.filtros = filtros;
    this.currentPage = 0;
    this.cargarHistorial();
  }

  onLimpiar(): void {
    this.filtros = {};
    this.currentPage = 0;
    this.cargarHistorial();
  }

  verDetalle(reserva: HistorialClienteModel): void {
    this.reservaSeleccionada = reserva;
    this.displayModal = true;
  }

  verPago(item: HistorialClienteModel): void {
    this.pagoSeleccionado = item;
    this.displayPago = true;
  }

  cerrarPago(): void {
    this.displayPago = false;
    this.pagoSeleccionado = null;
  }

  get pagoClienteNombre(): string | null {
    const valor = (this.pagoSeleccionado as any)?.clienteNombre ?? null;
    return valor ? String(valor) : null;
  }

  get pagoBarberoNombre(): string | null {
    const valor = (this.pagoSeleccionado as any)?.nombreBarbero ?? (this.pagoSeleccionado as any)?.barberoNombre ?? null;
    return valor ? String(valor) : null;
  }

  get pagoMetodoPago(): string | null {
    const valor = (this.pagoSeleccionado as any)?.metodoPago ?? null;
    return valor ? String(valor) : null;
  }

  isDescargandoBoleta(id?: number | null): boolean {
    return this.descargandoBoletaId !== null && id !== undefined && id !== null && this.descargandoBoletaId === id;
  }

descargarBoleta(item: HistorialClienteModel): void {
  const ventaId = item.tipo === 'COMPRA' ? item.id : item.ventaId;
  if (!ventaId) {
    return;
  }

  this.descargandoBoletaId = item.id;

  this.reservaService.descargarBoleta(ventaId).subscribe({
    next: (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement('a');
      enlace.href = url;
      enlace.download = `boleta-${ventaId}.pdf`;
      enlace.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      this.descargandoBoletaId = null;
    },
    error: () => {
      this.descargandoBoletaId = null;
      this.notify.showError('No se pudo descargar la boleta');
    }
  });
}

  esCompra(item: HistorialClienteModel): boolean {
    return item.tipo === 'COMPRA';
  }
}
