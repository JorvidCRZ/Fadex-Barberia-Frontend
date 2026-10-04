import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';
import { SafeImageUrlPipe } from '../../../../../shared/pipes/safe-image-url.pipe';
import { Servicio } from '../../../../../core/models/catalogos/servicios.model';

@Component({
  standalone: true,
  selector: 'app-servicio-detalle',
  imports: [CommonModule, SafeImageUrlPipe, StatusBadgeComponent],
  templateUrl: './servicio-detalle.html',
})
export class ServicioDetalleComponent {
  @Input() servicio: Servicio | null = null;
  @Input() cargando = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() reservar = new EventEmitter<void>();
}