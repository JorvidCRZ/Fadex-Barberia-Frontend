import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Reservas } from '@/app/core/services/reserva/reserva';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { HistorialBarberFiltro } from '@/app/core/models/operaciones/historial-barbero.model';
import { FILTROS_HISTORIAL_BARBERO } from '@/app/core/config/filtros.config';

export interface ServicioHistorialDTO {
  reservaId: number;
  clienteNombre: string;
  clienteApellido: string;
  servicioNombre: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  duracion: number;
  precio: number;
  estado: string;
}

@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    DecimalPipe,
    ButtonModule,
    TableModule,
    FiltrosComponent
  ],
  templateUrl: './cortes.html',
  styleUrl: './cortes.css',
})
export class CortesComponent implements OnInit {

  private readonly reservasService = inject(Reservas);

  servicios: ServicioHistorialDTO[] = [];
  serviciosFiltrados: ServicioHistorialDTO[] = [];
  cargando = false;
  filtros: HistorialBarberFiltro = {};
  filtrosFields: FilterField<HistorialBarberFiltro>[] = FILTROS_HISTORIAL_BARBERO;

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
  this.cargando = true;

const desde = this.filtros.desde
  ? new Date(this.filtros.desde + 'T00:00:00').toISOString().split('T')[0]
  : undefined;

const hasta = this.filtros.hasta
  ? new Date(this.filtros.hasta + 'T00:00:00').toISOString().split('T')[0]
  : undefined;

  const clienteNombre = this.filtros.clienteNombre ?? undefined;

  console.log('filtros enviados:', { desde, hasta, clienteNombre });

    this.reservasService.getHistorialCortesBarbero(desde, hasta, clienteNombre).subscribe({
      next: (res: any) => {
        const lista = (res.data ?? []).map((item: any) => ({
          reservaId: item.reservaId,
          clienteNombre: item.clienteNombre,
          clienteApellido: item.clienteApellido,
          servicioNombre: item.servicioNombre,
          fecha: item.fecha,
          horaInicio: item.horaInicio,
          horaFin: item.horaFin,
          duracion: item.duracion,
          precio: item.precio,
          estado: item.estado
        }));

        this.servicios = lista.sort((a: any, b: any) => {
          const fechaA = new Date(`${a.fecha}T${a.horaInicio}`).getTime();
          const fechaB = new Date(`${b.fecha}T${b.horaInicio}`).getTime();
          return fechaB - fechaA;
        });

        this.serviciosFiltrados = [...this.servicios];
        this.cargando = false;
      },
      error: () => {
        this.servicios = [];
        this.serviciosFiltrados = [];
        this.cargando = false;
      }
    });
  }

  onBuscar(filtros: HistorialBarberFiltro): void {
    this.filtros = filtros;
    this.cargarHistorial();
  }

  onLimpiar(): void {
    this.filtros = {};
    this.cargarHistorial();
  }
  get hayFiltrosActivos(): boolean {
  return !!(this.filtros.clienteNombre || this.filtros.desde || this.filtros.hasta);
}
}