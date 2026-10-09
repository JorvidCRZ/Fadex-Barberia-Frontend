import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { HistorialBarberFiltro } from '@/app/core/models/operaciones/historial-barbero.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';

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
    TableModule,
    FiltrosComponent,
    SearchBarComponent,
    StatsComponent
  ],
  templateUrl: './cortes.html',
})
export class CortesComponent implements OnInit {

  private readonly reservasService = inject(Reservas);

  private readonly cortesMock: ServicioHistorialDTO[] = [
    { reservaId: 192, clienteNombre: 'Ana', clienteApellido: 'Torres', servicioNombre: 'Fade', fecha: '2026-09-03', horaInicio: '13:30', horaFin: '14:00', duracion: 30, precio: 20, estado: 'FINALIZADA' },
    { reservaId: 183, clienteNombre: 'Raul', clienteApellido: 'Perez', servicioNombre: 'Fade', fecha: '2026-07-18', horaInicio: '15:30', horaFin: '16:00', duracion: 30, precio: 20, estado: 'FINALIZADA' },
    { reservaId: 181, clienteNombre: 'Raul', clienteApellido: 'Perez', servicioNombre: 'Corte Fade', fecha: '2026-07-18', horaInicio: '10:00', horaFin: '10:45', duracion: 45, precio: 35, estado: 'FINALIZADA' },
    { reservaId: 150, clienteNombre: 'Manolito', clienteApellido: 'Gonzales', servicioNombre: 'cortes especiales', fecha: '2026-06-30', horaInicio: '09:00', horaFin: '09:40', duracion: 40, precio: 22.3, estado: 'FINALIZADA' },
    { reservaId: 110, clienteNombre: 'Jojhan', clienteApellido: 'Cristobal', servicioNombre: 'cortes 111', fecha: '2026-06-18', horaInicio: '18:30', horaFin: '19:05', duracion: 35, precio: 20, estado: 'FINALIZADA' },
    { reservaId: 108, clienteNombre: 'Ana', clienteApellido: 'Torres', servicioNombre: 'Corte Premium Fade', fecha: '2026-06-18', horaInicio: '17:00', horaFin: '17:45', duracion: 45, precio: 30, estado: 'FINALIZADA' },
    { reservaId: 107, clienteNombre: 'Ana', clienteApellido: 'Torres', servicioNombre: 'Corte Premium Fade', fecha: '2026-06-18', horaInicio: '09:00', horaFin: '09:45', duracion: 45, precio: 30, estado: 'FINALIZADA' },
    { reservaId: 95, clienteNombre: 'Carlos', clienteApellido: 'Mena', servicioNombre: 'Corte Clásico', fecha: '2026-06-10', horaInicio: '11:00', horaFin: '11:40', duracion: 40, precio: 25, estado: 'FINALIZADA' },
    { reservaId: 88, clienteNombre: 'Lucia', clienteApellido: 'Ramos', servicioNombre: 'Barba + Corte', fecha: '2026-06-08', horaInicio: '14:15', horaFin: '15:05', duracion: 50, precio: 40, estado: 'FINALIZADA' },
    { reservaId: 77, clienteNombre: 'Pedro', clienteApellido: 'Solis', servicioNombre: 'Lavado + Corte', fecha: '2026-06-05', horaInicio: '16:45', horaFin: '17:20', duracion: 35, precio: 28.5, estado: 'FINALIZADA' },
  ];

  servicios: ServicioHistorialDTO[] = [];
  serviciosFiltrados: ServicioHistorialDTO[] = [];
  cargando = false;
  cargado = true;
  filtros: HistorialBarberFiltro & { estado?: string } = {};
  filtrosFields: FilterField<any>[] = [
    { key: 'clienteNombre', label: 'Cliente', type: 'text', placeholder: 'Buscar por nombre del cliente' },
    { key: 'estado', label: 'Estado', type: 'select', options: [
      { label: 'Finalizada', value: 'FINALIZADA' },
      { label: 'Cancelada', value: 'CANCELADA' },
      { label: 'No asistió', value: 'NO_ASISTIO' }
    ], placeholder: 'Seleccione estado' },
    { key: 'desde', label: 'Desde', type: 'date', placeholder: 'Fecha inicio' },
    { key: 'hasta', label: 'Hasta', type: 'date', placeholder: 'Fecha fin', endOfDay: true }
  ];

  totalServicios = 0;
  ingresos = 0;
  promedio = 0;
  textoBusqueda = '';
  statsItems: StatsCard[] = [];

  ngOnInit(): void {
    this.servicios = [...this.cortesMock];
    this.serviciosFiltrados = [...this.servicios];
    this.calcularResumen();
    this.cargado = true;
    this.cargarHistorial();
  }

  buscarPorTexto(valor: string): void {
    this.textoBusqueda = (valor ?? '').trim();

    if (!this.textoBusqueda) {
      this.serviciosFiltrados = [...this.servicios];
      this.calcularResumen();
      return;
    }

    const texto = this.textoBusqueda.toLowerCase();
    this.serviciosFiltrados = this.servicios.filter((servicio) => {
      const cliente = `${servicio.clienteNombre ?? ''} ${servicio.clienteApellido ?? ''}`.toLowerCase();
      const servicioNombre = (servicio.servicioNombre ?? '').toLowerCase();
      const estado = (servicio.estado ?? '').toLowerCase();
      return cliente.includes(texto) || servicioNombre.includes(texto) || estado.includes(texto);
    });

    this.calcularResumen();
  }

  calcularResumen(): void {
    this.totalServicios = this.serviciosFiltrados.length;
    this.ingresos = this.serviciosFiltrados.reduce((acumulado, servicio) => acumulado + (Number(servicio.precio) || 0), 0);
    this.promedio = this.totalServicios > 0 ? this.ingresos / this.totalServicios : 0;

    this.statsItems = [
      {
        title: 'Total servicios',
        value: this.totalServicios,
        description: 'Historial actual',
        icon: 'pi pi-scissors',
        accentClass: 'bg-brand-gold',
        accentTextClass: 'text-brand-gold',
        iconBgClass: 'bg-brand-gold/10',
      },
      {
        title: 'Ingresos totales',
        value: `S/ ${this.ingresos.toFixed(2)}`,
        description: 'Acumulado',
        icon: 'pi pi-dollar',
        accentClass: 'bg-green-500',
        accentTextClass: 'text-green-400',
        iconBgClass: 'bg-green-500/10',
      },
      {
        title: 'Promedio por servicio',
        value: `S/ ${this.promedio.toFixed(2)}`,
        description: 'Promedio actual',
        icon: 'pi pi-chart-line',
        accentClass: 'bg-blue-500',
        accentTextClass: 'text-blue-400',
        iconBgClass: 'bg-blue-500/10',
      },
    ];
  }

  cargarHistorial(): void {
    this.cargando = true;
    this.cargado = true;

    const desde = this.filtros.desde
      ? new Date(this.filtros.desde + 'T00:00:00').toISOString().split('T')[0]
      : undefined;

    const hasta = this.filtros.hasta
      ? new Date(this.filtros.hasta + 'T00:00:00').toISOString().split('T')[0]
      : undefined;

    const clienteNombre = this.filtros.clienteNombre ?? undefined;

    console.log('filtros enviados:', { desde, hasta, clienteNombre, estado: this.filtros.estado });

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

        if (!lista.length) {
          console.warn('Backend sin resultados, usando datos de prueba en memoria para cortes.');
          // TODO: quitar mock cuando el backend esté listo
          this.servicios = [...this.cortesMock];
          this.serviciosFiltrados = this.textoBusqueda ? this.servicios.filter((servicio) => {
            const cliente = `${servicio.clienteNombre ?? ''} ${servicio.clienteApellido ?? ''}`.toLowerCase();
            const servicioNombre = (servicio.servicioNombre ?? '').toLowerCase();
            const estado = (servicio.estado ?? '').toLowerCase();
            return cliente.includes(this.textoBusqueda.toLowerCase()) || servicioNombre.includes(this.textoBusqueda.toLowerCase()) || estado.includes(this.textoBusqueda.toLowerCase());
          }) : [...this.servicios];
          this.calcularResumen();
          this.cargando = false;
          this.cargado = true;
          return;
        }

        this.servicios = lista.sort((a: any, b: any) => {
          const fechaA = new Date(`${a.fecha}T${a.horaInicio}`).getTime();
          const fechaB = new Date(`${b.fecha}T${b.horaInicio}`).getTime();
          return fechaB - fechaA;
        });

        this.serviciosFiltrados = this.textoBusqueda ? this.servicios.filter((servicio) => {
          const cliente = `${servicio.clienteNombre ?? ''} ${servicio.clienteApellido ?? ''}`.toLowerCase();
          const servicioNombre = (servicio.servicioNombre ?? '').toLowerCase();
          const estado = (servicio.estado ?? '').toLowerCase();
          return cliente.includes(this.textoBusqueda.toLowerCase()) || servicioNombre.includes(this.textoBusqueda.toLowerCase()) || estado.includes(this.textoBusqueda.toLowerCase());
        }) : [...this.servicios];
        this.calcularResumen();
        this.cargando = false;
        this.cargado = true;
      },
      error: () => {
        console.warn('Backend no disponible, usando datos de prueba en memoria para cortes.');
        // TODO: quitar mock cuando el backend esté listo
        this.servicios = [...this.cortesMock];
        this.serviciosFiltrados = this.textoBusqueda ? this.servicios.filter((servicio) => {
          const cliente = `${servicio.clienteNombre ?? ''} ${servicio.clienteApellido ?? ''}`.toLowerCase();
          const servicioNombre = (servicio.servicioNombre ?? '').toLowerCase();
          const estado = (servicio.estado ?? '').toLowerCase();
          return cliente.includes(this.textoBusqueda.toLowerCase()) || servicioNombre.includes(this.textoBusqueda.toLowerCase()) || estado.includes(this.textoBusqueda.toLowerCase());
        }) : [...this.servicios];
        this.calcularResumen();
        this.cargando = false;
        this.cargado = true;
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
    return !!(this.filtros.clienteNombre || this.filtros.estado || this.filtros.desde || this.filtros.hasta);
  }
}