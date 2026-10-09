import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FILTROS_RESERVA } from '@/app/core/config/filtros.config';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { Reserva, ReservaFiltro } from '@/app/core/models/operaciones/Reserva.model';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { CreateReserva } from '../reserva-create/create-reserva/create-reserva';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { CalendarReservas } from '@/app/features/private/components/operaciones/reservas/reserva-calendar/reserva-calendar';
import { ButtonComponent } from '@/app/shared/components/button/button.component';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, DialogModule, TableModule, DialogHeaderComponent, CreateReserva,
    TooltipModule, StatusBadgeComponent, FiltrosComponent, SearchBarComponent, DateFormatPipe, CalendarReservas, ButtonComponent
  ],
  templateUrl: './reserva-list.html',
})
export class ReservaList implements OnInit {
  private router = inject(Router);
  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);
  private cd = inject(ChangeDetectorRef);

  reservas: Reserva[] = [];
  cargado = false;
  totalRecords = 0;
  rows = 10;

  // Dialog calendario
  mostrarCalendario = false;

  filtro: Partial<ReservaFiltro> = {};
  filtrosFields = [...FILTROS_RESERVA];
  texto = 'Reservas';

  showDetalle = false;
  reservaSeleccionada: Reserva | null = null;

  ngOnInit(): void {
    this.cargarReservas(0, this.rows);
  }

  cargarReservas(page: number, size: number): void {
    this.cargado = false;
    this.reservaService.obtenerReservas({ ...this.filtro, page, size, sort: 'fecha,desc' }).subscribe({
      next: (resp) => {
        this.reservas = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        // TODO: quitar mock cuando el backend esté listo
        this.notify.showHttpError(err.message);
        const mock: Reserva[] = [
          { id: 1, reservaId: 1, clienteNombre: 'Diego Salazar', barberoNombre: 'Renzo Castillo', servicio: 'Fade + barba', fecha: new Date('2026-06-18'), horaInicio: new Date('2026-06-18T10:00:00'), horaFin: new Date('2026-06-18T10:30:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 35, estadoReserva: 'CONFIRMADA' as any },
          { id: 2, reservaId: 2, clienteNombre: 'Mateo Huamán', barberoNombre: 'Álvaro Mendoza', servicio: 'Corte clásico', fecha: new Date('2026-06-18'), horaInicio: new Date('2026-06-18T11:30:00'), horaFin: new Date('2026-06-18T12:00:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 42, estadoReserva: 'PENDIENTE_PAGO' as any },
          { id: 3, reservaId: 3, clienteNombre: 'Sebastián Flores', barberoNombre: 'José Luis Ramos', servicio: 'Perfilado de barba', fecha: new Date('2026-06-18'), horaInicio: new Date('2026-06-18T14:00:00'), horaFin: new Date('2026-06-18T14:30:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 30, estadoReserva: 'FINALIZADA' as any },
          { id: 4, reservaId: 4, clienteNombre: 'Valeria Quispe', barberoNombre: 'Renzo Castillo', servicio: 'Corte premium', fecha: new Date('2026-06-19'), horaInicio: new Date('2026-06-19T09:30:00'), horaFin: new Date('2026-06-19T10:00:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 50, estadoReserva: 'CANCELADA' as any },
          { id: 5, reservaId: 5, clienteNombre: 'Andrés Chávez', barberoNombre: 'Bruno Espinoza', servicio: 'Fade clásico', fecha: new Date('2026-06-19'), horaInicio: new Date('2026-06-19T16:00:00'), horaFin: new Date('2026-06-19T16:30:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 38, estadoReserva: 'CONFIRMADA' as any },
          { id: 6, reservaId: 6, clienteNombre: 'Laura Rojas', barberoNombre: 'Álvaro Mendoza', servicio: 'Corte mujer', fecha: new Date('2026-06-18'), horaInicio: new Date('2026-06-18T15:00:00'), horaFin: new Date('2026-06-18T15:30:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 45, estadoReserva: 'CONFIRMADA' as any },
          { id: 7, reservaId: 7, clienteNombre: 'Marcos Peña', barberoNombre: 'José Luis Ramos', servicio: 'Recorte', fecha: new Date('2026-06-20'), horaInicio: new Date('2026-06-20T10:00:00'), horaFin: new Date('2026-06-20T10:30:00'), tipoReserva: 'RESERVA_PRESENCIAL_INSTANTANEO' as any, total: 28, estadoReserva: 'PENDIENTE_PAGO' as any },
          { id: 8, reservaId: 8, clienteNombre: 'Camila Ortiz', barberoNombre: 'Bruno Espinoza', servicio: 'Barba', fecha: new Date('2026-06-18'), horaInicio: new Date('2026-06-18T12:00:00'), horaFin: new Date('2026-06-18T12:30:00'), tipoReserva: 'RESERVA_VIRTUAL' as any, total: 22, estadoReserva: 'FINALIZADA' as any },
        ];
        this.reservas = mock;
        this.totalRecords = mock.length;
        this.cargado = true;
        this.cd.detectChanges();
      }
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    this.rows = rows;
    this.cargarReservas(Math.floor(first / rows), rows);
  }

  buscarCliente(nombre: string): void {
    this.filtro.clienteNombre = nombre;
    this.cargarReservas(0, this.rows);
  }

  onBuscar(filtros: Partial<ReservaFiltro>): void {
    this.filtro = { ...this.filtro, ...filtros };
    this.cargarReservas(0, this.rows);
  }

  onLimpiar(): void {
    this.filtro = {};
    this.cargarReservas(0, this.rows);
  }

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
    this.showDetalle = true;
  }

  cobrarReserva(reserva: Reserva): void {
    this.router.navigate(['/dashboard/admin/operaciones/pos'], {
      state: { reservaCobrar: reserva }
    });
  }


  editarReserva(reserva: Reserva): void {
    this.router.navigate([`/dashboard/admin/operaciones/reservas/editar/${reserva.id}`]);
  }


  mostrarFormulario = false;
  resetFormTrigger = 0;
  icono = 'pi-calendar-plus';

  abrirCrear(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  onReservaGuardada(): void {
    this.resetFormTrigger++;
    this.mostrarFormulario = false;
    this.cargarReservas(0, this.rows);
  }

  abrirCalendario(): void {
    this.mostrarCalendario = true;
  }

  cerrarCalendario(): void {
    this.mostrarCalendario = false;
  }

  // AJUSTA los case si EstadoReserva.ts trae otros nombres
  getEstadoClass(estado: string | null): string {
    switch (estado) {
      case 'CONFIRMADA': return 'estado-confirmada';
      case 'PENDIENTE_PAGO': return 'estado-pendiente';
      case 'EN_PROCESO': return 'estado-en-proceso';
      case 'FINALIZADA': return 'estado-completada';
      case 'CANCELADA': return 'estado-cancelada';
      default: return 'estado-default';
    }
  }
}