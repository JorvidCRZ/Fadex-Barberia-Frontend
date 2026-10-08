import { Component, OnInit, OnDestroy, ViewChild, ElementRef, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { FidelizacionDashboardService } from '@/app/core/services/fidelizacion/dashboard.service';
import { FidelizacionDashboardAdminResponse } from '@/app/core/models/fidelizacion/dashboard.model';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { GiroPorSemana, MovimientoPorSemana } from '@/app/core/models/ruleta/giro.model';
import { TabsModule } from 'primeng/tabs';
Chart.register(...registerables);

interface Kpi {
    label: string;
    value: string;
    icon: string;
}

interface TopPremio {
    nombre: string;
    cantidad: number;
}

@Component({
    selector: 'app-fidelizacion-dashboard-admin',
    standalone: true,
    imports: [CommonModule, TabsModule],
    templateUrl: './fidelizacion-dashboard-admin.html',
})
export class FidelizacionDashboardAdminComponent implements OnInit, OnDestroy {
    private dashboardService = inject(FidelizacionDashboardService);
    private notify = inject(NotificationService);
    private cd = inject(ChangeDetectorRef);

    @ViewChild('categoriaChart') categoriaRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('girosChart') girosRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('girosPorSemanaChart') girosPorSemanaRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('movimientosPorSemanaChart') movimientosPorSemanaRef!: ElementRef<HTMLCanvasElement>;

    private charts: Chart[] = [];

    activeTab = '0';
    cargando = false;
    cargandoGirosPorSemana = false;
    cargandoMovimientosPorSemana = false;
    data: FidelizacionDashboardAdminResponse | null = null;
    kpis: Kpi[] = [];
    topPremios: TopPremio[] = [];

    private readonly gold = '#c9a84c';
    private readonly goldSoft = 'rgba(201,168,76,0.18)';
    private readonly green = '#c9a84c';;
    private readonly greenSoft = 'rgba(201,168,76,0.18)';
    private readonly red = '#f87171';
    private readonly redSoft = 'rgba(248,113,113,0.15)';
    private readonly textColor = 'rgba(255,255,255,0.55)';
    private readonly gridColor = 'rgba(255,255,255,0.06)';
    private readonly colors = ['#c9a84c', '#8a7a5c', '#e2c074', '#6b4f25', '#d4af37', '#b8964b', '#a07840', '#f0d080'];

    ngOnInit(): void {
        this.cargar();
        this.cargarGirosPorSemana();
        this.cargarMovimientosPorSemana();
    }

    onTabChange(value: string | number | undefined): void {
        if (value === undefined) return;
        this.activeTab = String(value);
        setTimeout(() => {this.charts.forEach((c) => c.resize());});
    }

    ngOnDestroy(): void {
        this.charts.forEach((c) => c.destroy());
    }

    private cargar(): void {
        this.cargando = true;
        this.dashboardService.obtenerDashboardAdmin().subscribe({
            next: (resp) => {
                this.data = resp.data;
                this.buildKpis(resp.data);
                this.buildTopPremios(resp.data);
                this.cargando = false;
                this.cd.detectChanges();
                this.buildCategoriaChart(resp.data);
                this.buildGirosChart(resp.data);
            },
            error: (err) => {
                this.notify.showHttpError(err.message);
                this.cargando = false;
                this.cd.detectChanges();
            },
        });
    }

    private rangoUltimos30Dias(): { fechaInicio: string; fechaFin: string } {
        const hoy = new Date();
        const hace30 = new Date();
        hace30.setDate(hoy.getDate() - 30);
        return {
            fechaInicio: hace30.toISOString().split('T')[0],
            fechaFin: hoy.toISOString().split('T')[0],
        };
    }

    private cargarGirosPorSemana(): void {
        this.cargandoGirosPorSemana = true;
        const { fechaInicio, fechaFin } = this.rangoUltimos30Dias();

        this.dashboardService.obtenerGirosPorSemana(fechaInicio, fechaFin).subscribe({
            next: (resp) => {
                this.cargandoGirosPorSemana = false;
                this.cd.detectChanges();
                this.buildGirosPorSemanaChart(resp.data);
            },
            error: (err) => {
                this.notify.showHttpError(err.message);
                this.cargandoGirosPorSemana = false;
                this.cd.detectChanges();
            },
        });
    }

    private cargarMovimientosPorSemana(): void {
        this.cargandoMovimientosPorSemana = true;
        const { fechaInicio, fechaFin } = this.rangoUltimos30Dias();

        this.dashboardService.obtenerMovimientosPorSemana(fechaInicio, fechaFin).subscribe({
            next: (resp) => {
                this.cargandoMovimientosPorSemana = false;
                this.cd.detectChanges();
                this.buildMovimientosPorSemanaChart(resp.data);
            },
            error: (err) => {
                this.notify.showHttpError(err.message);
                this.cargandoMovimientosPorSemana = false;
                this.cd.detectChanges();
            },
        });
    }

    private buildKpis(d: FidelizacionDashboardAdminResponse): void {
        const girosDisponibles = d.tarjetasPorCategoria.reduce((acc, c) => acc + c.girosDisponibles, 0);

        this.kpis = [
            { label: 'Tarjetas activas', value: `${d.totalTarjetas}`, icon: 'id-card' },
            { label: 'Giros realizados', value: `${d.totalGiros}`, icon: 'refresh' },
            { label: 'Recompensas entregadas', value: `${d.totalRecompensas}`, icon: 'gift' },
            { label: 'Giros disponibles', value: `${girosDisponibles}`, icon: 'ticket' },
            { label: 'Configuraciones activas', value: `${d.totalConfiguraciones}`, icon: 'cog' },
        ];
    }

    private buildTopPremios(d: FidelizacionDashboardAdminResponse): void {
        const conteo = new Map<string, number>();
        for (const r of d.ultimasRecompensas) {
            conteo.set(r.itemNombre, (conteo.get(r.itemNombre) ?? 0) + 1);
        }
        this.topPremios = Array.from(conteo.entries())
            .map(([nombre, cantidad]) => ({ nombre, cantidad }))
            .sort((a, b) => b.cantidad - a.cantidad)
            .slice(0, 6);
    }

    private buildCategoriaChart(d: FidelizacionDashboardAdminResponse): void {
        if (!this.categoriaRef) return;

        const categorias = d.tarjetasPorCategoria;
        const labels = categorias.map((c) => c.categoriaNombre);
        const valores = categorias.map((c) => c.totalTarjetas);

        const ctx = this.categoriaRef.nativeElement.getContext('2d')!;
        this.charts.push(
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels,
                    datasets: [
                        {
                            data: valores,
                            backgroundColor: this.colors.slice(0, labels.length),
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

    private buildGirosChart(d: FidelizacionDashboardAdminResponse): void {
        if (!this.girosRef) return;

        const categorias = [...d.tarjetasPorCategoria]
            .filter((c) => c.girosDisponibles > 0)
            .sort((a, b) => b.girosDisponibles - a.girosDisponibles)
            .slice(0, 6);

        if (!categorias.length) return;

        const ctx = this.girosRef.nativeElement.getContext('2d')!;
        this.charts.push(
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: categorias.map((c) => c.categoriaNombre),
                    datasets: [
                        {
                            label: 'Giros disponibles',
                            data: categorias.map((c) => c.girosDisponibles),
                            backgroundColor: this.gold,
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    indexAxis: 'y' as const,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: this.textColor, font: { size: 11 }, stepSize: 1 }, grid: { color: this.gridColor } },
                        y: { ticks: { color: this.textColor, font: { size: 11 } }, grid: { display: false } },
                    },
                },
            })
        );
    }

    private buildGirosPorSemanaChart(data: GiroPorSemana[]): void {
        if (!this.girosPorSemanaRef || !data.length) return;

        const ctx = this.girosPorSemanaRef.nativeElement.getContext('2d')!;
        this.charts.push(
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((d) => this.formatearSemana(d.semanaInicio)),
                    datasets: [
                        {
                            label: 'Giros',
                            data: data.map((d) => d.total),
                            borderColor: this.gold,
                            backgroundColor: this.goldSoft,
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: this.gold,
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (ctx) => ` Giros: ${ctx.parsed.y}` } },
                    },
                    scales: {
                        x: { ticks: { color: this.textColor, font: { size: 11 } }, grid: { display: false } },
                        y: { ticks: { color: this.textColor, font: { size: 11 }, stepSize: 1 }, grid: { color: this.gridColor } },
                    },
                },
            })
        );
    }

    private buildMovimientosPorSemanaChart(data: MovimientoPorSemana[]): void {
        if (!this.movimientosPorSemanaRef || !data.length) return;

        const ctx = this.movimientosPorSemanaRef.nativeElement.getContext('2d')!;
        this.charts.push(
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map((d) => this.formatearSemana(d.semanaInicio)),
                    datasets: [
                        {
                            label: 'Positivos',
                            data: data.map((d) => d.positivos),
                            borderColor: this.green,
                            backgroundColor: this.greenSoft,
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: this.green,
                            fill: true,
                            tension: 0.4,
                        },
                        {
                            label: 'Negativos',
                            data: data.map((d) => d.negativos),
                            borderColor: this.red,
                            backgroundColor: this.redSoft,
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: this.red,
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, labels: { color: this.textColor, font: { size: 11 } } },
                        tooltip: { callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}` } },
                    },
                    scales: {
                        x: { ticks: { color: this.textColor, font: { size: 11 } }, grid: { display: false } },
                        y: { ticks: { color: this.textColor, font: { size: 11 }, stepSize: 1 }, grid: { color: this.gridColor } },
                    },
                },
            })
        );
    }

    private formatearSemana(fechaIso: string): string {
        const fecha = new Date(fechaIso + 'T00:00:00');
        return fecha.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit' });
    }
}