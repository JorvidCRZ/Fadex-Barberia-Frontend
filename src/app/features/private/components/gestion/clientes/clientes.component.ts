import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderClient } from './components/header-client/header-client.component';
import { ResumenGeneralClient } from './components/resumen-general-client/resumen-general-client.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { TableClient } from './components/table-client/table-client.component';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { ClienteFilterCriteria, ClienteFilterMode } from '@/app/core/models/gestion/cliente/cliente-filter.model';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [HeaderClient, ResumenGeneralClient, FiltrosComponent, TableClient],
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})
export class Clientes implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);

  readonly pageSize = 7;

  icono: string = 'pi-users';
  activeFilter: ClienteFilterMode = 'todos';
  searchTerm: string = '';
  filterCriteria: ClienteFilterCriteria = {
    mode: 'todos',
    year: null,
    month: null,
    fromDate: '',
    toDate: '',
  };
  clients: Cliente[] = [];
  visibleClients: Cliente[] = [];
  totalElements: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;

  readonly filtroFields: FilterField[] = [
    {
      key: 'modo',
      label: 'Ordenar',
      type: 'select',
      placeholder: 'Todos los clientes',
      options: [
        { value: 'todos',          label: 'Todos los clientes' },
        { value: 'recientes',      label: 'Recientes'          },
        { value: 'mes',            label: 'Este mes'           },
        { value: 'anio',           label: 'Este año'           },
        { value: 'deshabilitados', label: 'Deshabilitados'     },
      ],
    },
    {
      key: 'year',
      label: 'Año',
      type: 'select',
      placeholder: 'Todos',
      options: Array.from({ length: 8 }, (_, i) => {
        const y = new Date().getFullYear() - i;
        return { value: y, label: String(y) };
      }),
    },
    {
      key: 'month',
      label: 'Mes',
      type: 'select',
      placeholder: 'Todos',
      options: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
      ].map((label, i) => ({ value: i + 1, label })),
    },
    { key: 'fromDate', label: 'Desde', type: 'date' },
    { key: 'toDate',   label: 'Hasta', type: 'date' },
  ] as FilterField[];

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(page: number = 0): void {
    this.cargarClientesBase(page);
  }

  private cargarClientesBase(page: number = 0): void {
    this.clienteService.listar(page, this.pageSize).subscribe({
      next: (response) => this.aplicarRespuestaListado(response, page),
      error: (error) => console.error('Error al cargar clientes', error),
    });
  }

  onPageChange(page: number): void {
    this.cargarPaginaActual(page);
  }

  abrirCrear() {
    this.router.navigate(['register-cliente'], { relativeTo: this.route });
  }

  onFilterChange(criteria: ClienteFilterCriteria) {
    this.searchTerm = '';
    this.filterCriteria = criteria;
    this.activeFilter = criteria.mode;
    this.cargarClientesFiltrados(0, criteria);
  }

  onSearch(query: string): void {
    this.searchTerm = query;
    this.cargarPaginaActual(0);
  }

  get isSearchActive(): boolean {
    return this.searchTerm.trim().length > 0;
  }

  onDisableCliente(id: number): void {
    this.clienteService.deshabilitar(id).subscribe({
      next: () => this.cargarPaginaActual(this.currentPage),
      error: (error) => console.error('Error al deshabilitar cliente', error),
    });
  }

  onReactivateCliente(id: number): void {
    this.clienteService.reactivar(id).subscribe({
      next: () => this.cargarPaginaActual(this.currentPage),
      error: (error) => console.error('Error al reactivar cliente', error),
    });
  }

  onBuscarFiltros(v: any): void {
    const personalizado = !!(v.year || v.month || v.fromDate || v.toDate);

    this.onFilterChange({
      mode: personalizado ? 'personalizado' : (v.modo ?? 'todos'),
      year: v.year ?? null,
      month: v.month ?? null,
      fromDate: v.fromDate ?? '',
      toDate: v.toDate ?? '',
    });
  }

  onLimpiarFiltros(): void {
    this.onFilterChange({ mode: 'todos', year: null, month: null, fromDate: '', toDate: '' });
  }

  private cargarClientesFiltrados(page: number, criteria: ClienteFilterCriteria): void {
    const size = this.pageSize;

    if (criteria.mode === 'todos') {
      this.clienteService.listar(page, size).subscribe({
        next: (response) => this.aplicarRespuestaListado(response, page),
        error: (error) => console.error('Error al cargar clientes', error),
      });
      return;
    }

    if (criteria.mode === 'recientes' || criteria.mode === 'mes' || criteria.mode === 'anio') {
      this.clienteService.filtrarPorTipo(criteria.mode, page, size).subscribe({
        next: (response) => this.aplicarRespuestaListado(response, page),
        error: (error) => console.error('Error al filtrar clientes', error),
      });
      return;
    }

    if (criteria.mode === 'deshabilitados') {
      this.clienteService.listarInhabilitados(page, size).subscribe({
        next: (response) => this.aplicarRespuestaListado(response, page),
        error: (error) => console.error('Error al cargar clientes inhabilitados', error),
      });
      return;
    }

    const rango = this.obtenerRangoPersonalizado(criteria);

    if (rango) {
      this.clienteService.filtrarPorRango(rango.fechaInicio, rango.fechaFin, page, size).subscribe({
        next: (response) => this.aplicarRespuestaListado(response, page),
        error: (error) => console.error('Error al filtrar clientes por rango', error),
      });
    }
  }

  private cargarPaginaActual(page: number): void {
    const search = typeof this.searchTerm === 'string' ? this.searchTerm.trim() : '';

    if (search) {
      this.clienteService.buscarPorNombre(search, page, this.pageSize).subscribe({
        next: (response) => this.aplicarRespuestaListado(response, page),
        error: (error) => console.error('Error al buscar clientes', error),
      });
      return;
    }

    this.cargarClientesFiltrados(page, this.filterCriteria);
  }

  private obtenerRangoPersonalizado(criteria: ClienteFilterCriteria): { fechaInicio: string; fechaFin: string } | null {
    if (criteria.fromDate && criteria.toDate) {
      return {
        fechaInicio: criteria.fromDate,
        fechaFin: criteria.toDate,
      };
    }

    if (criteria.year === null && criteria.month === null) {
      return null;
    }

    const year = criteria.year ?? new Date().getFullYear();

    if (criteria.month !== null) {
      const firstDay = new Date(year, criteria.month - 1, 1);
      const lastDay = new Date(year, criteria.month, 0);

      return {
        fechaInicio: this.formatearFecha(firstDay),
        fechaFin: this.formatearFecha(lastDay),
      };
    }

    const firstDayYear = new Date(year, 0, 1);
    const lastDayYear = new Date(year, 11, 31);

    return {
      fechaInicio: this.formatearFecha(firstDayYear),
      fechaFin: this.formatearFecha(lastDayYear),
    };
  }

  private formatearFecha(fecha: Date): string {
    return fecha.toISOString().slice(0, 10);
  }

  private aplicarRespuestaListado(response: any, page: number): void {
    this.clients = response.data.content;
    this.visibleClients = response.data.content;
    this.totalElements = response.data.totalElements;
    this.currentPage = response.data.pageNumber ?? page;
    this.totalPages = response.data.totalPages;
  }
}