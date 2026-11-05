import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { StatsCard } from '@/app/core/models/common/card.model';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';
import { ClienteDetalleResumen } from '@/app/core/models/gestion/cliente/cliente-detalle-resumen.model';
import { ActividadReciente } from '@/app/core/models/gestion/cliente/ActividadReciente.model';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { iniciales, nombreCompleto } from './cliente-utils.component';

const ESTILOS_ACTIVIDAD: Record<string, { punto: string; texto: string }> = {
  CORTE: { punto: 'bg-yellow-500', texto: 'text-yellow-400' },
  COMPRA: { punto: 'bg-emerald-500', texto: 'text-emerald-400' },
  PAGO: { punto: 'bg-sky-500', texto: 'text-sky-400' },
};
const ESTILO_DEFAULT = { punto: 'bg-gray-500', texto: 'text-gray-400' };

@Component({
  selector: 'app-detalle-client',
  standalone: true,
  imports: [DatePipe, ModalComponent, StatsComponent, EmptyStateComponent, DateFormatPipe],
  templateUrl: './cliente-detalle.html',
})
export class ClienteDetalleComponent {

  private clienteService = inject(ClienteService);
  private notify = inject(NotificationService);
  private moneda = new MonedaPipe();

  visible = model(false);
  cliente = input<Cliente | null>(null);
  editar = output<Cliente>();

  perfil = signal<Cliente | null>(null);
  resumen = signal<ClienteDetalleResumen | null>(null);
  actividad = signal<ActividadReciente[]>([]);

  stats = computed<StatsCard[]>(() => {
    const r = this.resumen();
    if (!r) return [];
    return [
      { title: 'Reservas', value: r.totalReservas, icon: 'pi pi-calendar' },
      { title: 'Cortes', value: r.totalCortes, icon: 'pi pi-check-circle' },
      { title: 'Compras', value: r.totalCompras, icon: 'pi pi-shopping-bag' },
      { title: 'Total gastado', value: this.moneda.transform(r.totalGastado), icon: 'pi pi-wallet' },
      { title: 'Última visita', value: r.ultimaVisita || 'Sin visitas', icon: 'pi pi-history' },
    ] as StatsCard[];
  });

  /** Solo las 10 más recientes */
  actividadReciente = computed(() => this.actividad().slice(0, 10));

  constructor() {
    // Cada vez que se abre el modal (o cambia el cliente) se muestra la fila y se piden datos frescos.
    effect(() => {
      const abierto = this.visible();
      const c = this.cliente();
      if (abierto && c) {
        untracked(() => {
          this.perfil.set(c);
          this.resumen.set(null);
          this.actividad.set([]);
          this.cargar(c.clienteId);
        });
      }
    });
  }

  /** Lo llama el padre después de editar, para refrescar sin cerrar el modal. */
  recargar(): void {
    const id = this.perfil()?.clienteId;
    if (id) this.cargar(id);
  }

  private cargar(id: number): void {
    this.clienteService.obtenerPorId(id).subscribe({
      next: (res) => this.perfil.set(res.data),
      error: (err) => {
        console.error('Error cargando cliente:', err);
        this.notify.showHttpError(err);
      },
    });

    this.clienteService.obtenerResumenCliente(id).subscribe({
      next: (res) => this.resumen.set(res.data),
      error: (err) => console.error('Error cargando resumen del cliente:', err),
    });

    this.clienteService.obtenerActividadReciente(id).subscribe({
      next: (res) => this.actividad.set(res.data ?? []),
      error: (err) => console.error('Error cargando actividad:', err),
    });
  }

  // ── Helpers de la vista ────────────────────────────────

  nombreCompleto = nombreCompleto;
  iniciales = iniciales;

  colorPunto(tipo: string): string {
    return (ESTILOS_ACTIVIDAD[tipo] ?? ESTILO_DEFAULT).punto;
  }

  colorTexto(tipo: string): string {
    return (ESTILOS_ACTIVIDAD[tipo] ?? ESTILO_DEFAULT).texto;
  }
}