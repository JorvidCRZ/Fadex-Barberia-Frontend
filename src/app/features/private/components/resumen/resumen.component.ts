import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, BarController, LineController, LineElement, PointElement, Filler, Tooltip } from 'chart.js';
import Chart from 'chart.js/auto';
import { ResumenadminService } from '@/app/core/services/gestion/resumen-admin.service';
import { DashboardData, KpiCard, CitaBarberoResponseDTO, EstadoReserva } from '@/app/core/models/gestion/admin/resumen-admin';
import { PrediccionService, PrediccionResponse, PrediccionDia } from '@/app/core/services/analisis/prediccion.service';
import { TokenService } from '@/app/core/services/auth/token.service';
import { StatsCard } from '@/app/core/models/common/card.model';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';

ChartJs.register(CategoryScale, LinearScale, BarElement, BarController, LineController, LineElement, PointElement, Filler, Tooltip);

type Periodo = 'hoy';

type ResumenCita = {
  horaInicio?: string;
  nombreCliente?: string;
  apellidoCliente?: string;
  servicios?: Array<{ nombreCorte?: string; servicioNombre?: string; precio?: number }>;
  estado?: 'FINALIZADA' | 'EN_PROCESO' | 'CONFIRMADA' | 'PENDIENTE' | 'CANCELADA' | string;
};

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule, DatePipe, StatsComponent],
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
})
export class Resumen implements OnInit, OnDestroy {
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance: ChartJs | null = null;
  private barChartInstance: Chart | null = null;
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private tokenService = inject(TokenService);

  esBarbero = false;

  periodos: { key: Periodo; label: string }[] = [
    { key: 'hoy', label: 'Hoy' },
  ];
  periodoActivo: Periodo = 'hoy';

  kpiCards: KpiCard[] = [];
  citas: CitaBarberoResponseDTO[] = [];
  fechaActual = new Date();
  loading = true;
  loadingCitas = false;
  error: string | null = null;

  loadingPrediccion = true;
  diaPico = '';
  totalEstimado = 0;

  nombre = 'Gersone M';
  isOcupado = true;
  pctComision = 10;
  sueldoBase = 0;
  cortesHoy = 0;
  metaCortes = 0;
  ingresosHoy = 0;
  comisionHoy = 0;
  clientesHoy = 0;
  dias: Array<{ fecha: string; atendidos: number }> = [];
  comisionSemanal = 0;
  totalSemana = 0;

  readonly kpiCardsMemoria: KpiCard[] = [
    { label: 'Total clientes', value: '840', delta: '+8.2% este mes', deltaPositive: true, icon: 'users' },
    { label: 'Clientes activos', value: '612', delta: '-1.4% esta semana', deltaPositive: false, icon: 'user' },
    { label: 'Nuevos clientes', value: '28', delta: '+12.6% este mes', deltaPositive: true, icon: 'user-plus' },
    { label: 'Retención', value: '72.8%', delta: '+3.1% vs. mes anterior', deltaPositive: true, icon: 'chart-line' },
    { label: 'Servicios realizados', value: '319', delta: '+7.4% este mes', deltaPositive: true, icon: 'sparkles' },
    { label: 'Ingresos totales', value: 'S/ 18,460', delta: '+9.8% este mes', deltaPositive: true, icon: 'dollar' },
  ];

  readonly citasMemoria: CitaBarberoResponseDTO[] = [
    {
      idReserva: 1,
      nombreCliente: 'Carlos',
      apellidoCliente: 'Ramírez',
      telefonoCliente: '999 123 456',
      fecha: '2026-10-07',
      horaInicio: '09:00',
      estado: 'CONFIRMADA',
      tipoReserva: 'ONLINE',
      servicios: [{ servicioNombre: 'Corte clásico', precio: 25, duracionMinutos: 30 }],
    },
    {
      idReserva: 2,
      nombreCliente: 'Miguel',
      apellidoCliente: 'Torres',
      telefonoCliente: '988 654 321',
      fecha: '2026-10-07',
      horaInicio: '10:30',
      estado: 'PENDIENTE',
      tipoReserva: 'PRESENCIAL',
      servicios: [{ servicioNombre: 'Corte + barba', precio: 40, duracionMinutos: 45 }],
    },
    {
      idReserva: 3,
      nombreCliente: 'Andrés',
      apellidoCliente: 'Vargas',
      telefonoCliente: '977 246 810',
      fecha: '2026-10-07',
      horaInicio: '12:00',
      estado: 'EN_PROCESO',
      tipoReserva: 'ONLINE',
      servicios: [{ servicioNombre: 'Afeitado premium', precio: 30, duracionMinutos: 30 }],
    },
  ];

  constructor(
    private resumenService: ResumenadminService,
    private prediccionService: PrediccionService,
  ) {}

  ngOnInit(): void {
    this.esBarbero = this.tokenService.getPrimaryRole() === 'barbero';

    if (this.esBarbero) {
      this.cargarBarbero();
      return;
    }

    this.kpiCards = this.kpiCardsMemoria;
    this.citas = this.citasMemoria;
    this.loading = false;
    this.cargarPrediccion();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) this.chartInstance.destroy();
    if (this.barChartInstance) this.barChartInstance.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarBarbero(): void {
    this.nombre = 'Gersone M';
    this.isOcupado = true;
    this.pctComision = 10;
    this.sueldoBase = 0;

    const citasHoy: ResumenCita[] = [
      {
        horaInicio: '13:30:00',
        nombreCliente: 'Ana',
        apellidoCliente: 'Torres',
        servicios: [{ nombreCorte: 'Fade', precio: 20 }],
        estado: 'FINALIZADA',
      },
    ];

    this.citas = citasHoy as unknown as CitaBarberoResponseDTO[];
    this.cortesHoy = citasHoy.filter((cita) => cita.estado === 'FINALIZADA').length;
    this.metaCortes = citasHoy.length;
    this.ingresosHoy = citasHoy
      .filter((cita) => cita.estado === 'FINALIZADA')
      .reduce((sum, cita) => sum + (cita.servicios ?? []).reduce((total: number, servicio: { nombreCorte?: string; servicioNombre?: string; precio?: number }) => total + (servicio.precio ?? 0), 0), 0);
    this.comisionHoy = Number((this.ingresosHoy * this.pctComision / 100).toFixed(2));
    this.clientesHoy = this.cortesHoy;

    const prevValues = [2, 3, 1, 4, 2, 3];
    const today = new Date();
    const diasBase = prevValues.map((atendidos, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (prevValues.length - index));
      return { fecha: this.toIsoDate(date), atendidos };
    });

    this.dias = [
      ...diasBase,
      { fecha: this.toIsoDate(today), atendidos: this.cortesHoy },
    ];

    this.comisionSemanal = Number((this.dias.reduce((sum, dia) => sum + dia.atendidos, 0) * 20 * this.pctComision / 100).toFixed(2));
    this.totalSemana = this.sueldoBase + this.comisionSemanal;

    this.cdr.detectChanges();
    setTimeout(() => this.buildBarberoChart(), 0);
  }

  cargarDashboard(): void {
    this.kpiCards = this.kpiCardsMemoria;
    this.citas = this.citasMemoria;
    this.loading = false;
  }

  cargarPrediccion(): void {
    const preds: PrediccionDia[] = [
      { dia: 'Lun', clientes_predichos: 18 },
      { dia: 'Mar', clientes_predichos: 22 },
      { dia: 'Mié', clientes_predichos: 21 },
      { dia: 'Jue', clientes_predichos: 31 },
      { dia: 'Vie', clientes_predichos: 42 },
      { dia: 'Sáb', clientes_predichos: 46 },
      { dia: 'Dom', clientes_predichos: 28 },
    ];
    const vals = preds.map((prediccion) => prediccion.clientes_predichos);
    const max = Math.max(...vals);
    this.diaPico = preds.find((prediccion) => prediccion.clientes_predichos === max)?.dia ?? '';
    this.totalEstimado = vals.reduce((total, valor) => total + valor, 0);
    this.loadingPrediccion = false;

    setTimeout(() => {
      if (this.chartInstance) this.chartInstance.destroy();
      this.chartInstance = new ChartJs(this.barCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: preds.map((prediccion) => prediccion.dia),
          datasets: [{
            data: vals,
            borderColor: '#d4af37',
            backgroundColor: 'rgba(184, 134, 11, 0.22)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.4,
            fill: true,
            label: 'Clientes estimados',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1a1a1a',
              titleColor: '#d4af37',
              bodyColor: '#aaa',
            },
          },
          scales: {
            x: {
              ticks: { color: '#888', font: { size: 11 } },
              grid: { color: 'rgba(255,255,255,0.04)' },
              border: { display: false },
            },
            y: {
              beginAtZero: true,
              max: 60,
              ticks: { color: '#888', stepSize: 15, font: { size: 11 } },
              grid: { color: 'rgba(255,255,255,0.04)' },
              border: { display: false },
            },
          },
        },
      });
    }, 0);
  }

  private buildBarberoChart(): void {
    if (!this.barCanvas?.nativeElement) return;
    if (this.barChartInstance) this.barChartInstance.destroy();

    this.barChartInstance = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dias.map((dia) => this.getDiaLabel(dia)),
        datasets: [{
          data: this.dias.map((dia) => dia.atendidos ?? 0),
          backgroundColor: '#D4AF37',
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: any) => `${ctx.raw} cortes` } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: 10 },
              color: '#888',
              stepSize: 1,
              callback: (value: any) => Number.isInteger(value) ? value : '',
            },
            grid: { color: 'rgba(128,128,128,0.1)' },
          },
          x: {
            ticks: { font: { size: 10 }, color: '#888' },
            grid: { display: false },
          },
        },
      },
    });
  }

  cambiarPeriodo(periodo: Periodo): void {
    this.periodoActivo = periodo;
  }

  refrescarCitas(): void {
    this.loadingCitas = true;
    setTimeout(() => { this.loadingCitas = false; }, 250);
  }

  getNombreCompleto(cita: CitaBarberoResponseDTO): string {
    return `${cita.nombreCliente} ${cita.apellidoCliente}`.trim();
  }

  getServicioResumen(cita: CitaBarberoResponseDTO): string {
    if (!cita.servicios?.length) return '—';
    return (cita.servicios ?? [])
      .map((servicio) => this.obtenerNombreServicio(servicio))
      .filter(Boolean)
      .join(', ');
  }

  getEstadoClass(estado: EstadoReserva): string {
    const map: Record<EstadoReserva, string> = {
      PENDIENTE: 'badge-warning',
      CONFIRMADA: 'badge-info',
      EN_PROCESO: 'badge-primary',
      COMPLETADA: 'badge-success',
      CANCELADA: 'badge-danger',
    };
    return map[estado] ?? 'badge-warning';
  }

  getEstadoLabel(estado: EstadoReserva): string {
    const map: Record<EstadoReserva, string> = {
      PENDIENTE: 'Pendiente',
      CONFIRMADA: 'Confirmada',
      EN_PROCESO: 'En proceso',
      COMPLETADA: 'Completada',
      CANCELADA: 'Cancelada',
    };
    return map[estado] ?? estado;
  }

  get primerNombre(): string { return this.nombre.split(' ')[0] || 'Gersone'; }
  get primerApellido(): string { return this.nombre.split(' ')[1] || 'M'; }
  get estadoLabel(): string { return this.isOcupado ? 'Estado: Ocupado' : 'Estado: Disponible'; }
  get citasPendientes(): number {
    return this.citas.filter((cita) => (cita as any).estado === 'PENDIENTE').length;
  }

  getHora(cita: ResumenCita | CitaBarberoResponseDTO): string {
    return cita.horaInicio ?? '';
  }

  getNombreCliente(cita: ResumenCita | CitaBarberoResponseDTO): string {
    return `${cita.nombreCliente ?? ''} ${cita.apellidoCliente ?? ''}`.trim();
  }

  getNombreServicio(cita: ResumenCita | CitaBarberoResponseDTO): string {
    return (cita.servicios ?? [])
      .map((servicio) => this.obtenerNombreServicio(servicio))
      .filter(Boolean)
      .join(', ');
  }

  getPrecio(cita: ResumenCita | CitaBarberoResponseDTO): number {
    return (cita.servicios ?? []).reduce((total, servicio) => total + this.obtenerPrecioServicio(servicio), 0);
  }

  getEstadoLabelCita(cita: ResumenCita | CitaBarberoResponseDTO): string {
    const estado = cita.estado ?? '';
    const map: Record<string, string> = {
      FINALIZADA: 'Finalizada',
      EN_PROCESO: 'En proceso',
      CONFIRMADA: 'Confirmada',
      PENDIENTE: 'Pendiente',
    };
    return map[estado] ?? estado;
  }

  getBadgeClass(cita: ResumenCita | CitaBarberoResponseDTO): string {
    const estado = cita.estado ?? '';
    if (estado === 'FINALIZADA') return 'badge-finalizada';
    if (estado === 'EN_PROCESO') return 'badge-proceso';
    return 'badge-pendiente';
  }

  getDiaLabel(dia: { fecha: string; atendidos: number }): string {
    const date = new Date(`${dia.fecha}T00:00:00`);
    return date.toLocaleDateString('es-PE', { weekday: 'short' });
  }

  toggleEstado(): void {
    this.isOcupado = !this.isOcupado;
  }

  get statsItems(): StatsCard[] {
    return [
      { title: 'Cortes hoy', value: this.cortesHoy, description: `Meta: ${this.metaCortes} cortes`, icon: 'pi pi-scissors' },
      {
        title: 'Ingresos hoy',
        value: `S/ ${this.ingresosHoy.toFixed(0)}`,
        description: `${this.clientesHoy} clientes atendidos`,
        icon: 'pi pi-wallet',
        accentClass: 'bg-green-500',
        accentTextClass: 'text-green-400',
        iconBgClass: 'bg-green-500/10',
      },
      {
        title: 'Comisión hoy',
        value: `S/ ${this.comisionHoy.toFixed(2)}`,
        description: `${this.pctComision}% sobre ingresos`,
        icon: 'pi pi-percentage',
        accentClass: 'bg-blue-500',
        accentTextClass: 'text-blue-400',
        iconBgClass: 'bg-blue-500/10',
      },
      {
        title: 'Clientes hoy',
        value: this.clientesHoy,
        description: `${this.citasPendientes} pendientes`,
        icon: 'pi pi-users',
        accentClass: 'bg-teal-500',
        accentTextClass: 'text-teal-400',
        iconBgClass: 'bg-teal-500/10',
      },
    ];
  }

  trackByKpi(_: number, kpi: KpiCard): string { return kpi.label; }
  trackByCita(_: number, cita: CitaBarberoResponseDTO): number { return cita.idReserva; }

  private obtenerNombreServicio(servicio: any): string {
    if (!servicio || typeof servicio !== 'object') return '';
    if ('nombreCorte' in servicio && servicio.nombreCorte) return String(servicio.nombreCorte);
    if ('servicioNombre' in servicio && servicio.servicioNombre) return String(servicio.servicioNombre);
    return '';
  }

  private obtenerPrecioServicio(servicio: any): number {
    if (!servicio || typeof servicio !== 'object') return 0;
    if ('precio' in servicio && typeof servicio.precio === 'number') return servicio.precio;
    return 0;
  }

  private toIsoDate(date: Date): string {
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes() - offset);
    return d.toISOString().slice(0, 10);
  }
}
