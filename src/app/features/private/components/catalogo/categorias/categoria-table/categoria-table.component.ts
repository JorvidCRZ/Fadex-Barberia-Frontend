import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { CategoriaTreeComponent } from '../categoria-tree/categoria-tree.component';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';

@Component({
  selector: 'app-categoria-table',
  standalone: true,
  imports: [
    TableModule, ToggleSwitchModule, TooltipModule, FormsModule,
    ButtonComponent, ConfirmPopoverComponent, EmptyStateComponent, PaginatorComponent, StatusBadgeComponent,
    CategoriaTreeComponent,
  ],
  templateUrl: './categoria-table.html'
})
export class CategoriaTableComponent {
  @Output() editar = new EventEmitter<Categoria>();
  @Output() eliminar = new EventEmitter<Categoria>();
  @Output() estado = new EventEmitter<{ id: number, activo: boolean }>();
  /** Se emite desde el estado vacío cuando hay filtros activos */
  @Output() limpiar = new EventEmitter<void>();
  /** Cambio de página o de filas por página en el paginador */
  @Output() pageChange = new EventEmitter<PaginatorState>();
  @Input({ required: true }) categorias: Categoria[] = [];
  @Input() cargado = false;
  /** Cambia el mensaje del estado vacío y muestra el botón "Limpiar filtros" */
  @Input() hayFiltros = false;
  @Input() first = 0;
  @Input() rows = 25;
  @Input() totalRecords = 0;

  mostrarConfirmacion = false;
  categoriaAEliminar: Categoria | null = null;

  actualizarCategoria(categoria: Categoria) {
    this.editar.emit(categoria);
  }

  pedirConfirmacion(categoria: Categoria, event?: MouseEvent) {
    event?.stopPropagation();
    this.categoriaAEliminar = categoria;
    this.mostrarConfirmacion = true;
  }

  cambiarEstado(categoria: Categoria, event: { checked: boolean }) {
    this.estado.emit({ id: categoria.id, activo: event.checked });
  }

  handleTreeEstado(event: { id: number, activo: boolean }) {
    this.estado.emit(event);
  }

  eliminarDesdeTree(categoria: Categoria) {
    this.pedirConfirmacion(categoria);
  }

  confirmarEliminar() {
    if (!this.categoriaAEliminar) return;
    this.eliminar.emit(this.categoriaAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.categoriaAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.categoriaAEliminar ? `¿Seguro que deseas eliminar la categoría "${this.categoriaAEliminar.nombre}"?` : '';
  }
}