export interface Movimiento{
    id: number;
    tarjetaId: number;
    clienteId: number;
    origen: Origen;
    idOrigen: number;
    puntos: number;
    descripcion: string;
    clienteNombre?: string;
    createdAt: string;
}

export interface MovimientoRequest {
    tarjetaId: number;
    clienteId: number;
    origen: Origen;
    idOrigen: number;
    puntos: number;
    descripcion?: string;
}

export interface MovimientoFiltro{
    page?: number;
    size?: number;
    sort?: string;
    clienteId?: number;
    tarjetaId?: number;
    origen?: Origen;
    fechaInicio?: string;
    fechaFin?: string;
}

export enum Origen{
    RESERVA = 'RESERVA',
    VENTA = 'VENTA',
    AJUSTE = 'AJUSTE'
}