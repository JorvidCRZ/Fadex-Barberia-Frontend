import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisService, AnalisisIA } from '@/app/core/services/analisis/AnalisisIA.service';

@Component({
  selector: 'app-predicciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './predicciones.html',
  styleUrls: ['./predicciones.scss'],
})
export class Predicciones implements OnInit {
  private analisisService = inject(AnalisisService);

  analisis: AnalisisIA | null = null;
  cargando = false;
  error = '';

  ngOnInit() {
    this.cargarAnalisis();
  }

  cargarAnalisis() {
    this.cargando = true;
    this.error = '';
    this.analisis = null;

    this.analisisService.getPredicciones().subscribe({
      next: (data: AnalisisIA) => {
        this.analisis = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  contarPorNivel(nivel: string): number {
    return (this.analisis?.clientesEnRiesgo ?? [])
      .filter(c => c.nivelRiesgo === nivel).length;
  }
}