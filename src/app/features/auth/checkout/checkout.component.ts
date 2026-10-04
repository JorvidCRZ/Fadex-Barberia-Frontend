import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { SolesPipe } from '../../../shared/pipes/moneda.pipe';
import { Venta } from '../../../core/models/ventas/venta.model';
import { Component, computed, inject, OnInit } from '@angular/core';
import { VentaService } from '../../../core/services/venta/venta.service';
import { SafeImageUrlPipe } from '../../../shared/pipes/safe-image-url.pipe';
import { CarritoService } from '../../../core/services/catalogos/carrito.service';
import { obtenerPrecio } from '../../../core/services/catalogos/carrito.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NotificationService } from '../../../core/services/common/notification.service';


@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [ CommonModule, ReactiveFormsModule, ButtonModule, SelectModule, MessageModule, TextareaModule, SolesPipe, SafeImageUrlPipe ],
  templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notify = inject(NotificationService);

  private ventaService = inject(VentaService);
  readonly carrito = inject(CarritoService);

  checkoutForm!: FormGroup;
  formSubmitted = false;

  readonly metodoEntregaOpciones = [
    {
      label: 'Recojo en tienda',
      value: 'RECOJO_TIENDA'
    }
  ];

  readonly metodoPagoOpciones = [
    {label: 'Pago en local',value: 'LOCAL'},
    {label: 'Pasarela de pago',value: 'PASARELA'}
  ];

  readonly cantidadProductos = computed(() =>
    this.carrito.items().reduce(
      (total, item) => total + item.cantidad,
      0
    )
  );

  ngOnInit(): void {
    this.checkoutForm = this.fb.nonNullable.group({
      metodoEntrega: ['RECOJO_TIENDA', Validators.required],
      metodoPago: ['PASARELA', Validators.required],
      observaciones: [''],
      notasCliente: ['']
    });
  }

  confirmarPedido(): void {
    this.formSubmitted = true;
    if (this.checkoutForm.invalid) {
      this.notify.showWarn('Complete los datos requeridos');
      return;
    }
    if (this.carrito.items().length === 0) {
      this.notify.showWarn('El carrito está vacío');
      return;
    }

    const request: Venta = {
      ventaId: 0,
      detalles: this.carrito.items().map(item => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
        precioUnitario: obtenerPrecio(item.producto)
      })),
      total: this.total
    };

    this.ventaService.crearVenta(request).subscribe({
      next: (resp) => {
        this.carrito.vaciarCarrito();
        this.notify.showSuccess('Pedido registrado correctamente');
        this.router.navigate(['/']);
      },
      error: (err) => this.notify.showHttpError(err)
    });
  }

  get subtotal(): number {
    return this.carrito.subtotal();
  }

  get costoEnvio(): number {
    return 0;
  }

  get total(): number {
    return this.subtotal;
  }

  obtenerSubtotalItem(item: { producto: Parameters<typeof obtenerPrecio>[0]; cantidad: number }): number {
    return item.cantidad * obtenerPrecio(item.producto);
  }
}