import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import Chart, { ChartConfiguration } from 'chart.js/auto'; // 'auto' ya registra todos los controladores
import { environment } from '@/environments/environment'; // ajusta la ruta si tu alias es otro
import { TokenService } from '@/app/core/services/auth/token.service';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { ResumenCliente } from '@/app/core/services/gestion/resumen-cliente.service';
import { ResumenadminService } from '@/app/core/services/gestion/resumen-admin.service';
import { DashboardData, KpiCard, CitaBarberoResponseDTO, EstadoReserva } from '@/app/core/models/gestion/admin/resumen-admin';
import { ClienteDetalleResumenDTO } from '@/app/core/models/gestion/cliente/ClienteResumen.model';
import { PrediccionService, PrediccionDia, PrediccionResponse } from '@/app/core/services/analisis/prediccion.service';
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
    CommonModule, RouterLink, TableModule,
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
  private resumenSvc = inject(ResumenadminService);
  private prediccionSvc = inject(PrediccionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private chart?: Chart;
  private destroy$ = new Subject<void>();

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

ngOnInit(): void {
  this.rol = this.resolverRol();
  console.log('mock:', environment.useMockData, '| rol:', this.rol);
  if (this.esCliente) this.cargarCliente();
  else if (this.esBarbero) this.cargarBarbero();
  else this.cargarAdmin();
}

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Lo desconocido NO cae en admin: cae en cliente (el rol con menos permisos) */
  private resolverRol(): Rol {
    const r = (this.tokenService.getPrimaryRole() ?? '').toLowerCase().replace('role_', '');
    return r === 'admin' || r === 'barbero' ? r : 'cliente';
  }

  // ═══════════════════════════ ADMIN ═══════════════════════════
  private cargarAdmin(): void {
    this.loading = true;
    this.error = null;

    this.resumenSvc.getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: DashboardData) => {
          this.kpiCards = this.resumenSvc.buildKpiCards(data);
          this.citas = data.citas ?? [];
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando dashboard:', err);
          this.error = 'No se pudo cargar el dashboard. Verifica la conexión.';
          this.loading = false;
        },
      });

    this.cargarPrediccion();
  }

  refrescarCitas(): void {
    this.loadingCitas = true;
    this.resumenSvc.getCitasHoy()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (citas) => { this.citas = citas; this.loadingCitas = false; },
        error: () => { this.loadingCitas = false; },
      });
  }

  private cargarPrediccion(): void {
    this.loadingPrediccion = true;

    this.prediccionSvc.getPredicciones()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: PrediccionResponse) => {
          const preds: PrediccionDia[] = res.predicciones ?? [];
          const vals = preds.map(p => p.clientes_predichos);
          const max = vals.length ? Math.max(...vals) : 0;

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
                // sin "max" fijo: se ajusta a los datos reales del backend
                y: { beginAtZero: true, ticks: { color: '#888', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false } },
              },
            },
          });
        },
        error: () => { this.loadingPrediccion = false; },
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
  // ═══════════════════════════ BARBERO ═══════════════════════════
  private cargarBarbero(): void {
    this.barberoSvc.getPerfil().pipe(takeUntil(this.destroy$)).subscribe({
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
        ]).pipe(takeUntil(this.destroy$)).subscribe({
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
            this.cdr.detectChanges();
            this.pintarSemana();
          },
          error: (err) => {
            console.error('Error cargando resumen barbero:', err);
            this.loading = false;
            this.cdr.detectChanges();
          },
        });
      },
      error: (err) => {
        console.error('Error cargando perfil barbero:', err);
        this.nombre = 'Barbero';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
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
    this.barberoSvc.toggleOcupado(this.barberoId).pipe(takeUntil(this.destroy$)).subscribe({
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

    this.clienteSvc.cargarDashboard().pipe(takeUntil(this.destroy$)).subscribe({
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