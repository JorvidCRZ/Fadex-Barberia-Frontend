import { CommonModule } from '@angular/common';
import { RuletaSegmento } from '../../../../../core/models/ruleta/ruleta-grafico.model';
import { RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { RuletaEngineService } from '../../../../../core/services/ruleta/engine.service';
import { RuletaItemService } from '../../../../../core/services/ruleta/ruleta-item.service';
import { NotificationService } from '../../../../../core/services/common/notification.service';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { ConfiguracionService } from '../../../../../core/services/fidelizacion/configuracion.service';
import { RuletaGraficoComponent } from '../../../../../shared/components/ruleta/ruleta-grafico.component';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-mi-ruleta',
  imports: [CommonModule, RuletaGraficoComponent],
  templateUrl: './mi-ruleta.html'
})
export class MiRuletaComponent implements OnInit, OnChanges {
  @Input({ required: true }) tarjeta!: FidelizacionTarjetaResponse;
  @Input() activa = false;
  @Output() girado = new EventEmitter<RecompensaObtenida>();
  @ViewChild(RuletaGraficoComponent) ruletaGraficoRef?: RuletaGraficoComponent;

  private configuracionService = inject(ConfiguracionService);
  private ruletaItemService = inject(RuletaItemService);
  private ruletaEngineService = inject(RuletaEngineService);
  private notify = inject(NotificationService);

  musicaActiva = false;
  cargando = true;
  error: string | null = null;
  ruletaNombre = '';
  segmentos: RuletaSegmento[] = [];

  ngOnInit(): void {
    this.cargar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activa']) {
      this.musicaActiva = this.activa;
    }
    if (changes['tarjeta'] && !changes['tarjeta'].firstChange) {
      this.cargar();
    }
  }

  get interactiva(): boolean {
    return this.tarjeta.girosDisponibles > 0 && this.tarjeta.cicloActivo;
  }

  get textoBoton(): string {
    return this.interactiva ? 'Girar la ruleta' : 'Sin giros disponibles';
  }

  /** Se dispara cuando el usuario hace click en el botón de la ruleta gráfica (modoServidor) */
  onGirarSolicitado(): void {
    // ⚠️ Ajusta 'tarjetaId' si el campo real en FidelizacionTarjetaResponse se llama distinto
    const tarjetaId = this.tarjeta.id;

    this.ruletaEngineService.girarTarjeta(tarjetaId).subscribe({
      next: (resp) => {
        const recompensa = resp.data;
        const segmentoGanador = this.segmentos.find(s => s.id === recompensa.itemId);

        if (!segmentoGanador) {
          this.notify.showHttpError('No se pudo ubicar el premio obtenido en la ruleta.');
          this.ruletaGraficoRef?.cancelarGiro();
          return;
        }

        // Le pegamos la recompensa completa (código de canje, premio mayor, etc.) por si se necesita mostrar
        const segmentoConResultado: RuletaSegmento = { ...segmentoGanador, data: recompensa };

        this.ruletaGraficoRef?.girarHaciaResultado(segmentoConResultado);
        this.tarjeta.girosDisponibles = Math.max(0, this.tarjeta.girosDisponibles - 1);
        this.girado.emit(recompensa);
      },
      error: (err) => {
        this.notify.showHttpError(err?.error?.message ?? 'No se pudo ejecutar el giro.');
        this.ruletaGraficoRef?.cancelarGiro();
      },
    });
  }

  private cargar(): void {
    this.cargando = true;
    this.error = null;
    this.segmentos = [];

    this.configuracionService.obtenerConfiguraciones({ categoriaId: this.tarjeta.categoriaId }).subscribe({
      next: (resp) => {
        const config = resp.data.content[0];
        if (!config?.ruletaId) {
          this.error = 'Esta categoría no tiene una ruleta configurada.';
          this.cargando = false;
          return;
        }
        this.ruletaNombre = config.ruletaNombre ?? '';
        this.cargarItems(config.ruletaId);
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.error = 'No se pudo cargar la configuración.';
        this.cargando = false;
      },
    });
  }

  private cargarItems(ruletaId: number): void {
    this.ruletaItemService.obtenerItems({ ruletaId, activo: true, sort: 'ordenDisplay,asc' }).subscribe({
      next: (resp) => {
        this.segmentos = resp.data.content.map((item) => ({
          id: item.itemId,
          label: item.nombre,
          sublabel: item.descripcion,
          descripcion: item.descripcion,
          peso: item.probabilidad,
          imagen: item.imagenUrl,
          tipoPremio: item.tipoPremio,
        } as RuletaSegmento));
        this.cargando = false;
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.error = 'No se pudieron cargar los premios.';
        this.cargando = false;
      },
    });
  }
}