import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { EstadoRecompensa, RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { RecompensaService } from '../../../../../core/services/ruleta/recompensa.service';

type TabRecompensa = 'TODAS' | 'PENDIENTES' | 'USADAS';

@Component({
  selector: 'app-mis-premios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-premios.html'
})
export class MisPremiosComponent implements OnInit {
  private recompensaService = inject(RecompensaService);

  readonly EstadoRecompensa = EstadoRecompensa;

  recompensas = signal<RecompensaObtenida[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);
  tabActivo = signal<TabRecompensa>('TODAS');

  recompensasFiltradas = computed(() => {
    const lista = this.recompensas();
    const tab = this.tabActivo();

    if (tab === 'PENDIENTES') {
      return lista.filter(r => r.estado === EstadoRecompensa.PENDIENTE);
    }
    if (tab === 'USADAS') {
      return lista.filter(r => r.estado === EstadoRecompensa.CANJEADO);
    }
    return lista;
  });

  ngOnInit(): void {
    this.cargarRecompensas();
  }

  cargarRecompensas(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.recompensaService.obtenerMisRecompensas().subscribe({
      next: (res) => {
        this.recompensas.set(res.data ?? []);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar tus recompensas.');
        this.cargando.set(false);
      }
    });
  }

  cambiarTab(tab: TabRecompensa): void {
    this.tabActivo.set(tab);
  }

  contarPorEstado(estado: EstadoRecompensa): number {
    return this.recompensas().filter(r => r.estado === estado).length;
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

  iconoPremio(itemNombre: string): string {
    const nombre = itemNombre.toLowerCase();
    if (nombre.includes('descuento') || nombre.includes('%')) return 'pi pi-tag';
    if (nombre.includes('corte')) return 'pi pi-scissors';
    if (nombre.includes('producto')) return 'pi pi-shopping-bag';
    if (nombre.includes('cupón') || nombre.includes('cupon')) return 'pi pi-gift';
    if (nombre.includes('servicio')) return 'pi pi-verified';
    return 'pi pi-star-fill';
  }

  iconoEstadoVacio(): string {
    const tab = this.tabActivo();
    if (tab === 'PENDIENTES') return 'pi pi-clock';
    if (tab === 'USADAS') return 'pi pi-check-circle';
    return 'pi pi-inbox';
  }

  fechaLabel(recompensa: RecompensaObtenida): string {
    if (recompensa.estado === EstadoRecompensa.CANJEADO && recompensa.fechaCanje) {
      return `Usada el: ${this.formatearFecha(recompensa.fechaCanje)}`;
    }
    if (recompensa.fechaVencimiento) {
      return `Vence: ${this.formatearFecha(recompensa.fechaVencimiento)}`;
    }
    return '';
  }

  private formatearFecha(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  trackByRecompensa(index: number, item: RecompensaObtenida): number {
    return item.id;
  }
}