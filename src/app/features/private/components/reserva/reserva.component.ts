import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { CitaBarberoResponseDTO, EstadoCita } from '@/app/core/models/reserva/reserva.model';

// Cambia a false para volver a usar el backend
const USAR_MOCK = true;

const CITAS_MOCK = [
  { idReserva: 1, nombreCliente: 'Ana',      apellidoCliente: 'Torres',    telefonoCliente: '955443322', fecha: '2026-10-26', horaInicio: '09:00:00', servicios: [{ nombreCorte: 'Fade' }],               estado: 'PENDIENTE_PAGO' },
  { idReserva: 2, nombreCliente: 'Raul',     apellidoCliente: 'Perez',     telefonoCliente: '987654321', fecha: '2026-10-26', horaInicio: '10:00:00', servicios: [{ nombreCorte: 'Corte Fade' }],         estado: 'CONFIRMADA' },
  { idReserva: 3, nombreCliente: 'Jojhan',   apellidoCliente: 'Cristobal', telefonoCliente: '912345678', fecha: '2026-10-26', horaInicio: '11:30:00', servicios: [{ nombreCorte: 'Corte Premium Fade' }], estado: 'CONFIRMADA' },
  { idReserva: 4, nombreCliente: 'Manolito', apellidoCliente: 'Gonzales',  telefonoCliente: '999111222', fecha: '2026-10-26', horaInicio: '13:00:00', servicios: [{ nombreCorte: 'Burst Fade' }],         estado: 'EN_PROCESO' },
  { idReserva: 5, nombreCliente: 'Luis',     apellidoCliente: 'Ramos',     telefonoCliente: '944555666', fecha: '2026-10-26', horaInicio: '15:00:00', servicios: [{ nombreCorte: 'Corte Clásico' }],      estado: 'FINALIZADA' },
  { idReserva: 6, nombreCliente: 'Pedro',    apellidoCliente: 'Salas',     telefonoCliente: '933222111', fecha: '2026-10-26', horaInicio: '16:30:00', servicios: [{ nombreCorte: 'Fade' }],               estado: 'CANCELADA' },
] as unknown as CitaBarberoResponseDTO[];

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TableModule,
    ButtonComponent,
  ],
  templateUrl: './reserva.html',
  styleUrl: './reserva.scss',
})
export class ReservaComponent implements OnInit {

  private readonly reservasService = inject(Reservas);

  citas: CitaBarberoResponseDTO[] = [];
  cargando = false;
  accionEnCurso: number | null = null;

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;

    if (USAR_MOCK) {
      this.citas = CITAS_MOCK.map(c => ({ ...c }));
      this.cargando = false;
      return;
    }

    this.reservasService.getCitasHoy().subscribe({
      next: (data) => {
        this.citas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  onCambiarEstado(cita: CitaBarberoResponseDTO, nuevoEstado: EstadoCita): void {
    if (USAR_MOCK) {
      cita.estado = nuevoEstado;
      return;
    }

    this.accionEnCurso = cita.idReserva;
    this.reservasService.cambiarEstado(cita.idReserva, nuevoEstado).subscribe({
      next: () => {
        cita.estado = nuevoEstado;
        this.accionEnCurso = null;
      },
      error: () => {
        this.accionEnCurso = null;
      }
    });
  }

}