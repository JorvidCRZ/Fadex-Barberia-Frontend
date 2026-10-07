import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Chart, registerables } from 'chart.js';
import { Movimiento, Origen } from '../../../core/models/fidelizacion/movimiento.model';
import { NotificationService } from '../../../core/services/common/notification.service';
import { FidelizacionTarjetaResponse } from '../../../core/models/fidelizacion/tarjeta.model';
import { FidelizacionMovimientoService } from '../../../core/services/fidelizacion/movimiento.service';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef, inject, signal } from '@angular/core';
Chart.register(...registerables);

type TarjetaConMeta = FidelizacionTarjetaResponse & { meta: number };

@Component({
    standalone: true,
    selector: 'app-tarjeta-grafico',
    imports: [CommonModule, ButtonModule],
    templateUrl: './tarjeta-grafico.html',
    styleUrl: './tarjeta-grafico.scss',
})
export class TarjetaGraficoComponent implements OnInit, OnDestroy {
    /** 'admin' = cards por categoría con progreso + historial expandible
     *  'cliente' = tarjeta tipo "sello de coronitas"
     *  'dashboard' = saludo + giros + mini tarjetas + timeline de movimientos */
    @Input() variante: 'admin' | 'cliente' | 'dashboard' = 'admin';
    @Input() clienteNombre = '';
    @Input() nivel = 'Miembro';
    @Input({ required: true }) tarjetas: FidelizacionTarjetaResponse[] = [];
    @Output() canjear = new EventEmitter<FidelizacionTarjetaResponse>();
    @Output() girar = new EventEmitter<void>();
    @Output() verRuleta = new EventEmitter<FidelizacionTarjetaResponse>();

    @ViewChild('progresoChart') progresoRef?: ElementRef<HTMLCanvasElement>;

    private movimientoService = inject(FidelizacionMovimientoService);
    private notify = inject(NotificationService);
    private chart: Chart | null = null;

    readonly Origen = Origen;
    readonly Math = Math;
    private readonly iconosCategoria = ['pi-scissors', 'pi-heart', 'pi-user', 'pi-sparkles', 'pi-star'];

    private tarjetaExpandidaId = signal<number | null>(null);
    private movimientosPorTarjeta = signal<Record<number, Movimiento[]>>({});
    private cargandoMovimientos = signal<Record<number, boolean>>({});

    movimientosDashboard = signal<Movimiento[]>([]);
    cargandoDashboard = signal(false);

    // toggle Tarjetas / Gráfico — solo aplica a variantes admin y cliente
    vista: 'tarjetas' | 'grafico' = 'tarjetas';

    private readonly gold = '#c9a84c';
    private readonly textColor = 'rgba(255,255,255,0.55)';
    private readonly gridColor = 'rgba(255,255,255,0.06)';

    ngOnInit(): void {
        if (this.variante === 'dashboard') {
            this.cargarMovimientosDashboard();
        }
    }

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

    get tarjetasConMeta(): TarjetaConMeta[] {
        return this.tarjetas.filter((t): t is TarjetaConMeta => t.meta !== null && t.meta !== undefined);
    }

    get tarjetasSinMeta(): FidelizacionTarjetaResponse[] {
        return this.tarjetas.filter((t) => !t.meta);
    }

    get nombresSinMeta(): string {
        return this.tarjetasSinMeta.map((t) => t.categoriaNombre).join(', ');
    }

    private buildChart(): void {
        if (!this.progresoRef) return;
        this.chart?.destroy();

        const conMeta = this.tarjetasConMeta;
        if (!conMeta.length) return;

        const ctx = this.progresoRef.nativeElement.getContext('2d')!;
        this.chart = new Chart(ctx, {
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
        });
    }

    private cargarMovimientosDashboard(): void {
        this.cargandoDashboard.set(true);
        this.movimientoService.obtenerMisMovimientos().subscribe({
            next: (resp) => {
                this.movimientosDashboard.set(resp.data);
                this.cargandoDashboard.set(false);
            },
            error: (err) => {
                this.notify.showHttpError(err.message);
                this.cargandoDashboard.set(false);
            },
        });
    }

    get girosTotales(): number {
        return this.tarjetas.reduce((acc, t) => acc + (t.girosDisponibles ?? 0), 0);
    }

    get gruposMovimientos(): { etiqueta: string; items: Movimiento[] }[] {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const ayer = new Date(hoy);
        ayer.setDate(ayer.getDate() - 1);

        const grupos = new Map<string, Movimiento[]>();
        for (const m of this.movimientosDashboard()) {
            const fecha = new Date(m.createdAt);
            const soloFecha = new Date(fecha);
            soloFecha.setHours(0, 0, 0, 0);
            let etiqueta: string;
            if (soloFecha.getTime() === hoy.getTime()) etiqueta = 'Hoy';
            else if (soloFecha.getTime() === ayer.getTime()) etiqueta = 'Ayer';
            else etiqueta = fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });

            if (!grupos.has(etiqueta)) grupos.set(etiqueta, []);
            grupos.get(etiqueta)!.push(m);
        }
        return Array.from(grupos.entries()).map(([etiqueta, items]) => ({ etiqueta, items }));
    }

    iconoCategoria(index: number): string {
        return this.iconosCategoria[index % this.iconosCategoria.length];
    }

    toggleExpandir(tarjeta: FidelizacionTarjetaResponse): void {
        const actual = this.tarjetaExpandidaId();
        if (actual === tarjeta.id) {
            this.tarjetaExpandidaId.set(null);
            return;
        }
        this.tarjetaExpandidaId.set(tarjeta.id);
        if (!this.movimientosPorTarjeta()[tarjeta.id]) {
            this.cargarMovimientos(tarjeta.id);
        }
    }

    estaExpandida(tarjeta: FidelizacionTarjetaResponse): boolean {
        return this.tarjetaExpandidaId() === tarjeta.id;
    }

    movimientosDe(tarjeta: FidelizacionTarjetaResponse): Movimiento[] {
        return this.movimientosPorTarjeta()[tarjeta.id] ?? [];
    }

    estaCargando(tarjeta: FidelizacionTarjetaResponse): boolean {
        return !!this.cargandoMovimientos()[tarjeta.id];
    }

    private cargarMovimientos(tarjetaId: number): void {
        this.cargandoMovimientos.update((m) => ({ ...m, [tarjetaId]: true }));
        this.movimientoService.obtenerMovimientos({ tarjetaId, size: 30, sort: 'createdAt,desc' }).subscribe({
            next: (resp) => {
                this.movimientosPorTarjeta.update((m) => ({ ...m, [tarjetaId]: resp.data.content }));
                this.cargandoMovimientos.update((m) => ({ ...m, [tarjetaId]: false }));
            },
            error: (err) => {
                this.notify.showHttpError(err.message);
                this.cargandoMovimientos.update((m) => ({ ...m, [tarjetaId]: false }));
            },
        });
    }

    // 👇 ahora usa la meta propia de cada tarjeta
    progresoPct(tarjeta: FidelizacionTarjetaResponse): number {
        if (!tarjeta.meta) return 0;
        return Math.min((tarjeta.progreso / tarjeta.meta) * 100, 100);
    }

    tieneMeta(tarjeta: FidelizacionTarjetaResponse): boolean {
        return !!tarjeta.meta;
    }

    slots(tarjeta: FidelizacionTarjetaResponse): number[] {
        if (!tarjeta.meta) return [];
        return Array.from({ length: tarjeta.meta }, (_, i) => i + 1);
    }

    puedeCanjear(tarjeta: FidelizacionTarjetaResponse): boolean {
        return tarjeta.girosDisponibles > 0 && tarjeta.cicloActivo;
    }

    iconoOrigen(origen: Origen): string {
        switch (origen) {
            case Origen.VENTA: return 'pi-shopping-cart';
            case Origen.RESERVA: return 'pi-calendar';
            case Origen.AJUSTE: return 'pi-sliders-h';
            default: return 'pi-circle';
        }
    }

    labelOrigen(origen: Origen): string {
        switch (origen) {
            case Origen.VENTA: return 'Venta';
            case Origen.RESERVA: return 'Reserva';
            case Origen.AJUSTE: return 'Ajuste';
            default: return origen;
        }
    }
}