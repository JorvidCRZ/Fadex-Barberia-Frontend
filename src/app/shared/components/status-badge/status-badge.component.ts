import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeTone, tonoDeEstado } from '../../../core/config/status-badge.config';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule],
  template: `<span [ngClass]="badgeClass">{{ label }}</span>`,
})
export class StatusBadgeComponent {
  @Input({ required: true }) value!: boolean | string | number;
  @Input() type: 'boolean' | 'text' | 'range' | 'array' | 'category' = 'boolean';
  @Input() trueLabel: string = 'Activo';
  @Input() falseLabel: string = 'Inactivo';
  @Input() warningLimit: number = 10;
  /** Fuerza el color, sin importar el valor. Ej: tone="danger" */
  @Input() tone?: BadgeTone;
  /** Se mantiene por compatibilidad: si se pasa, reemplaza todo el estilo */
  @Input() customClass?: string;
  /** 'PENDIENTE_PAGO' → 'PENDIENTE PAGO'. Poner false para mostrar el valor tal cual */
  @Input() humanize = true;

  get label(): string {
    if (this.type === 'boolean') {
      return Boolean(this.value) ? this.trueLabel : this.falseLabel;
    }
    const texto = String(this.value);
    return this.humanize ? texto.replace(/_/g, ' ') : texto;
  }

  get badgeClass(): string {
    return this.customClass ?? `badge-${this.tono}`;
  }

  private get tono(): BadgeTone {
    if (this.tone) return this.tone;

    switch (this.type) {
      case 'boolean':
        return Boolean(this.value) ? 'success' : 'danger';

      case 'array':
        return 'info';

      case 'range': {
        const num = Number(this.value);
        if (num === 0) return 'danger';
        return num <= this.warningLimit ? 'warning' : 'success';
      }

      // 'text' y 'category': el color sale del valor (ver status-badge.config.ts)
      default:
        return tonoDeEstado(this.value);
    }
  }
}