import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { forkJoin } from 'rxjs';
import Chart, { ChartConfiguration } from 'chart.js/auto'; // 'auto' ya registra todos los controladores

import { environment } from '@/environments/environment'; // ajusta la ruta si tu alias es otro
import { TokenService } from '@/app/core/services/auth/token.service';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { ResumenCliente } from '@/app/core/services/gestion/resumen-cliente.service';
import { KpiCard, CitaBarberoResponseDTO, EstadoReserva } from '@/app/core/models/gestion/admin/resumen-admin';
import { ClienteDetalleResumenDTO } from '@/app/core/models/gestion/cliente/ClienteResumen.model';
import { PrediccionDia } from '@/app/core/services/analisis/prediccion.service';
import { StatsCard } from '@/app/core/models/common/card.model';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { HISTORIAL_RECIENTE_MOCK, PROXIMAS_CITAS_MOCK, RESUMEN_CLIENTE_MOCK } from '@/app/core/config/privado-mock.config';

type Rol = 'admin' | 'barbero' | 'cliente';

/** Cita tal como la pinta el barbero (mock o API) */
type CitaBarbero = {
  horaInicio?: string;
  hora?: string;
  nombreCliente?: string;
  apellidoCliente?: string;
  servicios?: Array<{ nombreCorte?: string; servicioNombre?: string; precio?: number }>;
  estado?: string;
  estadoReserva?: string;
};

/** Reserva tal como la pinta el cliente */
interface CitaResumen {
  reservaId: number;
  fecha: string;
  hora: string;
  servicio: string;
  barbero: string;
  estado: string;
  monto: number | string;
}

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [
    CommonModule, DatePipe, RouterLink, TableModule,
    StatsComponent, StatusBadgeComponent, ButtonComponent,
  ],
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
})
export class ResumenComponent implements OnInit, OnDestroy {
  // Un solo canvas visible a la vez (admin: predicción, barbero: semana). El cliente no usa gráficos.
  @ViewChild('barCanvas') barCanvas?: ElementRef<HTMLCanvasElement>;

  private tokenService = inject(TokenService);
  private barberoSvc = inject(BarberoService);
  private clienteSvc = inject(ResumenCliente);
  private router = inject(Router);
  private chart?: Chart;

  // ─────────────── Rol ───────────────
  rol: Rol = 'cliente';
  get esAdmin()   { return this.rol === 'admin'; }
  get esBarbero() { return this.rol === 'barbero'; }
  get esCliente() { return this.rol === 'cliente'; }

  loading = true;
  error: string | null = null;

  // ─────────────── ADMIN ───────────────
  kpiCards: KpiCard[] = [];
  citas: CitaBarberoResponseDTO[] = [];
  loadingCitas = false;
  loadingPrediccion = true;
  diaPico = '';
  totalEstimado = 0;

  readonly kpiCardsMemoria: KpiCard[] = [
    { label: 'Total clientes', value: '840', delta: '+8.2% este mes', deltaPositive: true, icon: 'users' },
    { label: 'Clientes activos', value: '612', delta: '-1.4% esta semana', deltaPositive: false, icon: 'user' },
    { label: 'Nuevos clientes', value: '28', delta: '+12.6% este mes', deltaPositive: true, icon: 'user-plus' },
    { label: 'Retención', value: '72.8%', delta: '+3.1% vs. mes anterior', deltaPositive: true, icon: 'chart-line' },
    { label: 'Servicios realizados', value: '319', delta: '+7.4% este mes', deltaPositive: true, icon: 'sparkles' },
    { label: 'Ingresos totales', value: 'S/ 18,460', delta: '+9.8% este mes', deltaPositive: true, icon: 'dollar' },
  ];

  readonly citasMemoria: CitaBarberoResponseDTO[] = [
    { idReserva: 1, nombreCliente: 'Carlos', apellidoCliente: 'Ramírez', telefonoCliente: '999 123 456', fecha: '2026-10-07', horaInicio: '09:00', estado: 'CONFIRMADA', tipoReserva: 'ONLINE', servicios: [{ servicioNombre: 'Corte clásico', precio: 25, duracionMinutos: 30 }] },
    { idReserva: 2, nombreCliente: 'Miguel', apellidoCliente: 'Torres', telefonoCliente: '988 654 321', fecha: '2026-10-07', horaInicio: '10:30', estado: 'PENDIENTE', tipoReserva: 'PRESENCIAL', servicios: [{ servicioNombre: 'Corte + barba', precio: 40, duracionMinutos: 45 }] },
    { idReserva: 3, nombreCliente: 'Andrés', apellidoCliente: 'Vargas', telefonoCliente: '977 246 810', fecha: '2026-10-07', horaInicio: '12:00', estado: 'EN_PROCESO', tipoReserva: 'ONLINE', servicios: [{ servicioNombre: 'Afeitado premium', precio: 30, duracionMinutos: 30 }] },
  ];

  // ─────────────── BARBERO ───────────────
  nombre = '';
  barberoId = 0;
  isOcupado = false;
  pctComision = 0;
  sueldoBase = 0;
  cortesHoy = 0;
  metaCortes = 0;
  ingresosHoy = 0;
  comisionHoy = 0;
  clientesHoy = 0;
  citasBarbero: CitaBarbero[] = [];
  dias: Array<{ fecha: string; atendidos: number }> = [];
  comisionSemanal = 0;
  totalSemana = 0;

  // ─────────────── CLIENTE ───────────────
  username = '';
  proximasCitas: CitaResumen[] = [];
  historialReciente: CitaResumen[] = [];
  kpis: ClienteDetalleResumenDTO | null = null;
  seleccionada: CitaResumen | null = null; // la que se muestra en el card de detalle

  // ═══════════════════════════════════════════════════════════════════════
  ngOnInit(): void {
    this.rol = this.resolverRol();
    if (this.esCliente) this.cargarCliente();
    else if (this.esBarbero) this.cargarBarbero();
    else this.cargarAdmin();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  /** Lo desconocido NO cae en admin: cae en cliente (el rol con menos permisos) */
  private resolverRol(): Rol {
    const r = (this.tokenService.getPrimaryRole() ?? '').toLowerCase().replace('role_', '');
    return r === 'admin' || r === 'barbero' ? r : 'cliente';
  }

  // ═══════════════════════════ ADMIN ═══════════════════════════
  private cargarAdmin(): void {
    this.kpiCards = this.kpiCardsMemoria;
    this.citas = this.citasMemoria;
    this.loading = false;
    this.cargarPrediccion();
  }

  refrescarCitas(): void {
    this.loadingCitas = true;
    setTimeout(() => { this.loadingCitas = false; }, 250);
  }

  private cargarPrediccion(): void {
    const preds: PrediccionDia[] = [
      { dia: 'Lun', clientes_predichos: 18 },
      { dia: 'Mar', clientes_predichos: 22 },
      { dia: 'Mié', clientes_predichos: 21 },
      { dia: 'Jue', clientes_predichos: 31 },
      { dia: 'Vie', clientes_predichos: 42 },
      { dia: 'Sáb', clientes_predichos: 46 },
      { dia: 'Dom', clientes_predichos: 28 },
    ];
    const vals = preds.map(p => p.clientes_predichos);
    const max = Math.max(...vals);
    this.diaPico = preds.find(p => p.clientes_predichos === max)?.dia ?? '';
    this.totalEstimado = vals.reduce((a, b) => a + b, 0);
    this.loadingPrediccion = false;

    this.pintar({
      type: 'line',
      data: {
        labels: preds.map(p => p.dia),
        datasets: [{
          data: vals, label: 'Clientes estimados',
          borderColor: '#d4af37', backgroundColor: 'rgba(184, 134, 11, 0.22)',
          borderWidth: 2, pointRadius: 0, pointHoverRadius: 4, tension: 0.4, fill: true,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#1a1a1a', titleColor: '#d4af37', bodyColor: '#aaa' },
        },
        scales: {
          x: { ticks: { color: '#888', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } },
          y: { beginAtZero: true, max: 60, ticks: { color: '#888', stepSize: 15, font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } },
        },
      },
    });
  }

  getNombreCompleto(cita: CitaBarberoResponseDTO): string {
    return `${cita.nombreCliente} ${cita.apellidoCliente}`.trim();
  }

  getServicioResumen(cita: CitaBarberoResponseDTO): string {
    if (!cita.servicios?.length) return '—';
    return cita.servicios.map(s => this.nombreServicio(s)).filter(Boolean).join(', ');
  }

  getEstadoClass(estado: EstadoReserva): string {
    const map: Record<EstadoReserva, string> = {
      PENDIENTE: 'badge-warning', CONFIRMADA: 'badge-info', EN_PROCESO: 'badge-primary',
      COMPLETADA: 'badge-success', CANCELADA: 'badge-danger',
    };
    return map[estado] ?? 'badge-warning';
  }

  getEstadoLabel(estado: EstadoReserva): string {
    const map: Record<EstadoReserva, string> = {
      PENDIENTE: 'Pendiente', CONFIRMADA: 'Confirmada', EN_PROCESO: 'En proceso',
      COMPLETADA: 'Completada', CANCELADA: 'Cancelada',
    };
    return map[estado] ?? estado;
  }

  trackByKpi(_: number, kpi: KpiCard): string { return kpi.label; }
  trackByCita(_: number, cita: CitaBarberoResponseDTO): number { return cita.idReserva; }

  // ═══════════════════════════ BARBERO ═══════════════════════════
  private cargarBarbero(): void {
    if (environment.useMockData) {
      this.cargarBarberoMock();
      return;
    }

    this.barberoSvc.getPerfil().subscribe({
      next: ({ data: perfil }) => {
        this.nombre = `${perfil.nombre} ${perfil.apellido}`;
        this.barberoId = perfil.barberoId;
        this.isOcupado = perfil.ocupado;
        this.sueldoBase = perfil.sueldo ?? 0;
        this.pctComision = perfil.comision ?? 0;
        const pct = this.pctComision / 100;

        forkJoin([
          this.barberoSvc.getStatsHoy(this.barberoId),
          this.barberoSvc.getCitasHoy(),
          this.barberoSvc.getResumenSemanal(this.barberoId),
        ]).subscribe({
          next: ([statsRes, citasRes, semanalRes]) => {
            const stats = statsRes.data;
            const semanal = semanalRes.data;

            this.cortesHoy = stats.completados ?? 0;
            this.metaCortes = stats.totalDia ?? 12;
            this.ingresosHoy = stats.reservas?.reduce((s: number, r: any) => s + (r.total ?? 0), 0) ?? 0;
            this.comisionHoy = Math.round(this.ingresosHoy * pct * 100) / 100;
            this.clientesHoy = this.cortesHoy;

            this.citasBarbero = Array.isArray(citasRes) ? citasRes : (citasRes as any)?.data ?? [];
            this.dias = semanal.dias ?? [];
            this.comisionSemanal = semanal.comisionSemanal ?? 0;
            this.totalSemana = semanal.totalSemana ?? 0;
            this.sueldoBase = semanal.sueldoBase ?? this.sueldoBase;

            this.loading = false;
            this.pintarSemana();
          },
          error: () => { this.loading = false; },
        });
      },
      error: () => { this.nombre = 'Barbero'; this.loading = false; },
    });
  }

  private cargarBarberoMock(): void {
    this.nombre = 'Gersone M';
    this.isOcupado = true;
    this.pctComision = 10;
    this.sueldoBase = 0;

    this.citasBarbero = [
      { horaInicio: '13:30:00', nombreCliente: 'Ana', apellidoCliente: 'Torres', servicios: [{ nombreCorte: 'Fade', precio: 20 }], estado: 'FINALIZADA' },
    ];
    const finalizadas = this.citasBarbero.filter(c => this.getEstado(c) === 'FINALIZADA');

    this.cortesHoy = finalizadas.length;
    this.metaCortes = this.citasBarbero.length;
    this.ingresosHoy = finalizadas.reduce((s, c) => s + this.getPrecio(c), 0);
    this.comisionHoy = Number((this.ingresosHoy * this.pctComision / 100).toFixed(2));
    this.clientesHoy = this.cortesHoy;

    const previos = [2, 3, 1, 4, 2, 3];
    const hoy = new Date();
    this.dias = [
      ...previos.map((atendidos, i) => {
        const d = new Date(hoy);
        d.setDate(hoy.getDate() - (previos.length - i));
        return { fecha: this.toIsoDate(d), atendidos };
      }),
      { fecha: this.toIsoDate(hoy), atendidos: this.cortesHoy },
    ];

    const totalCortes = this.dias.reduce((s, d) => s + d.atendidos, 0);
    this.comisionSemanal = Number((totalCortes * 20 * this.pctComision / 100).toFixed(2));
    this.totalSemana = this.sueldoBase + this.comisionSemanal;

    this.loading = false;
    this.pintarSemana();
  }

  private pintarSemana(): void {
    this.pintar({
      type: 'bar',
      data: {
        labels: this.dias.map(d => this.getDiaLabel(d)),
        datasets: [{
          data: this.dias.map(d => d.atendidos ?? 0),
          backgroundColor: '#D4AF37', borderRadius: 4, borderSkipped: false,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: any) => `${ctx.raw} cortes` } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { font: { size: 10 }, color: '#888', stepSize: 1, callback: (v: any) => (Number.isInteger(v) ? v : '') },
            grid: { color: 'rgba(128,128,128,0.1)' },
          },
          x: { ticks: { font: { size: 10 }, color: '#888' }, grid: { display: false } },
        },
      },
    });
  }

  toggleEstado(): void {
    if (environment.useMockData) {
      this.isOcupado = !this.isOcupado;
      return;
    }
    this.barberoSvc.toggleOcupado(this.barberoId).subscribe({
      next: ({ data }) => { this.isOcupado = data.estado === 'ocupado' || data.status === 'ocupado'; },
      error: () => { this.isOcupado = !this.isOcupado; },
    });
  }

  get primerNombre(): string { return this.nombre.split(' ')[0] || 'Barbero'; }
  get primerApellido(): string { return this.nombre.split(' ')[1] ?? ''; }
  get estadoLabel(): string { return this.isOcupado ? 'Estado: Ocupado' : 'Estado: Disponible'; }
  get citasPendientes(): number {
    return this.citasBarbero.filter(c => ['PENDIENTE', 'CONFIRMADA'].includes(this.getEstado(c))).length;
  }

  getEstado(c: CitaBarbero): string { return c.estado ?? c.estadoReserva ?? ''; }
  getHora(c: CitaBarbero): string { return (c.horaInicio ?? c.hora ?? '').substring(0, 5); }
  getNombreCliente(c: CitaBarbero): string { return `${c.nombreCliente ?? ''} ${c.apellidoCliente ?? ''}`.trim(); }
  getNombreServicio(c: CitaBarbero): string {
    return (c.servicios ?? []).map(s => this.nombreServicio(s)).filter(Boolean).join(', ');
  }
  getPrecio(c: CitaBarbero): number {
    return (c.servicios ?? []).reduce((t, s) => t + this.precioServicio(s), 0);
  }
  getDiaLabel(d: { fecha: string }): string {
    return new Date(`${d.fecha}T00:00:00`).toLocaleDateString('es-PE', { weekday: 'short' });
  }

  get statsBarbero(): StatsCard[] {
    return [
      { title: 'Cortes hoy', value: this.cortesHoy, description: `Meta: ${this.metaCortes} cortes`, icon: 'pi pi-scissors' },
      { title: 'Ingresos hoy', value: `S/ ${this.ingresosHoy.toFixed(0)}`, description: `${this.clientesHoy} clientes atendidos`, icon: 'pi pi-wallet', accentClass: 'bg-green-500', accentTextClass: 'text-green-400', iconBgClass: 'bg-green-500/10' },
      { title: 'Comisión hoy', value: `S/ ${this.comisionHoy.toFixed(2)}`, description: `${this.pctComision}% sobre ingresos`, icon: 'pi pi-percentage', accentClass: 'bg-blue-500', accentTextClass: 'text-blue-400', iconBgClass: 'bg-blue-500/10' },
      { title: 'Clientes hoy', value: this.clientesHoy, description: `${this.citasPendientes} pendientes`, icon: 'pi pi-users', accentClass: 'bg-teal-500', accentTextClass: 'text-teal-400', iconBgClass: 'bg-teal-500/10' },
    ];
  }

  // ═══════════════════════════ CLIENTE ═══════════════════════════
  private cargarCliente(): void {
    this.username = this.tokenService.getUserDisplayName() || 'Cliente Demo';

    if (environment.useMockData) {
      this.proximasCitas = PROXIMAS_CITAS_MOCK.map(r => this.mapCita(r));
      this.historialReciente = HISTORIAL_RECIENTE_MOCK.map(r => this.mapCita(r));
      this.kpis = RESUMEN_CLIENTE_MOCK;
      this.seleccionada = this.proximasCitas[0] ?? null;
      this.loading = false;
      return;
    }

    this.clienteSvc.cargarDashboard().subscribe({
      next: ({ proximasCitas, historialReciente, kpis }) => {
        this.proximasCitas = proximasCitas.map((r: any) => this.mapCita(r));
        this.historialReciente = historialReciente.map((r: any) => this.mapCita(r));
        this.kpis = kpis;
        this.seleccionada = this.proximasCitas[0] ?? null;
        this.loading = false;
      },
      error: (err) => {
        console.error('ERROR DASHBOARD:', err);
        this.error = 'Error al cargar el dashboard. Intenta nuevamente.';
        this.loading = false;
      },
    });
  }

  /** Sirve para mock (estado) y para API (estadoReserva) */
  private mapCita(r: any): CitaResumen {
    return {
      reservaId: r.reservaId,
      fecha: r.fecha,
      hora: r.horaInicio?.substring(0, 5) ?? '--',
      servicio: r.servicio ?? '—',
      barbero: r.barberoNombre ?? '—',
      estado: r.estadoReserva ?? r.estado ?? '',
      monto: r.tipoReserva === 'RESERVA_GRATIS' ? 'Gratis' : (r.total ?? '—'),
    };
  }

  seleccionar(cita: CitaResumen): void { this.seleccionada = cita; }

  // Rutas que existen en app.routes.ts
  onVerDetalle(id: number): void { this.router.navigate(['/mi-cuenta/reservas/mis-reservas'], { queryParams: { reservaId: id } }); }
  onVerHistorial(): void { this.router.navigate(['/mi-cuenta/historial']); }

  get statsCliente(): StatsCard[] {
    if (!this.kpis) return [];
    return [
      { title: 'Cortes', value: this.kpis.totalCortes, description: 'Últimas semanas', icon: 'pi pi-scissors' },
      { title: 'Total gastado', value: `S/ ${this.kpis.totalGastado}`, description: 'Acumulado', icon: 'pi pi-wallet', accentClass: 'bg-green-500', accentTextClass: 'text-green-400', iconBgClass: 'bg-green-500/10' },
      { title: 'Última visita', value: this.formatFechaCorta(this.kpis.ultimaVisita), description: this.formatUltimaVisita(this.kpis.ultimaVisita), icon: 'pi pi-calendar', accentClass: 'bg-blue-500', accentTextClass: 'text-blue-400', iconBgClass: 'bg-blue-500/10' },
      { title: 'Reservas activas', value: this.kpis.totalReservas, description: 'Próximas citas', icon: 'pi pi-book', accentClass: 'bg-teal-500', accentTextClass: 'text-teal-400', iconBgClass: 'bg-teal-500/10' },
    ];
  }

  private parseFecha(fecha: string): Date | null {
    if (!fecha || fecha === 'Sin visitas') return null;
    const d = new Date(fecha.includes('T') ? fecha : `${fecha}T00:00:00`);
    return isNaN(d.getTime()) ? null : d;
  }

  formatFechaCorta(fecha: string): string {
    return this.parseFecha(fecha)?.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }) ?? '—';
  }

  formatFechaCita(fecha: string): string {
    return this.parseFecha(fecha)?.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }) ?? '—';
  }

  formatFechaTabla(fecha: string): string {
    return this.parseFecha(fecha)?.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }) ?? '--';
  }

  formatUltimaVisita(fecha: string): string {
    const d = this.parseFecha(fecha);
    if (!d) return 'Sin visitas';
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    const dias = Math.floor((hoy.getTime() - d.getTime()) / 86400000);
    if (dias < 0) return 'Reciente';
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 30) return `Hace ${dias} días`;
    const meses = Math.floor(dias / 30);
    return `Hace ${meses} mes${meses > 1 ? 'es' : ''}`;
  }

  // ═══════════════════════════ UTILIDADES ═══════════════════════════
  /** Crea/recrea el gráfico cuando el canvas ya está en el DOM */
  private pintar(config: ChartConfiguration): void {
    setTimeout(() => {
      const el = this.barCanvas?.nativeElement;
      if (!el) return;
      this.chart?.destroy();
      this.chart = new Chart(el, config);
    }, 0);
  }

  private nombreServicio(s: any): string {
    return s?.nombreCorte || s?.servicioNombre || '';
  }

  private precioServicio(s: any): number {
    return typeof s?.precio === 'number' ? s.precio : 0;
  }

  private toIsoDate(date: Date): string {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
}