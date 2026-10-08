import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

/**
 * Variantes disponibles. Cada una usa la clase que YA existe en buttons.scss:
 * variant="primary"   →  class="boton-primary"
 * variant="ver-tabla" →  class="boton-ver-tabla"   ... y así.
 *
 * Usa <p-button> en modo [unstyled]: PrimeNG no aplica ningún estilo propio,
 * así que SOLO se ven tus clases boton-*. No hacen falta los selectores
 * `p-button.boton-X .p-button` por variante.
 */
export const BUTTON_VARIANTS = [
  // Generales
  'primary', 'secondary', 'ghost', 'danger', 'delete', 'warning', 'anular', 'submit', 'cancel',
  'ver', 'comprar', 'limpiar', 'approve', 'reject', 'google', 'agregar-texto', 'excel', 'pdf',
  // Tabla (cuadrados, solo icono)
  'tabla', 'editar-tabla', 'eliminar-tabla', 'ver-tabla', 'devolver-tabla', 'agregar',
  'accion-cita', 'accion-rojo', 'cierre',
  // Estados (tabla)
  'cerrar-tabla', 'close-tabla', 'close-aprobar', 'close-devolver', 'close-pagado',
  'close-preparando', 'close-enviado', 'close-entregado',
  // Confirmación
  'confirm-pagado', 'confirm-preparando', 'confirm-enviado', 'confirm-entregado',
  'primary', 'secondary', /* ...el resto igual... */ 'excel', 'pdf',
  'sidebar-toggle',      
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/** Variantes que usan el mixin boton-tabla (size-10): solo muestran el icono */
const SOLO_ICONO = new Set<ButtonVariant>([
  'sidebar-toggle',            // ← nueva
  'tabla', 'editar-tabla', 'eliminar-tabla', 'ver-tabla', 'devolver-tabla', 'agregar',
  'accion-cita', 'accion-rojo', 'cierre',
  'cerrar-tabla', 'close-tabla', 'close-aprobar', 'close-devolver', 'close-pagado',
  'close-preparando', 'close-enviado', 'close-entregado',
]);

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  host: {
    '[class.inline-flex]': '!fullWidth',
    '[class.flex]': 'fullWidth',
  },
  template: `
    <p-button
      [unstyled]="true"
      [type]="type"
      [styleClass]="clases"
      [disabled]="disabled || loading"
      [ariaLabel]="tooltip || label || undefined"
      [pTooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [class]="fullWidth ? 'flex w-full' : 'inline-flex'"
      (onClick)="alHacerClick($event)">
      @if (loading) {
        <i class="pi pi-spin pi-spinner"></i>
      } @else if (icon) {
        <i [class]="claseIcono"></i>
      }
      @if (!soloIcono && textoVisible) {
        <span>{{ textoVisible }}</span>
      }
    </p-button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  /** 'pi-save', 'pi pi-save' o 'save' */
  @Input() icon?: string;
  @Input() label?: string;
  /** Texto mientras loading = true (si no se pasa, se mantiene label) */
  @Input() loadingLabel?: string;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() tooltip?: string;
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  /** 'sm' = botón compacto (clase boton-sm). No aplica a variantes solo-icono */
  @Input() size: 'md' | 'sm' = 'md';
  /** Ocupa todo el ancho (y quita el scale del hover para que no se salga del contenedor) */
  @Input() fullWidth = false;
  /** Clases extra de Tailwind, ej: "mt-2" */
  @Input() styleClass = '';

  /** Se emite solo si el botón no está deshabilitado ni cargando */
  @Output() clicked = new EventEmitter<MouseEvent>();

  get soloIcono(): boolean {
    return SOLO_ICONO.has(this.variant);
  }

  get textoVisible(): string | undefined {
    return this.loading ? (this.loadingLabel ?? this.label) : this.label;
  }

  get claseIcono(): string {
    const nombre = (this.icon ?? '').replace(/^pi\s+/, '').trim();
    return `pi ${nombre.startsWith('pi-') ? nombre : 'pi-' + nombre}`;
  }

  get clases(): string {
    return [
      `boton-${this.variant}`,
      this.soloIcono ? '' : 'gap-2',
      !this.soloIcono && this.size === 'sm' ? 'boton-sm' : '',
      this.fullWidth ? 'w-full hover:scale-100' : '',
      this.styleClass,
    ].filter(Boolean).join(' ');
  }

  alHacerClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;
    this.clicked.emit(event);
  }
}