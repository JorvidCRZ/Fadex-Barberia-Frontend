import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Observable, finalize, forkJoin } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { BarberoService, DireccionOrden, FiltroBarberoBusqueda, OrdenarBarberoPor } from '@/app/core/services/gestion/barbero.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ResumenGeneralBarbero } from '@/app/core/models/gestion/barbero/barbero-resumen.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { BadgeTone } from '@/app/core/config/status-badge.config';
import { FILTROS_BARBERO } from '@/app/core/config/filtros.config';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { BarberoRegistroComponent } from './barbero-registro.component';
import { BarberoEditarComponent } from './barbero-editar.component';
import { BarberoVista, aBarberoVista } from './barbero-utils.component';
import { BarberoDetalleComponent } from './babero-detalle.component';

type Modo = 'normal' | 'inhabilitados' | 'busqueda';

@Component({
  selector: 'app-barberos',
  standalone: true,
  imports: [
    TableModule, MonedaPipe,
    PageHeaderComponent, SearchBarComponent, ButtonComponent, StatsComponent, FiltrosComponent, PaginatorComponent,
    StatusBadgeComponent, ConfirmPopoverComponent,
    BarberoRegistroComponent, BarberoDetalleComponent, BarberoEditarComponent,
  ],
  templateUrl: './barbero.html',
})
export class BarberoComponent implements OnInit {
  private readonly service = inject(BarberoService);
  private readonly notify = inject(NotificationService);

  readonly filtrosFields = [...FILTROS_BARBERO];

  barberos = signal<BarberoVista[]>([]);
  total = signal(0);
  first = signal(0);
  rows = signal(10);
  cargando = signal(false);
  stats = signal<StatsCard[]>([]);

  termino = signal('');
  soloInhabilitados = signal(false);
  private filtros: FiltroBarberoBusqueda = {};

  modo = computed<Modo>(() => (this.termino() ? 'busqueda' : this.soloInhabilitados() ? 'inhabilitados' : 'normal'));

  mostrarCrear = signal(false);
  mostrarDetalle = signal(false);
  mostrarEditar = signal(false);
  barberoIdSel = signal<number | null>(null);
  procesandoId = signal<number | null>(null);
  confirmarVisible = signal(false);
  barberoPorDeshabilitar = signal<BarberoVista | null>(null);
  mensajeConfirmacion = computed(
    () => `¿Deshabilitar a ${this.barberoPorDeshabilitar()?.nombreCompleto ?? 'este barbero'}? Dejará de aparecer para nuevas reservas. Podrás reactivarlo desde el switch.`,
  );

  ngOnInit(): void {
    this.cargar();
    this.cargarStats();
  }


  private cargar(): void {
    if (this.termino()) {
      this.buscarPorNombre();
      return;
    }

    const size = this.rows();
    const page = Math.floor(this.first() / size);
    const inhabilitados = this.soloInhabilitados();
    const usaFiltros = Boolean(this.filtros.estado || this.filtros.ordenarPor || this.filtros.direccion);

    const request$: Observable<any> = inhabilitados
      ? this.service.listarInhabilitados(page, size)
      : usaFiltros
        ? this.service.buscar(this.filtros, page, size)
        : this.service.listar(page, size);

    this.cargando.set(true);
    request$.pipe(finalize(() => this.cargando.set(false))).subscribe({
      next: (res: any) => this.aplicarPagina(res, inhabilitados),
      error: (err) => this.alFallar(err),
    });
  }

  private aplicarPagina(res: any, inhabilitado: boolean): void {
    const pagina = res?.data;
    if (!res?.success || !pagina) {
      this.barberos.set([]);
      this.total.set(0);
      return;
    }
    this.barberos.set((pagina.content ?? []).map((b: any) => aBarberoVista(b, { inhabilitado })));
    this.total.set(pagina.totalElements ?? 0);
  }

  /** El buscador mira activos e inhabilitados a la vez. Trae todo en una sola "página" */
  private buscarPorNombre(): void {
    const termino = this.termino();
    const minusculas = termino.toLowerCase();

    this.cargando.set(true);
    forkJoin({
      activos: this.service.buscarPorNombre(termino, 0, 100),
      inhabilitados: this.service.listarInhabilitados(0, 100),
    })
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: ({ activos, inhabilitados }) => {
          const act = (activos?.data?.content ?? []).map((b: any) => aBarberoVista(b));
          const inh = (inhabilitados?.data?.content ?? [])
            .map((b: any) => aBarberoVista(b, { inhabilitado: true }))
            .filter((b: BarberoVista) => `${b.nombreCompleto} ${b.email}`.toLowerCase().includes(minusculas));

          const unicos = [...new Map([...act, ...inh].map((b) => [b.barberoId, b])).values()];
          this.barberos.set(unicos);
          this.total.set(unicos.length);
        },
        error: (err) => this.alFallar(err),
      });
  }

  private alFallar(err: unknown): void {
    this.barberos.set([]);
    this.total.set(0);
    this.notify.showHttpError(err, 'Error cargando barberos');
  }

  private cargarStats(): void {
    this.service.obtenerResumenGeneral().subscribe({
      next: (res) => this.stats.set(this.aStats(res.data)),
      error: () => this.stats.set([]),
    });
  }

  private aStats(d: ResumenGeneralBarbero): StatsCard[] {
    const money = (n: number) => `S/ ${Number(n ?? 0).toLocaleString('es-PE', { minimumFractionDigits: 0 })}`;
    return [
      { title: 'Total barberos', value: d.totalBarberos, icon: 'pi pi-users', description: 'Registrados en el sistema' },
      { title: 'Disponibles', value: d.disponibles, icon: 'pi pi-check-circle', description: 'Listos para atender', accentClass: 'bg-green-500', accentTextClass: 'text-green-400', iconBgClass: 'bg-green-500/10' },
      { title: 'Ocupados', value: d.ocupados, icon: 'pi pi-clock', description: 'Atendiendo ahora', accentClass: 'bg-orange-500', accentTextClass: 'text-orange-400', iconBgClass: 'bg-orange-500/10' },
      { title: 'Ventas hoy', value: money(d.ventasHoy), icon: 'pi pi-dollar', description: `${d.porcentajeVsAyer} vs ayer`, accentClass: 'bg-blue-500', accentTextClass: 'text-blue-400', iconBgClass: 'bg-blue-500/10' },
      { title: 'Mejor del mes', value: d.mejorDelMes || '—', icon: 'pi pi-star', description: `${money(d.totalGeneradoMejor)} generados` },
    ];
  }

  // ═══════════════ Búsqueda, filtros y paginador ═══════════════

  onSearch(query: string): void {
    this.termino.set(query.trim());
    this.first.set(0);
    this.cargar();
  }

  onBuscarFiltros(v: { estado?: string; orden?: string }): void {
    this.first.set(0);

    if (v.estado === 'inhabilitados') {
      this.soloInhabilitados.set(true);
      this.filtros = {};
    } else {
      this.soloInhabilitados.set(false);
      const { ordenarPor, direccion } = this.parseOrden(v.orden ?? '');
      this.filtros = {
        estado: (v.estado as FiltroBarberoBusqueda['estado']) || 'todos',
        ordenarPor,
        direccion,
      };
    }
    this.cargar();
  }

  onLimpiar(): void {
    this.soloInhabilitados.set(false);
    this.filtros = {};
    this.first.set(0);
    this.cargar();
  }

  onPage(event: PaginatorState): void {
    this.rows.set(event.rows ?? this.rows());
    this.first.set(event.first ?? 0);
    this.cargar();
  }

  private parseOrden(orden: string): { ordenarPor?: OrdenarBarberoPor; direccion?: DireccionOrden } {
    const [campo, direccion] = orden.split('_');
    const campos = ['fechaIngreso', 'experiencia', 'sueldo', 'comision'];
    return {
      ordenarPor: campos.includes(campo) ? (campo as OrdenarBarberoPor) : undefined,
      direccion: direccion === 'asc' || direccion === 'desc' ? direccion : undefined,
    };
  }

  // ═══════════════ Fila ═══════════════

  /** El switch y el badge "Activo / Inhabilitado" salen de aquí */
  activo(b: BarberoVista): boolean {
    return !b.inhabilitado;
  }

  /** Disponible u ocupado: lo cambia el propio barbero desde su panel, aquí solo se muestra */
  disponibilidad(b: BarberoVista): { label: string; tone: BadgeTone } {
    return b.ocupado ? { label: 'Ocupado', tone: 'warning' } : { label: 'Disponible', tone: 'success' };
  }

  // ═══════════════ Acciones ═══════════════

  abrirCrear(): void {
    this.mostrarCrear.set(true);
  }

  ver(b: BarberoVista): void {
    this.barberoIdSel.set(b.barberoId);
    this.mostrarDetalle.set(true);
  }

  editar(b: BarberoVista): void {
    this.editarPorId(b.barberoId);
  }

  /** Desde el modal de detalle: lo cierra y abre el de edición */
  editarPorId(id: number): void {
    this.mostrarDetalle.set(false);
    this.barberoIdSel.set(id);
    this.mostrarEditar.set(true);
  }

  /** Switch de la tabla: activo → pide confirmación; inhabilitado → reactiva directo */
  cambiarEstado(b: BarberoVista): void {
    if (this.activo(b)) {
      this.barberoPorDeshabilitar.set(b);
      this.confirmarVisible.set(true);
    } else {
      this.reactivar(b);
    }
  }

  cerrarConfirmacion(): void {
    this.confirmarVisible.set(false);
    this.barberoPorDeshabilitar.set(null);
  }

  confirmarDeshabilitar(): void {
    const b = this.barberoPorDeshabilitar();
    if (!b) return;
    this.cerrarConfirmacion();

    this.procesandoId.set(b.barberoId);
    this.service
      .deshabilitar(b.barberoId)
      .pipe(finalize(() => this.procesandoId.set(null)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Barbero deshabilitado correctamente', 'Deshabilitado');
          this.recargarTrasCambio();
        },
        error: (err) => this.notify.showHttpError(err, 'Deshabilitar barbero'),
      });
  }

  private reactivar(b: BarberoVista): void {
    this.procesandoId.set(b.barberoId);
    this.service
      .reactivar(b.barberoId)
      .pipe(finalize(() => this.procesandoId.set(null)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Barbero reactivado correctamente', 'Reactivado');
          this.recargarTrasCambio();
        },
        error: (err) => this.notify.showHttpError(err, 'Reactivar barbero'),
      });
  }

  /** Si se vació la última página al deshabilitar/reactivar, retrocede una */
  private recargarTrasCambio(): void {
    if (this.modo() !== 'busqueda' && this.barberos().length === 1 && this.first() > 0) {
      this.first.set(Math.max(0, this.first() - this.rows()));
    }
    this.alCambiar();
  }

  /** Tras crear, editar, deshabilitar o reactivar: refresca tabla y KPIs */
  alCambiar(): void {
    this.cargar();
    this.cargarStats();
  }
}