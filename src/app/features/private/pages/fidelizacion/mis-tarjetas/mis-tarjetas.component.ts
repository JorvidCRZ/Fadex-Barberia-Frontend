import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MiRuletaComponent } from '../mi-ruleta/mi-ruleta.component';
import { RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { FidelizacionTarjetaService } from '../../../../../core/services/fidelizacion/tarjeta.service';
import { TarjetaGraficoComponent } from '../../../../../shared/components/tarjeta/tarjeta-grafico.component';


@Component({
  selector: 'app-mis-tarjetas',
  standalone: true,
  imports: [CommonModule, ToastModule, TarjetaGraficoComponent, MiRuletaComponent],
  providers: [MessageService],
  templateUrl: './mis-tarjetas.html'
})
export class MisTarjetasComponent implements OnInit {

  private tarjetaService = inject(FidelizacionTarjetaService);
  private messageService = inject(MessageService);

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
    this.tarjetaService.obtenerMisTarjetas().subscribe({
      next: (res) => {
        this.misTarjetas = res.data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar tus tarjetas.';
        this.cargando = false;
        console.error(err);
      },
    });
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
    this.messageService.add({
      severity: 'success',
      summary: recompensa.premioMayor ? '¡Premio mayor! 🎉' : '¡Ganaste un premio!',
      detail: recompensa.itemNombre,
      life: 4500,
    });
    this.cargarMisTarjetas();
  }
}