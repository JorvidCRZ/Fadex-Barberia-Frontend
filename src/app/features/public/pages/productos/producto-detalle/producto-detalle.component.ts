import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { SafeImageUrlPipe } from '../../../../../shared/pipes/safe-image-url.pipe';
import { SolesPipe } from '../../../../../shared/pipes/moneda.pipe';
import {
  CarritoService,
  obtenerPrecio,
} from '../../../../../core/services/catalogos/carrito.service';
import { NotificationService } from '../../../../../core/services/common/notification.service';
import { INVENTARIO_CONFIG } from '../../../../../core/config/valores.config';
import { Producto } from '../../../../../core/models/catalogos/productos.model';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';

@Component({
  standalone: true,
  selector: 'app-producto-detalle',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputNumberModule,
    SafeImageUrlPipe,
    StatusBadgeComponent,
    ImageModule,
    SolesPipe,
  ],
  templateUrl: './producto-detalle.html',
})
export class ProductoDetalleComponent implements OnChanges {
  private readonly router = inject(Router);
  private readonly carritoService = inject(CarritoService);
  private readonly notificationService = inject(NotificationService);

  readonly moneda = INVENTARIO_CONFIG.MONEDA;

  @Input() producto: Producto | null = null;
  @Input() cargando = false;
  @Output() cerrar = new EventEmitter<void>();

  cantidad = 1;
  imagenSeleccionada = '/assets/producto.webp';
  images: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.imagenSeleccionada = this.obtenerImagenPrincipal(this.producto);
      this.images = (this.producto.urlsMultimedia ?? []).map((u: string) => ({
        itemImageSrc: u,
        thumbnailImageSrc: u,
      }));
    }
    this.cantidad = 1;
  }

  obtenerImagenPrincipal(producto: Producto): string {
    return producto.urlsMultimedia?.length ? producto.urlsMultimedia[0] : '/assets/producto.webp';
  }

  seleccionarImagen(url: string): void {
    this.imagenSeleccionada = url;
  }

  get cantidadMaxima(): number {
    return this.producto?.stock ?? 1;
  }

  get subtotal(): number {
    return (this.producto ? obtenerPrecio(this.producto) : 0) * Math.max(1, this.cantidad || 1);
  }

  comprarAhora(): void {
    this.agregarAlCarrito();
    this.irCarrito();
  }

  agregarAlCarrito(): void {
    if (!this.producto) {
      return;
    }

    const cantidadNormalizada = Math.min(
      Math.max(1, Math.floor(this.cantidad || 1)),
      Math.max(1, this.producto.stock),
    );
    this.carritoService.agregarProducto(this.producto, cantidadNormalizada);
    this.notificationService.showSuccess(`${this.producto.nombre} agregado al carrito`);
  }

  irCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
