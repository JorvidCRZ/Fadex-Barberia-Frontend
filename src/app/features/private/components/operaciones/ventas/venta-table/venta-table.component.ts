import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Venta } from '@/app/core/models/ventas/venta.model';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';

@Component({
  selector: 'app-venta-table',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmPopoverComponent],
  templateUrl: './venta-table.html',
  styleUrls: ['./venta-table.css']
})
export class VentaTableComponent {

  @Input() ventas: Venta[] = [];
  @Input() rows = 10;

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