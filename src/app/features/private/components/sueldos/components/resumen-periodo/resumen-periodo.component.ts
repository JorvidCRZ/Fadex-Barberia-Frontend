import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ResumenCard {
  icon: string;
  label: string;
  value: string;
  sub: string;
  color: 'white' | 'gold' | 'green';
}

@Component({
  selector: 'app-resumen-periodo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-periodo.html',
  styleUrls: ['./resumen-periodo.scss']
})
export class ResumenPeriodoComponent {
  @Input() totalPlanilla: number = 0;
  @Input() totalComisiones: number = 0;
  @Input() sueldoFinalTotal: number = 0;
  @Input() ventasPeriodo: number = 0;
  @Input() barberosActivos: number = 0;
  @Input() totalBarberos: number = 0;

  get cards(): ResumenCard[] {
    return [
      {
        icon: 'ti-receipt',
        label: 'Planilla mensual',
        value: `S/ ${this.totalPlanilla.toLocaleString()}`,
        sub: '+ 4.2% vs. mes anterior',
        color: 'white'
      },
      {
        icon: 'ti-coin',
        label: 'Comisiones',
        value: `S/ ${this.totalComisiones.toLocaleString()}`,
        sub: '+ 8.1% este mes',
        color: 'gold'
      },
      {
        icon: 'ti-scissors',
        label: 'Ventas del equipo',
        value: `${this.ventasPeriodo}`,
        sub: '+ 7.5% este mes',
        color: 'white'
      },
      {
        icon: 'ti-users',
        label: 'Barberos activos',
        value: `${this.barberosActivos}`,
        sub: 'Sin variación',
        color: 'white'
      }
    ];
  }
}