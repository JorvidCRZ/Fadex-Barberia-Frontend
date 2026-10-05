import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeImageUrlPipe } from '../../../../../../shared/pipes/safe-image-url.pipe';
import { CorteRecomendado } from '../../../../../../core/models/reconocimiento-facial/Ia.model';

@Component({
  selector: 'app-corte-modal',
  standalone: true,
  imports: [CommonModule, SafeImageUrlPipe],
  templateUrl: './corte-modal.html',
  styleUrl: './corte-modal.scss'
})
export class CorteModalComponent {

  @Input()
  corte?: CorteRecomendado;

  @Output()
  cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }

}