import { NgClass, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movimiento, Origen } from '../../../core/models/fidelizacion/movimiento.model';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { DateFormatPipe } from '../../pipes/dat.pipe';

/**
 * Una fila del historial de movimientos (icono de origen + descripción + puntos).
 * Reemplaza las 3 copias que había en tarjeta-grafico (dashboard, admin y cliente).
 *
 * Uso:
 *   <app-movimiento-item [movimiento]="m" />
 *   <app-movimiento-item [movimiento]="m" formatoFecha="hora" fondo="oscuro" />
 */
@Component({
  standalone: true,
  selector: 'app-movimiento-item',
  imports: [NgClass, DatePipe, DateFormatPipe, StatusBadgeComponent],
  template: `
    <div class="relative flex items-center gap-3">
      <div
        class="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border"
        [ngClass]="esPositivo ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'"
      >
        <i class="pi text-xs" [ngClass]="[icono, esPositivo ? 'text-green-400' : 'text-red-400']"></i>
      </div>

      <div
        class="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-ui-border px-3 py-2 transition-colors hover:border-brand-gold/20"
        [ngClass]="fondo === 'oscuro' ? 'bg-black/20' : 'bg-ui-card'"
      >
        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-white">{{ movimiento.descripcion || label }}</p>
          <p class="mt-0.5 text-[11px] text-text-muted">
            @if (formatoFecha === 'hora') {
              {{ movimiento.createdAt | date: 'HH:mm' }}
            } @else {
              {{ movimiento.createdAt | dateHelper }}
            }
            · {{ label }}
          </p>
        </div>

        <app-status-badge
          type="text"
          [humanize]="false"
          [tone]="esPositivo ? 'success' : 'danger'"
          [value]="puntosTexto"
        />
      </div>
    </div>
  `,
})
export class MovimientoItemComponent {
  @Input({ required: true }) movimiento!: Movimiento;
  /** 'hora' = solo HH:mm (cuando ya hay un encabezado por día) · 'completa' = dd/MM/yyyy HH:mm */
  @Input() formatoFecha: 'hora' | 'completa' = 'completa';
  /** 'card' si el contenedor es oscuro, 'oscuro' si el contenedor es ui-card */
  @Input() fondo: 'card' | 'oscuro' = 'card';

  get esPositivo(): boolean {
    return this.movimiento.puntos >= 0;
  }

  get puntosTexto(): string {
    return `${this.esPositivo ? '+' : ''}${this.movimiento.puntos}`;
  }

  get icono(): string {
    switch (this.movimiento.origen) {
      case Origen.VENTA: return 'pi-shopping-cart';
      case Origen.RESERVA: return 'pi-calendar';
      case Origen.AJUSTE: return 'pi-sliders-h';
      default: return 'pi-circle';
    }
  }

  get label(): string {
    switch (this.movimiento.origen) {
      case Origen.VENTA: return 'Venta';
      case Origen.RESERVA: return 'Reserva';
      case Origen.AJUSTE: return 'Ajuste';
      default: return this.movimiento.origen;
    }
  }
}