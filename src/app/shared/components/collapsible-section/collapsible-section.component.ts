import { Component, Input, model } from '@angular/core';

/**
 * Sección colapsable (tarjeta con cabecera clicable + chevron).
 *
 *   <app-collapsible-section titulo="Detalle por categoría" [(abierto)]="secciones.categoria" (toggled)="alAbrir($event)">
 *     ...contenido...
 *   </app-collapsible-section>
 *
 * Con icono: icono="history". Sin icono muestra un puntito dorado.
 */
@Component({
  selector: 'app-collapsible-section',
  standalone: true,
  template: `
    <section class="overflow-hidden rounded-2xl border border-white/[0.06] bg-ui-card">
      <button
        type="button"
        class="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-text-primary"
        [attr.aria-expanded]="abierto()"
        (click)="alternar()">
        <span class="flex items-center gap-2">
          @if (icono) {
            <i [class]="claseIcono" class="text-xs text-brand-gold"></i>
          } @else {
            <span class="h-2 w-2 rounded-full bg-brand-gold"></span>
          }
          {{ titulo }}
        </span>
        <i class="pi pi-chevron-down text-xs text-text-muted transition-transform duration-200" [class.rotate-180]="abierto()"></i>
      </button>

      @if (abierto()) {
        <div class="animate-fade-in px-5 pb-5">
          <ng-content />
        </div>
      }
    </section>
  `,
})
export class CollapsibleSectionComponent {
  @Input({ required: true }) titulo!: string;
  @Input() icono?: string;
  abierto = model(false);

  get claseIcono(): string {
    const nombre = (this.icono ?? '').replace(/^pi\s+/, '').trim();
    return `pi ${nombre.startsWith('pi-') ? nombre : 'pi-' + nombre}`;
  }

  alternar(): void {
    this.abierto.set(!this.abierto());
  }
}