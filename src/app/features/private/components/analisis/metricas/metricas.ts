import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type Periodo = '7' | '30' | '90';

interface Kpi {
  label: string;
  value: string;
  delta: string;
  icon: string; // clase PrimeIcons
}

interface Barbero {
  nombre: string;
  servicios: number;
  ingresos: number;
  ocupacion: number;
  valoracion: number;
}

interface DatosPeriodo {
  kpis: Kpi[];
  dias: string[];
  agendados: number[];
  completados: number[];
  barberos: Barbero[];
}

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metricas.html',
  styleUrl: './metricas.scss'
})
export class MetricasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChart') lineRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barRef!: ElementRef<HTMLCanvasElement>;

  private lineChart?: Chart;
  private barChart?: Chart;

  periodos: { value: Periodo; label: string }[] = [
    { value: '7', label: 'Últimos 7 días' },
    { value: '30', label: 'Últimos 30 días' },
    { value: '90', label: 'Últimos 90 días' }
  ];

  periodo: Periodo = '30';

  kpis: Kpi[] = [];
  barberos: Barbero[] = [];

  // ───────────── DATOS EN MEMORIA ─────────────
  private readonly dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  private readonly datos: Record<Periodo, DatosPeriodo> = {
    '7': {
      kpis: [
        { label: 'Ingresos', value: 'S/ 4,280', delta: '+6.2%', icon: 'pi-dollar' },
        { label: 'Conversión', value: '65.1%', delta: '+2.3%', icon: 'pi-chart-line' },
        { label: 'Ocupación', value: '72.8%', delta: '+1.5%', icon: 'pi-calendar' },
        { label: 'Satisfacción', value: '4.7/5', delta: '+0.1 puntos', icon: 'pi-star' }
      ],
      dias: this.dias,
      agendados: [12, 16, 14, 20, 26, 31, 18],
      completados: [10, 13, 13, 16, 20, 25, 15],
      barberos: [
        { nombre: 'Renzo Castillo', servicios: 21, ingresos: 1180, ocupacion: 80, valoracion: 4.9 },
        { nombre: 'Álvaro Mendoza', servicios: 19, ingresos: 1050, ocupacion: 76, valoracion: 4.8 },
        { nombre: 'José Luis Ramos', servicios: 17, ingresos: 930, ocupacion: 71, valoracion: 4.7 },
        { nombre: 'Bruno Espinoza', servicios: 15, ingresos: 720, ocupacion: 68, valoracion: 4.6 }
      ]
    },
    '30': {
      kpis: [
        { label: 'Ingresos', value: 'S/ 18,460', delta: '+9.8%', icon: 'pi-dollar' },
        { label: 'Conversión', value: '68.4%', delta: '+4.1%', icon: 'pi-chart-line' },
        { label: 'Ocupación', value: '76.2%', delta: '+2.8%', icon: 'pi-calendar' },
        { label: 'Satisfacción', value: '4.8/5', delta: '+0.2 puntos', icon: 'pi-star' }
      ],
      dias: this.dias,
      agendados: [18, 24, 21, 29, 38, 46, 27],
      completados: [14, 18, 20, 23, 28, 35, 22],
      barberos: [
        { nombre: 'Renzo Castillo', servicios: 86, ingresos: 4820, ocupacion: 82, valoracion: 4.9 },
        { nombre: 'Álvaro Mendoza', servicios: 79, ingresos: 4260, ocupacion: 78, valoracion: 4.8 },
        { nombre: 'José Luis Ramos', servicios: 72, ingresos: 3790, ocupacion: 74, valoracion: 4.7 },
        { nombre: 'Bruno Espinoza', servicios: 65, ingresos: 3140, ocupacion: 70, valoracion: 4.6 }
      ]
    },
    '90': {
      kpis: [
        { label: 'Ingresos', value: 'S/ 54,920', delta: '+12.4%', icon: 'pi-dollar' },
        { label: 'Conversión', value: '70.2%', delta: '+5.6%', icon: 'pi-chart-line' },
        { label: 'Ocupación', value: '78.9%', delta: '+3.4%', icon: 'pi-calendar' },
        { label: 'Satisfacción', value: '4.8/5', delta: '+0.3 puntos', icon: 'pi-star' }
      ],
      dias: this.dias,
      agendados: [54, 70, 62, 88, 112, 134, 79],
      completados: [42, 55, 58, 69, 86, 104, 66],
      barberos: [
        { nombre: 'Renzo Castillo', servicios: 258, ingresos: 14380, ocupacion: 84, valoracion: 4.9 },
        { nombre: 'Álvaro Mendoza', servicios: 236, ingresos: 12710, ocupacion: 80, valoracion: 4.8 },
        { nombre: 'José Luis Ramos', servicios: 215, ingresos: 11290, ocupacion: 76, valoracion: 4.7 },
        { nombre: 'Bruno Espinoza', servicios: 194, ingresos: 9380, ocupacion: 72, valoracion: 4.6 }
      ]
    }
  };

  // ───────────── CICLO DE VIDA ─────────────
  ngAfterViewInit(): void {
    this.aplicarPeriodo();
    this.crearGraficas();
  }

  ngOnDestroy(): void {
    this.lineChart?.destroy();
    this.barChart?.destroy();
  }

  onPeriodoChange(valor: Periodo): void {
    this.periodo = valor;
    this.aplicarPeriodo();
    this.actualizarGraficas();
  }

  // ───────────── LÓGICA ─────────────
  private aplicarPeriodo(): void {
    const d = this.datos[this.periodo];
    this.kpis = d.kpis;
    this.barberos = d.barberos;
  }

  /** Tope del eje Y en múltiplos de 60 con 4 divisiones (60 → 0,15,30,45,60). */
  private escalaY(): { max: number; step: number } {
    const d = this.datos[this.periodo];
    const mayor = Math.max(...d.agendados, ...d.completados);
    const max = Math.ceil(mayor / 60) * 60;
    return { max, step: max / 4 };
  }

  private crearGraficas(): void {
    const d = this.datos[this.periodo];
    const { max, step } = this.escalaY();

    this.lineChart = new Chart(this.lineRef.nativeElement.getContext('2d')!, {
      type: 'line',
      data: {
        labels: d.dias,
        datasets: [
          {
            label: 'Agendados',
            data: d.agendados,
            borderColor: '#d4af37',
            backgroundColor: '#d4af37',
            pointBackgroundColor: '#d4af37',
            pointBorderColor: '#e8c75a',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0,
            fill: false
          },
          {
            label: 'Completados',
            data: d.completados,
            borderColor: '#8c8c8c',
            backgroundColor: '#ffffff',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#8c8c8c',
            borderWidth: 2,
            pointRadius: 4,
            tension: 0,
            fill: false
          }
        ]
      },
      options: this.opciones(max, step)
    });

    this.barChart = new Chart(this.barRef.nativeElement.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: d.dias,
        datasets: [
          {
            label: 'Servicios',
            data: d.agendados,
            backgroundColor: '#d4af37',
            borderRadius: 6,
            borderSkipped: false,
            categoryPercentage: 0.9,
            barPercentage: 0.8
          }
        ]
      },
      options: this.opciones(max, step)
    });
  }

  private actualizarGraficas(): void {
    const d = this.datos[this.periodo];
    const { max, step } = this.escalaY();

    if (this.lineChart) {
      this.lineChart.data.datasets[0].data = d.agendados;
      this.lineChart.data.datasets[1].data = d.completados;
      (this.lineChart.options.scales!['y'] as any).max = max;
      (this.lineChart.options.scales!['y'] as any).ticks.stepSize = step;
      this.lineChart.update();
    }

    if (this.barChart) {
      this.barChart.data.datasets[0].data = d.agendados;
      (this.barChart.options.scales!['y'] as any).max = max;
      (this.barChart.options.scales!['y'] as any).ticks.stepSize = step;
      this.barChart.update();
    }
  }

  private opciones(max: number, step: number): any {
    const tick = 'rgba(255,255,255,0.55)';
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 6, right: 6 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111111',
          borderColor: 'rgba(201,168,76,0.4)',
          borderWidth: 1,
          titleColor: '#ffffff',
          bodyColor: '#d4d4d4',
          displayColors: true
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: 'rgba(255,255,255,0.35)' },
          ticks: { color: tick, font: { size: 12 } }
        },
        y: {
          beginAtZero: true,
          min: 0,
          max,
          grid: { color: 'rgba(201,168,76,0.14)' },
          border: { color: 'rgba(255,255,255,0.35)' },
          ticks: { color: tick, font: { size: 12 }, stepSize: step }
        }
      }
    };
  }
}