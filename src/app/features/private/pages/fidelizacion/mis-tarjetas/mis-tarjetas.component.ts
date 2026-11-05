import { Component, OnInit, computed, inject, output, signal } from '@angular/core';
import { FidelizacionTarjetaService } from '@/app/core/services/fidelizacion/tarjeta.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { FidelizacionTarjetaResponse } from '@/app/core/models/fidelizacion/tarjeta.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { TarjetaClienteComponent } from '@/app/shared/components/tarjeta/tarjeta-cliente/tarjeta-cliente.component';
import { MiRuletaComponent } from '../mi-ruleta/mi-ruleta.component';

@Component({
  selector: 'app-mis-tarjetas',
  standalone: true,
  imports: [TarjetaClienteComponent, MiRuletaComponent, ModalComponent, EmptyStateComponent, ButtonComponent],
  templateUrl: './mis-tarjetas.html',
})
export class MisTarjetasComponent implements OnInit {
  private tarjetaService = inject(FidelizacionTarjetaService);
  private notify = inject(NotificationService);

  girado = output<void>();
  misTarjetas = signal<FidelizacionTarjetaResponse[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  totalGiros = computed(() =>
    this.misTarjetas().reduce((s, t) => s + (t.cicloActivo ? (t.girosDisponibles ?? 0) : 0), 0),
  );

  showRuletaModal = false;
  tarjetaRuletaSeleccionada: FidelizacionTarjetaResponse | null = null;
  private huboGiro = false;

  ngOnInit(): void {
    this.cargarMisTarjetas();
  }

  cargarMisTarjetas(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.tarjetaService.obtenerMisTarjetas().subscribe({
      next: (res) => {
        this.misTarjetas.set(res.data ?? []);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar tus tarjetas.');
        this.cargando.set(false);
        this.notify.showHttpError(err.message);
      },
    });
  }

  abrirRuleta(tarjeta: FidelizacionTarjetaResponse): void {
    this.huboGiro = false;
    this.tarjetaRuletaSeleccionada = tarjeta;
    this.showRuletaModal = true;
  }

  girarPrimera(): void {
    const t = this.misTarjetas().find((x) => x.girosDisponibles > 0 && x.cicloActivo);
    if (t) this.abrirRuleta(t);
  }

  alGirar(): void {
    this.huboGiro = true;
  }

  alCerrarRuleta(): void {
    this.tarjetaRuletaSeleccionada = null;
    if (this.huboGiro) {
      this.huboGiro = false;
      this.cargarMisTarjetas();
      this.girado.emit();
    }
  }
}