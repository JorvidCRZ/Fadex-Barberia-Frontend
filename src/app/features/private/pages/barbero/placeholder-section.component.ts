import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-[60vh] p-6">
      <div class="rounded-2xl border border-brand-gold/20 bg-[#111111] p-6 shadow-[0_0_30px_rgba(0,0,0,0.25)]">
        <div class="flex items-center gap-3 border-b border-brand-gold/20 pb-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
            <i class="pi pi-star-fill"></i>
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-text-muted">Barbero</p>
            <h2 class="text-2xl font-semibold text-white">{{ title }}</h2>
          </div>
        </div>

        <div class="mt-6 rounded-xl border border-brand-gold/15 bg-[#1a1a1a] p-5 text-text-muted">
          <p class="text-sm">Sección de {{ title.toLowerCase() }} en desarrollo.</p>
        </div>
      </div>
    </section>
  `,
})
export class PlaceholderSectionComponent {
  private readonly route = inject(ActivatedRoute);

  get title(): string {
    return this.route.snapshot.data['title'] ?? 'Sección';
  }
}
