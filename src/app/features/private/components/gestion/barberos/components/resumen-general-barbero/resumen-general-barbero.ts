import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { ResumenGeneralBarbero } from '@/app/core/models/gestion/barbero/barbero-resumen.model';

interface ResumenCard {
  valor: string | number;
  titulo: string;
  delta: string | null;
  positivo: boolean;
  icono: string;
}

@Component({
  selector: 'app-resumen-general-barbero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-general-barbero.html',
  styleUrl: './resumen-general-barbero.css',
})
export class ResumenGeneralBarberoComponent implements OnInit {

  private barberoService = inject(BarberoService);

  resumen: ResumenCard[] = [];
  cargando = true;
  error = false;

  readonly resumenMemoria: ResumenCard[] = [
    { valor: 4, titulo: 'Barberos activos', delta: '+1 este trimestre', positivo: true, icono: 'pi-users' },
    { valor: 319, titulo: 'Servicios del mes', delta: '+7.4% este mes', positivo: true, icono: 'pi-sparkles' },
    { valor: '31.8%', titulo: 'Comisión promedio', delta: '+1.2% este mes', positivo: true, icono: 'pi-dollar' },
  ];

  ngOnInit(): void {
    // this.cargarResumen();
    this.resumen = this.resumenMemoria;
    this.cargando = false;
  }

  private cargarResumen(): void {
    /*
    this.cargando = true;
    this.error = false;

    this.barberoService.obtenerResumenGeneral().subscribe({
      next: (response) => {
        this.resumen = this.mapearResumen(response.data);
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
    */
  }

  private mapearResumen(data: ResumenGeneralBarbero): ResumenCard[] {
    const esPositivo = data.porcentajeVsAyer.startsWith('+');

    return [
      {
        valor: data.totalBarberos,
        titulo: 'Total barberos',
        delta: null,
        positivo: true,
        icono: 'pi-users'
      },
      {
        valor: data.disponibles,
        titulo: 'Disponibles',
        delta: null,
        positivo: true,
        icono: 'pi-check-circle'
      },
      {
        valor: data.ocupados,
        titulo: 'Ocupados',
        delta: null,
        positivo: false,
        icono: 'pi-clock'
      },
      {
        valor: `S/${data.ventasHoy.toLocaleString('es-PE', { minimumFractionDigits: 0 })}`,
        titulo: 'Ventas hoy',
        delta: data.porcentajeVsAyer,
        positivo: esPositivo,
        icono: 'pi-dollar'
      },
      {
        valor: data.mejorDelMes,
        titulo: 'Mejor del mes',
        delta: `S/${data.totalGeneradoMejor.toLocaleString('es-PE')} generados`,
        positivo: true,
        icono: 'pi-star'
      }
    ];
  }
}