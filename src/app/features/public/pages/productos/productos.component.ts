import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/paginator';
import { TreeSelectModule } from 'primeng/treeselect';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { ProductoService } from '../../../../core/services/catalogos/producto.service';
import { CategoriaService } from '../../../../core/services/catalogos/categoria.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { INVENTARIO_CONFIG } from '../../../../core/config/valores.config';
import { Producto, ProductoFiltro } from '../../../../core/models/catalogos/productos.model';
import { Categoria, CategoriaTipo } from '../../../../core/models/catalogos/categorias.model';
import { FILTROS_PRODUCTO_PUBLICO } from '../../../../core/config/filtros.config';
import { buildCategoryTree } from '../../../../shared/utils/buildCategoryTree.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { PRODUCTOS_BANNERS } from '../../../../core/config/banner.config';

@Component({
  standalone: true,
  selector: 'app-producto',
  imports: [CommonModule, FormsModule, ProductoListaComponent, PaginatorModule, InputNumberModule, TreeSelectModule,
    ButtonModule, FiltrosComponent, ProductoDetalleComponent, BannerComponent
  ],
  templateUrl: './productos.html'
})
export class ProductComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaService);
  private readonly productoService = inject(ProductoService);
  private readonly notify = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly moneda = INVENTARIO_CONFIG.MONEDA;

  banners = [...PRODUCTOS_BANNERS];
  filtrosFields = signal([...FILTROS_PRODUCTO_PUBLICO]);
  filtros: ProductoFiltro = {};
  productos = signal<Producto[]>([]);
  cargando = signal(true);
  page = signal(0);
  size = signal(12);
  totalRecords = signal(0);
  texto = 'Productos';
  categoriasMap = new Map<number, Categoria>();
  productoSeleccionado = signal<Producto | null>(null);
  private productoSolicitadoId: number | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = Number(params.get('productoId'));
      this.productoSolicitadoId = Number.isFinite(id) && id > 0 ? id : null;
      this.abrirProductoSolicitado();
    });
    this.cargarCategorias();
    this.cargarProductos(this.page(), this.size());
  }


  verProducto(producto: Producto): void {
    this.productoSeleccionado.set(producto);
  }

  cerrarDetalle(): void {
    this.productoSeleccionado.set(null);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { productoId: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategoriasPorTipo(CategoriaTipo.PRODUCTO).subscribe({
      next: (resp) => {
        const nodos = buildCategoryTree(resp.data?.content ?? []);
        this.filtrosFields.update(fields => fields.map(f => f.key === 'idCategoria' ? { ...f, treeOptions: nodos } : f));
      },
      error: (error) => this.notify.showHttpError(error.message),
    });
  }

  cargarProductos(page: number, size: number): void {
    this.cargando.set(true);
    const filter = { ...this.filtros, page, size };
    this.productoService.obtenerProductosPublico(filter).subscribe({
      next: (resp) => {
        this.productos.set(resp.data.content);
        this.totalRecords.set(resp.data.totalElements ?? resp.data.content.length);
        this.cargando.set(false);
        this.abrirProductoSolicitado();
      },
      error: (error) => {
        this.notify.showHttpError(error.message);
        this.productos.set([]);
        this.cargando.set(false);
      },
    });
  }

  private abrirProductoSolicitado(): void {
    if (!this.productoSolicitadoId || this.cargando()) { return; }
    const producto = this.productos().find(item => item.id === this.productoSolicitadoId);
    if (producto) {
      this.productoSeleccionado.set(producto);
      this.productoSolicitadoId = null;
    }
  }

  private obtenerIdsHojas(nodo: any): number[] {
    if (!nodo) { return []; }
    const children = Array.isArray(nodo.children) ? nodo.children : [];
    if (children.length === 0) {
      const id = this.obtenerIdCategoriaSeleccionada(nodo);
      return id !== undefined ? [id] : [];
    }

    return children.flatMap((child: any) => this.obtenerIdsHojas(child));
  }

  private obtenerIdCategoriaSeleccionada(valor: any): number | undefined {
    if (valor == null) { return undefined; }
    if (typeof valor === 'number') { return valor; }
    if (typeof valor === 'object') {
      const key = valor.key ?? valor.data?.id ?? valor.id;
      if (key == null) { return undefined; }
      const parsed = Number(key);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
    if (typeof valor === 'string' && valor.trim() !== '') {
      const parsed = Number(valor);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
    return undefined;
  }

  onPage(event: { page: number; size: number }) {
    this.page.set(event.page);
    this.size.set(event.size);
    this.cargarProductos(event.page, event.size);
  }

  onPaginatorChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const page = Math.floor(first / rows);
    if (page === this.page() && rows === this.size()) { return; }
    this.onPage({ page, size: rows });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords() / this.size()));
  }

  get isFirstPage(): boolean { return this.page() <= 0; }
  get isLastPage(): boolean { return this.page() >= this.totalPages - 1; }

  irPaginaAnterior(): void {
    if (!this.isFirstPage) { this.onPage({ page: this.page() - 1, size: this.size() }); }
  }

  irPaginaSiguiente(): void {
    if (!this.isLastPage) { this.onPage({ page: this.page() + 1, size: this.size() }); }
  }

onBuscar(valores: Partial<ProductoFiltro>): void {
    if (valores.idCategoria && typeof valores.idCategoria === 'object') {
      const nodo = valores.idCategoria as any;
      valores.idCategoria = nodo.key ?? nodo.data?.id ?? undefined;
    }
    this.filtros = { ...this.filtros, ...valores };
    this.page.set(0);
    this.cargarProductos(0, this.size());
  }

  onLimpiar(): void {
    this.filtros = {};
    this.page.set(0);
    this.cargarProductos(0, this.size());
  }
}
