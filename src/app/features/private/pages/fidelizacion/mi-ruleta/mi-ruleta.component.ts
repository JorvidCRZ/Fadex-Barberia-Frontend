import { CommonModule } from '@angular/common';
import { RuletaSegmento } from '../../../../../core/models/ruleta/ruleta-grafico.model';
import { RecompensaObtenida } from '../../../../../core/models/ruleta/recompensa.model';
import { FidelizacionTarjetaResponse } from '../../../../../core/models/fidelizacion/tarjeta.model';
import { FIDELIZACION_SEGMENTOS_MOCK } from '../../../../../core/config/fidelizacion-mock.config';
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

    const segmentoGanador = this.segmentos[Math.floor(Math.random() * this.segmentos.length)];
    if (!segmentoGanador) return;
    const recompensa: RecompensaObtenida = {
      id: Date.now(), giroId: Date.now(), clienteId: this.tarjeta.clienteId,
      clienteNombre: this.tarjeta.clienteNombreCompleto, itemId: Number(segmentoGanador.id),
      itemNombre: segmentoGanador.label, itemImagen: segmentoGanador.imagen ?? '', colorHex: '#c9a84c',
      premioMayor: false, estado: 'PENDIENTE' as RecompensaObtenida['estado'], observacion: 'Premio generado en memoria',
      codigoCanje: `FX-MOCK-${Date.now()}`, fechaObtencion: new Date().toISOString(), createdAt: new Date().toISOString(),
    };
    const segmentoConResultado: RuletaSegmento = { ...segmentoGanador, data: recompensa };
    this.ruletaGraficoRef?.girarHaciaResultado(segmentoConResultado);
    this.tarjeta.girosDisponibles = Math.max(0, this.tarjeta.girosDisponibles - 1);
    this.girado.emit(recompensa);

    // Backend: this.ruletaEngineService.girarTarjeta(tarjetaId).subscribe({ ... });
  }

  private cargar(): void {
    this.cargando = true;
    this.error = null;
    this.segmentos = [];

    this.ruletaNombre = 'Ruleta FadeX';
    this.segmentos = FIDELIZACION_SEGMENTOS_MOCK.map(segmento => ({ ...segmento }));
    this.cargando = false;

    // Backend:
    // this.configuracionService.obtenerConfiguraciones(...).subscribe(...);
  }

  // Backend: carga de ítems de la ruleta conservada para reactivar con la API.
  // private cargarItems(ruletaId: number): void { ... }
}