import { Component, OnInit, computed, signal } from '@angular/core';
import { BadgeTone } from '../../../../../core/config/status-badge.config';
import { FIDELIZACION_RECOMPENSAS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
import { StatsCard } from '../../../../../core/models/common/card.model';
import { EstadoRecompensa, RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { PillTab, PillTabsComponent } from '../../../../../shared/components/pill-tabs/pill-tabs.component';
import { StatsComponent } from '../../../../../shared/components/stats/stats.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';

type TabRecompensa = 'TODAS' | 'PENDIENTES' | 'USADAS';

@Component({
  selector: 'app-mis-premios',
  standalone: true,
  imports: [StatsComponent, PillTabsComponent, StatusBadgeComponent, EmptyStateComponent, ButtonComponent, DateFormatPipe],
  templateUrl: './mis-premios.html',
})
export class MisPremiosComponent implements OnInit {
  // Backend: private recompensaService = inject(RecompensaService);

  readonly EstadoRecompensa = EstadoRecompensa;

  readonly tabs: PillTab<TabRecompensa>[] = [
    { value: 'TODAS', label: 'Todas', icon: 'pi-list' },
    { value: 'PENDIENTES', label: 'Pendientes', icon: 'pi-clock' },
    { value: 'USADAS', label: 'Usadas', icon: 'pi-check-circle' },
  ];

  recompensas = signal<RecompensaObtenida[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  tabActivo = signal<TabRecompensa>('TODAS');

  recompensasFiltradas = computed(() => {
    const lista = this.recompensas();
    switch (this.tabActivo()) {
      case 'PENDIENTES': return lista.filter((r) => r.estado === EstadoRecompensa.PENDIENTE);
      case 'USADAS': return lista.filter((r) => r.estado === EstadoRecompensa.CANJEADO);
      default: return lista;
    }
  });

  /** Tarjetas de resumen: ahora usan <app-stats> como el resto de la app */
  resumen = computed<StatsCard[]>(() => [
    { title: 'Total', value: this.recompensas().length, icon: 'pi pi-th-large', accentClass: 'bg-text-muted', iconBgClass: 'bg-ui-elevated', accentTextClass: 'text-text-secondary' },
    { title: 'Pendientes', value: this.contarPorEstado(EstadoRecompensa.PENDIENTE), icon: 'pi pi-clock' },
    { title: 'Usadas', value: this.contarPorEstado(EstadoRecompensa.CANJEADO), icon: 'pi pi-check-circle', accentClass: 'bg-green-400', iconBgClass: 'bg-green-500/10', accentTextClass: 'text-green-400' },
  ]);

  ngOnInit(): void {
    this.cargarRecompensas();
  }

  cargarRecompensas(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.recompensas.set([...FIDELIZACION_RECOMPENSAS_MOCK]);
    this.cargando.set(false);

    // Backend:
    // this.recompensaService.obtenerMisRecompensas().subscribe({ ... });
  }

  contarPorEstado(estado: EstadoRecompensa): number {
    return this.recompensas().filter((r) => r.estado === estado).length;
  }

  estadoLabel(estado: EstadoRecompensa): string {
    switch (estado) {
      case EstadoRecompensa.PENDIENTE: return 'Pendiente';
      case EstadoRecompensa.CANJEADO: return 'Usada';
      case EstadoRecompensa.VENCIDO: return 'Vencida';
      case EstadoRecompensa.ANULADO: return 'Anulada';
      default: return estado;
    }
  }

  estadoTono(estado: EstadoRecompensa): BadgeTone {
    switch (estado) {
      case EstadoRecompensa.PENDIENTE: return 'warning';
      case EstadoRecompensa.CANJEADO: return 'success';
      case EstadoRecompensa.VENCIDO:
      case EstadoRecompensa.ANULADO: return 'danger';
      default: return 'neutral';
    }
  }

  iconoFondoClase(estado: EstadoRecompensa): string {
    switch (estado) {
      case EstadoRecompensa.PENDIENTE: return 'bg-brand-gold-soft text-brand-gold';
      case EstadoRecompensa.CANJEADO: return 'bg-green-500/10 text-green-400';
      default: return 'bg-red-500/10 text-red-400';
    }
  }

  iconoPremio(itemNombre: string): string {
    const nombre = itemNombre.toLowerCase();
    if (nombre.includes('descuento') || nombre.includes('%')) return 'pi pi-tag';
    if (nombre.includes('corte')) return 'pi pi-ticket';
    if (nombre.includes('producto')) return 'pi pi-shopping-bag';
    if (nombre.includes('cupón') || nombre.includes('cupon')) return 'pi pi-gift';
    if (nombre.includes('servicio')) return 'pi pi-verified';
    return 'pi pi-star-fill';
  }

  iconoEstadoVacio(): string {
    switch (this.tabActivo()) {
      case 'PENDIENTES': return 'pi-clock';
      case 'USADAS': return 'pi-check-circle';
      default: return 'pi-inbox';
    }
  }

  /** Texto + fecha por separado para formatear la fecha con el pipe dateHelper */
  fechaInfo(r: RecompensaObtenida): { prefijo: string; fecha: string } | null {
    if (r.estado === EstadoRecompensa.CANJEADO && r.fechaCanje) return { prefijo: 'Usada el:', fecha: r.fechaCanje };
    if (r.fechaVencimiento) return { prefijo: 'Vence:', fecha: r.fechaVencimiento };
    return null;
  }
}