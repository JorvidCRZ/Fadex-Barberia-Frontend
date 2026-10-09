import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { Reserva } from '@/app/core/models/operaciones/Reserva.model';
import { finalize } from 'rxjs';

@Component({ 
  selector: 'app-calendar-reservas',
  standalone: true,
  imports: [CommonModule, ToastModule, DialogModule],
  providers: [MessageService, DatePipe],
  templateUrl: './reserva-calendar.html',
})
export class CalendarReservas implements OnInit {

  private reservaService = inject(ReservaService);
  private messageService = inject(MessageService);

  isLoading = false;
  fechaActual = new Date();

  todasLasReservas: Reserva[] = [];
  reservasDelDia: Reserva[] = [];
  barberos: string[] = [];

  showDetalle = false;
  reservaSeleccionada: Reserva | null = null;

  horasGrilla = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ];

  // Mock en memoria para mostrar en el calendario cuando no haya backend
  // TODO: quitar mock cuando el backend esté listo
  private readonly mockReservas: Reserva[] = [
    { id: 1, reservaId: 1, clienteNombre: 'Diego Salazar', barberoNombre: 'Renzo Castillo', servicio: 'Fade clásico', fecha: new Date('2026-10-08'), horaInicio: new Date('2026-10-08T10:00:00'), horaFin: new Date('2026-10-08T10:30:00'), tipoReserva:  'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 35, estadoReserva: 'CONFIRMADA' as any },
    { id: 2, reservaId: 2, clienteNombre: 'Mateo Huamán', barberoNombre: 'Álvaro Mendoza', servicio: 'Corte clásico', fecha: new Date('2026-10-08'), horaInicio: new Date('2026-10-08T11:30:00'), horaFin: new Date('2026-10-08T12:00:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 42, estadoReserva: 'PENDIENTE_PAGO' as any },
    { id: 3, reservaId: 3, clienteNombre: 'Sebastián Flores', barberoNombre: 'José Luis Ramos', servicio: 'Perfilado de barba', fecha: new Date('2026-10-08'), horaInicio: new Date('2026-10-08T14:00:00'), horaFin: new Date('2026-10-08T14:30:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 30, estadoReserva: 'FINALIZADA' as any },
    { id: 4, reservaId: 4, clienteNombre: 'Valeria Quispe', barberoNombre: 'Renzo Castillo', servicio: 'Corte premium', fecha: new Date('2026-10-09'), horaInicio: new Date('2026-10-09T09:30:00'), horaFin: new Date('2026-10-09T10:00:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 50, estadoReserva: 'CANCELADA' as any },
    { id: 5, reservaId: 5, clienteNombre: 'Andrés Chávez', barberoNombre: 'Bruno Espinoza', servicio: 'Fade clásico', fecha: new Date('2026-10-09'), horaInicio: new Date('2026-10-09T16:00:00'), horaFin: new Date('2026-10-09T16:30:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 38, estadoReserva: 'CONFIRMADA' as any },
    { id: 6, reservaId: 6, clienteNombre: 'Laura Rojas', barberoNombre: 'Álvaro Mendoza', servicio: 'Corte mujer', fecha: new Date('2026-10-08'), horaInicio: new Date('2026-10-08T15:00:00'), horaFin: new Date('2026-10-08T15:30:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 45, estadoReserva: 'CONFIRMADA' as any },
    { id: 7, reservaId: 7, clienteNombre: 'Marcos Peña', barberoNombre: 'José Luis Ramos', servicio: 'Recorte', fecha: new Date('2026-10-09'), horaInicio: new Date('2026-10-09T10:00:00'), horaFin: new Date('2026-10-09T10:30:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 28, estadoReserva: 'PENDIENTE_PAGO' as any },
    { id: 8, reservaId: 8, clienteNombre: 'Camila Ortiz', barberoNombre: 'Bruno Espinoza', servicio: 'Barba', fecha: new Date('2026-10-08'), horaInicio: new Date('2026-10-08T12:00:00'), horaFin: new Date('2026-10-08T12:30:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 22, estadoReserva: 'FINALIZADA' as any },
  ];

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.isLoading = true;
    this.reservaService.getReservas(0, 1000)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
            this.todasLasReservas = response?.data?.content ?? [];
            this.filtrarPorFecha();
        },
        error: () => {
            // Si falla el backend, usar mock en memoria para mostrar el calendario
            this.todasLasReservas = this.mockReservas;
            this.filtrarPorFecha();
            this.messageService.add({
              severity: 'warn',
              summary: 'Datos de ejemplo',
              detail: 'No se pudieron cargar las reservas desde el servidor. Mostrando datos de ejemplo.'
            });
        }
      });
  }

  filtrarPorFecha(): void {
    const fechaStr = this.fechaActual.toISOString().split('T')[0];
    this.reservasDelDia = this.todasLasReservas.filter(r => {
      if (!r || r.fecha == null) return false;
      // fecha puede venir como string o Date; usar coerción segura a string
      const fechaVal = typeof (r as any).fecha === 'string'
        ? (r as any).fecha
        : (r.fecha instanceof Date ? (r.fecha as Date).toISOString() : String((r as any).fecha));
      return String(fechaVal).split('T')[0] === fechaStr;
    });
    // Extraer barberos únicos del día
    this.barberos = [...new Set(this.reservasDelDia.map(r => r.barberoNombre))];
    // Asegurar los 4 barberos del admin aunque no tengan reservas
    const adminBarberos = ['Renzo Castillo', 'Álvaro Mendoza', 'José Luis Ramos', 'Bruno Espinoza'];
    for (const b of adminBarberos) if (!this.barberos.includes(b)) this.barberos.push(b);
  }

  cambiarDia(dias: number): void {
    const nueva = new Date(this.fechaActual);
    nueva.setDate(nueva.getDate() + dias);
    this.fechaActual = nueva;
    this.filtrarPorFecha();
  }

  irAHoy(): void {
    this.fechaActual = new Date();
    this.filtrarPorFecha();
  }

  get esHoy(): boolean {
    const hoy = new Date().toISOString().split('T')[0];
    return this.fechaActual.toISOString().split('T')[0] === hoy;
  }

  // Busca reserva para un barbero en una hora específica
  getReserva(barbero: string, hora: string): Reserva | null {
    return this.reservasDelDia.find(r =>
      r.barberoNombre === barbero &&
        String(r.horaInicio).substring(0, 5) === hora
    ) ?? null;
  }

  getColorEstado(estado: string | null): string {
    switch (estado) {
      case 'CONFIRMADA':
        return 'bg-[#1a3a2a] border border-[#2d6a4a]';
      case 'PENDIENTE':
        return 'bg-[#3a2a1a] border border-[#C9A84C]/50';
      case 'CANCELADA':
        return 'bg-[#3a1a1a] border border-[#c0392b]/50';
      default:
        return 'bg-[#2a2a2a] border border-[#444444]';
    }
  }

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
    this.showDetalle = true;
  }
}