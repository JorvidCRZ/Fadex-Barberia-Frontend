import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { SafeImageUrlPipe } from '../../../../../shared/pipes/safe-image-url.pipe';
import { SolesPipe } from '../../../../../shared/pipes/moneda.pipe';
import { Servicio } from '../../../../../core/models/catalogos/servicios.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';

@Component({
  standalone: true,
  selector: 'app-servicio-detalle',
  imports: [CommonModule, SafeImageUrlPipe, SolesPipe, StatusBadgeComponent, ButtonComponent],
  templateUrl: './servicio-detalle.html',
})
export class ServicioDetalleComponent {
  @Input() servicio: Servicio | null = null;
  @Input() cargando = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() reservar = new EventEmitter<void>();

  readonly imagenPorDefecto = '/assets/servicio.jpg'; 

  getImagen(): string {
    return this.servicio?.urlsMultimedia?.length
      ? this.servicio.urlsMultimedia[0]
      : this.imagenPorDefecto;
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.imagenPorDefecto)) { return; }
    img.src = this.imagenPorDefecto;
  }
}