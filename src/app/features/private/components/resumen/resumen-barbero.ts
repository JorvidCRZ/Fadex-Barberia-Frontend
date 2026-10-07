import {
  Component, OnInit, AfterViewInit,
  ViewChild, ElementRef, ChangeDetectorRef, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { Cita, DiaResumen } from '@/app/core/models/gestion/barbero/barbero-resumen-individual.model';

@Component({
  selector: 'app-resumen-barbero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-barbero.html',
  styleUrl: './resumen-barbero.css',
})
export class ResumenBarbero implements OnInit {

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  private svc    = inject(BarberoService);
  private router = inject(Router);
  private cdr    = inject(ChangeDetectorRef);

  nombre     = '';
  avatarUrl  = '';
  barberoId  = 0;
  isOcupado  = false;
  pctComision = 0;

  cortesHoy   = 0;
  metaCortes  = 12;
  ingresosHoy = 0;
  comisionHoy = 0;
  clientesHoy = 0;

  citas: Cita[]   = [];
  citasLoading    = true;

  dias: any[]        = [];
  sueldoBase         = 0;
  comisionSemanal    = 0;
  totalSemana        = 0;
  semanalLoading     = true;

  private barChart?: Chart;

  ngOnInit(): void {
    this.svc.getPerfil().subscribe({
      next: ({ data: perfil }) => {
        this.nombre      = `${perfil.nombre} ${perfil.apellido}`;
        this.barberoId   = perfil.barberoId;
        this.isOcupado   = perfil.ocupado;
        this.sueldoBase  = perfil.sueldo ?? 0;
        this.pctComision = perfil.comision ?? 0;
        const pct        = this.pctComision / 100;

        forkJoin([
          this.svc.getStatsHoy(this.barberoId),
          this.svc.getCitasHoy(),
          this.svc.getResumenSemanal(this.barberoId),
        ]).subscribe({
          next: ([statsRes, citasRes, semanalRes]) => {
            const stats   = statsRes.data;
            const semanal = semanalRes.data;

            this.cortesHoy   = stats.completados ?? 0;
            this.metaCortes  = stats.totalDia ?? 12;
            this.ingresosHoy = stats.reservas?.reduce((s: number, r: any) => s + (r.total ?? 0), 0) ?? 0;
            this.comisionHoy = Math.round(this.ingresosHoy * pct * 100) / 100;
            this.clientesHoy = stats.completados ?? 0;

            this.citas        = Array.isArray(citasRes) ? citasRes : (citasRes as any)?.data ?? [];
            this.citasLoading = false;

            this.dias           = semanal.dias ?? [];
            this.comisionSemanal = semanal.comisionSemanal ?? 0;
            this.totalSemana    = semanal.totalSemana ?? 0;
            this.sueldoBase     = semanal.sueldoBase ?? this.sueldoBase;
            this.semanalLoading = false;

            this.cdr.detectChanges();
            this.buildChart();
          },
          error: () => {
            this.citasLoading   = false;
            this.semanalLoading = false;
          }
        });
      },
      error: () => { this.nombre = 'Barbero'; }
    });
  }

  private buildChart(): void {
    if (!this.barCanvas?.nativeElement) return;
    if (this.barChart) this.barChart.destroy();

    const gold = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-brand-gold').trim() || '#C8960C';

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.dias.map(d => this.getDiaLabel(d)),
        datasets: [{
          data: this.dias.map(d => d.atendidos ?? 0),
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
    return this.citas.filter(c => (c as any).estado === 'PENDIENTE').length;
  }

  toggleEstado(): void {
    this.svc.toggleOcupado(this.barberoId).subscribe({
      next: ({ data }) => { this.isOcupado = data.estado === 'ocupado' || data.status === 'ocupado'; },
      error: () => { this.isOcupado = !this.isOcupado; }
    });
  }

  cerrarSesion(): void {
    this.svc.logout().subscribe({
      complete: () => this.router.navigate(['/login']),
      error:    () => this.router.navigate(['/login']),
    });
  }

  getHora(c: Cita): string { return c.horaInicio ?? c.hora ?? c.hora_inicio ?? ''; }
  getNombreCliente(c: Cita): string { return `${c.nombreCliente} ${c.apellidoCliente}`; }
  getNombreServicio(c: Cita): string { return c.servicios?.map((s: any) => s.nombreCorte).join(', ') ?? ''; }
  getPrecio(c: Cita): number { return c.servicios?.reduce((s: number, x: any) => s + x.precio, 0) ?? 0; }
  getEstado(c: Cita): string { return (c as any).estado ?? (c as any).estadoReserva ?? ''; }

  getEstadoLabel(c: Cita): string {
    const e = this.getEstado(c);
    const map: Record<string, string> = {
      FINALIZADA: 'Finalizada', EN_PROCESO: 'En proceso',
      CONFIRMADA: 'Confirmada', PENDIENTE: 'Pendiente',
    };
    return map[e] ?? e;
  }

  getBadgeClass(c: Cita): string {
    const e = this.getEstado(c);
    if (e === 'FINALIZADA') return 'badge-finalizada';
    if (e === 'EN_PROCESO') return 'badge-proceso';
    return 'badge-pendiente';
  }

  getDiaLabel(d: any): string {
    const date = new Date((d.fecha ?? '') + 'T00:00:00');
    return date.toLocaleDateString('es-PE', { weekday: 'short' });
  }
}