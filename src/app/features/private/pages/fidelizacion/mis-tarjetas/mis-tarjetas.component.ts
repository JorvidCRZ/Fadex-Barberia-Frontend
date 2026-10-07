import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MiRuletaComponent } from '../mi-ruleta/mi-ruleta.component';
import { RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { FIDELIZACION_TARJETAS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
import { TarjetaGraficoComponent } from '../../../../../shared/components/tarjeta/tarjeta-grafico.component';


@Component({
  selector: 'app-mis-tarjetas',
  standalone: true,
  imports: [CommonModule, TarjetaGraficoComponent, MiRuletaComponent],
  templateUrl: './mis-tarjetas.html'
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
    this.misTarjetas = FIDELIZACION_TARJETAS_MOCK.map(tarjeta => ({ ...tarjeta }));
    this.cargando = false;

    // Backend:
    // this.tarjetaService.obtenerMisTarjetas().subscribe({ ... });
  }

  // Se dispara tanto desde (canjear) como desde (verRuleta) del app-tarjeta-grafico:
  // ambos abren el mismo modal de ruleta, que internamente decide si es interactiva
  // (girosDisponibles > 0) o solo de vista previa.
  onCanjear(tarjeta: FidelizacionTarjetaResponse): void {
    this.tarjetaRuletaSeleccionada = tarjeta;
    this.showRuletaModal = true;
  }

  verRuleta(tarjeta: FidelizacionTarjetaResponse): void {
    this.tarjetaRuletaSeleccionada = tarjeta;
    this.showRuletaModal = true;
  }

  cerrarModalRuleta(): void {
    this.showRuletaModal = false;
    this.tarjetaRuletaSeleccionada = null;
  }

  onGiroRealizado(recompensa: RecompensaObtenida): void {
    void recompensa;
    if (this.tarjetaRuletaSeleccionada) {
      this.tarjetaRuletaSeleccionada.girosDisponibles = 0;
    }
  }
}