import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { EstadoReserva } from '@/app/core/models/operaciones/EstadoReserva';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { CreateReserva } from '../reserva-create/create-reserva/create-reserva';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { EstadoCita } from '@/app/core/models/reserva/reserva.model';
import { TipoReserva } from '@/app/core/models/operaciones/TipoRserva';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, DialogModule, TableModule, DialogHeaderComponent, CreateReserva,
    TooltipModule, StatusBadgeComponent, FiltrosComponent, SearchBarComponent, DateFormatPipe, DatePipe
  ],
  templateUrl: './reserva-list.html',
})
export class ReservaList implements OnInit {
  private router = inject(Router);
  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);
  private cd = inject(ChangeDetectorRef);

  private readonly mockReservas: Reserva[] = [
    {
      id: 101, reservaId: 101, clienteNombre: 'Ana Torres', barberoNombre: 'Carlos Ramírez', servicio: 'Corte clásico',
      fecha: new Date('2026-10-09'), horaInicio: new Date('2026-10-09T09:00:00'), horaFin: new Date('2026-10-09T09:45:00'),
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO, total: 35, estadoReserva: EstadoReserva.PENDIENTE_PAGO
    },
    {
      id: 102, reservaId: 102, clienteNombre: 'Luis Pérez', barberoNombre: 'Miguel Torres', servicio: 'Fade moderno',
      fecha: new Date('2026-10-09'), horaInicio: new Date('2026-10-09T10:30:00'), horaFin: new Date('2026-10-09T11:15:00'),
      tipoReserva: TipoReserva.RESERVA_VIRTUAL, total: 42, estadoReserva: EstadoReserva.CONFIRMADA
    },
    {
      id: 103, reservaId: 103, clienteNombre: 'Pedro Ruiz', barberoNombre: 'Ana Gómez', servicio: 'Barba + corte',
      fecha: new Date('2026-10-10'), horaInicio: new Date('2026-10-10T12:00:00'), horaFin: new Date('2026-10-10T12:55:00'),
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO, total: 48, estadoReserva: EstadoReserva.EN_PROCESO
    },
    {
      id: 104, reservaId: 104, clienteNombre: 'Javier Soto', barberoNombre: 'Carlos Ramírez', servicio: 'Alineado premium',
      fecha: new Date('2026-10-11'), horaInicio: new Date('2026-10-11T15:30:00'), horaFin: new Date('2026-10-11T16:20:00'),
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO, total: 55, estadoReserva: EstadoReserva.FINALIZADA
    },
    {
      id: 105, reservaId: 105, clienteNombre: 'Marco Díaz', barberoNombre: 'Miguel Torres', servicio: 'Corte y perfilado',
      fecha: new Date('2026-10-12'), horaInicio: new Date('2026-10-12T11:10:00'), horaFin: new Date('2026-10-12T12:00:00'),
      tipoReserva: TipoReserva.RESERVA_VIRTUAL, total: 38, estadoReserva: EstadoReserva.NO_ASISTIO
    },
    {
      id: 106, reservaId: 106, clienteNombre: 'Renzo Navarro', barberoNombre: 'Ana Gómez', servicio: 'Recorte + barba',
      fecha: new Date('2026-10-13'), horaInicio: new Date('2026-10-13T17:45:00'), horaFin: new Date('2026-10-13T18:30:00'),
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO, total: 40, estadoReserva: EstadoReserva.CANCELADA
    }
  ];

  reservas: Reserva[] = [];
  cargado = true;
  totalRecords = 0;
  rows = 10;
  showAcciones = false;
  reservaAccion: Reserva | null = null;

  filtro: Partial<ReservaFiltro> = {};
  filtrosFields = [...FILTROS_RESERVA];
  texto = 'Reservas';

  showDetalle = false;
  reservaSeleccionada: Reserva | null = null;

  ngOnInit(): void {
    this.usarMockReservas();
    this.cargarReservas(0, this.rows);
  }

  private usarMockReservas(): void {
    this.reservas = [...this.mockReservas];
    this.totalRecords = this.reservas.length;
    this.cargado = true;
    // TODO: quitar mock cuando el backend esté listo
  }

  cargarReservas(page: number, size: number): void {
    this.cargado = true;
    this.reservaService.obtenerReservas({ ...this.filtro, page, size, sort: 'fecha,desc' }).subscribe({
      next: (resp) => {
        this.reservas = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err?.message ?? err);
        this.usarMockReservas();
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

  getAccionesDisponibles(estado: EstadoCita | EstadoReserva | string): EstadoCita[] {
    switch (estado) {
      case 'PENDIENTE_PAGO':
        return ['CONFIRMADA'];
      case 'CONFIRMADA':
        return ['EN_PROCESO', 'NO_ASISTIO'];
      case 'EN_PROCESO':
        return ['FINALIZADA'];
      default:
        return [];
    }
  }

  getAccionLabel(estado: EstadoCita): string {
    const map: Record<EstadoCita, string> = {
      PENDIENTE_PAGO: 'Confirmar',
      CONFIRMADA: 'Confirmar',
      EN_PROCESO: 'Iniciar',
      FINALIZADA: 'Finalizar',
      CANCELADA: 'Cancelar',
      CANCELADA_AUTOMATICA: 'Cancelar',
      NO_ASISTIO: 'No asistió'
    };

    return map[estado] ?? estado;
  }

  abrirAcciones(reserva: Reserva): void {
    this.reservaAccion = reserva;
    this.showAcciones = true;
  }

  cerrarAcciones(): void {
    this.showAcciones = false;
    this.reservaAccion = null;
  }

  confirmarCambioEstado(nuevoEstado: EstadoCita): void {
    if (!this.reservaAccion) {
      return;
    }

    const id = Number(this.reservaAccion.reservaId ?? this.reservaAccion.id);
    this.reservaService.cambiarEstadoReserva(id, nuevoEstado as EstadoReserva).subscribe({
      next: () => {
        this.actualizarEstadoEnMemoria(id, nuevoEstado as EstadoReserva);
        this.notify.showSuccess(`La reserva pasó a ${nuevoEstado}.`);
        this.cerrarAcciones();
      },
      error: () => {
        this.actualizarEstadoEnMemoria(id, nuevoEstado as EstadoReserva);
        this.notify.showError(`No se pudo cambiar la reserva a ${nuevoEstado}. Se actualizó localmente.`);
        this.cerrarAcciones();
      }
    });
  }

  private actualizarEstadoEnMemoria(id: number, nuevoEstado: EstadoReserva): void {
    const index = this.reservas.findIndex((reserva) => Number(reserva.reservaId ?? reserva.id) === Number(id));
    if (index >= 0) {
      this.reservas[index].estadoReserva = nuevoEstado;
    }
    this.totalRecords = this.reservas.length;
  }

  getEstadoClase(estado: string | null): string {
    switch (estado) {
      case 'PENDIENTE_PAGO': return 'badge-text estado-pendiente';
      case 'CONFIRMADA': return 'badge-text estado-confirmada';
      case 'EN_PROCESO': return 'badge-text estado-en-proceso';
      case 'FINALIZADA': return 'badge-text estado-finalizada';
      case 'CANCELADA': return 'badge-text estado-cancelada';
      case 'NO_ASISTIO': return 'badge-text estado-no_asistio';
      default: return 'badge-text estado-default';
    }
  }

  getIniciales(barberoNombre: string): string {
    return (barberoNombre || 'B')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join('') || 'B';
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