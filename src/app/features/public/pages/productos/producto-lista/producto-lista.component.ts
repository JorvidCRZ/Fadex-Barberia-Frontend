import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoCardComponent } from '../producto-card/producto-card.component';
import { Producto } from '../../../../../core/models/catalogos/productos.model';

@Component({
  standalone: true,
  selector: 'app-producto-lista',
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './producto-lista.html'
})
export class ProductoListaComponent {
  @Input() productos: Producto[] = [];
  @Output() verProducto = new EventEmitter<Producto>();

  trackById(_index: number, item: Producto) {
    return item.id;
  }

  verProductoDetalle(producto: Producto) {
    this.verProducto.emit(producto);
  }

  seleccionarProducto(producto: Producto): void {
    this.verProducto.emit(producto);
  }
}
