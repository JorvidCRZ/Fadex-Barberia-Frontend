import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { RuletaItemResponse } from '@/app/core/models/ruleta/ruleta-item.model';
import { environment } from '@/environments/environment.development';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { RuletaCategoriasComponent } from '../../ruleta-categoria/ruleta-categoria.component';

@Component({
  standalone: true,
  selector: 'app-ruleta-item-table',
  imports: [ButtonModule, CommonModule, TableModule, ConfirmPopoverComponent, FormsModule, StatusBadgeComponent, ImageModule, ToggleSwitchModule, SafeImageUrlPipe,RuletaCategoriasComponent],
  templateUrl: './ruleta-item-table.html',
  styleUrl: './ruleta-item-table.css',
})
export class RuletaItemTableComponent {
  @Output() editar = new EventEmitter<RuletaItemResponse>();
  @Output() eliminar = new EventEmitter<RuletaItemResponse>();
  @Output() estado = new EventEmitter<{ id: number; activo: boolean }>();
  @Input({ required: true }) items: RuletaItemResponse[] = [];
  @Input() cargado = false;
  @Input() icono: string = 'pi-gift';

  environment = environment.apiBaseUrl;
  mostrarConfirmacion = false;
  itemAEliminar: RuletaItemResponse | null = null;

  get itemsOrdenados(): RuletaItemResponse[] {
    return [...this.items].sort((a, b) => (a.ordenDisplay ?? 0) - (b.ordenDisplay ?? 0));
  }

  cambiarEstadoItem(item: RuletaItemResponse, event: { checked: boolean }) {
    this.estado.emit({ id: item.itemId, activo: event.checked });
  }

  pedirConfirmacion(item: RuletaItemResponse, event: MouseEvent) {
    event.stopPropagation();
    this.itemAEliminar = item;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    if (!this.itemAEliminar) return;
    this.eliminar.emit(this.itemAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.itemAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.itemAEliminar ? `¿Seguro que deseas eliminar el premio "${this.itemAEliminar.nombre}"?` : '';
  }
}