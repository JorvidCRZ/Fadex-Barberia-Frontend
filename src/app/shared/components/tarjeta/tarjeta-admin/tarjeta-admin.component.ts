import { DecimalPipe, NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, ViewChild, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ButtonComponent } from '../../button/button.component';
import { ProgresoBarraComponent } from '../pogreso-barra.component';
import { StatusBadgeComponent } from '../../status-badge/status-badge.component';
import { TarjetaMovimientosComponent } from '../tarjeta-movimientos.component';
import { FidelizacionTarjetaResponse } from '@/app/core/models/fidelizacion/tarjeta.model';
import { progresoPct, TarjetaConMeta, tieneMeta } from '../tarjeta.utils.component';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-tarjeta-admin',
  imports: [ NgClass, DecimalPipe, ButtonComponent, StatusBadgeComponent, ProgresoBarraComponent, TarjetaMovimientosComponent,],
  templateUrl: './tarjeta-admin.html',
})
export class TarjetaAdminComponent implements OnDestroy {
  @Input({ required: true }) tarjetas: FidelizacionTarjetaResponse[] = [];
  @Input() clienteNombre = '';

  @ViewChild('progresoChart') progresoRef?: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  vista: 'tarjetas' | 'grafico' = 'tarjetas';
  expandidaId = signal<number | null>(null);

  readonly tieneMeta = tieneMeta;
  readonly progresoPct = progresoPct;

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  cambiarVista(vista: 'tarjetas' | 'grafico'): void {
    if (this.vista === vista) return;
    this.vista = vista;
    if (vista === 'grafico') {
      setTimeout(() => this.buildChart());
    } else {
      this.chart?.destroy();
      this.chart = null;
    }
  }

  toggle(t: FidelizacionTarjetaResponse): void {
    this.expandidaId.update((actual) => (actual === t.id ? null : t.id));
  }

  get tarjetasConMeta(): TarjetaConMeta[] {
    return this.tarjetas.filter(
      (t): t is TarjetaConMeta => t.meta !== null && t.meta !== undefined,
    );
  }

  get tarjetasSinMeta(): FidelizacionTarjetaResponse[] {
    return this.tarjetas.filter((t) => !t.meta);
  }

  get nombresSinMeta(): string {
    return this.tarjetasSinMeta.map((t) => t.categoriaNombre).join(', ');
  }

  get alturaGrafico(): number {
    return Math.max(140, this.tarjetasConMeta.length * 55);
  }

  private colorToken(token: string, alpha = 1): string {
    const valor = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    const [r, g, b] = valor.split(/\s+/);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private buildChart(): void {
    if (!this.progresoRef) return;
    this.chart?.destroy();

    const conMeta = this.tarjetasConMeta;
    if (!conMeta.length) return;

    const dorado = this.colorToken('--color-brand-gold');
    const textColor = this.colorToken('--color-text-secondary');
    const gridColor = 'rgba(255, 255, 255, 0.06)';

    this.chart = new Chart(this.progresoRef.nativeElement.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: conMeta.map((t) => t.categoriaNombre),
        datasets: [
          {
            label: 'Progreso',
            data: conMeta.map((t) => Math.round((t.progreso / t.meta) * 100)),
            backgroundColor: dorado,
            borderRadius: 6,
            barPercentage: 0.5,
            categoryPercentage: 0.6,
          },
        ],
      },
      options: {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const t = conMeta[ctx.dataIndex];
                return ` ${t.progreso} / ${t.meta} servicios (${ctx.parsed.x}%)`;
              },
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: { color: textColor, font: { size: 11 }, callback: (v) => v + '%' },
            grid: { color: gridColor },
          },
          y: { ticks: { color: textColor, font: { size: 11 } }, grid: { display: false } },
        },
      },
    });
  }
}
