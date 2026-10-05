import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SolesPipe } from '../../../../../shared/pipes/moneda.pipe';
import { Producto } from '../../../../../core/models/catalogos/productos.model';
import { SafeImageUrlPipe } from '../../../../../shared/pipes/safe-image-url.pipe';
import { CarritoService } from '../../../../../core/services/catalogos/carrito.service';
import { NotificationService } from '../../../../../core/services/common/notification.service';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';

@Component({
  standalone: true,
  selector: 'app-producto-card',
  imports: [ButtonModule, CardModule, SolesPipe, SafeImageUrlPipe, StatusBadgeComponent],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.scss',
})
export class ProductoCardComponent {
  private readonly carritoService = inject(CarritoService);
  private readonly notificationService = inject(NotificationService);

  @Input() producto!: Producto;
  @Output() verProducto = new EventEmitter<Producto>();

  onVer(): void {
    if (this.producto) {
      this.verProducto.emit(this.producto);
    }
  }

  getImagenProducto(producto: Producto): string {
    return producto.urlsMultimedia?.length ? producto.urlsMultimedia[0] : '/assets/producto.webp';
  }
  
  agregarAlCarrito(): void {
    if (!this.producto) {return;}
    this.carritoService.agregarProducto(this.producto, 1);
    this.notificationService.showSuccess(`${this.producto.nombre} agregado al carrito`);
  }
}
