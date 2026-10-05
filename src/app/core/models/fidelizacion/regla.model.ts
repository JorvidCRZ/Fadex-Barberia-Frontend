export interface FidelizacionReglaResponse {
    reglaId: number;
    categoriaId: number;
    categoriaNombre: string;
    tipoAlcance: TipoAlcanceFidelizacion;
    servicioId?: number | null;
    servicioNombre?: string | null;
    productoId?: number | null;
    productoNombre?: string | null;
    puntos: number;
    activo: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FidelizacionReglaRequest {
    categoriaId: number;
    tipoAlcance: TipoAlcanceFidelizacion;
    servicioId?: number | null;
    productoId?: number | null;
    puntos: number;
    activo: boolean;
}

export interface FidelizacionReglaFiltro {
    categoriaId?: number;
    tipoAlcance?: TipoAlcanceFidelizacion;
    activo?: boolean;
    page?: number;
    size?: number;
    sort?: string;
}

export interface FidelizacionReglaPatchRequest {
    campo: 'activo';
    valor: boolean;
}

export enum TipoAlcanceFidelizacion {
    CATEGORIA = 'CATEGORIA',
    SERVICIO = 'SERVICIO',
    PRODUCTO = 'PRODUCTO',
    COMBO = 'COMBO'
}
