export interface RuletaResponse {
    ruletaId: number;
    nombre: string;
    descripcion?: string;
    tipo: TipoRuleta;
    activa: boolean;
    incrementoPorGiro: number;
    createdAt: string;
    updatedAt: string;
}

export interface RuletaRequest {
    nombre: string;
    descripcion?: string;
    tipo: TipoRuleta;
    activa: boolean;
    incrementoPorGiro: number;
}

export interface RuletaFiltro {
    page?: number;
    size?: number;
    sort?: string;
    nombre?: string;
    tipo?: TipoRuleta;
    activa?: boolean;
}

export enum TipoRuleta {
    GENERAL = 'GENERAL',
    FIDELIZACION = 'FIDELIZACION',
    EVENTO = 'EVENTO'
}