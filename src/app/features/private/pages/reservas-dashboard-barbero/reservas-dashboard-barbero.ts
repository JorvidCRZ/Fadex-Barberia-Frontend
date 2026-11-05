import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

type EstadoCita =
  | 'PENDIENTE_PAGO' | 'CONFIRMADA' | 'EN_PROCESO' | 'FINALIZADA'
  | 'CANCELADA' | 'CANCELADA_AUTOMATICA' | 'NO_ASISTIO';

interface CitaBarbero {
  idReserva: number;
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  servicios: { nombreCorte: string; precio: number }[];
  fecha: string;       // yyyy-MM-dd
  horaInicio: string;  // HH:mm:ss
  estado: EstadoCita;
}

@Component({
  selector: 'app-reservas-dashboard-barbero',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './reservas-dashboard-barbero.html',
})
export class ReservasDashboardBarbero implements OnInit {

  citas: CitaBarbero[] = [];
  cargando = false;
  accionEnCurso: number | null = null;

  private readonly hoy = this.formatearFecha(new Date());

  // Datos de ejemplo en memoria (después vienen de las reservas del cliente)
  private readonly store: CitaBarbero[] = [
    { idReserva: 1, nombreCliente: 'Luis',   apellidoCliente: 'Paredes',  telefonoCliente: '912345678', servicios: [{ nombreCorte: 'Corte clásico', precio: 25 }], fecha: this.hoy, horaInicio: '10:00:00', estado: 'EN_PROCESO' },
    { idReserva: 2, nombreCliente: 'Carlos', apellidoCliente: 'Mendoza',  telefonoCliente: '955123456', servicios: [{ nombreCorte: 'Barba', precio: 15 }],          fecha: this.hoy, horaInicio: '11:30:00', estado: 'CONFIRMADA' },
    { idReserva: 3, nombreCliente: 'Ana',    apellidoCliente: 'Torres',   telefonoCliente: '987654321', servicios: [{ nombreCorte: 'Fade', precio: 20 }],           fecha: this.hoy, horaInicio: '13:30:00', estado: 'FINALIZADA' },
    { idReserva: 4, nombreCliente: 'Jorge',  apellidoCliente: 'Ramos',    telefonoCliente: '944567890', servicios: [{ nombreCorte: 'Corte + Barba', precio: 35 }],  fecha: this.hoy, horaInicio: '15:00:00', estado: 'CONFIRMADA' },
    { idReserva: 5, nombreCliente: 'Pedro',  apellidoCliente: 'Salas',    telefonoCliente: '933222111', servicios: [{ nombreCorte: 'Degradado', precio: 22 }],     fecha: this.hoy, horaInicio: '16:30:00', estado: 'PENDIENTE_PAGO' },
  ];

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citas = [...this.store];
  }

  onCambiarEstado(cita: CitaBarbero, nuevoEstado: EstadoCita): void {
    cita.estado = nuevoEstado;
  }

  private formatearFecha(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}