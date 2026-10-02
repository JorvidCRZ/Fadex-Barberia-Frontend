export interface GiroResponse {
    id: number;
    tarjetaId: number;
    clienteId: number;
    clienteNombre: string;
    ruletaId: number;
    ruletaNombre: string;
    itemId: number;
    premio: string;
    numeroGiro: number;
    probFinal: number;
    probAplicada: number;
    fecha: string;
}

export interface GiroRequest {
    tarjetaId: number;
    clienteId: number;
    ruletaId: number;
    itemId: number;
    numeroGiro: number;
    probFinal?: number | null;
    probAplicada?: number | null;
}

export interface GiroFiltro {
    page?: number;
    pageSize?: number;
    sort?: string;
    clienteId?: number;
    tarjetaId?: number;
    ruletaId?: number;
    fechaInicio?: string;
    fechaFin?: string;
}

export interface GiroPorSemana {
    semanaInicio: string;
    total: number;
}

export interface MovimientoPorSemana {
    semanaInicio: string;
    positivos: number;
    negativos: number;
}

export interface FidelizacionTendenciaFiltro {
    fechaInicio: string;
    fechaFin: string;
}