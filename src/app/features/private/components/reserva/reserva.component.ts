import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { CitaBarberoResponseDTO, EstadoCita } from '@/app/core/models/reserva/reserva.model';
import { NotificationService } from '@/app/core/services/common/notification.service';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ButtonModule,
    TableModule,
  ],
  templateUrl: './reserva.html',
  styleUrl: './reserva.scss',
})
export class ReservaComponent implements OnInit {

  private readonly reservasService = inject(Reservas);
  private readonly notify = inject(NotificationService);

  citas: CitaBarberoResponseDTO[] = [];
  cargando = false;
  cargado = true;
  accionEnCurso: number | null = null;
  totalRecords = 0;
  rows = 10;

  private readonly mockCitas: (CitaBarberoResponseDTO & { barberoNombre?: string })[] = [
    {
      idReserva: 1,
      barberoNombre: 'Jorge Ramírez',
      nombreCliente: 'Ana',
      apellidoCliente: 'Torres',
      telefonoCliente: '955443322',
      fecha: '2026-09-03',
      horaInicio: '13:30:00',
      estado: 'FINALIZADA',
      tipoReserva: 'PRESENCIAL',
      servicios: [{ idDetalle: 1, nombreCorte: 'Fade', precio: 35.00 }]
    },
    {
      idReserva: 2,
      barberoNombre: 'Carlos Mendoza',
      nombreCliente: 'Luis',
      apellidoCliente: 'Pérez',
      telefonoCliente: '944112233',
      fecha: '2026-09-03',
      horaInicio: '15:00:00',
      estado: 'CONFIRMADA',
      tipoReserva: 'PRESENCIAL',
      servicios: [{ idDetalle: 2, nombreCorte: 'Corte clásico', precio: 42.00 }]
    },
    {
      idReserva: 3,
      barberoNombre: 'Miguel Torres',
      nombreCliente: 'Pedro',
      apellidoCliente: 'Ruiz',
      telefonoCliente: '923441122',
      fecha: '2026-09-04',
      horaInicio: '09:45:00',
      estado: 'EN_PROCESO',
      tipoReserva: 'VIRTUAL',
      servicios: [{ idDetalle: 3, nombreCorte: 'Barba + corte', precio: 48.00 }]
    },
    {
      idReserva: 4,
      barberoNombre: 'Luis Paredes',
      nombreCliente: 'Javier',
      apellidoCliente: 'Soto',
      telefonoCliente: '977331244',
      fecha: '2026-09-04',
      horaInicio: '11:15:00',
      estado: 'PENDIENTE_PAGO',
      tipoReserva: 'PRESENCIAL',
      servicios: [{ idDetalle: 4, nombreCorte: 'Alineado premium', precio: 55.00 }]
    },
    {
      idReserva: 5,
      barberoNombre: 'Alejandro Flores',
      nombreCliente: 'Marco',
      apellidoCliente: 'Díaz',
      telefonoCliente: '998771120',
      fecha: '2026-09-05',
      horaInicio: '17:10:00',
      estado: 'NO_ASISTIO',
      tipoReserva: 'VIRTUAL',
      servicios: [{ idDetalle: 5, nombreCorte: 'Corte y perfilado', precio: 38.00 }]
    },
    {
      idReserva: 6,
      barberoNombre: 'Diego Santos',
      nombreCliente: 'Renzo',
      apellidoCliente: 'Navarro',
      telefonoCliente: '911003344',
      fecha: '2026-09-05',
      horaInicio: '18:30:00',
      estado: 'CANCELADA',
      tipoReserva: 'PRESENCIAL',
      servicios: [{ idDetalle: 6, nombreCorte: 'Recorte + barba', precio: 40.00 }]
    }
  ];

  ngOnInit(): void {
    // inicializar desde el mock local
    this.citas = [...this.mockCitas];
    this.totalRecords = this.citas.length;
    this.cargado = true;
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;
    this.cargado = true;
    this.reservasService.getCitasHoy().subscribe({
      next: (data) => {
        // Merge incoming data with current in-memory citas to avoid
        // overwriting local estado changes made by el usuario
        const incoming: CitaBarberoResponseDTO[] = data?.length ? data : [...this.mockCitas];
        const existingById = new Map<number, CitaBarberoResponseDTO>();
        for (const c of this.citas) {
          existingById.set((c as any).idReserva, c);
        }
        this.citas = incoming.map((inc) => {
          const existing = existingById.get((inc as any).idReserva);
          // preserve local estado and barberoNombre if we have them
          return existing ? { ...inc, estado: existing.estado, barberoNombre: (existing as any).barberoNombre } : inc;
        });
        this.totalRecords = this.citas.length;
        this.cargando = false;
        this.cargado = true;
      },
      error: () => {
        // Mantener lo que tengamos en memoria y notificar
        this.citas = this.citas.length ? this.citas : [...this.mockCitas];
        this.totalRecords = this.citas.length;
        this.cargando = false;
        this.cargado = true;
        this.notify.showError('No se pudo cargar la agenda. Se muestran datos de ejemplo.');
      }
    });
  }

  iniciar(reserva: CitaBarberoResponseDTO): void {
    // Actualización únicamente en memoria (sin llamadas al backend)
    this.accionEnCurso = reserva.idReserva;
    this.citas = this.citas.map((r) =>
      (r as any).idReserva === reserva.idReserva ? { ...r, estado: 'EN_PROCESO' } : r
    );
    this.totalRecords = this.citas.length;
    this.notify.showSuccess('Cita iniciada.');
    this.accionEnCurso = null;
  }

  finalizar(reserva: CitaBarberoResponseDTO): void {
    // Actualización únicamente en memoria (sin llamadas al backend)
    this.accionEnCurso = reserva.idReserva;
    this.citas = this.citas.map((r) =>
      (r as any).idReserva === reserva.idReserva ? { ...r, estado: 'FINALIZADA' } : r
    );
    this.totalRecords = this.citas.length;
    this.notify.showSuccess('Cita finalizada.');
    this.accionEnCurso = null;
  }

  private actualizarEstadoEnMemoria(idReserva: number, nuevoEstado: EstadoCita): void {
    this.citas = this.citas.map((cita) =>
      cita.idReserva === idReserva ? { ...cita, estado: nuevoEstado } : cita
    );
    this.totalRecords = this.citas.length;
    this.cargado = true;
  }

  getEstadoClase(estado: EstadoCita | string | null): string {
    switch (estado) {
      case 'PENDIENTE_PAGO':
        return 'badge-text estado-pendiente';
      case 'CONFIRMADA':
        return 'badge-text estado-confirmada';
      case 'EN_PROCESO':
        return 'badge-text estado-en-proceso';
      case 'FINALIZADA':
        return 'badge-text estado-finalizada';
      case 'CANCELADA':
      case 'CANCELADA_AUTOMATICA':
        return 'badge-text estado-cancelada';
      case 'NO_ASISTIO':
        return 'badge-text estado-no_asistio';
      default:
        return 'badge-text estado-default';
    }
  }

  getEstadoLabel(estado: EstadoCita | string | null): string {
    switch (estado) {
      case 'PENDIENTE_PAGO':
        return 'Pendiente';
      case 'CONFIRMADA':
        return 'Confirmada';
      case 'EN_PROCESO':
        return 'En proceso';
      case 'FINALIZADA':
        return 'Finalizada';
      case 'CANCELADA':
      case 'CANCELADA_AUTOMATICA':
        return 'Cancelada';
      case 'NO_ASISTIO':
        return 'No asistió';
      default:
        return 'Sin estado';
    }
  }

  getBarberoNombre(cita: CitaBarberoResponseDTO): string {
    // Function removed: barbero name is provided per-reserva in `barberoNombre`.
    return '';
  }

  getIniciales(nombre?: string): string {
    const source = (nombre || 'B').toString();
    return source
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join('') || 'B';
  }

  getTotalServicio(cita: CitaBarberoResponseDTO): number {
    return (cita.servicios ?? []).reduce((total, servicio) => total + (servicio.precio ?? 0), 0);
  }

}