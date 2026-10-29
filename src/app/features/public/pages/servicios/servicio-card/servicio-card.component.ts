import { ImageModule } from 'primeng/image';
import { SolesPipe } from '../../../../../shared/pipes/moneda.pipe';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Servicio } from '../../../../../core/models/catalogos/servicios.model';
import { SafeImageUrlPipe } from '../../../../../shared/pipes/safe-image-url.pipe';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';

@Component({
  standalone: true,
  selector: 'app-servicio-card',
  imports: [SolesPipe, SafeImageUrlPipe,StatusBadgeComponent, ImageModule],
  templateUrl: './servicio-card.html',
})
export class ServicioCardComponent {
  @Input() servicio!: Servicio;
  @Output() seleccionado = new EventEmitter<number>();

  readonly imagenPorDefecto = '/assets/servicio.jpg';

  onSeleccionar(): void {
    this.seleccionado.emit(this.servicio.servicioId);
  }

  getImagen(): string {
    return this.servicio.urlsMultimedia?.length ? this.servicio.urlsMultimedia[0] : this.imagenPorDefecto;
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.imagenPorDefecto)) { return; } // evita bucle si el fallback también falla
    img.src = this.imagenPorDefecto;
  }
}