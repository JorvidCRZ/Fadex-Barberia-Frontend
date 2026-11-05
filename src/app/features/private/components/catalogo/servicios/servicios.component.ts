import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { finalize } from 'rxjs';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';
import { ServicioTableComponent } from './servicio-table/servicio-table.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { CategoriaService } from '@/app/core/services/catalogos/categoria.service';
import { ServicioService } from '@/app/core/services/catalogos/servicio.service';
import { Servicio, ServicioFiltro, ServicioRequest } from '@/app/core/models/catalogos/servicios.model';
import { Categoria, CategoriaTipo } from '@/app/core/models/catalogos/categorias.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { FILTROS_SERVICIO } from '@/app/core/config/filtros.config';
import { buildCategoryTree } from '@/app/shared/utils/buildCategoryTree.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    ServicioTableComponent, ServicioFormComponent, SearchBarComponent, FiltrosComponent,
    ButtonComponent, PageHeaderComponent, ModalComponent, StatsComponent,
  ],
  templateUrl: './servicios.html'
})
export class ServiciosComponent implements OnInit {

  private cd = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  private servicioService = inject(ServicioService);
  private categoriaService = inject(CategoriaService);

  filtrosFields = [...FILTROS_SERVICIO];
  servicioSeleccionado: Servicio | null = null;
  servicios: Servicio[] = [];
  categorias: Categoria[] = [];
  filtro: Partial<ServicioFiltro> = {};
  stats: StatsCard[] = [];
  mostrarFormulario = false;
  guardando = false;
  cargandoEstado: Set<number> = new Set();
  cargandoPublicado: Set<number> = new Set();
  resetFormTrigger = 0;
  rows = 25;
  first = 0;
  pageActual = 0;
  cargado = false;
  totalRecords = 0;
  icono = 'pi-sparkles';
  texto = 'Servicios';

  /** true si hay algún filtro con valor (incluye el texto del buscador) */
  get hayFiltros(): boolean {
    return Object.values(this.filtro).some(v => v !== null && v !== undefined && v !== '');
  }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarServicios(0, this.rows);
  }

  cargarServicios(page: number, size: number): void {
    this.pageActual = page;
    this.first = page * size; // buscar, limpiar o guardar vuelven a la página 1 del paginador
    this.cargado = false;
    this.servicioService.obtenerServiciosConFiltro({ ...this.filtro, page, size }).subscribe({
      next: (resp) => {
        this.servicios = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.actualizarStats();
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargado = true;
        this.cd.detectChanges();
      }
    });
  }

  private cargarCategorias(): void {
    this.categoriaService.obtenerCategoriasPorTipo(CategoriaTipo.SERVICIO).subscribe({
      next: (resp) => {
        this.categorias = resp.data.content;
        const nodos = buildCategoryTree(this.categorias);
        this.filtrosFields = this.filtrosFields.map(field =>
          field.key === 'categoriaId' ? { ...field, treeOptions: nodos } : field
        );
        this.cd.detectChanges();
      },
      error: (err) => this.notify.showHttpError(err.message)
    });
  }

  // =====================================================
  // ESTADÍSTICAS (sobre la página cargada; el total viene del servidor)
  // =====================================================

  private actualizarStats(): void {
    const activos = this.servicios.filter(s => s.estado).length;
    const publicados = this.servicios.filter(s => s.publicado).length;
    const promedio = this.servicios.length
      ? Math.round(this.servicios.reduce((acc, s) => acc + (s.duracion || 0), 0) / this.servicios.length)
      : 0;
    this.stats = [
      {
        title: 'Total servicios',
        value: this.totalRecords,
        icon: 'pi pi-sparkles',
        description: this.hayFiltros ? 'Según los filtros aplicados' : 'Registrados en el sistema',
      },
      {
        title: 'Activos',
        value: activos,
        icon: 'pi pi-check-circle',
        description: 'En esta página',
        accentClass: 'bg-success',
        iconBgClass: 'bg-success/10',
        accentTextClass: 'text-success',
      },
      {
        title: 'Publicados',
        value: publicados,
        icon: 'pi pi-globe',
        description: 'En esta página',
        accentClass: 'bg-info',
        iconBgClass: 'bg-info/10',
        accentTextClass: 'text-info',
      },
      {
        title: 'Duración promedio',
        value: promedio,
        icon: 'pi pi-clock',
        description: 'Minutos, en esta página',
        accentClass: 'bg-brand-amber',
        iconBgClass: 'bg-brand-amber/10',
        accentTextClass: 'text-brand-amber',
      },
    ];
  }

  // =====================================================
  // BÚSQUEDA, FILTROS Y PAGINACIÓN
  // =====================================================

  buscarServicios(nombre: string): void {
    this.filtro.nombre = nombre;
    this.cargarServicios(0, this.rows);
  }

  onBuscar(filtros: Partial<ServicioFiltro>) {
    const nuevos = { ...filtros };
    // El filtro de categoría es un TreeSelect: llega el nodo, el backend necesita el id
    if (nuevos.categoriaId && typeof nuevos.categoriaId === 'object') {
      const nodo = nuevos.categoriaId as any;
      nuevos.categoriaId = nodo.key ?? nodo.data?.id ?? undefined;
    }
    this.filtro = { ...this.filtro, ...nuevos };
    this.cargarServicios(0, this.rows);
  }

  onLimpiar() {
    this.filtro = {};
    this.cargarCategorias();
    this.cargarServicios(0, this.rows);
  }

  onPageChange(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.cargarServicios(Math.floor(this.first / this.rows), this.rows);
  }

  // =====================================================
  // FORMULARIO
  // =====================================================

  abrirCrear() {
    this.servicioSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(servicio: Servicio) {
    this.servicioSeleccionado = { ...servicio };
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.servicioSeleccionado = null;
  }

  guardarServicio(event: { data: ServicioRequest, imagenes?: File[] | null }) {
    if (this.guardando) return;
    const imagenes = event.imagenes || undefined;
    if (this.servicioSeleccionado) { this.editarServicio(event.data, imagenes); }
    else { this.crearServicio(event.data, imagenes); }
  }

  private crearServicio(data: ServicioRequest, imagenes?: File[]) {
    this.guardando = true;
    this.servicioService.crearServicio(data, imagenes)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: (resp) => { this.postGuardar(resp.message); },
        error: (err) => { this.notify.showHttpError(err.message); },
      });
  }

  private editarServicio(data: ServicioRequest, imagenes?: File[]) {
    if (!this.servicioSeleccionado) return;
    this.guardando = true;
    this.servicioService.actualizarServicio(this.servicioSeleccionado.servicioId, data, imagenes)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: () => { this.postGuardar('Servicio actualizado correctamente'); },
        error: (err) => { this.notify.showHttpError(err.message); },
      });
  }

  private postGuardar(mensaje: string) {
    this.notify.showSuccess(mensaje);
    this.cargarServicios(0, this.rows);
    this.resetFormTrigger++;
    this.cerrarFormulario();
  }

  // =====================================================
  // ELIMINAR, CAMBIAR ESTADO Y PUBLICADO
  // =====================================================

  eliminarServicio(servicio: Servicio) {
    this.servicioService.eliminarServicio(servicio.servicioId).subscribe({
      next: () => {
        this.notify.showSuccess('Servicio eliminado');
        this.cargarServicios(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message)
    });
  }

  onCambiarEstado(event: { id: number, activo: boolean }) {
    if (this.cargandoEstado.has(event.id)) return;
    const servicio = this.servicios.find(s => s.servicioId === event.id);
    if (!servicio) return;
    const estadoAnterior = servicio.estado;
    servicio.estado = event.activo;
    this.actualizarStats();
    this.cargandoEstado.add(event.id);
    this.servicioService.cambiarEstado(event.id, event.activo).subscribe({
      next: () => {
        this.notify.showSuccess(`Servicio ${event.activo ? 'activado' : 'desactivado'} exitosamente`);
      },
      error: (err) => {
        servicio.estado = estadoAnterior;
        this.actualizarStats();
        this.notify.showHttpError(err.message);
      },
      complete: () => { this.cargandoEstado.delete(event.id); }
    });
  }

  onCambiarPublicado(event: { id: number, publicado: boolean }) {
    if (this.cargandoPublicado.has(event.id)) return;
    const servicio = this.servicios.find(s => s.servicioId === event.id);
    if (!servicio) return;
    const publicadoAnterior = servicio.publicado;
    servicio.publicado = event.publicado;
    this.actualizarStats();
    this.cargandoPublicado.add(event.id);
    this.servicioService.cambiarPublicado(event.id, event.publicado).subscribe({
      next: () => {
        this.notify.showSuccess(`Servicio ${event.publicado ? 'publicado' : 'despublicado'} exitosamente`);
      },
      error: (err) => {
        servicio.publicado = publicadoAnterior;
        this.actualizarStats();
        this.notify.showHttpError(err.message);
      },
      complete: () => { this.cargandoPublicado.delete(event.id); }
    });
  }
}