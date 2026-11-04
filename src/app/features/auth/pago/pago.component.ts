import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

import { Reserva } from '../../../core/models/operaciones/Reserva.model';
import { CarritoService } from '../../../core/services/catalogos/carrito.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { ReservaService } from '../../../core/services/operaciones/reserva.service';
import { SolesPipe } from '../../../shared/pipes/moneda.pipe';

type MetodoPago = 'TARJETA' | 'YAPE' | 'TRANSFERENCIA';
type CampoPago = 'numeroTarjeta' | 'vencimiento' | 'cvv' | 'correoPago';

interface PagoForm {
  numeroTarjeta: string;
  vencimiento: string;
  cvv: string;
  correoPago: string;
}

@Component({
  selector: 'app-pago',
  imports: [CommonModule, FormsModule, ButtonModule, SolesPipe],
  templateUrl: './pago.html',
})
export class PagoComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notify = inject(NotificationService);
  private readonly reservaService = inject(ReservaService);
  readonly carrito = inject(CarritoService);

  // Si la URL trae :reservaId (/mi-cuenta/pago/12) se paga una reserva; si no, el carrito
  readonly reservaId = this.route.snapshot.paramMap.get('reservaId');
  readonly esReserva = !!this.reservaId;

  readonly metodoSeleccionado = signal<MetodoPago>('TARJETA');
  readonly procesando = signal(false);
  readonly compraCompletada = signal(false);

  // Datos de la reserva a pagar
  readonly reserva = signal<Reserva | null>(null);
  readonly cargandoReserva = signal(false);

  readonly cantidadProductos = computed(() =>
    this.carrito.items().reduce((total, item) => total + item.cantidad, 0),
  );

  readonly cantidadTexto = computed(() =>
    this.esReserva ? '1 servicio' : `${this.cantidadProductos()} producto(s)`,
  );

  readonly total = computed(() =>
    this.esReserva ? (this.reserva()?.total ?? 0) : this.carrito.total(),
  );

  readonly metodos: { id: MetodoPago; nombre: string; icono: string }[] = [
    { id: 'TARJETA', nombre: 'Tarjeta débito / crédito', icono: 'pi-credit-card' },
    { id: 'YAPE', nombre: 'Yape', icono: 'pi-mobile' },
    { id: 'BANCA', nombre: 'Banca móvil o internet', icono: 'pi-building' },
  ];

  ngOnInit(): void {
    if (this.esReserva) {
      this.cargarReserva();
    }
  }

  private cargarReserva(): void {
    this.cargandoReserva.set(true);

    // Se busca entre las reservas del cliente (usa el método que ya existe en tu servicio)
    this.reservaService
      .getMisReservas(0, 200)
      .pipe(finalize(() => this.cargandoReserva.set(false)))
      .subscribe({
        next: (response) => {
          const encontrada = response.data?.content.find(
            (r) => String(r.reservaId ?? r.id) === this.reservaId,
          );

          if (!encontrada) {
            this.notify.showWarn('No se encontró la reserva a pagar');
            this.router.navigate(['/mi-cuenta/reservas/mis-reservas']);
            return;
          }

          this.reserva.set(encontrada);
        },
        error: (err) => {
          console.error('Error cargando la reserva:', err);
          this.notify.showHttpError(err);
          this.router.navigate(['/mi-cuenta/reservas/mis-reservas']);
        },
      });
  }

  seleccionarMetodo(metodo: MetodoPago): void {
    this.metodoSeleccionado.set(metodo);
  }

  simularPago(): void {
    if (this.esReserva) {
      this.simularPagoReserva();
    } else {
      this.simularPagoCarrito();
    }
  }

  private simularPagoCarrito(): void {
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

  private simularPagoReserva(): void {
    if (!this.reserva()) {
      this.notify.showWarn('La reserva aún no está cargada');
      return;
    }

    this.procesando.set(true);
    setTimeout(() => {
      // TODO: cuando tengas el endpoint, reemplazar por la llamada real,
      // ej: this.reservaService.pagarReserva(this.reservaId!).subscribe(...)
      this.procesando.set(false);
      this.compraCompletada.set(true);
      this.notify.showSuccess('Reserva pagada correctamente');
    }, 700);
  }

  volverAlCheckout(): void {
    this.router.navigate(
      this.esReserva ? ['/mi-cuenta/reservas/mis-reservas'] : ['/checkout'],
    );
  }

  volverAInicio(): void {
    this.router.navigate(
      this.esReserva ? ['/mi-cuenta/reservas/mis-reservas'] : ['/'],
    );
  }
}