import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { finalize } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Reserva } from '../../../core/models/operaciones/Reserva.model';
import { CarritoService } from '../../../core/services/catalogos/carrito.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { ReservaService } from '../../../core/services/operaciones/reserva.service';
import { SolesPipe } from '../../../shared/pipes/moneda.pipe';

type MetodoPago = 'TARJETA' | 'YAPE' | 'BANCA';

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
  private readonly http = inject(HttpClient);
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

  // ---------- Formulario de tarjeta ----------
  readonly numeroTarjeta = signal('');
  readonly vencimiento = signal('');
  readonly cvv = signal('');
  readonly correo = signal('');
  /** Se activa al pulsar "Pagar" con datos incompletos */
  readonly mostrarErrores = signal(false);

  readonly errores = computed(() => {
    const numero = this.numeroTarjeta().replace(/\s/g, '');
    const venc = this.vencimiento();
    const cvv = this.cvv();
    const correo = this.correo().trim();

    return {
      numero: !numero
        ? 'Ingresa el número de tarjeta'
        : numero.length !== 16
          ? 'El número debe tener 16 dígitos'
          : null,
      vencimiento: !venc
        ? 'Ingresa el vencimiento'
        : !this.vencimientoValido(venc)
          ? 'Fecha inválida o tarjeta vencida'
          : null,
      cvv: !cvv ? 'Ingresa el código' : cvv.length < 3 ? 'Debe tener 3 o 4 dígitos' : null,
      correo: !correo
        ? 'Ingresa tu correo'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
          ? 'Correo no válido'
          : null,
    };
  });

  readonly formularioValido = computed(() => {
    const e = this.errores();
    return !e.numero && !e.vencimiento && !e.cvv && !e.correo;
  });

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
    this.mostrarErrores.set(false);
  }

  // ---------- Handlers de los inputs (formatean mientras escribes) ----------
  onNumeroTarjeta(event: Event): void {
    const el = event.target as HTMLInputElement;
    const digitos = el.value.replace(/\D/g, '').slice(0, 16);
    const formateado = digitos.replace(/(.{4})/g, '$1 ').trim();
    el.value = formateado;
    this.numeroTarjeta.set(formateado);
  }

  onVencimiento(event: Event): void {
    const el = event.target as HTMLInputElement;
    const digitos = el.value.replace(/\D/g, '').slice(0, 4);
    const formateado = digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
    el.value = formateado;
    this.vencimiento.set(formateado);
  }

  onCvv(event: Event): void {
    const el = event.target as HTMLInputElement;
    const digitos = el.value.replace(/\D/g, '').slice(0, 4);
    el.value = digitos;
    this.cvv.set(digitos);
  }

  onCorreo(event: Event): void {
    this.correo.set((event.target as HTMLInputElement).value);
  }

  private vencimientoValido(valor: string): boolean {
    const m = /^(\d{2})\/(\d{2})$/.exec(valor);
    if (!m) return false;
    const mes = +m[1];
    const anio = 2000 + +m[2];
    if (mes < 1 || mes > 12) return false;
    // Válida hasta el último día del mes de vencimiento
    const finDeMes = new Date(anio, mes, 0, 23, 59, 59);
    return finDeMes.getTime() >= Date.now();
  }

  // ---------- Pago ----------
  pagar(): void {
    if (this.metodoSeleccionado() === 'TARJETA' && !this.formularioValido()) {
      this.mostrarErrores.set(true);
      this.notify.showWarn('Completa correctamente los datos de la tarjeta');
      return;
    }

    if (this.esReserva) {
      this.pagarReserva();
    } else {
      this.pagarCarrito();
    }
  }

  private pagarCarrito(): void {
    if (this.carrito.items().length === 0) {
      this.notify.showWarn('No hay productos para procesar');
      this.router.navigate(['/productos']);
      return;
    }

    const metodo = this.metodoSeleccionado();
    const payload = {
      metodoPago: metodo === 'BANCA' ? 'TRANSFERENCIA' : metodo,
      items: this.carrito.items().map((i) => ({
        productoId: i.producto.id,
        cantidad: i.cantidad,
      })),
    };

    this.procesando.set(true);
    this.http.post(`${environment.apiUrl}/checkout`, payload).subscribe({
      next: () => {
        this.procesando.set(false);
        this.carrito.vaciarCarrito();
        this.notify.showSuccess('Compra realizada correctamente');
        this.router.navigate(['/mi-cuenta/compras']);
      },
      error: (err) => {
        this.procesando.set(false);
        this.notify.showHttpError(err);
      },
    });
  }

  private pagarReserva(): void {
    if (!this.reserva()) {
      this.notify.showWarn('La reserva aún no está cargada');
      return;
    }

    const metodo = this.metodoSeleccionado();
    const payload = {
      reservaId: Number(this.reservaId),
      metodoPago: metodo === 'BANCA' ? 'TRANSFERENCIA' : metodo,
    };

    this.procesando.set(true);
    this.http
      .post(`${environment.apiUrl}/checkout/reserva`, payload)
      .pipe(finalize(() => this.procesando.set(false)))
      .subscribe({
        next: () => {
          this.compraCompletada.set(true);
          this.notify.showSuccess('Reserva pagada correctamente');
        },
        error: (err) => {
          this.notify.showHttpError(err);
          // 400 = ya no está pendiente de pago, 404 = no es tu reserva o no existe
          if (err.status === 400 || err.status === 404) {
            this.router.navigate(['/mi-cuenta/reservas/mis-reservas']);
          }
        },
      });
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