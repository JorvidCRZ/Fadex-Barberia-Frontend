import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Movimiento } from '../../../core/models/fidelizacion/movimiento.model';
import { MovimientoItemComponent } from './movimiento-item.component';

/**
 * Timeline de movimientos con estados de carga / vacío.
 *
 * Uso:
 *   <app-movimientos-lista [movimientos]="movimientosDe(t)" [cargando]="estaCargando(t)" />
 *   <app-movimientos-lista [movimientos]="grupo.items" formatoFecha="hora" fondo="oscuro" scrollClass="" />
 */
@Component({
  standalone: true,
  selector: 'app-movimientos-lista',
  imports: [NgClass, MovimientoItemComponent],
  template: `
    @if (cargando) {
      <div class="flex items-center justify-center gap-2 py-6 text-xs text-text-muted">
        <i class="pi pi-spin pi-spinner"></i> Cargando movimientos...
      </div>
    } @else if (movimientos.length === 0) {
      <p class="py-6 text-center text-xs text-text-muted">{{ textoVacio }}</p>
    } @else {
      <div class="relative flex flex-col gap-3 pl-1" [ngClass]="scrollClass">
        <div class="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-brand-gold/40 via-white/10 to-transparent"></div>
        @for (m of movimientos; track m.id) {
          <app-movimiento-item [movimiento]="m" [formatoFecha]="formatoFecha" [fondo]="fondo" />
        }
      </div>
    }
  `,
})
export class MovimientosListaComponent {
  @Input({ required: true }) movimientos: Movimiento[] = [];
  @Input() cargando = false;
  @Input() textoVacio = 'Sin movimientos registrados.';
  @Input() formatoFecha: 'hora' | 'completa' = 'completa';
  @Input() fondo: 'card' | 'oscuro' = 'card';
  /** Clases del contenedor con scroll. Pasar '' para desactivarlo */
  @Input() scrollClass = 'max-h-72 overflow-y-auto pr-1';
}