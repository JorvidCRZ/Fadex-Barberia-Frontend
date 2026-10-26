import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentaDetalle } from '../../../../../core/models/ventas/detalle.model';
import { Venta } from '../../../../../core/models/ventas/venta.model';

@Component({
  selector: 'app-venta-detalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './venta-detalle.html'
})
export class VentaDetalleComponent {

  @Input() detalles: VentaDetalle[] = [];

}