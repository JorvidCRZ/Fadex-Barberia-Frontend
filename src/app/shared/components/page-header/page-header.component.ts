import { Component, Input } from '@angular/core';

/**
 * Encabezado de página (título + subtítulo + acciones a la derecha).
 *
 * <app-page-header titulo="Mis Reservas" icono="calendar" subtitulo="Consulta, paga o cancela tus citas">
 *   <app-button variant="secondary" size="sm" icon="refresh" label="Recargar" (clicked)="recargar()" />
 * </app-page-header>
 *
 * Todo lo que pongas dentro de la etiqueta aparece a la derecha.
 */
@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <aside class="flex flex-col gap-4 rounded-xl border-b border-brand-gold-soft bg-brand-black px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div class="text-center md:text-start">
        <h1 class="m-0 text-lg font-semibold text-brand-gold">
          @if (icono) {
            <i [class]="claseIcono"></i>
          }
          {{ titulo }}
        </h1>
        @if (subtitulo) {
          <p class="m-0 text-sm text-text-muted">{{ subtitulo }}</p>
        }
      </div>

      <div class="flex items-center justify-center gap-3">
        <ng-content />
      </div>
    </aside>
  `,
})
export class PageHeaderComponent {
  @Input({ required: true }) titulo!: string;
  @Input() subtitulo?: string;
  /** 'calendar', 'pi-calendar' o 'pi pi-calendar' */
  @Input() icono?: string;

  get claseIcono(): string {
    const nombre = (this.icono ?? '').replace(/^pi\s+/, '').trim();
    return `pi ${nombre.startsWith('pi-') ? nombre : 'pi-' + nombre}`;
  }
}