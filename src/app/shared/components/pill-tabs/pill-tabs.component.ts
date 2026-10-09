import { NgClass } from '@angular/common';
import { Component, Input, model } from '@angular/core';

export interface PillTab<T extends string = string> {
  value: T;
  label: string;
  /** 'list', 'pi-list' o 'pi pi-list' */
  icon?: string;
  /** Contador opcional a la derecha del texto */
  count?: number;
}

/**
 * Tabs tipo "píldora" (reemplaza los <nav> con botones repetidos).
 *
 *   <app-pill-tabs [tabs]="tabsPremios" [(value)]="tabActivo" />
 *   <app-pill-tabs size="sm" variant="segment" [tabs]="..." [(value)]="..." />
 *
 * variant="pill"    → redondeado completo (Todas / Pendientes / Usadas)
 * variant="segment" → compacto, esquinas medianas (mini-tabs dentro de una tarjeta)
 */
@Component({
  selector: 'app-pill-tabs',
  standalone: true,
  imports: [NgClass],
  template: `
    <nav [ngClass]="contenedor" role="tablist">
      @for (tab of tabs; track tab.value) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="value() === tab.value"
          class="flex cursor-pointer items-center gap-1.5 font-semibold transition-all duration-200"
          [ngClass]="[
            tamano,
            forma,
            value() === tab.value ? 'bg-brand-gold text-black' : 'text-text-secondary hover:text-brand-gold'
          ]"
          (click)="value.set(tab.value)">
          @if (tab.icon) {
            <i [class]="claseIcono(tab.icon)" class="text-xs"></i>
          }
          {{ tab.label }}
          @if (tab.count !== undefined) {
            <span class="text-[11px] opacity-70">({{ tab.count }})</span>
          }
        </button>
      }
    </nav>
  `,
})
export class PillTabsComponent<T extends string = string> {
  @Input({ required: true }) tabs: PillTab<T>[] = [];
  @Input() variant: 'pill' | 'segment' = 'pill';
  @Input() size: 'md' | 'sm' = 'md';
  /** Soporta [(value)]="tabActivo" (también funciona con signals) */
  value = model.required<T>();

  get contenedor(): string {
    return this.variant === 'pill'
      ? 'inline-flex rounded-full border border-ui-border bg-ui-card p-1'
      : 'inline-flex w-fit gap-1 rounded-lg bg-black/20 p-1';
  }

  get forma(): string {
    return this.variant === 'pill' ? 'rounded-full' : 'rounded-md';
  }

  get tamano(): string {
    return this.size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  }

  claseIcono(icon: string): string {
    const nombre = icon.replace(/^pi\s+/, '').trim();
    return `pi ${nombre.startsWith('pi-') ? nombre : 'pi-' + nombre}`;
  }
}
