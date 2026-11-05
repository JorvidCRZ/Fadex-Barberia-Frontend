import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';

@Component({
  standalone: true,
  selector: 'app-premio-ganado',
  imports: [DialogModule, ButtonComponent, SafeImageUrlPipe],
  templateUrl: './premio-ganado.html',
})
export class PremioGanadoComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input({ required: true }) titulo = '';
  @Input() descripcion?: string;
  @Input() icono = 'pi pi-gift';
  @Input() imagen?: string;
  @Input() codigo?: string;
  @Input() sinPremio = false;

  copiado = signal(false);

  cerrar(): void {
    this.visibleChange.emit(false);
    this.copiado.set(false);
  }

  async copiar(): Promise<void> {
    if (!this.codigo) return;
    try {
      await navigator.clipboard.writeText(this.codigo);
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 2000);
    } catch {
    }
  }
}