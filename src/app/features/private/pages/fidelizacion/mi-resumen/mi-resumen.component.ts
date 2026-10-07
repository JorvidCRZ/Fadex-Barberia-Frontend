import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { StatsCard } from '../../../../../core/models/common/card.model';
import { StatsComponent } from '../../../../../shared/components/stats/stats.component';
import { NotificationService } from '../../../../../core/services/common/notification.service';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { FidelizacionDashboardService } from '../../../../../core/services/fidelizacion/dashboard.service';
import { FidelizacionDashboardClienteResponse } from '../../../../../core/models/fidelizacion/dashboard.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject, ChangeDetectorRef } from '@angular/core';
Chart.register(...registerables);

type TarjetaConMeta = FidelizacionTarjetaResponse & { meta: number; girosPorMeta: number };

@Component({
  selector: 'app-mi-resumen',
  standalone: true,
  imports: [CommonModule, StatsComponent],
  templateUrl: './mi-resumen.html',
})
export class MiResumenComponent implements OnInit, OnDestroy {
  private dashboardService = inject(FidelizacionDashboardService);
  private notify = inject(NotificationService);
  private cd = inject(ChangeDetectorRef);

  @ViewChild('progresoChart') progresoRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('girosChart') girosRef!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  // expuesto para usarlo en el template ([style.height.px]="Math.max(...)")
  readonly Math = Math;

  cargando = false;
  data: FidelizacionDashboardClienteResponse | null = null;
  statsCards: StatsCard[] = [];

  // control de secciones colapsables
  secciones = {
    categoria: true,
    movimientos: true,
    recompensas: false,
  };

  // tab activo dentro de la sección "categoria"
  tabCategoria: 'progreso' | 'giros' = 'progreso';

  private readonly gold = '#c9a84c';
  private readonly textColor = 'rgba(255,255,255,0.55)';
  private readonly gridColor = 'rgba(255,255,255,0.06)';
  private readonly colors = ['#c9a84c', '#8a7a5c', '#e2c074', '#6b4f25', '#d4af37', '#b8964b', '#a07840', '#f0d080'];

  ngOnInit(): void {
    this.cargar();
  }

  ngOnDestroy(): void {
    this.charts.forEach((c) => c.destroy());
  }

  toggleSeccion(seccion: keyof typeof this.secciones): void {
    this.secciones[seccion] = !this.secciones[seccion];

    if (seccion === 'categoria' && this.secciones.categoria && this.data) {
      setTimeout(() => this.renderTabActivo());
    }
  }

  cambiarTabCategoria(tab: 'progreso' | 'giros'): void {
    if (this.tabCategoria === tab) return;
    this.tabCategoria = tab;
    setTimeout(() => this.renderTabActivo());
  }

  get tarjetasConGirosDisponibles() {
    return this.data?.tarjetas.filter((t) => t.girosDisponibles > 0) ?? [];
  }

  get nombresSinMeta(): string {
    return this.tarjetasSinMeta.map((t) => t.categoriaNombre).join(', ');
  }

  // solo tarjetas con configuración activa (meta definida) pueden mostrar % de progreso
  get tarjetasConMeta(): TarjetaConMeta[] {
    return (this.data?.tarjetas.filter((t): t is TarjetaConMeta => t.meta !== null && t.meta !== undefined) ?? []);
  }

  get tarjetasSinMeta() {
    return this.data?.tarjetas.filter((t) => !t.meta) ?? [];
  }

  private cargar(): void {
    this.cargando = true;
    this.dashboardService.obtenerDashboardCliente().subscribe({
      next: (resp) => {
        this.data = resp.data;
        this.buildStatsCards(resp.data);
        this.cargando = false;
        this.cd.detectChanges();
        if (this.secciones.categoria) {
          setTimeout(() => this.renderTabActivo());
        }
      },
      error: (err) => {
        this.notify.showHttpError(err);
        this.cargando = false;
        this.cd.detectChanges();
      },
    });
  }

  private buildStatsCards(d: FidelizacionDashboardClienteResponse): void {
    this.statsCards = [
      { title: 'Tarjetas activas', value: d.totalTarjetas, icon: 'pi pi-id-card' },
      { title: 'Giros disponibles', value: d.girosDisponibles, icon: 'pi pi-ticket', accentClass: 'bg-green-400', accentTextClass: 'text-green-400' },
      { title: 'Tarjetas con giro', value: d.tarjetasConGiroDisponible, icon: 'pi pi-star' },
      { title: 'Recompensas pendientes', value: d.recompensasPendientes, icon: 'pi pi-gift' },
    ];
  }

  private renderTabActivo(): void {
    if (!this.data) return;
    this.charts.forEach((c) => c.destroy());
    this.charts = [];

    if (this.tabCategoria === 'progreso') {
      this.buildProgresoChart(this.data);
    } else {
      this.buildGirosChart(this.data);
    }
  }

  private buildProgresoChart(d: FidelizacionDashboardClienteResponse): void {
    if (!this.progresoRef) return;

    const conMeta = this.tarjetasConMeta;
    if (!conMeta.length) return;

    const ctx = this.progresoRef.nativeElement.getContext('2d')!;
    this.charts.push(
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: conMeta.map((t) => t.categoriaNombre),
          datasets: [
            {
              label: 'Progreso',
              data: conMeta.map((t) => Math.round((t.progreso / t.meta) * 100)),
              backgroundColor: this.gold,
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
              ticks: { color: this.textColor, font: { size: 11 }, callback: (v) => v + '%' },
              grid: { color: this.gridColor },
            },
            y: { ticks: { color: this.textColor, font: { size: 11 } }, grid: { display: false } },
          },
        },
      })
    );
  }

  private buildGirosChart(d: FidelizacionDashboardClienteResponse): void {
    if (!this.girosRef) return;

    const conGiros = this.tarjetasConGirosDisponibles;
    if (!conGiros.length) return;

    const ctx = this.girosRef.nativeElement.getContext('2d')!;
    this.charts.push(
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: conGiros.map((t) => t.categoriaNombre),
          datasets: [
            {
              data: conGiros.map((t) => t.girosDisponibles),
              backgroundColor: this.colors.slice(0, conGiros.length),
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: this.textColor, font: { size: 11 }, padding: 12 } },
          },
        },
      })
    );
  }
}