import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamaraComponent } from './components/camara/camara.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { AnalisisResponse } from '../../../../core/models/reconocimiento-facial/Ia.model';
import { IaService } from '../../../../core/services/reconocimiento-facial/reconocimiento-facial.service';

@Component({
  selector: 'app-reconocimiento-facial',
  standalone: true,
  imports: [CommonModule, CamaraComponent, ResultadoComponent],
  templateUrl: './reconocimiento-facial.html',
  styleUrl: './reconocimiento-facial.scss',
})
export class ReconocimientoFacialComponent {
  previewFoto = '';

  onPreview(url: string) {
    this.previewFoto = url;
  }
  fotoBlob?: Blob;

  resultado?: AnalisisResponse;

  cargando = false;

  error = '';

  // TEMPORAL
  idCliente = 0;
  ngOnInit(): void {
    this.iaService.obtenerMiClienteId().subscribe({
      next: (res) => (this.idCliente = res.data),
      error: () => (this.error = 'No se pudo obtener el perfil de cliente'),
    });
  }

  constructor(private iaService: IaService) { }

  onFotoTomada(blob: Blob) {
    console.log('Foto recibida');
    this.fotoBlob = blob;
  }

  analizar() {
    if (!this.fotoBlob) {
      this.error = 'Primero toma una fotografía para iniciar el análisis facial.';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.iaService.analizar(this.fotoBlob, this.idCliente).subscribe({
      next: (resp) => {
        this.resultado = resp;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al analizar la imagen';
        this.cargando = false;
      },
    });
  }

  reiniciar() {
    this.resultado = undefined;
    this.fotoBlob = undefined;
    this.error = '';
  }

  analizarOtraVez() {
    window.location.reload();
  }
}
