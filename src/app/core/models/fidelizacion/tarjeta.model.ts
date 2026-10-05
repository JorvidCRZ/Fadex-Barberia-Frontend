export interface FidelizacionTarjetaRequest {
    clienteId: number;
    categoriaId: number;
}

export interface FidelizacionTarjetaPatchRequest {
    campo: 'activo' | 'cicloActivo';
    valor: boolean;
}

export interface FidelizacionTarjetaResponse {
    id: number;
    clienteId: number;
    clienteNombreCompleto: string;
    categoriaId: number;
    categoriaNombre: string;
    progreso: number;
    meta: number | null;
    girosPorMeta: number | null;
    girosDisponibles: number;
    totalGiros: number;
    activo: boolean;
    cicloActivo: boolean;
}

export interface FidelizacionTarjetaFiltro {
    clienteId?: number;
    categoriaId?: number;
    activo?: boolean;
    cicloActivo?: boolean;
}

export interface TarjetaPorCategoria {
    categoriaId: number;
    categoriaNombre: string;
    totalTarjetas: number;
    tarjetasConGiroDisponible: number;
    girosDisponibles: number;
}