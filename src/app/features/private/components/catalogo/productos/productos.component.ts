import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { finalize } from 'rxjs';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoTableComponent } from './producto-table/producto-table.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { CategoriaService } from '@/app/core/services/catalogos/categoria.service';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { Producto, ProductoFiltro, ProductoRequest } from '@/app/core/models/catalogos/productos.model';
import { Categoria, CategoriaTipo } from '@/app/core/models/catalogos/categorias.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { FILTROS_PRODUCTO } from '@/app/core/config/filtros.config';
import { INVENTARIO_CONFIG } from '@/app/core/config/valores.config';
import { buildCategoryTree } from '@/app/shared/utils/buildCategoryTree.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    ProductoTableComponent, ProductoFormComponent, ProductoDetalleComponent, SearchBarComponent, FiltrosComponent,
    ButtonComponent, PageHeaderComponent, ModalComponent, StatsComponent,
  ],
  templateUrl: './productos.html'
})
export class ProductosComponent implements OnInit {

  private cd = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService);

  filtrosFields = [...FILTROS_PRODUCTO];
  productoSeleccionado: Producto | null = null;
  productoDetalle: Producto | null = null;
  mostrarDetalle = false;
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  filtro: Partial<ProductoFiltro> = {};
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
  icono = 'pi-th-large';
  texto = 'Productos';

  /** true si hay algún filtro con valor (incluye el texto del buscador) */
  get hayFiltros(): boolean {
    return Object.values(this.filtro).some(v => v !== null && v !== undefined && v !== '');
  }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProductos(0, this.rows);
  }

  cargarProductos(page: number, size: number): void {
    this.pageActual = page;
    this.first = page * size; // buscar, limpiar o guardar vuelven a la página 1 del paginador
    this.cargado = false;
    this.productoService.obtenerProductosConFiltro({ ...this.filtro, page, size, sort: 'id,desc' }).subscribe({
      next: (resp) => {
        this.productos = resp.data.content;
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
    this.categoriaService.obtenerCategoriasPorTipo(CategoriaTipo.PRODUCTO).subscribe({
      next: (resp) => {
        this.categorias = resp.data.content;
        const nodos = buildCategoryTree(this.categorias);
        this.filtrosFields = this.filtrosFields.map(field =>
          field.key === 'idCategoria' ? { ...field, treeOptions: nodos } : field
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
    const activos = this.productos.filter(p => p.estado).length;
    const publicados = this.productos.filter(p => p.publicado).length;
    const stockBajo = this.productos.filter(p => p.stock <= INVENTARIO_CONFIG.STOCK_MINIMO_GLOBAL).length;
    this.stats = [
      {
        title: 'Total productos',
        value: this.totalRecords,
        icon: 'pi pi-th-large',
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
        title: 'Stock bajo',
        value: stockBajo,
        icon: 'pi pi-exclamation-triangle',
        description: 'En esta página',
        accentClass: 'bg-warning',
        iconBgClass: 'bg-warning/10',
        accentTextClass: 'text-warning',
      },
    ];
  }

  // =====================================================
  // BÚSQUEDA, FILTROS Y PAGINACIÓN
  // =====================================================

  buscarProductos(nombre: string): void {
    this.filtro.nombre = nombre;
    this.cargarProductos(0, this.rows);
  }

  onBuscar(filtros: Partial<ProductoFiltro>) {
    const nuevos = { ...filtros };
    // El filtro de categoría es un TreeSelect: llega el nodo, el backend necesita el id
    if (nuevos.idCategoria && typeof nuevos.idCategoria === 'object') {
      const nodo = nuevos.idCategoria as any;
      nuevos.idCategoria = nodo.key ?? nodo.data?.id ?? undefined;
    }
    this.filtro = { ...this.filtro, ...nuevos };
    this.cargarProductos(0, this.rows);
  }

  onLimpiar() {
    this.filtro = {};
    this.cargarCategorias();
    this.cargarProductos(0, this.rows);
  }

  onPageChange(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.cargarProductos(Math.floor(this.first / this.rows), this.rows);
  }

  // =====================================================
  // FORMULARIO
  // =====================================================

  abrirCrear() {
    this.productoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(producto: Producto) {
    this.productoSeleccionado = { ...producto };
    this.mostrarFormulario = true;
  }

  abrirVer(producto: Producto) {
    this.productoDetalle = producto;
    this.mostrarDetalle = true;
  }

  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.productoDetalle = null;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.productoSeleccionado = null;
  }

  guardarProducto(event: { data: ProductoRequest, imagenes?: File[] | null }) {
    if (this.guardando) return;
    const imagenes = event.imagenes || undefined;
    if (this.productoSeleccionado) { this.editarProducto(event.data, imagenes); }
    else { this.crearProducto(event.data, imagenes); }
  }

  private crearProducto(data: ProductoRequest, imagenes?: File[]) {
    this.guardando = true;
    this.productoService.crearProducto(data, imagenes)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: (resp) => { this.postGuardar(resp.message); },
        error: (err) => { this.notify.showHttpError(err.message); },
      });
  }

  private editarProducto(data: ProductoRequest, imagenes?: File[]) {
    if (!this.productoSeleccionado) return;
    this.guardando = true;
    this.productoService.actualizarProducto(this.productoSeleccionado.id, data, imagenes)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: (resp) => { this.postGuardar(resp.message); },
        error: (err) => { this.notify.showHttpError(err.message); },
      });
  }

  private postGuardar(mensaje: string) {
    this.notify.showSuccess(mensaje);
    this.cargarProductos(0, this.rows);
    this.resetFormTrigger++;
    this.cerrarFormulario();
  }


  eliminarProducto(producto: Producto) {
    this.productoService.eliminarProducto(producto.id).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarProductos(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  onCambiarEstado(event: { id: number, activo: boolean }) {
    if (this.cargandoEstado.has(event.id)) return;
    const producto = this.productos.find(p => p.id === event.id);
    if (!producto) return;
    const estadoAnterior = producto.estado;
    producto.estado = event.activo;
    this.actualizarStats();
    this.cargandoEstado.add(event.id);
    this.productoService.cambiarEstado(event.id, event.activo).subscribe({
      next: () => {
        this.notify.showSuccess(`Producto ${event.activo ? 'activado' : 'desactivado'} exitosamente`);
      },
      error: (err) => {
        producto.estado = estadoAnterior;
        this.actualizarStats();
        this.notify.showHttpError(err.message);
      },
      complete: () => { this.cargandoEstado.delete(event.id); }
    });
  }

  onCambiarPublicado(event: { id: number, publicado: boolean }) {
    if (this.cargandoPublicado.has(event.id)) return;
    const producto = this.productos.find(p => p.id === event.id);
    if (!producto) return;
    const publicadoAnterior = producto.publicado;
    producto.publicado = event.publicado;
    this.actualizarStats();
    this.cargandoPublicado.add(event.id);
    this.productoService.cambiarPublicado(event.id, event.publicado).subscribe({
      next: () => {
        this.notify.showSuccess(`Producto ${event.publicado ? 'publicado' : 'despublicado'} exitosamente`);
      },
      error: (err) => {
        producto.publicado = publicadoAnterior;
        this.actualizarStats();
        this.notify.showHttpError(err.message);
      },
      complete: () => { this.cargandoPublicado.delete(event.id); }
    });
  }
}