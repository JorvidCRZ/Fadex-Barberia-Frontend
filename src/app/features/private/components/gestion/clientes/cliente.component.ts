import { finalize, Observable } from 'rxjs';
import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorState } from 'primeng/paginator';
import { ApiResponse, Page } from '@/app/core/models/common/index.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';
import { ClienteFilterCriteria } from '@/app/core/models/gestion/cliente/cliente-filter.model';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { ClienteDetalleComponent } from './cliente-detalle.component';
import { ClienteEditarComponent } from './cliente-editar.component';
import { ClienteRegistrarComponent } from './cliente-registrar.component';
import { iniciales, nombreCompleto } from './cliente-utils.component';

const CRITERIOS_INICIALES: ClienteFilterCriteria = {
  mode: 'todos',
  year: null,
  month: null,
  fromDate: '',
  toDate: '',
};

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    TableModule, PageHeaderComponent, ButtonComponent, ModalComponent,
    StatsComponent, FiltrosComponent, PaginatorComponent, SearchBarComponent,
    StatusBadgeComponent, DateFormatPipe, ClienteDetalleComponent, ClienteEditarComponent,
    ClienteRegistrarComponent,
  ],
  templateUrl: './cliente.html',
})
export class ClienteComponent implements OnInit {

  private clienteService = inject(ClienteService);
  private notify = inject(NotificationService);

  /** Referencia al modal de detalle, para refrescarlo después de editar. */
  private detalle = viewChild(ClienteDetalleComponent);

  // ── Estado de la lista (paginación en servidor) ────────
  clientes = signal<Cliente[]>([]);
  loading = signal(false);
  rows = signal(10);
  first = signal(0);
  totalRecords = signal(0);

  // ── Búsqueda y filtros ─────────────────────────────────
  searchTerm = signal('');
  criterios = signal<ClienteFilterCriteria>(CRITERIOS_INICIALES);
  esDeshabilitados = computed(() => !this.searchTerm().trim() && this.criterios().mode === 'deshabilitados');

  // ── Resumen general ────────────────────────────────────
  stats = signal<StatsCard[]>([]);

  // ── Modales ────────────────────────────────────────────
  displayDetalle = signal(false);
  clienteDetalle = signal<Cliente | null>(null);

  displayEditar = signal(false);
  clienteEditar = signal<Cliente | null>(null);

  displayRegistrar = signal(false);

  displayConfirm = signal(false);
  clienteSeleccionado = signal<Cliente | null>(null);
  procesandoId = signal<number | null>(null);

  readonly filtroFields: FilterField[] = [
    {
      key: 'modo',
      label: 'Ordenar',
      type: 'select',
      placeholder: 'Todos los clientes',
      options: [
        { value: 'todos', label: 'Todos los clientes' },
        { value: 'recientes', label: 'Recientes' },
        { value: 'mes', label: 'Este mes' },
        { value: 'anio', label: 'Este año' },
        { value: 'deshabilitados', label: 'Deshabilitados' },
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
    { key: 'toDate', label: 'Hasta', type: 'date' },
  ] as FilterField[];

  ngOnInit(): void {
    this.cargarResumen();
    this.cargar();
  }

  // ── Carga de datos ─────────────────────────────────────

  cargar(): void {
    this.loading.set(true);
    const page = Math.floor(this.first() / this.rows());

    this.peticion(page, this.rows())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const pagina = response.success ? response.data : null;
          this.clientes.set(pagina?.content ?? []);
          this.totalRecords.set(pagina?.totalElements ?? 0);
        },
        error: (err) => {
          console.error('Error cargando clientes:', err);
          this.clientes.set([]);
          this.totalRecords.set(0);
          this.notify.showHttpError(err);
        },
      });
  }

  /** Un solo lugar decide qué endpoint usar según búsqueda y filtros. */
  private peticion(page: number, size: number): Observable<ApiResponse<Page<Cliente>>> {
    const nombre = this.searchTerm().trim();
    if (nombre) return this.clienteService.buscarPorNombre(nombre, page, size);

    const c = this.criterios();
    switch (c.mode) {
      case 'recientes':
      case 'mes':
      case 'anio':
        return this.clienteService.filtrarPorTipo(c.mode, page, size);
      case 'deshabilitados':
        return this.clienteService.listarInhabilitados(page, size);
      case 'personalizado': {
        const rango = this.rangoDe(c);
        return rango
          ? this.clienteService.filtrarPorRango(rango.fechaInicio, rango.fechaFin, page, size)
          : this.clienteService.listar(page, size);
      }
      default:
        return this.clienteService.listar(page, size);
    }
  }

  private cargarResumen(): void {
    this.clienteService.obtenerResumen().subscribe({
      next: ({ data }) => {
        this.stats.set([
          { title: 'Total clientes', value: data.totalClientes, description: String(data.deltaTotalClientes), icon: 'pi pi-users' },
          { title: 'Activos este mes', value: data.clientesActivosMes, description: String(data.deltaClientesActivos), icon: 'pi pi-check-circle', accentClass: 'bg-green-500', iconBgClass: 'bg-green-500/10', accentTextClass: 'text-green-500' },
          { title: 'Nuevos clientes', value: data.nuevosClientes, description: String(data.deltaNuevosClientes), icon: 'pi pi-user-plus', accentClass: 'bg-blue-500', iconBgClass: 'bg-blue-500/10', accentTextClass: 'text-blue-500' },
          { title: 'Retención', value: `${data.retencion.toFixed(2)}%`, description: String(data.deltaRetencion), icon: 'pi pi-chart-line', accentClass: 'bg-orange-500', iconBgClass: 'bg-orange-500/10', accentTextClass: 'text-orange-500' },
        ] as StatsCard[]);
      },
      error: (err) => console.error('Error cargando resumen de clientes:', err),
    });
  }

  // ── Eventos de la lista ────────────────────────────────

  onPaginatorChange(event: PaginatorState): void {
    this.rows.set(event.rows ?? this.rows());
    this.first.set(event.first ?? 0);
    this.cargar();
  }

  onSearch(query: string): void {
    this.searchTerm.set(query ?? '');
    this.first.set(0);
    this.cargar();
  }

  onBuscarFiltros(v: any): void {
    const personalizado = !!(v.year || v.month || v.fromDate || v.toDate);
    this.searchTerm.set('');
    this.criterios.set({
      mode: personalizado ? 'personalizado' : (v.modo ?? 'todos'),
      year: v.year ?? null,
      month: v.month ?? null,
      fromDate: v.fromDate ?? '',
      toDate: v.toDate ?? '',
    });
    this.first.set(0);
    this.cargar();
  }

  onLimpiarFiltros(): void {
    this.onBuscarFiltros({});
  }

  recargar(): void {
    this.cargarResumen();
    this.cargar();
  }

  nuevoCliente(): void {
    this.displayRegistrar.set(true);
  }

  onClienteRegistrado(): void {
    this.displayRegistrar.set(false);
    this.recargar();
  }

  // ── Detalle y edición ──────────────────────────────────

  verDetalle(cliente: Cliente): void {
    this.clienteDetalle.set(cliente);
    this.displayDetalle.set(true);
  }

  /** Editar desde la tabla: pide el cliente completo (con usuario) antes de abrir el modal. */
  editarCliente(cliente: Cliente): void {
    this.procesandoId.set(cliente.clienteId);
    this.clienteService
      .obtenerPorId(cliente.clienteId)
      .pipe(finalize(() => this.procesandoId.set(null)))
      .subscribe({
        next: (res) => this.abrirEditar(res.data),
        error: (err) => {
          console.error('Error cargando cliente:', err);
          this.notify.showHttpError(err);
        },
      });
  }

  abrirEditar(cliente: Cliente): void {
    this.clienteEditar.set(cliente);
    this.displayEditar.set(true);
  }

  /** Tras guardar: refresca la lista y el modal de detalle que sigue abierto debajo. */
  onGuardado(): void {
    this.cargar();
    this.detalle()?.recargar();
  }

  // ── Deshabilitar / reactivar ───────────────────────────

  pedirDeshabilitar(cliente: Cliente): void {
    this.clienteSeleccionado.set(cliente);
    this.displayConfirm.set(true);
  }

  confirmarDeshabilitar(): void {
    const cliente = this.clienteSeleccionado();
    if (!cliente) return;

    this.procesandoId.set(cliente.clienteId);
    this.clienteService
      .deshabilitar(cliente.clienteId)
      .pipe(finalize(() => this.procesandoId.set(null)))
      .subscribe({
        next: (res) => {
          this.displayConfirm.set(false);
          this.notify.showSuccess(res?.message || 'Cliente deshabilitado correctamente', 'Deshabilitado');
          this.recargarTrasCambio();
        },
        error: (err) => {
          console.error('Error al deshabilitar cliente:', err);
          this.notify.showHttpError(err);
        },
      });
  }

  reactivar(cliente: Cliente): void {
    this.procesandoId.set(cliente.clienteId);
    this.clienteService
      .reactivar(cliente.clienteId)
      .pipe(finalize(() => this.procesandoId.set(null)))
      .subscribe({
        next: (res) => {
          this.notify.showSuccess(res?.message || 'Cliente reactivado correctamente', 'Reactivado');
          this.recargarTrasCambio();
        },
        error: (err) => {
          console.error('Error al reactivar cliente:', err);
          this.notify.showHttpError(err);
        },
      });
  }

  // ── Helpers de la vista ────────────────────────────────

  /**
   * El modelo Cliente no trae un campo de estado: los activos salen del listado normal
   * y los inactivos del filtro «Deshabilitados». Si el backend agrega `activo`, se usa ese.
   */
  estaActivo(cliente: Cliente): boolean {
    return (cliente as any).activo ?? !this.esDeshabilitados();
  }

  /** Switch de la tabla: activo → pide confirmación; inactivo → reactiva directo. */
  cambiarEstado(cliente: Cliente): void {
    if (this.estaActivo(cliente)) this.pedirDeshabilitar(cliente);
    else this.reactivar(cliente);
  }

  nombreCompleto = nombreCompleto;
  iniciales = iniciales;

  /** Si se vació la última página tras deshabilitar/reactivar, retrocede una. */
  private recargarTrasCambio(): void {
    if (this.clientes().length === 1 && this.first() > 0) {
      this.first.set(this.first() - this.rows());
    }
    this.cargarResumen();
    this.cargar();
  }

  private rangoDe(c: ClienteFilterCriteria): { fechaInicio: string; fechaFin: string } | null {
    if (c.fromDate || c.toDate) {
      return {
        fechaInicio: c.fromDate || '2000-01-01',
        fechaFin: c.toDate || this.formatearFecha(new Date()),
      };
    }
    if (c.year === null && c.month === null) return null;

    const year = c.year ?? new Date().getFullYear();
    const inicio = c.month !== null ? new Date(year, c.month - 1, 1) : new Date(year, 0, 1);
    const fin = c.month !== null ? new Date(year, c.month, 0) : new Date(year, 11, 31);
    return { fechaInicio: this.formatearFecha(inicio), fechaFin: this.formatearFecha(fin) };
  }

  /** Formato local yyyy-MM-dd (toISOString podía correr el día según la zona horaria). */
  private formatearFecha(fecha: Date): string {
    const p = (n: number) => String(n).padStart(2, '0');
    return `${fecha.getFullYear()}-${p(fecha.getMonth() + 1)}-${p(fecha.getDate())}`;
  }
}