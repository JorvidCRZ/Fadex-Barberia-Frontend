import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { FidelizacionTarjetaResponse } from '@/app/core/models/fidelizacion/tarjeta.model';

@Component({
  standalone: true,
  selector: 'app-tarjeta-table',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, ToggleSwitchModule, ConfirmPopoverComponent, StatusBadgeComponent],
  templateUrl: './tarjeta-table.html',
})
export class TarjetaTableComponent {
  @Input({ required: true }) tarjetas: FidelizacionTarjetaResponse[] = [];
  @Input() cargado = false;
  @Input() totalRecords = 0;
  @Input() rows = 20;
  @Input() metaPorCategoria = 10;
  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() estado = new EventEmitter<{ tarjeta: FidelizacionTarjetaResponse; campo: 'activo' | 'cicloActivo'; valor: boolean }>();
  @Output() eliminar = new EventEmitter<FidelizacionTarjetaResponse>();
  @Output() verPreview = new EventEmitter<FidelizacionTarjetaResponse>();

  mostrarConfirmacion = false;
  tarjetaAEliminar: FidelizacionTarjetaResponse | null = null;

  progresoPct(tarjeta: FidelizacionTarjetaResponse): number {
    if (!this.metaPorCategoria) return 0;
    return Math.min((tarjeta.progreso / this.metaPorCategoria) * 100, 100);
  }

  pedirConfirmacion(tarjeta: FidelizacionTarjetaResponse, event: MouseEvent): void {
    event.stopPropagation();
    this.tarjetaAEliminar = tarjeta;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar(): void {
    if (!this.tarjetaAEliminar) return;
    this.eliminar.emit(this.tarjetaAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar(): void {
    this.mostrarConfirmacion = false;
    this.tarjetaAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.tarjetaAEliminar ? `¿Seguro que deseas eliminar la tarjeta de "${this.tarjetaAEliminar.clienteNombreCompleto}" (${this.tarjetaAEliminar.clienteNombreCompleto})?` : '';
  }
}