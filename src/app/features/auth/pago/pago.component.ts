import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarritoService } from '../../../core/services/catalogos/carrito.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { SolesPipe } from '../../../shared/pipes/moneda.pipe';

type MetodoPago = 'TARJETA' | 'YAPE' | 'BANCA';

@Component({
  selector: 'app-pago',
  imports: [CommonModule, FormsModule, ButtonModule, SolesPipe],
  templateUrl: './pago.html',
})
export class PagoComponent {
  private readonly router = inject(Router);
  private readonly notify = inject(NotificationService);
  readonly carrito = inject(CarritoService);

  readonly metodoSeleccionado = signal<MetodoPago>('TARJETA');
  readonly procesando = signal(false);
  readonly compraCompletada = signal(false);

  readonly cantidadProductos = computed(() =>
    this.carrito.items().reduce((total, item) => total + item.cantidad, 0),
  );

  readonly metodos: { id: MetodoPago; nombre: string; icono: string }[] = [
    { id: 'TARJETA', nombre: 'Tarjeta débito / crédito', icono: 'pi-credit-card' },
    { id: 'YAPE', nombre: 'Yape', icono: 'pi-mobile' },
    { id: 'BANCA', nombre: 'Banca móvil o internet', icono: 'pi-building' },
  ];

  seleccionarMetodo(metodo: MetodoPago): void {
    this.metodoSeleccionado.set(metodo);
  }

  simularPago(): void {
    if (this.carrito.items().length === 0) {
      this.notify.showWarn('No hay productos para procesar');
      this.router.navigate(['/productos']);
      return;
    }

    this.procesando.set(true);
    setTimeout(() => {
      this.procesando.set(false);
      this.compraCompletada.set(true);
      this.carrito.vaciarCarrito();
      this.notify.showSuccess('Venta simulada correctamente');
    }, 700);
  }

  volverAlCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  volverAInicio(): void {
    this.router.navigate(['/']);
  }
}
