import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { DatePickerModule } from 'primeng/datepicker';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FILTROS_HISTORIAL } from '../../../../core/config/filtros.config';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { HistorialClienteModel, HistorialClienteFiltro } from '../../../../core/models/operaciones/historial-cliente.model';
import { environment } from '../../../../../environments/environment';
import { HISTORIAL_MOCK } from '../../../../core/config/privado-mock.config';

@Component({
  selector: 'app-cliente-historial',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, SelectModule, DatePickerModule, ButtonModule, DialogModule,
    ProgressSpinnerModule, TooltipModule, StatusBadgeComponent, FiltrosComponent
  ],
  templateUrl: './historial.html'
})
export class ClienteHistorialComponent implements OnInit {

  private reservaService = inject(ReservaService);

  historial: HistorialClienteModel[] = [];
  totalRecords = 0;
  loading = true;

  currentPage = 0;
  pageSize = 10;

  filtrosFields = [...FILTROS_HISTORIAL];
  filtros: HistorialClienteFiltro = {};

  displayModal = false;
  reservaSeleccionada: HistorialClienteModel | null = null;

  get comprobanteTitulo(): string {
    return this.reservaSeleccionada?.tipoComprobante === 'FACTURA'
      ? 'Factura electrónica'
      : 'Boleta electrónica';
  }

  get comprobanteDisponible(): boolean {
    return !!this.reservaSeleccionada?.tipoComprobante;
  }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.loading = true;

    if (environment.useMockData) {
      const filtrado = HISTORIAL_MOCK.filter(item => {
        const estadoValido = !this.filtros.estado || item.estadoReserva === this.filtros.estado;
        const fecha = new Date(item.fecha);
        const desdeValido = !this.filtros.desde || fecha >= this.filtros.desde;
        const hastaValido = !this.filtros.hasta || fecha <= this.filtros.hasta;
        return estadoValido && desdeValido && hastaValido;
      });
      const inicio = this.currentPage * this.pageSize;
      this.historial = filtrado.slice(inicio, inicio + this.pageSize);
      this.totalRecords = filtrado.length;
      this.loading = false;
      return;
    }

    this.reservaService.getHistorialCliente(
      this.currentPage,
      this.pageSize,
      this.filtros.estado,
      this.filtros.desde,
      this.filtros.hasta
    ).subscribe({
      next: (response) => {
        this.historial = response.data.content;
        this.totalRecords = response.data.totalElements;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el historial', err);
        this.loading = false;
      }
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.currentPage = Math.floor((event.first ?? 0) / (event.rows ?? 10));
    this.pageSize = event.rows ?? 10;
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

  cerrarComprobante(): void {
    this.displayModal = false;
    this.reservaSeleccionada = null;
  }
}