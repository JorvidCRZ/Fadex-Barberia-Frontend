import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Movimiento } from '@/app/core/models/fidelizacion/movimiento.model';
import { FidelizacionMovimientoService } from '@/app/core/services/fidelizacion/movimiento.service';
import { MovimientosListaComponent } from './movimiento-lista.component';

@Component({
  standalone: true,
  selector: 'app-tarjeta-movimientos',
  imports: [MovimientosListaComponent],
  template: `
    <div class="relative border-t border-brand-gold/10 bg-black/20 px-5 py-4">
      <p class="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-gold/70">
        <i class="pi pi-history text-[10px]"></i>Movimientos recientes
      </p>
      <app-movimientos-lista [movimientos]="movimientos()" [cargando]="cargando()" />
    </div>
  `,
})
export class TarjetaMovimientosComponent implements OnInit {
  private movimientoService = inject(FidelizacionMovimientoService);

  @Input({ required: true }) tarjetaId!: number;

  movimientos = signal<Movimiento[]>([]);
  cargando = signal(true);

  ngOnInit(): void {
    this.movimientoService.obtenerMovimientos({ tarjetaId: this.tarjetaId, size: 30, sort: 'createdAt,desc' }).subscribe({
      next: (r) => {
        this.movimientos.set(r.data.content);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }
}