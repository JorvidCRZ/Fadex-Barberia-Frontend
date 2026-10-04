import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Component, Input, inject } from '@angular/core';
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
  styleUrls: ['./producto-card.scss'],
})
export class ProductoCardComponent {
  private readonly router = inject(Router);
  private readonly carritoService = inject(CarritoService);
  private readonly notificationService = inject(NotificationService);

  @Input() producto!: Producto;

  onVer(): void {
    if (this.producto) {this.router.navigate(['/productos/detalle', this.producto.id]);}
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
