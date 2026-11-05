import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';

@Component({
  selector: 'app-categoria-tree',
  standalone: true,
  imports: [FormsModule, ToggleSwitchModule, ButtonComponent, StatusBadgeComponent],
  templateUrl: './categoria-tree.html'
})
export class CategoriaTreeComponent {
  @Input({ required: true }) categorias!: Categoria[];
  @Output() editar = new EventEmitter<Categoria>();
  @Output() eliminar = new EventEmitter<Categoria>();
  @Output() estado = new EventEmitter<{ id: number, activo: boolean }>();

  expandedMap: Record<number, boolean> = {};

  actualizarCategoria(categoria: Categoria) {
    this.editar.emit(categoria);
  }

  eliminarCategoria(categoria: Categoria) {
    this.eliminar.emit(categoria);
  }

  cambiarEstado(categoria: Categoria, event: { checked: boolean }) {
    this.estado.emit({ id: categoria.id, activo: event.checked });
  }

  toggleExpand(categoria: Categoria) {
    this.expandedMap[categoria.id] = !this.expandedMap[categoria.id];
  }

  isExpanded(categoria: Categoria): boolean {
    return !!this.expandedMap[categoria.id];
  }
}