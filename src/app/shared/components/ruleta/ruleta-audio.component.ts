import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { AudioService } from '@/app/core/services/common/audio.service';

@Component({
  standalone: true,
  selector: 'app-ruleta-audio',
  imports: [FormsModule, SliderModule, ButtonComponent],
  templateUrl: './ruleta-audio.html',
  styleUrl: './ruleta-audio.scss',
})
export class RuletaAudioComponent implements OnInit, OnDestroy {
  readonly audio = inject(AudioService);
  volumen = 50;

  get icono(): string {
    if (!this.audio.enabled) return 'pi pi-volume-off';
    return this.volumen <= 20 ? 'pi pi-volume-down' : 'pi pi-volume-up';
  }

  ngOnInit(): void {
    this.audio.play();
  }

  ngOnDestroy(): void {
    this.audio.stop();
  }

  cambiarVolumen(valor: number | undefined): void {
    if (valor === undefined) return;
    this.volumen = valor;
    this.audio.setVolume(valor / 100);
  }
}