import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorState } from 'primeng/paginator';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';
import { formatearTexto } from '@/app/shared/utils/formatear-text.utils.component';
import { ReclamoResponse } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';

@Component({
  selector: 'app-reclamo-table',
  standalone: true,
  imports: [
    TableModule, DatePipe, ButtonComponent, ConfirmPopoverComponent, EmptyStateComponent,
    PaginatorComponent, StatusBadgeComponent, SolesPipe,
  ],
  templateUrl: './reclamo-table.html',
})
export class ReclamoTableComponent {
  @Output() actualizar = new EventEmitter<ReclamoResponse>();
  @Output() eliminar = new EventEmitter<ReclamoResponse>();
  @Output() ver = new EventEmitter<number>();
  @Output() limpiar = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<PaginatorState>();
  @Input({ required: true }) reclamos: ReclamoResponse[] = [];
  @Input() cargado = false;
  @Input() hayFiltros = false;
  @Input() first = 0;
  @Input() rows = 25;
  @Input() totalRecords = 0;

  formatearTexto = formatearTexto;
  mostrarConfirmacion = false;
  reclamoAEliminar: ReclamoResponse | null = null;

  verReclamo(reclamo: ReclamoResponse): void {
    this.ver.emit(reclamo.idReclamo);
  }

  actualizarReclamo(reclamo: ReclamoResponse): void {
    this.actualizar.emit(reclamo);
  }

  pedirConfirmacion(reclamo: ReclamoResponse, event?: MouseEvent): void {
    event?.stopPropagation();
    this.reclamoAEliminar = reclamo;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar(): void {
    if (!this.reclamoAEliminar) return;
    this.eliminar.emit(this.reclamoAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar(): void {
    this.mostrarConfirmacion = false;
    this.reclamoAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.reclamoAEliminar
      ? `¿Seguro que deseas eliminar el reclamo N° "${this.reclamoAEliminar.numeroReclamo}"?`
      : '';
  }
}