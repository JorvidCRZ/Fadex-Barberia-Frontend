import { Component, OnInit } from '@angular/core';
import { FIDELIZACION_TARJETAS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { TarjetaGraficoComponent } from '../../../../../shared/components/tarjeta/tarjeta-grafico.component';
import { MiRuletaComponent } from '../mi-ruleta/mi-ruleta.component';

@Component({
  selector: 'app-mis-tarjetas',
  standalone: true,
  imports: [TarjetaGraficoComponent, MiRuletaComponent, ModalComponent, EmptyStateComponent, ButtonComponent],
  templateUrl: './mis-tarjetas.html',
})
export class MisTarjetasComponent implements OnInit {
  // Backend: private tarjetaService = inject(FidelizacionTarjetaService);

  misTarjetas: FidelizacionTarjetaResponse[] = [];
  cargando = true;
  error: string | null = null;

  showRuletaModal = false;
  tarjetaRuletaSeleccionada: FidelizacionTarjetaResponse | null = null;

  ngOnInit(): void {
    this.cargarMisTarjetas();
  }

  cargarMisTarjetas(): void {
    this.cargando = true;
    this.error = null;
    this.misTarjetas = FIDELIZACION_TARJETAS_MOCK.map((tarjeta) => ({ ...tarjeta }));
    this.cargando = false;

    // Backend:
    // this.tarjetaService.obtenerMisTarjetas().subscribe({ ... });
  }

  /** Lo usan (canjear) y (verRuleta) del app-tarjeta-grafico */
  abrirRuleta(tarjeta: FidelizacionTarjetaResponse): void {
    this.tarjetaRuletaSeleccionada = tarjeta;
    this.showRuletaModal = true;
  }

  alCerrarRuleta(): void {
    this.tarjetaRuletaSeleccionada = null;
  }
}