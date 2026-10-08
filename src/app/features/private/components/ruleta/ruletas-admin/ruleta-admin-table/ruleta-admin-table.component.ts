import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { RuletaFiltro, RuletaResponse } from '@/app/core/models/ruleta/ruleta.model';

@Component({
  selector: 'app-ruleta-admin-table',
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule, ConfirmPopoverComponent, TooltipModule, ToggleSwitchModule, FormsModule, StatusBadgeComponent],

  templateUrl: './ruleta-admin-table.html',
  styleUrl: './ruleta-admin-table.css',
})
export class RuletaAdminTableComponent {
  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() editar = new EventEmitter<RuletaResponse>();
  @Output() eliminar = new EventEmitter<RuletaResponse>();
  @Output() seleccionar = new EventEmitter<RuletaResponse>();
  @Output() estado = new EventEmitter<{ id: number; activo: boolean }>();
  @Input({ required: true }) ruletas: RuletaResponse[] = [];
  @Input() seleccionadaId: number | null = null;
  @Input() cargado = false;
  @Input() totalRecords = 0;
  @Input() rows = 20;

  filtro: Partial<RuletaFiltro> = {};
  mostrarConfirmacion = false;
  ruletaAEliminar: RuletaResponse | null = null;

  pedirConfirmacion(ruleta: RuletaResponse, event: MouseEvent) {
    event.stopPropagation();
    this.ruletaAEliminar = ruleta;
    this.mostrarConfirmacion = true;
  }

  cambiarEstadoRuleta(ruleta: RuletaResponse, event: { checked: boolean }) {
    this.estado.emit({ id: ruleta.ruletaId, activo: event.checked });
  }

  confirmarEliminar() {
    if (!this.ruletaAEliminar) return;
    this.eliminar.emit(this.ruletaAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.ruletaAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.ruletaAEliminar ? `¿Seguro que deseas eliminar la ruleta "${this.ruletaAEliminar.nombre}"?` : '';
  }

}