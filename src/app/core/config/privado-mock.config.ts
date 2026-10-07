import { HistorialClienteModel } from '../models/operaciones/historial-cliente.model';
import { Reserva } from '../models/operaciones/Reserva.model';
import { ClienteDetalleResumenDTO, ReservaDTO } from '../models/gestion/cliente/ClienteResumen.model';
import { EstadoReserva } from '../models/operaciones/EstadoReserva';
import { TipoReserva } from '../models/operaciones/TipoRserva';

export const RESERVAS_MOCK: Reserva[] = [
  {
    id: 1,
    reservaId: 1,
    clienteNombre: 'Cliente Demo',
    barberoNombre: 'Carlos Ramírez',
    servicio: 'Corte clásico',
    fecha: new Date('2026-10-10'),
    horaInicio: new Date('2026-10-10T10:00:00'),
    horaFin: new Date('2026-10-10T11:00:00'),
    tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
    total: 35,
    estadoReserva: EstadoReserva.CONFIRMADA,
  },
  {
    id: 2,
    reservaId: 2,
    clienteNombre: 'Cliente Demo',
    barberoNombre: 'Miguel Torres',
    servicio: 'Arreglo de barba',
    fecha: new Date('2026-09-28'),
    horaInicio: new Date('2026-09-28T15:00:00'),
    horaFin: new Date('2026-09-28T15:45:00'),
    tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
    total: 30,
    estadoReserva: EstadoReserva.FINALIZADA,
  },
];

export const HISTORIAL_MOCK: HistorialClienteModel[] = RESERVAS_MOCK.map(reserva => ({
  id: reserva.reservaId,
  fecha: reserva.fecha.toISOString().slice(0, 10),
  horaInicio: reserva.horaInicio.toTimeString().slice(0, 5),
  horaFin: reserva.horaFin.toTimeString().slice(0, 5),
  estadoReserva: reserva.estadoReserva,
  tipoReserva: reserva.tipoReserva,
  nombreBarbero: reserva.barberoNombre,
  nombreServicio: reserva.servicio,
  total: reserva.total,
  observacion: 'Atención simulada para demostración frontend',
  tipoComprobante: reserva.reservaId === 1 ? 'BOLETA' : 'FACTURA',
  numeroComprobante: reserva.reservaId === 1 ? 'B001-0001048' : 'F001-0001031',
  metodoPago: reserva.reservaId === 1 ? 'Yape' : 'Tarjeta',
  razonSocial: reserva.reservaId === 2 ? 'Cliente Demo' : undefined,
  ruc: reserva.reservaId === 2 ? '20601234567' : undefined,
}));

export const RESUMEN_CLIENTE_MOCK: ClienteDetalleResumenDTO = {
  totalReservas: 8,
  totalCortes: 6,
  totalCompras: 3,
  totalGastado: 285,
  ultimaVisita: '2026-09-28',
};

export const PROXIMAS_CITAS_MOCK: ReservaDTO[] = [
  {
    reservaId: 1,
    clienteNombre: 'Cliente Demo',
    barberoNombre: 'Carlos Ramírez',
    servicio: 'Corte clásico',
    fecha: '2026-10-10',
    horaInicio: '10:00',
    horaFin: '11:00',
    tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
    total: 35,
    estado: 'CONFIRMADA',
  },
];

export const HISTORIAL_RECIENTE_MOCK: ReservaDTO[] = [
  {
    reservaId: 2,
    clienteNombre: 'Cliente Demo',
    barberoNombre: 'Miguel Torres',
    servicio: 'Arreglo de barba',
    fecha: '2026-09-28',
    horaInicio: '15:00',
    horaFin: '15:45',
    tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
    total: 30,
    estado: 'FINALIZADA',
  },
];
