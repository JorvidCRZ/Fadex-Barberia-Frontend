import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe'; // usa la misma ruta que en venta-table
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

// Cambia a false para volver a usar el backend
const USAR_MOCK = true;

const SERVICIOS_MOCK: ServicioHistorialDTO[] = [
  { reservaId: 1, clienteNombre: 'Ana',      clienteApellido: 'Torres',    servicioNombre: 'Fade',               fecha: '2026-09-03', horaInicio: '13:30:00', horaFin: '14:00:00', duracion: 30, precio: 20.00, estado: 'FINALIZADA' },
  { reservaId: 2, clienteNombre: 'Raul',     clienteApellido: 'Perez',     servicioNombre: 'Fade',               fecha: '2026-07-18', horaInicio: '15:30:00', horaFin: '16:00:00', duracion: 30, precio: 20.00, estado: 'FINALIZADA' },
  { reservaId: 3, clienteNombre: 'Raul',     clienteApellido: 'Perez',     servicioNombre: 'Corte Fade',         fecha: '2026-07-18', horaInicio: '10:00:00', horaFin: '10:45:00', duracion: 45, precio: 35.00, estado: 'FINALIZADA' },
  { reservaId: 4, clienteNombre: 'Manolito', clienteApellido: 'Gonzales',  servicioNombre: 'cortes especiales',  fecha: '2026-06-30', horaInicio: '09:00:00', horaFin: '09:40:00', duracion: 40, precio: 22.30, estado: 'FINALIZADA' },
  { reservaId: 5, clienteNombre: 'Jojhan',   clienteApellido: 'Cristobal', servicioNombre: 'cortes 111',         fecha: '2026-06-18', horaInicio: '18:30:00', horaFin: '19:05:00', duracion: 35, precio: 20.00, estado: 'FINALIZADA' },
  { reservaId: 6, clienteNombre: 'Ana',      clienteApellido: 'Torres',    servicioNombre: 'Corte Premium Fade', fecha: '2026-06-18', horaInicio: '17:00:00', horaFin: '17:45:00', duracion: 45, precio: 30.00, estado: 'NO_ASISTIO' },
];

@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DatePipe, DecimalPipe, TableModule, DialogModule,
    FiltrosComponent, ButtonComponent, MonedaPipe
  ],
  templateUrl: './cortes.html',
  styleUrl: './cortes.scss'
})
export class CortesComponent implements OnInit {

  private readonly reservasService = inject(Reservas);

  servicios: ServicioHistorialDTO[] = [];
  serviciosFiltrados: ServicioHistorialDTO[] = [];
  cargando = false;
  filtros: HistorialBarberFiltro = {};
  filtrosFields: FilterField<HistorialBarberFiltro>[] = FILTROS_HISTORIAL_BARBERO;

  // Modal de detalle
  displayModal = false;
  servicioSeleccionado: ServicioHistorialDTO | null = null;

  ngOnInit(): void {
    this.cargarHistorial();
  }

  /** Convierte Date o string a 'YYYY-MM-DD' (usa la fecha local, sin corrimientos de zona horaria) */
  private aISO(valor: unknown): string | undefined {
    if (!valor) return undefined;
    if (valor instanceof Date) {
      const y = valor.getFullYear();
      const m = String(valor.getMonth() + 1).padStart(2, '0');
      const d = String(valor.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return String(valor).slice(0, 10);
  }

  cargarHistorial(): void {
    this.cargando = true;

    const desde = this.aISO(this.filtros.desde);
    const hasta = this.aISO(this.filtros.hasta);

    // ── MOCK ──
    if (USAR_MOCK) {
      const nombre = (this.filtros.clienteNombre ?? '').toLowerCase().trim();

      this.servicios = SERVICIOS_MOCK
        .filter(s => !nombre || `${s.clienteNombre} ${s.clienteApellido}`.toLowerCase().includes(nombre))
        .filter(s => !desde || s.fecha >= desde)
        .filter(s => !hasta || s.fecha <= hasta)
        .sort((a, b) =>
          new Date(`${b.fecha}T${b.horaInicio}`).getTime() -
          new Date(`${a.fecha}T${a.horaInicio}`).getTime()
        );

      this.serviciosFiltrados = [...this.servicios];
      this.cargando = false;
      return;
    }

    // ── BACKEND ──
    const clienteNombre = this.filtros.clienteNombre ?? undefined;

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

  verDetalle(servicio: ServicioHistorialDTO): void {
    this.servicioSeleccionado = servicio;
    this.displayModal = true;
  }

  etiquetaEstado(estado: string): string {
    switch (estado) {
      case 'FINALIZADA': return 'Finalizada';
      case 'CANCELADA':
      case 'CANCELADA_AUTOMATICA': return 'Cancelada';
      case 'NO_ASISTIO': return 'No asistió';
      default: return estado;
    }
  }

  get hayFiltrosActivos(): boolean {
    return !!(this.filtros.clienteNombre || this.filtros.desde || this.filtros.hasta);
  }

  get totalCortesFinalizados(): number {
    return this.serviciosFiltrados.filter(s => s.estado === 'FINALIZADA').length;
  }

  get ingresosRegistrados(): number {
    return this.serviciosFiltrados
      .filter(s => s.estado === 'FINALIZADA')
      .reduce((total, s) => total + (Number(s.precio) || 0), 0);
  }

  get clientesAtendidos(): number {
    const clientes = this.serviciosFiltrados
      .filter(s => s.estado === 'FINALIZADA')
      .map(s => `${s.clienteNombre ?? ''} ${s.clienteApellido ?? ''}`.trim())
      .filter(nombre => nombre !== '');

    return new Set(clientes).size;
  }
}