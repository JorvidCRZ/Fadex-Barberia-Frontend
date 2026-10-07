import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { CorteRecomendado } from '../../../../../../core/models/reconocimiento-facial/Ia.model';
import { IaService } from '../../../../../../core/services/reconocimiento-facial/reconocimiento-facial.service';

@Component({
  selector: 'app-corte-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corte-card.html',
  styleUrl: './corte-card.scss'
})
export class CorteCardComponent implements OnDestroy {

  @Input() fotoPreview = '';
  @Input() corte!: CorteRecomendado;
  @Input() clienteId = 1;

  @Output() ver = new EventEmitter<CorteRecomendado>();

  rating = 0;
  liked?: boolean;
  modalIaAbierto = false;
  cargandoIA = false;
  imagenIA = '';
  errorIA = false;

  // Mensajes que van rotando mientras se genera la imagen
  private mensajesCarga = [
    'Analizando tu rostro...',
    'Aplicando el nuevo corte...',
    'Ajustando estilo y proporciones...',
    'Generando resultado final...'
  ];
  mensajeCargaActual = this.mensajesCarga[0];
  private intervaloMensajes?: ReturnType<typeof setInterval>;

  constructor(private iaService: IaService) {}

  abrirModal() {
    this.ver.emit(this.corte);
  }

  like() {
    this.liked = true;
    this.iaService.enviarFeedback(this.clienteId, this.corte.id, true, 5).subscribe();
  }

  dislike() {
    this.liked = false;
    this.iaService.enviarFeedback(this.clienteId, this.corte.id, false, 1).subscribe();
  }

  calificar(valor: number) {
    this.rating = valor;
    this.iaService.enviarFeedback(this.clienteId, this.corte.id, valor >= 3, valor).subscribe();
  }

  probarConIA(): void {
    this.modalIaAbierto = true;
    this.cargandoIA = true;
    this.imagenIA = '';
    this.errorIA = false;
    this.iniciarMensajesRotativos();

    fetch(this.fotoPreview)
      .then(r => r.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('foto', blob, 'foto.jpg');
        formData.append('nombre_corte', this.corte.nombre);

        return fetch('http://localhost:8000/ia/preview-corte', {
          method: 'POST',
          body: formData
        });
      })
      .then(r => r.json())
      .then(data => {
        if (data.imagen_b64) {
          this.imagenIA = 'data:image/png;base64,' + data.imagen_b64;
        } else {
          this.errorIA = true;
        }
      })
      .catch(() => {
        this.errorIA = true;
      })
      .finally(() => {
        this.cargandoIA = false;
        this.detenerMensajesRotativos();
      });
  }

  cerrarModal() {
    this.modalIaAbierto = false;
    this.detenerMensajesRotativos();
  }

  private iniciarMensajesRotativos() {
    let i = 0;
    this.mensajeCargaActual = this.mensajesCarga[0];
    this.intervaloMensajes = setInterval(() => {
      i = (i + 1) % this.mensajesCarga.length;
      this.mensajeCargaActual = this.mensajesCarga[i];
    }, 1800);
  }

  private detenerMensajesRotativos() {
    if (this.intervaloMensajes) {
      clearInterval(this.intervaloMensajes);
      this.intervaloMensajes = undefined;
    }
  }

  ngOnDestroy() {
    this.detenerMensajesRotativos();
  }
}