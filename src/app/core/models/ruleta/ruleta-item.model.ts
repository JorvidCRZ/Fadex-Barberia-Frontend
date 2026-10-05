export interface RuletaItemResponse {
    itemId: number;
    ruletaId: number;
    nombre: string;
    descripcion?: string;
    tipoPremio: TipoPremio;
    valor?: number;
    probabilidad: number;
    esPremioMayor: boolean;
    stock?: number;
    cantidadProducto?: number;
    ordenDisplay?: number;
    imagenUrl?: string;
    productoId?: number;
    servicioId?: number;
    activo: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface RuletaItemRequest {
    ruletaId: number;
    nombre: string;
    descripcion?: string;
    tipoPremio: TipoPremio;
    valor?: number;
    probabilidad: number;
    esPremioMayor: boolean;
    stock?: number;
    ordenDisplay?: number;
    productoId?: number;
    servicioId?: number;
    cantidadProducto?: number;
    activo: boolean;
}

export interface RuletaItemFiltro {
    page?: number;
    size?: number;
    sort?: string;
    ruletaId?: number;
    nombre?: string;
    tipoPremio?: TipoPremio;
    activo?: boolean;
}

export enum TipoPremio {
    DESCUENTO = 'DESCUENTO',
    SERVICIO = 'SERVICIO',
    PRODUCTO = 'PRODUCTO',
    CUPON = 'CUPON',
    SIN_PREMIO = 'SIN_PREMIO'
}