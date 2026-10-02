import { TipoPremio } from "./ruleta-item.model";

export interface RuletaSegmento {
    id: number | string;
    label: string;
    sublabel?: string;
    icono?: string;
    imagen?: string;
    color?: string;
    peso: number;
    data?: unknown;
    tipoPremio: TipoPremio;
    descripcion?: string;
}

export interface PremioCard {
    titulo: string;
    subtitulo?: string;
    descripcion?: string;
    imagen?: string;
    precio?: number;
    tipo: TipoPremio;
    badge?: string;
}

export interface RuletaTab {
    label: string;
    value: string;
    icon: string;
}

export interface ResumenCategoria {
    tipo: TipoPremio;
    etiqueta: string;
    cantidad: number;
    probabilidadTotal: number;
    clases: string;
}