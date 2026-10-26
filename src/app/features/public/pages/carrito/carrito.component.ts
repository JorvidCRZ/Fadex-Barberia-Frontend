import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SafeImageUrlPipe } from '../../../../shared/pipes/safe-image-url.pipe';
import { SolesPipe } from '../../../../shared/pipes/moneda.pipe';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { TokenService } from '../../../../core/services/auth/token.service';
import { CarritoService, obtenerPrecio } from '../../../../core/services/catalogos/carrito.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { CarritoItem } from '@/app/core/models/catalogos/carrito.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, SafeImageUrlPipe, SolesPipe],

  templateUrl: './carrito.html'
})
export class CarritoComponent {

  private router = inject(Router);
  private notify = inject(NotificationService);
  private tokenService = inject(TokenService);
  private carritoService = inject(CarritoService);

  readonly items = this.carritoService.items;
  readonly subtotal = this.carritoService.subtotal;
  readonly total = this.carritoService.total;
  readonly cantidad = this.carritoService.cantidad;

  precioItem(item: CarritoItem): number {
    return obtenerPrecio(item.producto);
  }
  
  subtotalItem(item: CarritoItem): number {
    return item.cantidad * obtenerPrecio(item.producto);
  }

  procesarCompra(): void {
    if (!this.tokenService.isLogged()) {
      this.notify.showError('Debes iniciar sesión para continuar con la compra');
      this.router.navigate(['/productos']);
      return;
    }
    this.router.navigate(['/checkout']);
  }

  actualizarCantidad(index: number, cantidad: number): void {
    this.carritoService.actualizarCantidad(index, cantidad);
  }

  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index);
    this.notify.showSuccess('Producto eliminado del carrito');
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.notify.showSuccess('Carrito vaciado');
  }

  continuarCompra(): void {
    this.router.navigate(['/productos']);
  }

  verProducto(id: number): void {
    this.router.navigate(['/productos'], { queryParams: { productoId: id } });
  }
}