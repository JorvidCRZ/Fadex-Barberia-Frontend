import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface KpiPrediccion {
  label: string;
  value: string;
  delta: string;
  icon: string; // clase PrimeIcons
}

interface Insight {
  etiqueta: string;
  dia: string;
  detalle: string;
}

@Component({
  selector: 'app-predicciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './predicciones.html',
  styleUrl: './predicciones.scss'
})
export class Predicciones implements AfterViewInit, OnDestroy {
  @ViewChild('prediccionChart') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  // ───────────── DATOS EN MEMORIA ─────────────
  kpis: KpiPrediccion[] = [
    { label: 'Clientes esperados', value: '203', delta: '+12.1% vs. semana actual', icon: 'pi-users' },
    { label: 'Ingresos proyectados', value: 'S/ 8,420', delta: '+10.4%', icon: 'pi-dollar' },
    { label: 'Hora pico', value: '18:00', delta: 'Viernes y sábado', icon: 'pi-chart-line' },
    { label: 'Precisión del modelo', value: '92.5%', delta: '+1.8%', icon: 'pi-chart-bar' }
  ];

  insights: Insight[] = [
    { etiqueta: 'Alta demanda', dia: 'Viernes', detalle: 'Refuerza el turno de 17:00 a 20:00.' },
    { etiqueta: 'Capacidad al 91%', dia: 'Sábado', detalle: 'Se proyectan 46 atenciones.' },
    { etiqueta: 'Demanda media', dia: 'Domingo', detalle: 'Promoción recomendada antes de las 14:00.' }
  ];

  private readonly dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  private readonly clientesProyectados = [18, 27, 27, 38, 50, 61, 55];

  // ───────────── CICLO DE VIDA ─────────────
  ngAfterViewInit(): void {
    const canvas = this.chartRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const gradiente = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight || 250);
    gradiente.addColorStop(0, 'rgba(212,175,55,0.38)');
    gradiente.addColorStop(1, 'rgba(212,175,55,0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dias,
        datasets: [
          {
            label: 'Clientes proyectados',
            data: this.clientesProyectados,
            borderColor: '#d4af37',
            backgroundColor: gradiente,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#d4af37',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
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
            bodyColor: '#d4d4d4'
          }
        },
        scales: {
          x: {
            offset: false,
            grid: { display: false },
            border: { color: 'rgba(255,255,255,0.35)' },
            ticks: { color: 'rgba(255,255,255,0.55)', font: { size: 12 } }
          },
          y: {
            min: 0,
            max: 80,
            grid: { color: 'rgba(201,168,76,0.14)' },
            border: { color: 'rgba(255,255,255,0.35)' },
            ticks: { color: 'rgba(255,255,255,0.55)', font: { size: 12 }, stepSize: 20 }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}