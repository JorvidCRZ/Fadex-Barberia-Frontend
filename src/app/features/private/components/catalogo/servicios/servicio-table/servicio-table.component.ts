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
import { Servicio } from '@/app/core/models/catalogos/servicios.model';

interface ImagenGaleria { src: string; alt: string; }

@Component({
  selector: 'app-servicio-table',
  standalone: true,
  imports: [
    TableModule, ToggleSwitchModule, ImageModule, GalleriaModule, FormsModule,
    ButtonComponent, ConfirmPopoverComponent, EmptyStateComponent, ModalComponent,
    PaginatorComponent, StatusBadgeComponent, SafeImageUrlPipe, SolesPipe,
  ],
  templateUrl: './servicio-table.html'
})
export class ServicioTableComponent {
  @Output() editar = new EventEmitter<Servicio>();
  @Output() eliminar = new EventEmitter<Servicio>();
  @Output() estado = new EventEmitter<{ id: number, activo: boolean }>();
  @Output() publicado = new EventEmitter<{ id: number, publicado: boolean }>();
  /** Se emite desde el estado vacío cuando hay filtros activos */
  @Output() limpiar = new EventEmitter<void>();
  /** Cambio de página o de filas por página en el paginador */
  @Output() pageChange = new EventEmitter<PaginatorState>();
  @Input({ required: true }) servicios: Servicio[] = [];
  @Input() cargado = false;
  /** Cambia el mensaje del estado vacío y muestra el botón "Limpiar filtros" */
  @Input() hayFiltros = false;
  @Input() first = 0;
  @Input() rows = 25;
  @Input() totalRecords = 0;

  mostrarConfirmacion = false;
  servicioAEliminar: Servicio | null = null;

  mostrarGaleria = false;
  tituloGaleria = 'Imágenes del servicio';
  imagenesGaleria: ImagenGaleria[] = [];
  activeIndex = 0;
  numVisible = 5;
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  editarServicio(servicio: Servicio) {
    this.editar.emit(servicio);
  }

  cambiarEstado(servicio: Servicio, event: { checked: boolean }) {
    this.estado.emit({ id: servicio.servicioId, activo: event.checked });
  }

  cambiarPublicado(servicio: Servicio, event: { checked: boolean }) {
    this.publicado.emit({ id: servicio.servicioId, publicado: event.checked });
  }

  pedirConfirmacion(servicio: Servicio, event?: MouseEvent) {
    event?.stopPropagation();
    this.servicioAEliminar = servicio;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    if (!this.servicioAEliminar) return;
    this.eliminar.emit(this.servicioAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.servicioAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.servicioAEliminar ? `¿Seguro que deseas eliminar el servicio "${this.servicioAEliminar.nombre}"?` : '';
  }

  abrirGaleria(servicio: Servicio, index = 0) {
    if (!servicio.urlsMultimedia?.length) return;
    this.imagenesGaleria = servicio.urlsMultimedia.map((url, i) => ({
      src: url,
      alt: `${servicio.nombre} ${i + 1}`,
    }));
    this.tituloGaleria = `Imágenes de ${servicio.nombre}`;
    this.activeIndex = Math.min(index, this.imagenesGaleria.length - 1);
    this.numVisible = Math.min(this.imagenesGaleria.length, 5);
    this.mostrarGaleria = true;
  }
}