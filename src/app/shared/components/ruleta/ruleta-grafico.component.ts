import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { TipoPremio } from '@/app/core/models/ruleta/ruleta-item.model';
import { RuletaSegmento } from '@/app/core/models/ruleta/ruleta-grafico.model';
import { RuletaAudioComponent } from './ruleta-audio.component';
import { PremioGanadoComponent } from './premio-ganado.component';

@Component({
  selector: 'app-ruleta-grafico',
  standalone: true,
  imports: [NgClass, ButtonComponent, RuletaAudioComponent, PremioGanadoComponent],
  templateUrl: './ruleta-grafico.html',
  styleUrl: './ruleta-grafico.scss',
})
export class RuletaGraficoComponent {
  @Input({ required: true }) premios: RuletaSegmento[] = [];
  @Input() interactiva = true;
  @Input() reproducirMusica = false;
  @Input() textoBoton = 'Girar la ruleta';
  @Input() modoServidor = false;
  @Output() premioGanado = new EventEmitter<RuletaSegmento>();
  @Output() girarSolicitado = new EventEmitter<void>();

  readonly TipoPremio = TipoPremio;
  readonly bulbos = Array.from({ length: 24 }, (_, i) => i);

  girando = signal(false);
  rotacionActual = signal(0);
  premioGanador = signal<RuletaSegmento | null>(null);
  mostrarResultado = signal(false);

  get codigoGanador(): string | undefined {
    return (this.premioGanador() as any)?.data?.codigoCanje;
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
    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(start));
    const y1 = cy + r * Math.sin(toRad(start));
    const x2 = cx + r * Math.cos(toRad(end));
    const y2 = cy + r * Math.sin(toRad(end));
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  }

  private elegirPremio(): { premio: RuletaSegmento; index: number } {
    const total = this.premios.reduce((a, p) => a + p.peso, 0);
    let r = Math.random() * total;
    for (let i = 0; i < this.premios.length; i++) {
      r -= this.premios[i].peso;
      if (r <= 0) return { premio: this.premios[i], index: i };
    }
    return { premio: this.premios[this.premios.length - 1], index: this.premios.length - 1 };
  }

  private animarHacia(index: number): void {
    const centro = this.anguloSegmento(index) + this.gradosPorSegmento / 2;
    const offset = (Math.random() - 0.5) * this.gradosPorSegmento * 0.3;
    const vueltas = 5;
    this.rotacionActual.set(this.rotacionActual() + vueltas * 360 - centro - offset);
  }

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
    this.terminarGiro(premio);
  }

  girarHaciaResultado(segmentoGanador: RuletaSegmento): void {
    const index = this.premios.findIndex((p) => p.id === segmentoGanador.id);
    this.animarHacia(index >= 0 ? index : 0);
    this.terminarGiro(segmentoGanador);
  }

  cancelarGiro(): void {
    this.girando.set(false);
  }

  private terminarGiro(premio: RuletaSegmento): void {
    setTimeout(() => {
      this.girando.set(false);
      this.premioGanador.set(premio);
      this.mostrarResultado.set(true);
      this.premioGanado.emit(premio);
    }, 4200);
  }

  obtenerColorTexto(color: string): string {
    const hex = color.replace('#', '');
    if (hex.length !== 6) return '#171412';
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