import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../../core/services/auth/token.service';
import { CarritoService } from '../../../core/services/catalogos/carrito.service';
import { NotificationService } from '../../../core/services/common/notification.service';
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
  private readonly notify = inject(NotificationService);
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  readonly carrito = inject(CarritoService);

  readonly metodoSeleccionado = signal<MetodoPago | 'BANCA'>('TARJETA');
  readonly procesando = signal(false);
  readonly compraCompletada = signal(false);

  readonly form: PagoForm = {
    numeroTarjeta: '',
    vencimiento: '',
    cvv: '',
    correoPago: '',
  };

  readonly camposTocados: Record<CampoPago, boolean> = {
    numeroTarjeta: false,
    vencimiento: false,
    cvv: false,
    correoPago: false,
  };

  readonly cantidadProductos = computed(() =>
    this.carrito.items().reduce((total, item) => total + item.cantidad, 0),
  );

  readonly metodos: { id: MetodoPago | 'BANCA'; nombre: string; icono: string }[] = [
    { id: 'TARJETA', nombre: 'Tarjeta débito / crédito', icono: 'pi-credit-card' },
    { id: 'YAPE', nombre: 'Yape', icono: 'pi-mobile' },
    { id: 'BANCA', nombre: 'Banca móvil o internet', icono: 'pi-building' },
  ];

  ngOnInit(): void {
    this.redirigirSiNoHaySesion();
  }

  seleccionarMetodo(metodo: MetodoPago | 'BANCA'): void {
    const mapped = metodo === 'BANCA' ? 'TRANSFERENCIA' : metodo;
    this.metodoSeleccionado.set(mapped as MetodoPago);
  }

  private redirigirSiNoHaySesion(): boolean {
    if (!this.tokenService.isLogged()) {
      const returnUrl = this.router.url || '/pago';
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
      return true;
    }
    return false;
  }

  private marcarTodosLosCamposComoTocados(): void {
    Object.keys(this.camposTocados).forEach((campo) => {
      this.camposTocados[campo as CampoPago] = true;
    });
  }

  private numeroTarjetaValida(): boolean {
    const limpio = this.form.numeroTarjeta.replace(/\D/g, '');
    return limpio.length === 16;
  }

  private vencimientoValido(): boolean {
    const valor = this.form.vencimiento.trim();
    const match = valor.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!match) return false;

    const mes = Number(match[1]);
    const anio = 2000 + Number(match[2]);
    const fechaExpira = new Date(anio, mes, 0, 23, 59, 59);
    const ahora = new Date();

    return fechaExpira >= ahora;
  }

  private cvvValido(): boolean {
    const limpio = this.form.cvv.replace(/\D/g, '');
    return /^[0-9]{3,4}$/.test(limpio);
  }

  private correoValido(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.correoPago.trim());
  }

  mostrarErrorCampo(campo: CampoPago): boolean {
    return !!this.camposTocados[campo] && !this.validarCampo(campo);
  }

  private validarCampo(campo: CampoPago): boolean {
    switch (campo) {
      case 'numeroTarjeta':
        return this.numeroTarjetaValida();
      case 'vencimiento':
        return this.vencimientoValido();
      case 'cvv':
        return this.cvvValido();
      case 'correoPago':
        return this.correoValido();
      default:
        return true;
    }
  }

  private validarFormulario(): boolean {
    if (this.metodoSeleccionado() !== 'TARJETA') {
      return true;
    }

    this.marcarTodosLosCamposComoTocados();

    return this.numeroTarjetaValida() && this.vencimientoValido() && this.cvvValido() && this.correoValido();
  }

  formatearNumeroTarjeta(): void {
    const limpio = this.form.numeroTarjeta.replace(/\D/g, '').slice(0, 16);
    this.form.numeroTarjeta = limpio.replace(/(.{4})/g, '$1 ').trim();
  }

  formatearVencimiento(): void {
    const limpio = this.form.vencimiento.replace(/\D/g, '').slice(0, 4);
    if (limpio.length <= 2) {
      this.form.vencimiento = limpio;
      return;
    }
    this.form.vencimiento = `${limpio.slice(0, 2)}/${limpio.slice(2)}`;
  }

  simularPago(): void {
    if (this.redirigirSiNoHaySesion()) {
      return;
    }

    if (this.carrito.items().length === 0) {
      this.notify.showWarn('No hay productos para procesar');
      this.router.navigate(['/productos']);
      return;
    }

    if (!this.validarFormulario()) {
      return;
    }

    const payload = {
      metodoPago: this.metodoSeleccionado(),
      items: this.carrito.items().map(item => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
      })),
    };

    this.procesando.set(true);
    this.http.post(`${environment.apiUrl}/checkout`, payload, { observe: 'response' }).subscribe({
      next: (response) => {
        this.procesando.set(false);

        if (response.status === 201) {
          this.compraCompletada.set(true);
          this.carrito.vaciarCarrito();
          this.notify.showSuccess('Venta simulada correctamente');
          this.router.navigate(['/mi-cuenta/historial']);
        }
      },
      error: (err) => {
        this.procesando.set(false);
        const message = err?.error?.message || 'No se pudo procesar la compra';

        if (err.status === 401) {
          this.tokenService.clearTokens();
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url || '/pago' } });
          return;
        }

        if (err.status === 403) {
          this.notify.showWarn('Solo los clientes pueden comprar.');
          return;
        }

        if (err.status === 400 || err.status === 404) {
          this.notify.showError(message);
          return;
        }

        this.notify.showHttpError(err, 'No se pudo completar la compra');
      },
    });
  }

  volverAlCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  volverAInicio(): void {
    this.router.navigate(['/']);
  }
}
