export interface ConfiguracionResponse {
    configuracionId: number;
    categoriaId: number;
    categoriaNombre: string;
    activa: boolean;
    meta: number;
    girosPorMeta: number;
    mostrarSiempre: boolean;
    crearTarjetaAutomatica: boolean;
    ruletaId?: number;
    ruletaNombre?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConfiguracionRequest {
    categoriaId: number;
    activa: boolean;
    meta: number;
    girosPorMeta: number;
    mostrarSiempre: boolean;
    crearTarjetaAutomatica: boolean;
    ruletaId?: number | null;
}

export interface ConfiguracionFiltro {
    page?: number;
    size?: number;
    sort?: string;
    activa?: boolean;
    categoriaId?: number;
    ruletaId?: number;
    categoriaNombre?: string;
    ruletaNombre?: string;
    metaDesde?: number;
    metaHasta?: number;
}

export interface ConfiguracionPatchRequest {
    campo: 'activa' | 'mostrarSiempre' | 'crearTarjetaAutomatica';
    valor: boolean;
}