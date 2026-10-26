import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { NgClass } from '@angular/common';
import { SafeImageUrlPipe } from '../../pipes/safe-image-url.pipe';
import { ButtonComponent } from '../button/button.component';
import { AudioService } from '../../../core/services/common/audio.service';
import { TipoPremio } from '../../../core/models/ruleta/ruleta-item.model';
import { RuletaSegmento } from '../../../core/models/ruleta/ruleta-grafico.model';
import { Component, EventEmitter, Input, Output, signal, inject, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ruleta-grafico',
  standalone: true,
  imports: [NgClass, SliderModule, FormsModule, SafeImageUrlPipe, ButtonComponent],
  templateUrl: './ruleta-grafico.html',
  styleUrls: ['./ruleta-grafico.scss']
})
export class RuletaGraficoComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) premios: RuletaSegmento[] = [];
  @Input() interactiva = true;
  @Input() reproducirMusica = false;
  @Input() textoBoton = 'Girar la ruleta';
  /** true = el backend decide el premio (mi-ruleta real); false = sorteo local (preview de admin) */
  @Input() modoServidor = false;
  @Output() premioGanado = new EventEmitter<RuletaSegmento>();
  /** Se emite cuando el usuario pulsa girar en modoServidor; el padre debe resolver el premio y llamar a girarHaciaResultado() */
  @Output() girarSolicitado = new EventEmitter<void>();
  readonly audioService = inject(AudioService);

  /** 24 bombillas del anillo (antes: [].constructor(24) en el template) */
  readonly bulbos = Array.from({ length: 24 }, (_, i) => i);

  girando = signal(false);
  rotacionActual = signal(0);
  premioGanador = signal<RuletaSegmento | null>(null);
  mostrarResultado = signal(false);
  volumen = 50;

  cambiarVolumen(valor: number | undefined) {
    if (valor === undefined) return;
    this.volumen = valor;
    this.audioService.setVolume(valor / 100);
  }

  get iconoVolumen(): string {
    if (!this.audioService.enabled) return 'pi pi-volume-off';
    if (this.volumen <= 20) return 'pi pi-volume-down';
    return 'pi pi-volume-up';
  }

  get mostrarControlesAudio(): boolean {
    return this.reproducirMusica;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reproducirMusica']) {
      if (this.reproducirMusica) {
        this.audioService.play();
      } else {
        this.audioService.stop();
      }
    }
  }

  ngOnDestroy() {
    this.audioService.stop();
  }

  toggleMusica() {
    this.audioService.toggle();
  }

  get segmentos(): number {
    return Math.max(this.premios.length, 1);
  }

  get gradosPorSegmento(): number {
    return 360 / this.segmentos;
  }

  anguloSegmento(i: number): number {
    return i * this.gradosPorSegmento;
  }

  anguloCentroSegmento(i: number): number {
    return this.anguloSegmento(i) + this.gradosPorSegmento / 2;
  }

  sectorPath(i: number): string {
    const cx = 150;
    const cy = 150;
    const r = 149;
    const start = i * this.gradosPorSegmento;
    const end = (i + 1) * this.gradosPorSegmento;
    const toRad = (deg: number) => (deg - 90) * Math.PI / 180;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    return `
      M ${cx} ${cy}
      L ${x1} ${y1}
      A ${r} ${r} 0 0 1 ${x2} ${y2}
      Z
    `;
  }

  private elegirPremio(): { premio: RuletaSegmento; index: number } {
    const total = this.premios.reduce((a, p) => a + p.peso, 0);
    let r = Math.random() * total;
    for (let i = 0; i < this.premios.length; i++) {
      r -= this.premios[i].peso;
      if (r <= 0) {
        return { premio: this.premios[i], index: i };
      }
    }
    return { premio: this.premios[this.premios.length - 1], index: this.premios.length - 1 };
  }

  private animarHacia(index: number): void {
    const centro = this.anguloSegmento(index) + this.gradosPorSegmento / 2;
    const offset = (Math.random() - 0.5) * this.gradosPorSegmento * 0.30;
    const vueltas = 5;
    const nuevaRotacion = this.rotacionActual() + vueltas * 360 - centro - offset;
    this.rotacionActual.set(nuevaRotacion);
  }

  /** Click del botón: en modoServidor solo avisa al padre; si no, sortea localmente (preview) */
  onClickGirar(): void {
    if (this.girando() || !this.interactiva || !this.premios.length) return;

    this.girando.set(true);
    this.mostrarResultado.set(false);

    if (this.modoServidor) {
      this.girarSolicitado.emit();
      return;
    }

    const { premio, index } = this.elegirPremio();
    this.animarHacia(index);

    setTimeout(() => {
      this.girando.set(false);
      this.premioGanador.set(premio);
      this.mostrarResultado.set(true);
      this.premioGanado.emit(premio);
    }, 4200);
  }

  /** Llamado por el padre (modoServidor) una vez el backend ya resolvió el premio real */
  girarHaciaResultado(segmentoGanador: RuletaSegmento): void {
    const index = this.premios.findIndex(p => p.id === segmentoGanador.id);
    this.animarHacia(index >= 0 ? index : 0);

    setTimeout(() => {
      this.girando.set(false);
      this.premioGanador.set(segmentoGanador);
      this.mostrarResultado.set(true);
      this.premioGanado.emit(segmentoGanador);
    }, 4200);
  }

  /** Llamado por el padre si el backend falla, para reactivar el botón */
  cancelarGiro(): void {
    this.girando.set(false);
  }

  cerrarResultado() {
    this.mostrarResultado.set(false);
  }

  obtenerColorTexto(color: string): string {
    const hex = color.replace('#', '');
    if (hex.length !== 6) { return '#171412'; }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brillo = (r * 299 + g * 587 + b * 114) / 1000;
    return brillo > 150 ? '#171412' : '#f4efe1';
  }

  obtenerIcono(tipo?: TipoPremio): string {
    switch (tipo) {
      case TipoPremio.PRODUCTO: return 'pi-shopping-bag';
      case TipoPremio.SERVICIO: return 'pi-sparkles';
      case TipoPremio.DESCUENTO: return 'pi-percentage';
      case TipoPremio.CUPON: return 'pi-ticket';
      case TipoPremio.SIN_PREMIO: return 'pi-times-circle';
      default: return 'pi-gift';
    }
  }
}