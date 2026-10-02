export interface RecompensaObtenida {
    id: number;
    giroId: number;
    clienteId: number;
    clienteNombre: string;
    itemId: number;
    itemNombre: string;
    itemImagen: string;
    colorHex: string;
    premioMayor: boolean;
    estado: EstadoRecompensa;
    observacion: string;
    usuarioCanjeId?: number;
    fechaObtencion: string;
    fechaVencimiento?: string;
    fechaCanje?: string;
    codigoCanje: string;
    createdAt: string;
}

export interface RecompensaObtenidaRequest {
    giroId: number;
    clienteId: number;
    itemId: number;
    observacion?: string;
    usuarioCanjeId?: number;
    fechaVencimiento?: string;
    codigoCanje?: string;
}

export interface RecompensaFiltro {
    clienteId?: number;
    estado?: EstadoRecompensa;
    itemId?: number;
    page?: number;
    size?: number;
    sort?: string;
}

export interface ResultadoGiro {
    angulo: number;
    recompensa: RecompensaObtenida;
}

export interface CanjearRecompensaRequest {
    codigoCanje: string;
}

export enum EstadoRecompensa {
    PENDIENTE = 'PENDIENTE',
    CANJEADO = 'CANJEADO',
    VENCIDO = 'VENCIDO',
    ANULADO = 'ANULADO'
}