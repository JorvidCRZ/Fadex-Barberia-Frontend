import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { environment } from '../../../../../environments/environment';
import { HISTORIAL_MOCK } from '../../../../core/config/privado-mock.config';
import { FILTROS_HISTORIAL } from '../../../../core/config/filtros.config';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { HistorialClienteModel, HistorialClienteFiltro } from '../../../../core/models/operaciones/historial-cliente.model';

@Component({
  selector: 'app-cliente-historial',
  standalone: true,
  imports: [
    CommonModule, TableModule, DialogModule,
    StatusBadgeComponent, FiltrosComponent, ButtonComponent, PageHeaderComponent,
    DateFormatPipe, MonedaPipe,
  ],
  templateUrl: './historial.html'
})
export class ClienteHistorialComponent {

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

  // Sin ngOnInit: con [lazy]="true", p-table dispara onLazyLoad al iniciar
  // y ese evento ya llama a cargarHistorial().

  cargarHistorial(): void {
    this.loading = true;

    if (environment.useMockData) {
      this.cargarMock();
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

  private cargarMock(): void {
    // Los filtros de fecha llegan como string desde <app-filtros>: se convierten a Date.
    const desde = this.filtros.desde ? new Date(this.filtros.desde) : null;
    const hasta = this.filtros.hasta ? new Date(this.filtros.hasta) : null;

    const filtrado = HISTORIAL_MOCK.filter(item => {
      const fecha = new Date(item.fecha);
      const estadoValido = !this.filtros.estado || item.estadoReserva === this.filtros.estado;
      const desdeValido = !desde || fecha >= desde;
      const hastaValido = !hasta || fecha <= hasta;
      return estadoValido && desdeValido && hastaValido;
    });

    const inicio = this.currentPage * this.pageSize;
    this.historial = filtrado.slice(inicio, inicio + this.pageSize);
    this.totalRecords = filtrado.length;
    this.loading = false;
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
}