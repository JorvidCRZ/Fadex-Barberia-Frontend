import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { FilterField } from '../../../../core/models/common/filtro.model';
import { FILTROS_HISTORIAL_BARBERO } from '../../../../core/config/filtros.config';

export interface HistorialBarberFiltro {
  clienteNombre?: string | null;
  desde?: string | null;
  hasta?: string | null;
}

export interface ServicioHistorialDTO {
  reservaId: number;
  clienteNombre: string;
  clienteApellido: string;
  servicioNombre: string;
  fecha: string;       // yyyy-MM-dd
  horaInicio: string;  // HH:mm:ss
  horaFin: string;
  duracion: number;
  precio: number;
  estado: string;
}

@Component({
  selector: 'app-cortes-dashboard-barbero',
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
  templateUrl: './cortes-dashboard-barbero.html',
})
export class CortesDashboardBarbero implements OnInit {

  servicios: ServicioHistorialDTO[] = [];
  serviciosFiltrados: ServicioHistorialDTO[] = [];
  cargando = false;
  filtros: HistorialBarberFiltro = {};


  // Datos de ejemplo en memoria (después vienen de las reservas finalizadas)
  private readonly store: ServicioHistorialDTO[] = [
    { reservaId: 1, clienteNombre: 'Ana',    clienteApellido: 'Torres',  servicioNombre: 'Fade',          fecha: this.fechaHace(0), horaInicio: '13:30:00', horaFin: '14:15:00', duracion: 45, precio: 20, estado: 'FINALIZADA' },
    { reservaId: 2, clienteNombre: 'Luis',   clienteApellido: 'Paredes', servicioNombre: 'Corte clásico', fecha: this.fechaHace(1), horaInicio: '10:00:00', horaFin: '10:40:00', duracion: 40, precio: 25, estado: 'FINALIZADA' },
    { reservaId: 3, clienteNombre: 'Carlos', clienteApellido: 'Mendoza', servicioNombre: 'Barba',         fecha: this.fechaHace(1), horaInicio: '11:30:00', horaFin: '11:55:00', duracion: 25, precio: 15, estado: 'FINALIZADA' },
    { reservaId: 4, clienteNombre: 'Jorge',  clienteApellido: 'Ramos',   servicioNombre: 'Corte + Barba', fecha: this.fechaHace(2), horaInicio: '15:00:00', horaFin: '16:00:00', duracion: 60, precio: 35, estado: 'FINALIZADA' },
    { reservaId: 5, clienteNombre: 'Pedro',  clienteApellido: 'Salas',   servicioNombre: 'Degradado',     fecha: this.fechaHace(3), horaInicio: '16:30:00', horaFin: '17:15:00', duracion: 45, precio: 22, estado: 'FINALIZADA' },
    { reservaId: 6, clienteNombre: 'Ana',    clienteApellido: 'Torres',  servicioNombre: 'Corte clásico', fecha: this.fechaHace(5), horaInicio: '09:00:00', horaFin: '09:40:00', duracion: 40, precio: 25, estado: 'FINALIZADA' },
    { reservaId: 7, clienteNombre: 'Diego',  clienteApellido: 'Vargas',  servicioNombre: 'Fade',          fecha: this.fechaHace(6), horaInicio: '12:00:00', horaFin: '12:45:00', duracion: 45, precio: 20, estado: 'FINALIZADA' },
    { reservaId: 8, clienteNombre: 'Luis',   clienteApellido: 'Paredes', servicioNombre: 'Barba',         fecha: this.fechaHace(8), horaInicio: '17:00:00', horaFin: '17:25:00', duracion: 25, precio: 15, estado: 'FINALIZADA' },
  ];

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    const { desde, hasta, clienteNombre } = this.filtros;
    const texto = (clienteNombre ?? '').trim().toLowerCase();

    this.servicios = this.store
      .filter(s => !desde || s.fecha >= desde)
      .filter(s => !hasta || s.fecha <= hasta)
      .filter(s => !texto || `${s.clienteNombre} ${s.clienteApellido}`.toLowerCase().includes(texto))
      .sort((a, b) => `${b.fecha}T${b.horaInicio}`.localeCompare(`${a.fecha}T${a.horaInicio}`));

    this.serviciosFiltrados = [...this.servicios];
    this.cargando = false;
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

  private fechaHace(dias: number): string {
    const d = new Date();
    d.setDate(d.getDate() - dias);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}