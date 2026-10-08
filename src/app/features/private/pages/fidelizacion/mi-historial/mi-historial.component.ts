import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';
import { GiroResponse } from '../../../../../core/models/ruleta/giro.model';
import { Movimiento, Origen } from '../../../../../core/models/fidelizacion/movimiento.model';
import { FIDELIZACION_GIROS_MOCK, FIDELIZACION_MOVIMIENTOS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';

@Component({
  selector: 'app-mi-historial',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, SkeletonModule, TimelineModule, MessageModule],
  templateUrl: './mi-historial.html',
  styleUrl: './mi-historial.scss',
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
  cargarMovimientosRecientes(limite: number = 5): void {
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
    this.vistaCompleta.set(!this.vistaCompleta());
    this.vistaCompleta() ? this.cargarMovimientosTodos() : this.cargarMovimientosRecientes();
  }

  recargarMovimientos(): void {
    this.vistaCompleta() ? this.cargarMovimientosTodos() : this.cargarMovimientosRecientes();
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

  origenSeverity(origen: Origen): 'warn' | 'success' | 'info' | 'secondary' {
    switch (origen) {
      case Origen.RESERVA: return 'warn';
      case Origen.VENTA: return 'success';
      case Origen.AJUSTE: return 'info';
      default: return 'secondary';
    }
  }
}