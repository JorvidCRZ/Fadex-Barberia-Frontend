import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';
import { Producto } from '@/app/core/models/catalogos/productos.model';
import { INVENTARIO_CONFIG } from '@/app/core/config/valores.config';

interface ImagenGaleria { src: string; alt: string; }

@Component({
  selector: 'app-producto-table',
  standalone: true,
  imports: [
    TableModule, ToggleSwitchModule, ImageModule, GalleriaModule, FormsModule,
    ButtonComponent, ConfirmPopoverComponent, EmptyStateComponent, ModalComponent,
    PaginatorComponent, StatusBadgeComponent, SafeImageUrlPipe, SolesPipe,
  ],
  templateUrl: './producto-table.html'
})
export class ProductoTableComponent {
  @Output() editar = new EventEmitter<Producto>();
  @Output() eliminar = new EventEmitter<Producto>();
  @Output() ver = new EventEmitter<Producto>();
  @Output() estado = new EventEmitter<{ id: number, activo: boolean }>();
  @Output() publicado = new EventEmitter<{ id: number, publicado: boolean }>();
  /** Se emite desde el estado vacío cuando hay filtros activos */
  @Output() limpiar = new EventEmitter<void>();
  /** Cambio de página o de filas por página en el paginador */
  @Output() pageChange = new EventEmitter<PaginatorState>();
  @Input({ required: true }) productos: Producto[] = [];
  @Input() cargado = false;
  /** Cambia el mensaje del estado vacío y muestra el botón "Limpiar filtros" */
  @Input() hayFiltros = false;
  @Input() first = 0;
  @Input() rows = 25;
  @Input() totalRecords = 0;

  readonly stockMinimo = INVENTARIO_CONFIG.STOCK_MINIMO_GLOBAL;

  mostrarConfirmacion = false;
  productoAEliminar: Producto | null = null;

  mostrarGaleria = false;
  tituloGaleria = 'Imágenes del producto';
  imagenesGaleria: ImagenGaleria[] = [];
  activeIndex = 0;
  numVisible = 5;
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  verProducto(producto: Producto) {
    this.ver.emit(producto);
  }

  actualizarProducto(producto: Producto) {
    this.editar.emit(producto);
  }

  cambiarEstado(producto: Producto, event: { checked: boolean }) {
    this.estado.emit({ id: producto.id, activo: event.checked });
  }

  cambiarPublicado(producto: Producto, event: { checked: boolean }) {
    this.publicado.emit({ id: producto.id, publicado: event.checked });
  }

  pedirConfirmacion(producto: Producto, event?: MouseEvent) {
    event?.stopPropagation();
    this.productoAEliminar = producto;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    if (!this.productoAEliminar) return;
    this.eliminar.emit(this.productoAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.productoAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.productoAEliminar ? `¿Seguro que deseas eliminar el producto "${this.productoAEliminar.nombre}"?` : '';
  }

  abrirGaleria(producto: Producto, index = 0) {
    if (!producto.urlsMultimedia?.length) return;
    this.imagenesGaleria = producto.urlsMultimedia.map((url, i) => ({
      src: url,
      alt: `${producto.nombre} ${i + 1}`,
    }));
    this.tituloGaleria = `Imágenes de ${producto.nombre}`;
    this.activeIndex = Math.min(index, this.imagenesGaleria.length - 1);
    this.numVisible = Math.min(this.imagenesGaleria.length, 5);
    this.mostrarGaleria = true;
  }
}