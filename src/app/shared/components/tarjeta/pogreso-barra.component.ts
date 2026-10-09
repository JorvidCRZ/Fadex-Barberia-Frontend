import { Component, Input } from '@angular/core';

/**
 * Barra de progreso dorada con brillo animado.
 * Reemplaza las copias que había en tarjeta-grafico (dashboard, admin y cliente).
 *
 * Uso:
 *   <app-progreso-barra [pct]="progresoPct(t)" />
 *   <app-progreso-barra [pct]="40" size="sm" />
 */
@Component({
    standalone: true,
    selector: 'app-progreso-barra',
    template: `
    <div
      class="barra-track"
      [class.barra-track--sm]="size === 'sm'"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="valor"
    >
      <div class="barra-fill" [style.width.%]="valor">
        <div class="barra-brillo"></div>
      </div>
    </div>
  `,
    styles: [
        `
      :host {
        display: block;
        width: 100%;
      }

      .barra-track {
        position: relative;
        height: 0.5rem;
        overflow: hidden;
        border-radius: 999px;
        background: rgb(var(--color-brand-gold) / 0.14);
        border: 1px solid rgb(var(--color-brand-gold) / 0.25);
      }
      .barra-track--sm {
        height: 0.375rem;
      }

      .barra-fill {
        position: relative;
        height: 100%;
        overflow: hidden;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          #8a6a15,
          rgb(var(--color-brand-gold)),
          rgb(var(--color-brand-gold-hover))
        );
        transition: width 0.7s ease;
      }

      .barra-brillo {
        position: absolute;
        inset: 0;
        width: 33%;
        background: rgb(255 255 255 / 0.25);
        animation: shine 2.2s ease-in-out infinite;
      }

      @keyframes shine {
        0% {
          transform: translateX(-120%) skewX(-20deg);
        }
        100% {
          transform: translateX(320%) skewX(-20deg);
        }
      }
    `,
    ],
})
export class ProgresoBarraComponent {
    /** 0–100 */
    @Input() pct = 0;
    @Input() size: 'md' | 'sm' = 'md';

    get valor(): number {
        return Math.min(Math.max(this.pct ?? 0, 0), 100);
    }
}
