import { Chart, registerables } from 'chart.js';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { BadgeTone } from '../../../../../core/config/status-badge.config';
import { FIDELIZACION_DASHBOARD_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
import { StatsCard } from '../../../../../core/models/common/card.model';
import { FidelizacionDashboardClienteResponse } from '../../../../../core/models/fidelizacion/dashboard.model';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { CollapsibleSectionComponent } from '../../../../../shared/components/collapsible-section/collapsible-section.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { PillTab, PillTabsComponent } from '../../../../../shared/components/pill-tabs/pill-tabs.component';
import { StatsComponent } from '../../../../../shared/components/stats/stats.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';

Chart.register(...registerables);

type TarjetaConMeta = FidelizacionTarjetaResponse & { meta: number; girosPorMeta: number };
type TabCategoria = 'progreso' | 'giros';
type Seccion = 'categoria' | 'movimientos' | 'recompensas';

@Component({
  selector: 'app-mi-resumen',
  standalone: true,
  imports: [StatsComponent, StatusBadgeComponent, EmptyStateComponent, CollapsibleSectionComponent, PillTabsComponent, DateFormatPipe],
  templateUrl: './mi-resumen.html',
})
export class MiResumenComponent implements OnInit, OnDestroy {
  private cd = inject(ChangeDetectorRef);

  // Backend: conservar para reactivar cuando exista conexión con la API.
  // private dashboardService = inject(FidelizacionDashboardService);
  // private notify = inject(NotificationService);

  @ViewChild('progresoChart') progresoRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('girosChart') girosRef?: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  /** Expuesto para el template ([style.height.px]="Math.max(...)") */
  readonly Math = Math;

  cargando = false;
  data: FidelizacionDashboardClienteResponse | null = null;
  statsCards: StatsCard[] = [];

  secciones: Record<Seccion, boolean> = { categoria: true, movimientos: true, recompensas: false };

  readonly tabsCategoria: PillTab<TabCategoria>[] = [
    { value: 'progreso', label: 'Progreso' },
    { value: 'giros', label: 'Giros disponibles' },
  ];
  tabCategoria: TabCategoria = 'progreso';

  /** Paleta de la gráfica de giros (tonos dorados; no hay tokens para series) */
  private readonly serieColores = ['#d4af37', '#8a7a5c', '#e2c074', '#6b4f25', '#f0d080', '#b8964b', '#a07840', '#c9a84c'];

  ngOnInit(): void {
    this.cargar();
  }

  ngOnDestroy(): void {
    this.destruirCharts();
  }

  alCambiarSeccion(seccion: Seccion, abierta: boolean): void {
    this.secciones[seccion] = abierta;
    if (seccion === 'categoria' && abierta && this.data) {
      setTimeout(() => this.renderTabActivo());
    }
  }

  cambiarTabCategoria(tab: TabCategoria): void {
    if (this.tabCategoria === tab) return;
    this.tabCategoria = tab;
    setTimeout(() => this.renderTabActivo());
  }

  origenTono(origen: string): BadgeTone {
    switch (origen) {
      case 'RESERVA': return 'warning';
      case 'VENTA': return 'success';
      case 'AJUSTE': return 'info';
      default: return 'neutral';
    }
  }

  get tarjetasConGirosDisponibles() {
    return this.data?.tarjetas.filter((t) => t.girosDisponibles > 0) ?? [];
  }

  /** Solo las tarjetas con meta definida pueden mostrar % de progreso */
  get tarjetasConMeta(): TarjetaConMeta[] {
    return this.data?.tarjetas.filter((t): t is TarjetaConMeta => t.meta !== null && t.meta !== undefined) ?? [];
  }

  get tarjetasSinMeta() {
    return this.data?.tarjetas.filter((t) => !t.meta) ?? [];
  }

  get nombresSinMeta(): string {
    return this.tarjetasSinMeta.map((t) => t.categoriaNombre).join(', ');
  }

  private cargar(): void {
    this.cargando = true;
    this.data = FIDELIZACION_DASHBOARD_MOCK;
    this.buildStatsCards(this.data);
    this.cargando = false;
    this.cd.detectChanges();
    if (this.secciones.categoria) setTimeout(() => this.renderTabActivo());

    // Backend:
    // this.dashboardService.obtenerDashboardCliente().subscribe({ ... });
  }

  private buildStatsCards(d: FidelizacionDashboardClienteResponse): void {
    this.statsCards = [
      { title: 'Tarjetas activas', value: d.totalTarjetas, icon: 'pi pi-id-card' },
      { title: 'Giros disponibles', value: d.girosDisponibles, icon: 'pi pi-ticket', accentClass: 'bg-green-400', accentTextClass: 'text-green-400' },
      { title: 'Tarjetas con giro', value: d.tarjetasConGiroDisponible, icon: 'pi pi-star' },
      { title: 'Recompensas pendientes', value: d.recompensasPendientes, icon: 'pi pi-gift' },
    ];
  }

  /** Lee un token CSS (ej. 'brand-gold' → --color-brand-gold = "212 175 55") y lo devuelve como rgba() */
  private token(nombre: string, alpha = 1): string {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(`--color-${nombre}`).trim();
    const [r, g, b] = raw.split(/[\s/]+/).map(Number);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private destruirCharts(): void {
    this.charts.forEach((c) => c.destroy());
    this.charts = [];
  }

  private renderTabActivo(): void {
    if (!this.data) return;
    this.destruirCharts();
    if (this.tabCategoria === 'progreso') this.buildProgresoChart();
    else this.buildGirosChart();
  }

  private buildProgresoChart(): void {
    const canvas = this.progresoRef?.nativeElement;
    const conMeta = this.tarjetasConMeta;
    if (!canvas || !conMeta.length) return;

    const texto = this.token('text-primary', 0.55);
    const rejilla = this.token('text-primary', 0.06);

    this.charts.push(
      new Chart(canvas.getContext('2d')!, {
        type: 'bar',
        data: {
          labels: conMeta.map((t) => t.categoriaNombre),
          datasets: [
            {
              label: 'Progreso',
              data: conMeta.map((t) => Math.round((t.progreso / t.meta) * 100)),
              backgroundColor: this.token('brand-gold'),
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
            x: { min: 0, max: 100, ticks: { color: texto, font: { size: 11 }, callback: (v) => v + '%' }, grid: { color: rejilla } },
            y: { ticks: { color: texto, font: { size: 11 } }, grid: { display: false } },
          },
        },
      }),
    );
  }

  private buildGirosChart(): void {
    const canvas = this.girosRef?.nativeElement;
    const conGiros = this.tarjetasConGirosDisponibles;
    if (!canvas || !conGiros.length) return;

    this.charts.push(
      new Chart(canvas.getContext('2d')!, {
        type: 'doughnut',
        data: {
          labels: conGiros.map((t) => t.categoriaNombre),
          datasets: [
            {
              data: conGiros.map((t) => t.girosDisponibles),
              backgroundColor: this.serieColores.slice(0, conGiros.length),
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: this.token('text-primary', 0.55), font: { size: 11 }, padding: 12 } },
          },
        },
      }),
    );
  }
}