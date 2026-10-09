import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ResumenPeriodoComponent } from './components/resumen-periodo/resumen-periodo.component';
import { PlanillaResumen } from '@core/models/planilla/planilla.model';
import { GraficoSueldosComponent } from './components/grafico-sueldos/grafico-sueldos.component';
import { TablaSueldosComponent } from './components/tabla-sueldos/tabla-sueldos.component';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

@Component({
  selector: 'app-sueldos',
  standalone: true,
  imports: [FormsModule,ResumenPeriodoComponent,GraficoSueldosComponent,TablaSueldosComponent ],
  templateUrl: './sueldos.html',
  styleUrl: './sueldos.scss'
})
export class SueldosComponent implements OnInit {

  mes = new Date().getMonth() + 1;
  anio = new Date().getFullYear();

  // Últimos 12 meses, el actual primero
  periodos = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(this.anio, this.mes - 1 - i, 1);
    return {
      value: `${d.getFullYear()}-${d.getMonth() + 1}`,
      label: `${MESES[d.getMonth()]} ${d.getFullYear()}`
    };
  });

  periodoSeleccionado = this.periodos[0].value;

  resumen: PlanillaResumen = {
    totalPlanilla: 0,
    totalComisiones: 0,
    sueldoFinalTotal: 0,
    ventasPeriodo: 0,
    barberosActivos: 0
  };

  ngOnInit(): void {
    this.cargarResumen();
  }
  
  cargarResumen(): void {
    const [anio, mes] = this.periodoSeleccionado.split('-').map(Number);
    this.anio = anio;
    this.mes = mes;

    // Datos de memoria (Mock) - valores del prototipo
    // Aquí luego va la llamada al servicio usando this.mes y this.anio
    this.resumen = {
      totalPlanilla: 9840,
      totalComisiones: 4206,
      sueldoFinalTotal: 14046,
      ventasPeriodo: 16010,
      barberosActivos: 4
    };
  }
}