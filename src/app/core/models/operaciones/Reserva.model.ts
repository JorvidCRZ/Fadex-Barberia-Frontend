import { TipoReserva } from "./TipoRserva";
import { EstadoReserva } from './EstadoReserva';

export interface Reserva {
    id: number;
    reservaId: number;
    clienteNombre: string;
    barberoNombre: string;
    servicio: string;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    tipoReserva: TipoReserva;
    total: number;
    estadoReserva: EstadoReserva;
    recordatorioEnviado?: boolean;
}


export interface ReservaFiltro {
    clienteId?: number;
    barberoId?: number;
    servicioId?: number;
    clienteNombre?: string;
    barberoNombre?: string;
    estadoReserva?: string;
    tipoReserva?: string;
    fecha?: string;
    fechaHasta?: string;
    page?: number;
    size?: number;
    sort?: string;
}