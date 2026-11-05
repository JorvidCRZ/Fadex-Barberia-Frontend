import { Component, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { finalize } from 'rxjs';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { aBarberoVista, BarberoVista } from './barbero-utils.component';

@Component({
  selector: 'app-barbero-detalle',
  standalone: true,
  imports: [ModalComponent, ButtonComponent, EmptyStateComponent, StatusBadgeComponent, DateFormatPipe, MonedaPipe],
  templateUrl: './barbero-detalle.html',
})
export class BarberoDetalleComponent {
  private readonly service = inject(BarberoService);

  visible = model(false);
  barberoId = input<number | null>(null);
  /** Pide abrir el modal de edición para este barbero */
  editar = output<number>();

  barbero = signal<BarberoVista | null>(null);
  cargando = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.barberoId();
      if (this.visible() && id) untracked(() => this.cargar(id));
    });
  }

  private cargar(id: number): void {
    this.cargando.set(true);
    this.error.set(null);
    this.barbero.set(null);

    this.service
      .obtenerPorId(id)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (res: any) => {
          if (!res?.data || res.success === false) {
            this.error.set(res?.message || 'No se pudo cargar el barbero.');
            return;
          }
          this.barbero.set(aBarberoVista(res.data, { id }));
        },
        error: () => this.error.set('Error al cargar el barbero.'),
      });
  }

  cerrar(): void {
    this.visible.set(false);
  }
}