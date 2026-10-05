import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DrawerModule } from 'primeng/drawer';
import { CheckboxModule } from 'primeng/checkbox';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MonedaPipe } from '../../pipes/moneda.pipe';
import { SafeImageUrlPipe } from '../../pipes/safe-image-url.pipe';
import { CarritoItem } from '../../../core/models/catalogos/carrito.model';
import { CarritoService, obtenerPrecio } from '../../../core/services/catalogos/carrito.service';
import { TipoMultimedia } from '../../../core/models/catalogos/productos.model';

@Component({
  selector: 'app-boton-carrito',
  standalone: true,
  imports: [ CommonModule, FormsModule, ButtonModule, InputNumberModule, DrawerModule, MonedaPipe,
    SafeImageUrlPipe, CheckboxModule, RouterLink,],
  templateUrl: './boton-carrito.html',
  styleUrl: './boton-carrito.scss',
})
export class BotonCarritoComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly carritoService = inject(CarritoService);

  readonly items = this.carritoService.items;
  readonly subtotal = this.carritoService.subtotal;
  readonly cantidad = this.carritoService.cantidad;
  readonly rutaActual = signal(this.router.url);
  readonly mostrarBadge = computed(() => !this.rutaActual().startsWith('/carrito'));

  visible = false;
  incluirEnvio = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => this.rutaActual.set(event.urlAfterRedirects));
  }

  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index);
  }

  actualizarCantidad(index: number, cantidad: number): void {
    this.carritoService.actualizarCantidad(index, cantidad);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

  obtenerSubtotalItem(item: CarritoItem): number {
    return item.cantidad * obtenerPrecio(item.producto);
  }

  obtenerImagen(item: CarritoItem): string | undefined {
    return item.producto.multimedia?.find((media) => media.tipo === TipoMultimedia.IMAGEN)?.url
      ?? item.producto.multimedia?.[0]?.url
      ?? item.producto.urlsMultimedia?.[0];
  }

  get costoEnvio(): number {
    return 0;
  }

  obtenerTotal(): number {
    return this.subtotal() + this.costoEnvio;
  }

  irDetalleProducto(item: CarritoItem): void {
    this.visible = false;
    void this.router.navigate(['/productos'], { queryParams: { productoId: item.producto.id } });
  }
}
