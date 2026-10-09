import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfiguracionResponse } from '@/app/core/models/ruleta/ruleta-configuracion.model';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';

@Component({
  selector: 'app-configuracion-table',
  imports: [ButtonModule, CommonModule, TableModule, ConfirmPopoverComponent, ToggleSwitchModule, FormsModule , StatusBadgeComponent],
  templateUrl: './configuracion-table.html',
  styleUrl: './configuracion-table.scss',
})
export class ConfiguracionTableComponent {
  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() estado = new EventEmitter<{ id: number; activo: boolean }>();
  @Output() mostrar = new EventEmitter<{ id: number; mostrarSiempre: boolean; }>();
  @Output() crearTarjeta = new EventEmitter<{ id: number; crearTarjetaAutomatica: boolean; }>();
  @Output() editar = new EventEmitter<ConfiguracionResponse>();
  @Output() eliminar = new EventEmitter<ConfiguracionResponse>();
  @Input({ required: true }) configuraciones: ConfiguracionResponse[] = [];
  @Input() icono: string = 'pi-sliders-h';
  @Input() cargado = false;
  @Input() totalRecords = 0;
  @Input() rows = 25;

  mostrarConfirmacion = false;
  configuracionAEliminar: ConfiguracionResponse | null = null;

  editarConfiguracion(configuracion: ConfiguracionResponse) {
    this.editar.emit(configuracion);
  }

  cambiarEstadoConfiguracion(configuracion: ConfiguracionResponse, event: { checked: boolean }) {
    this.estado.emit({ id: configuracion.configuracionId, activo: event.checked });
  }

  cambiarMostrarSiempre(configuracion: ConfiguracionResponse, event: { checked: boolean }) {
    this.mostrar.emit({ id: configuracion.configuracionId, mostrarSiempre: event.checked });
  }

  cambiarCrearTarjetaAutomatica(configuracion: ConfiguracionResponse, event: { checked: boolean }) {
    this.crearTarjeta.emit({ id: configuracion.configuracionId, crearTarjetaAutomatica: event.checked });
  }

  pedirConfirmacion(configuracion: ConfiguracionResponse, event: MouseEvent) {
    event.stopPropagation();
    this.configuracionAEliminar = configuracion;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    if (!this.configuracionAEliminar) return;
    this.eliminar.emit(this.configuracionAEliminar);
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.configuracionAEliminar = null;
  }

  get mensajeConfirmacion(): string {
    return this.configuracionAEliminar ? `¿Seguro que deseas eliminar la configuración de "${this.configuracionAEliminar.categoriaNombre}"?` : '';
  }
}