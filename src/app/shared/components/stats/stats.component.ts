import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatsCard } from '../../../core/models/common/card.model';

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  template: `
  <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
    @for (item of items; track item.title) {
      <div
        class="relative overflow-hidden rounded-xl border border-ui-border bg-ui-card px-4 py-4 shadow-sm"
      >
        <div
          class="absolute left-0 right-0 top-0 h-[2px]"
          [ngClass]="item.accentClass ?? 'bg-brand-gold'"
        ></div>

        @if (item.icon) {
          <div class="mb-2 flex justify-end">
            <div class="rounded-lg p-2" [ngClass]="item.iconBgClass ?? 'bg-brand-gold/10'">
              <i
                [class]="item.icon + ' text-base'"
                [ngClass]="item.accentTextClass ?? 'text-brand-gold'"
                aria-hidden="true"
              >
              </i>
            </div>
          </div>
        }

        <div class="flex flex-col gap-1">
          <span class="text-[11px] uppercase tracking-widest text-text-muted">{{
            item.title
          }}</span>
          <h2 class="text-2xl font-bold leading-none text-text-primary">{{ item.value }}</h2>

          @if (item.description) {
            <p class="mt-1 line-clamp-1 text-[11px] text-text-subtle">{{ item.description }}</p>
          }
        </div>
      </div>
    }
  </div>`,
})
export class StatsComponent {
  @Input({ required: true })
  items: StatsCard[] = [];
}
