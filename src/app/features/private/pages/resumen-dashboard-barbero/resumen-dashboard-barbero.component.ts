import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

interface Cita {
  horaInicio: string;
  nombreCliente: string;
  apellidoCliente: string;
  servicios: { nombreCorte: string; precio: number }[];
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'EN_PROCESO' | 'FINALIZADA';
}

@Component({
  selector: 'app-resumen-dashboard-barbero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-dashboard-barbero.html',
  styleUrl: './resumen-dashboard-barbero.scss',
})
export class ResumenDashboardBarbero implements OnInit {

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  private cdr = inject(ChangeDetectorRef);

  nombre      = 'Gersone M';
  isOcupado   = true;
  pctComision = 10;

  cortesHoy   = 0;
  metaCortes  = 0;
  ingresosHoy = 0;
  comisionHoy = 0;
  clientesHoy = 0;

  citas: Cita[] = [
    {
      horaInicio: '13:30:00',
      nombreCliente: 'Jorge',
      apellidoCliente: 'Torres',
      servicios: [{ nombreCorte: 'Fade', precio: 20 }],
      estado: 'FINALIZADA',
    },
  ];
  citasLoading = true;

  dias: { fecha: string; atendidos: number }[] = [];
  sueldoBase      = 0;
  comisionSemanal = 0;
  totalSemana     = 0;
  semanalLoading  = true;

  private barChart?: Chart;

  ngOnInit(): void {
    const pct         = this.pctComision / 100;
    const finalizadas = this.citas.filter(c => c.estado === 'FINALIZADA');

    this.cortesHoy    = finalizadas.length;
    this.metaCortes   = this.citas.length;
    this.ingresosHoy  = finalizadas.reduce((s, c) => s + this.getPrecio(c), 0);
    this.comisionHoy  = Math.round(this.ingresosHoy * pct * 100) / 100;
    this.clientesHoy  = finalizadas.length;
    this.citasLoading = false;

    const cortesPrevios = [2, 3, 1, 4, 2, 3]; // 6 días anteriores a hoy (datos de ejemplo)

    this.dias = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        fecha: this.formatearFecha(d),
        atendidos: i === 6 ? finalizadas.length : cortesPrevios[i],
      };
    });

    const totalCortes    = this.dias.reduce((s, d) => s + d.atendidos, 0);
    this.comisionSemanal = Math.round(totalCortes * 20 * pct * 100) / 100; // 20 = precio promedio de ejemplo
    this.totalSemana     = this.sueldoBase + this.comisionSemanal;
    this.semanalLoading  = false;

    this.cdr.detectChanges();
    this.buildChart();
  }
  private formatearFecha(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private buildChart(): void {
    if (!this.barCanvas?.nativeElement) return;
    if (this.barChart) this.barChart.destroy();

        const gold = '#D4AF37';

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dias.map(d => this.getDiaLabel(d)),
        datasets: [{
          data: this.dias.map(d => d.atendidos),
          backgroundColor: gold,
          borderRadius: 4,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => `${c.raw} cortes` } }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: 10 },
              color: '#888',
              stepSize: 1,
              callback: (v: any) => Number.isInteger(v) ? v : ''
            },
            grid: { color: 'rgba(128,128,128,0.1)' }
          },
          x: {
            ticks: { font: { size: 10 }, color: '#888' },
            grid: { display: false }
          }
        }
      }
    });
  }

  get primerNombre(): string { return this.nombre.split(' ')[0]; }
  get primerApellido(): string { return this.nombre.split(' ')[1] ?? ''; }
  get pctComisionLabel(): number { return this.pctComision; }
  get estadoLabel(): string { return this.isOcupado ? 'Estado: Ocupado' : 'Estado: Disponible'; }
  get citasPendientes(): number {
    return this.citas.filter(c => c.estado === 'PENDIENTE' || c.estado === 'CONFIRMADA').length;
  }

  toggleEstado(): void { this.isOcupado = !this.isOcupado; }

  getHora(c: Cita): string { return c.horaInicio; }
  getNombreCliente(c: Cita): string { return `${c.nombreCliente} ${c.apellidoCliente}`; }
  getNombreServicio(c: Cita): string { return c.servicios.map(s => s.nombreCorte).join(', '); }
  getPrecio(c: Cita): number { return c.servicios.reduce((s, x) => s + x.precio, 0); }
  getEstado(c: Cita): string { return c.estado; }

  getEstadoLabel(c: Cita): string {
    const map: Record<string, string> = {
      FINALIZADA: 'Finalizada', EN_PROCESO: 'En proceso',
      CONFIRMADA: 'Confirmada', PENDIENTE: 'Pendiente',
    };
    return map[c.estado] ?? c.estado;
  }

  getBadgeClass(c: Cita): string {
    if (c.estado === 'FINALIZADA') return 'badge-finalizada';
    if (c.estado === 'EN_PROCESO') return 'badge-proceso';
    return 'badge-pendiente';
  }

  getDiaLabel(d: { fecha: string }): string {
    return new Date(d.fecha + 'T00:00:00').toLocaleDateString('es-PE', { weekday: 'short' });
  }
}