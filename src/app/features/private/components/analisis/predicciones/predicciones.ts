import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisService, AnalisisIA } from '@/app/core/services/analisis/AnalisisIA';


@Component({
  selector: 'app-predicciones',
  imports: [CommonModule],
  templateUrl: './predicciones.html',
  styleUrls: ['./predicciones.css'],
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
  console.log('Respuesta raw:', data);
  this.analisis = data;
  this.cargando = false;
},
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  getBadge(nivel: string): string {
    const map: Record<string, string> = {
      alto: 'badge-alto',
      medio: 'badge-medio',
      bajo: 'badge-bajo'
    };
    return map[nivel] ?? '';
  }

  getBadgeClass(nivel: string): string {
    return `badge ${this.getBadge(nivel)}`;
  }

contarPorNivel(nivel: string): number {
  return (this.analisis?.clientesEnRiesgo ?? [])
    .filter(c => c.nivelRiesgo === nivel).length;
}
}
