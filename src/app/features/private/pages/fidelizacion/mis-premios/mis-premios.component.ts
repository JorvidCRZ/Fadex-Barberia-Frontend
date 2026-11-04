import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { BadgeTone } from '../../../../../core/config/status-badge.config';
import { RecompensaService } from '@/app/core/services/ruleta/recompensa.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { EstadoRecompensa, RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { CollapsibleSectionComponent } from '../../../../../shared/components/collapsible-section/collapsible-section.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';

@Component({
  selector: 'app-mis-premios',
  standalone: true,
  imports: [NgTemplateOutlet, StatusBadgeComponent, EmptyStateComponent, ButtonComponent, CollapsibleSectionComponent, DateFormatPipe],
  templateUrl: './mis-premios.html',
})
export class MisPremiosComponent implements OnInit {
  private recompensaService = inject(RecompensaService);
  private notify = inject(NotificationService);

  readonly EstadoRecompensa = EstadoRecompensa;

  recompensas = signal<RecompensaObtenida[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  usadosAbierto = signal(false);

  pendientes = computed(() => this.recompensas().filter((r) => r.estado === EstadoRecompensa.PENDIENTE));
  usados = computed(() => this.recompensas().filter((r) => r.estado !== EstadoRecompensa.PENDIENTE));

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
      error: (err) => {
        this.error.set('No se pudieron cargar tus premios.');
        this.cargando.set(false);
        this.notify.showHttpError(err.message);
      },
    });
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
      case EstadoRecompensa.CANJEADO: return 'bg-success/10 text-success';
      default: return 'bg-danger/10 text-danger';
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

  fechaInfo(r: RecompensaObtenida): { prefijo: string; fecha: string } | null {
    if (r.estado === EstadoRecompensa.CANJEADO && r.fechaCanje) return { prefijo: 'Usada el:', fecha: r.fechaCanje };
    if (r.fechaVencimiento) return { prefijo: 'Vence:', fecha: r.fechaVencimiento };
    return null;
  }
}