import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Venta } from '@/app/core/models/ventas/venta.model';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component'; 

@Component({
  selector: 'app-venta-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ConfirmPopoverComponent 
  ],
  templateUrl: './venta-table.html',
  styleUrls: ['./venta-table.css'],
  encapsulation: ViewEncapsulation.None
})
export class VentaTableComponent {

  @Input() ventas: Venta[] = [];
  @Input() cargado = false;
  @Input() totalRecords = 0;
  @Input() rows = 25;

  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() eliminar = new EventEmitter<Venta>();

  mostrarConfirmacion = false;
  mensajeConfirmacion = '';
  ventaAEliminar: Venta | null = null;

  calcularTotal(venta: Venta): number {
    return (venta.detalles ?? []).reduce((acc, det) => {
      return acc + (Number(det.precioUnitario) * Number(det.cantidad));
    }, 0);
  }

  pedirConfirmacion(venta: Venta) {
    this.ventaAEliminar = venta;
    const identificador = venta.numeroCorrelativo || ('#' + venta.ventaId);
    this.mensajeConfirmacion = `¿Estás seguro de que deseas eliminar la venta ${identificador}? Esta acción es irreversible.`;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminar() {
    if (this.ventaAEliminar) {
      this.eliminar.emit(this.ventaAEliminar);
    }
    this.cancelarEliminar();
  }

  cancelarEliminar() {
    this.mostrarConfirmacion = false; 
    this.ventaAEliminar = null; 
  }
}