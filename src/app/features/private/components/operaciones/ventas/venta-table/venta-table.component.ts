import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { Venta } from '@/app/core/models/ventas/venta.model';
import { VentaDetalle } from '@/app/core/models/ventas/detalle.model';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';

@Component({
  selector: 'app-venta-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    ConfirmPopoverComponent,
    ButtonComponent,
    MonedaPipe
],
  templateUrl: './venta-table.html',
  styleUrls: ['./venta-table.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VentaTableComponent {

  @Input() ventas: Venta[] = [];
  @Input() cargado = false;
  @Input() totalRecords = 0;
  @Input() rows = 25;
  @Input() esAdmin = true;

  @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() eliminar = new EventEmitter<Venta>();
  @Output() descargarComprobante = new EventEmitter<Venta>();

  mostrarConfirmacion = false;
  mensajeConfirmacion = '';
  ventaAEliminar: Venta | null = null;
  mostrarDetalle = false;
  ventaDetalle: Venta | null = null;
  mostrarPago = false;
  ventaPago: Venta | null = null;

  verDetalle(venta: Venta): void {
    this.ventaDetalle = venta;
    this.mostrarDetalle = true;
  }

  verPago(venta: Venta): void {
    this.ventaPago = venta;
    this.mostrarPago = true;
  }

  subtotalDe(detalle: VentaDetalle): number {
    return detalle.subtotal != null
      ? Number(detalle.subtotal)
      : Number(detalle.precioUnitario) * Number(detalle.cantidad);
  }

  calcularTotal(venta: Venta): number {
    return (venta.detalles ?? []).reduce((acc, detalle) => acc + this.subtotalDe(detalle), 0);
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