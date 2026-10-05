import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';
import { GiroService } from '../../../../../core/services/ruleta/giro.service';
import { FidelizacionMovimientoService } from '../../../../../core/services/fidelizacion/movimiento.service';
import { GiroResponse } from '../../../../../core/models/ruleta/giro.model';
import { Movimiento, Origen } from '../../../../../core/models/fidelizacion/movimiento.model';

@Component({
  selector: 'app-mi-historial',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, SkeletonModule, TimelineModule, MessageModule],
  templateUrl: './mi-historial.html',
  styleUrl: './mi-historial.scss',
})
export class MiHistorialComponent implements OnInit {
  private giroService = inject(GiroService);
  private movimientoService = inject(FidelizacionMovimientoService);

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

    this.giroService.obtenerMisGiros().subscribe({
      next: (res) => {
        this.giros.set(res.data ?? []);
        this.cargandoGiros.set(false);
      },
      error: () => {
        this.errorGiros.set('No se pudieron cargar tus giros. Intenta de nuevo.');
        this.cargandoGiros.set(false);
      }
    });
  }

  formatearProbabilidad(prob: number): string {
    return `${(prob * 100).toFixed(1)}%`;
  }

  // ===== Movimientos =====
  cargarMovimientosRecientes(limite: number = 5): void {
    this.cargandoMovimientos.set(true);
    this.errorMovimientos.set(null);

    this.movimientoService.obtenerUltimosMovimientos(limite).subscribe({
      next: (res) => {
        this.movimientos.set(res.data ?? []);
        this.cargandoMovimientos.set(false);
      },
      error: () => {
        this.errorMovimientos.set('No se pudieron cargar tus movimientos.');
        this.cargandoMovimientos.set(false);
      }
    });
  }

  cargarMovimientosTodos(): void {
    this.cargandoMovimientos.set(true);
    this.errorMovimientos.set(null);

    this.movimientoService.obtenerMisMovimientos().subscribe({
      next: (res) => {
        this.movimientos.set(res.data ?? []);
        this.cargandoMovimientos.set(false);
      },
      error: () => {
        this.errorMovimientos.set('No se pudieron cargar tus movimientos.');
        this.cargandoMovimientos.set(false);
      }
    });
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