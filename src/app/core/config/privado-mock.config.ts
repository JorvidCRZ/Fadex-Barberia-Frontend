import { HistorialClienteModel } from '../models/operaciones/historial-cliente.model';
import { Reserva } from '../models/operaciones/Reserva.model';
import { ClienteDetalleResumenDTO, ReservaDTO } from '../models/gestion/cliente/ClienteResumen.model';
import { EstadoReserva } from '../models/operaciones/EstadoReserva';
import { TipoReserva } from '../models/operaciones/TipoRserva';
import { Barbero } from '../models/gestion/barbero/barbero.model';
import { Servicio } from '../models/catalogos/servicios.model';

/** 'yyyy-MM-dd' en hora LOCAL (toISOString() usa UTC y en Perú puede devolver el día anterior) */
const fechaLocal = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Fechas con el constructor local (año, mes 0-11, día, hora, min): sin sorpresas de zona horaria.
// `fecha` lleva la hora de inicio para que la columna "Fecha y hora" muestre 10/10/2026 10:00.
export const RESERVAS_MOCK: Reserva[] = [
  {
    id: 1,
    reservaId: 1,
    clienteNombre: 'Cliente Demo',
    barberoNombre: 'Carlos Ramírez',
    servicio: 'Corte clásico',
    fecha: new Date(2026, 9, 10, 10, 0),
    horaInicio: new Date(2026, 9, 10, 10, 0),
    horaFin: new Date(2026, 9, 10, 11, 0),
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
    fecha: new Date(2026, 8, 28, 15, 0),
    horaInicio: new Date(2026, 8, 28, 15, 0),
    horaFin: new Date(2026, 8, 28, 15, 45),
    tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
    total: 30,
    estadoReserva: EstadoReserva.FINALIZADA,
  },
];

export const HISTORIAL_MOCK: HistorialClienteModel[] = RESERVAS_MOCK.map(reserva => ({
  id: reserva.reservaId,
  fecha: fechaLocal(reserva.fecha),
  horaInicio: reserva.horaInicio.toTimeString().slice(0, 5),
  horaFin: reserva.horaFin.toTimeString().slice(0, 5),
  estadoReserva: reserva.estadoReserva,
  tipoReserva: reserva.tipoReserva,
  nombreBarbero: reserva.barberoNombre,
  nombreServicio: reserva.servicio,
  total: reserva.total,
  observacion: 'Atención simulada para demostración frontend',
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

// ── Catálogos para el modal "Agendar cita" ──────────────────────────────────
// Se castean porque desconozco todos los campos obligatorios de tus modelos;
// el modal solo usa los que aparecen aquí.
export const BARBEROS_MOCK = [
  { barberoId: 1, persona: { nombre: 'Carlos', apellido: 'Ramírez' }, especialidad: 'Cortes clásicos' },
  { barberoId: 2, persona: { nombre: 'Miguel', apellido: 'Torres' }, especialidad: 'Barba y perfilado' },
  { barberoId: 3, persona: { nombre: 'Luis', apellido: 'Quispe' }, especialidad: 'Fade y diseño' },
] as unknown as Barbero[];

export const SERVICIOS_MOCK = [
  { servicioId: 1, nombre: 'Corte clásico', duracion: 60, precio: 35 },
  { servicioId: 2, nombre: 'Arreglo de barba', duracion: 45, precio: 30 },
  { servicioId: 3, nombre: 'Corte + barba', duracion: 90, precio: 55 },
] as unknown as Servicio[];