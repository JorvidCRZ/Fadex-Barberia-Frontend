import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { FidelizacionReglaResponse } from '@/app/core/models/fidelizacion/regla.model';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  standalone: true,
  selector: 'app-regla-table',
  imports: [ButtonModule, CommonModule, TableModule, ConfirmPopoverComponent, ToggleSwitchModule, FormsModule, StatusBadgeComponent, TooltipModule],
  templateUrl: './regla-table.html',
  styleUrl: './regla-table.css',
})
export class ReglaTableComponent {
  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() estado = new EventEmitter<{ id: number, activo: boolean }>();
  @Output() editar = new EventEmitter<FidelizacionReglaResponse>();
  @Output() eliminar = new EventEmitter<FidelizacionReglaResponse>();
  @Input({ required: true }) reglas: FidelizacionReglaResponse[] = [];
  @Input() icono: string = 'pi-percentage';
  @Input() cargado = false;
  @Input() totalRecords = 0;
  @Input() rows = 20;

  mostrarConfirmacion = false;
  reglaAEliminar: FidelizacionReglaResponse | null = null;

  alcance(regla: FidelizacionReglaResponse): string {
    if (regla.servicioId && regla.productoId) return `Servicio #${regla.servicioId} + Producto #${regla.productoId}`;
    if (regla.servicioId) return `Servicio #${regla.servicioId}`;
    if (regla.productoId) return `Producto #${regla.productoId}`;
    return 'Toda la categoría';
  }

  pedirConfirmacion(regla: FidelizacionReglaResponse, event: MouseEvent) {
    event.stopPropagation();
    this.reglaAEliminar = regla;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    if (!this.reglaAEliminar) return;
    this.eliminar.emit(this.reglaAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.reglaAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.reglaAEliminar ? `¿Seguro que deseas eliminar esta regla de fidelización?` : '';
  }
}