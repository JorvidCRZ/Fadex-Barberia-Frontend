import { NgClass } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

export type EmptyStateTipo = 'vacio' | 'cargando' | 'error';

/**
 * Estado vacío / cargando / error con icono + mensaje (+ acción opcional dentro de la etiqueta).
 *
 *   <app-empty-state icono="ticket" mensaje="Aún no tienes giros." detalle="Aparecerán aquí." />
 *   <app-empty-state tipo="cargando" mensaje="Cargando tarjetas..." />
 *   <app-empty-state tipo="error" [mensaje]="error">
 *     <app-button variant="secondary" size="sm" icon="refresh" label="Reintentar" (clicked)="cargar()" />
 *   </app-empty-state>
 *
 * [boxed]="true" lo dibuja como tarjeta con borde punteado (para pantallas completas).
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="flex flex-col items-center justify-center gap-2 text-center" [ngClass]="contenedor">
      <i [class]="claseIcono" [ngClass]="colorIcono" aria-hidden="true"></i>
      <p class="m-0 text-sm" [ngClass]="colorTexto">{{ mensaje }}</p>
      @if (detalle) {
        <small class="text-xs text-text-subtle">{{ detalle }}</small>
      }
      <ng-content />
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() tipo: EmptyStateTipo = 'vacio';
  /** 'ticket', 'pi-ticket' o 'pi pi-ticket'. Solo aplica al tipo 'vacio' */
  @Input() icono = 'pi-inbox';
  @Input() mensaje = '';
  @Input() detalle?: string;
  @Input({ transform: booleanAttribute }) boxed = false;

  get claseIcono(): string {
    if (this.tipo === 'cargando') return 'pi pi-spin pi-spinner text-2xl';
    if (this.tipo === 'error') return 'pi pi-exclamation-triangle text-2xl';
    const nombre = (this.icono ?? '').replace(/^pi\s+/, '').trim() || 'pi-inbox';
    return `pi ${nombre.startsWith('pi-') ? nombre : 'pi-' + nombre} text-2xl`;
  }

  get colorIcono(): string {
    return this.tipo === 'error' ? 'text-brand-red' : 'text-text-muted opacity-60';
  }

  get colorTexto(): string {
    return this.tipo === 'error' ? 'text-brand-red' : 'text-text-secondary';
  }

  get contenedor(): string {
    if (!this.boxed) return 'py-8';
    const borde = this.tipo === 'error' ? 'border-brand-red/40' : 'border-white/10';
    return `rounded-2xl border border-dashed bg-ui-card px-5 py-16 ${borde}`;
  }
}