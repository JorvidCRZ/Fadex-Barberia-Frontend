import { Component, OnInit, signal } from '@angular/core';
import { BadgeTone } from '../../../../../core/config/status-badge.config';
import { FIDELIZACION_GIROS_MOCK, FIDELIZACION_MOVIMIENTOS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
import { Movimiento, Origen } from '../../../../../core/models/fidelizacion/movimiento.model';
import { GiroResponse } from '../../../../../core/models/ruleta/giro.model';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';

/** Color del marcador del timeline según el tono del origen */
const MARCADOR_POR_TONO: Partial<Record<BadgeTone, string>> = {
  warning: 'text-brand-gold',
  success: 'text-success',
  info: 'text-info',
};

@Component({
  selector: 'app-mi-historial',
  standalone: true,
  imports: [PageHeaderComponent, StatusBadgeComponent, EmptyStateComponent, ButtonComponent, DateFormatPipe],
  templateUrl: './mi-historial.html',
})
export class MiHistorialComponent implements OnInit {
  // Backend:
  // private giroService = inject(GiroService);
  // private movimientoService = inject(FidelizacionMovimientoService);

  readonly Origen = Origen;

  // ---- Giros ----
  giros = signal<GiroResponse[]>([]);
  cargandoGiros = signal(true);
  errorGiros = signal<string | null>(null);

  // ---- Movimientos ----
  movimientos = signal<Movimiento[]>([]);
  cargandoMovimientos = signal(true);
  errorMovimientos = signal<string | null>(null);
  vistaCompleta = signal(false);

  ngOnInit(): void {
    this.cargarGiros();
    this.cargarMovimientosRecientes();
  }

  // ===== Giros =====
  cargarGiros(): void {
    this.cargandoGiros.set(true);
    this.errorGiros.set(null);
    this.giros.set([...FIDELIZACION_GIROS_MOCK]);
    this.cargandoGiros.set(false);

    // Backend:
    // this.giroService.obtenerMisGiros().subscribe({ ... });
  }

  formatearProbabilidad(prob: number): string {
    return `${(prob * 100).toFixed(1)}%`;
  }

  // ===== Movimientos =====
  cargarMovimientosRecientes(limite = 5): void {
    this.cargandoMovimientos.set(true);
    this.errorMovimientos.set(null);
    this.movimientos.set(FIDELIZACION_MOVIMIENTOS_MOCK.slice(0, limite));
    this.cargandoMovimientos.set(false);

    // Backend:
    // this.movimientoService.obtenerUltimosMovimientos(limite).subscribe({ ... });
  }

  cargarMovimientosTodos(): void {
    this.cargandoMovimientos.set(true);
    this.errorMovimientos.set(null);
    this.movimientos.set([...FIDELIZACION_MOVIMIENTOS_MOCK]);
    this.cargandoMovimientos.set(false);

    // Backend:
    // this.movimientoService.obtenerMisMovimientos().subscribe({ ... });
  }

  toggleVistaMovimientos(): void {
    this.vistaCompleta.update((v) => !v);
    this.recargarMovimientos();
  }

  recargarMovimientos(): void {
    if (this.vistaCompleta()) this.cargarMovimientosTodos();
    else this.cargarMovimientosRecientes();
  }

  origenLabel(origen: Origen): string {
    switch (origen) {
      case Origen.RESERVA: return 'Reserva';
      case Origen.VENTA: return 'Venta';
      case Origen.AJUSTE: return 'Ajuste';
      default: return origen;
    }
  }

  origenIcon(origen: Origen): string {
    switch (origen) {
      case Origen.RESERVA: return 'pi pi-calendar';
      case Origen.VENTA: return 'pi pi-shopping-cart';
      case Origen.AJUSTE: return 'pi pi-sliders-h';
      default: return 'pi pi-circle';
    }
  }

  origenTono(origen: Origen): BadgeTone {
    switch (origen) {
      case Origen.RESERVA: return 'warning';
      case Origen.VENTA: return 'success';
      case Origen.AJUSTE: return 'info';
      default: return 'neutral';
    }
  }

  marcadorClase(origen: Origen): string {
    return MARCADOR_POR_TONO[this.origenTono(origen)] ?? 'text-text-secondary';
  }
}