import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FIDELIZACION_SEGMENTOS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { RuletaSegmento } from '../../../../../core/models/ruleta/ruleta-grafico.model';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';
import { RuletaGraficoComponent } from '../../../../../shared/components/ruleta/ruleta-grafico.component';

@Component({
  standalone: true,
  selector: 'app-mi-ruleta',
  imports: [RuletaGraficoComponent, EmptyStateComponent],
  templateUrl: './mi-ruleta.html',
})
export class MiRuletaComponent implements OnInit, OnChanges {
  @Input({ required: true }) tarjeta!: FidelizacionTarjetaResponse;
  @Input() activa = false;
  @Output() girado = new EventEmitter<RecompensaObtenida>();
  @ViewChild(RuletaGraficoComponent) ruletaGraficoRef?: RuletaGraficoComponent;

  // Backend:
  // private configuracionService = inject(ConfiguracionService);
  // private ruletaItemService = inject(RuletaItemService);
  // private ruletaEngineService = inject(RuletaEngineService);
  // private notify = inject(NotificationService);

  musicaActiva = false;
  cargando = true;
  error: string | null = null;
  ruletaNombre = '';
  segmentos: RuletaSegmento[] = [];

  ngOnInit(): void {
    this.cargar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activa']) this.musicaActiva = this.activa;
    if (changes['tarjeta'] && !changes['tarjeta'].firstChange) this.cargar();
  }

  get interactiva(): boolean {
    return this.tarjeta.girosDisponibles > 0 && this.tarjeta.cicloActivo;
  }

  get textoBoton(): string {
    return this.interactiva ? 'Girar la ruleta' : 'Sin giros disponibles';
  }

  /** Click en el botón de la ruleta gráfica (modoServidor) */
  onGirarSolicitado(): void {
    // ⚠️ Ajusta 'tarjetaId' si el campo real en FidelizacionTarjetaResponse se llama distinto
    // const tarjetaId = this.tarjeta.id;

    const segmentoGanador = this.segmentos[Math.floor(Math.random() * this.segmentos.length)];
    if (!segmentoGanador) return;

    const ahora = Date.now();
    const recompensa: RecompensaObtenida = {
      id: ahora,
      giroId: ahora,
      clienteId: this.tarjeta.clienteId,
      clienteNombre: this.tarjeta.clienteNombreCompleto,
      itemId: Number(segmentoGanador.id),
      itemNombre: segmentoGanador.label,
      itemImagen: segmentoGanador.imagen ?? '',
      colorHex: '#c9a84c',
      premioMayor: false,
      estado: 'PENDIENTE' as RecompensaObtenida['estado'],
      observacion: 'Premio generado en memoria',
      codigoCanje: `FX-MOCK-${ahora}`,
      fechaObtencion: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.ruletaGraficoRef?.girarHaciaResultado({ ...segmentoGanador, data: recompensa });
    this.tarjeta.girosDisponibles = Math.max(0, this.tarjeta.girosDisponibles - 1);
    this.girado.emit(recompensa);

    // Backend: this.ruletaEngineService.girarTarjeta(this.tarjeta.id).subscribe({ ... });
  }

  private cargar(): void {
    this.cargando = true;
    this.error = null;

    this.ruletaNombre = 'Ruleta FadeX';
    this.segmentos = FIDELIZACION_SEGMENTOS_MOCK.map((segmento) => ({ ...segmento }));
    this.cargando = false;

    // Backend:
    // this.configuracionService.obtenerConfiguraciones(...).subscribe(...);
  }
}
