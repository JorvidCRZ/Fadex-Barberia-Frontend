export type ProductoRequest = Omit< Producto,'id' | 'nombreCategoria' | 'urlsMultimedia'>;

export enum TipoMultimedia {
    IMAGEN = 'IMAGEN',
    VIDEO = 'VIDEO',
    DOCUMENTO = 'DOCUMENTO',
}

export interface ProductoMultimedia {
    id: number;
    ordenDisplay: number;
    tipo: TipoMultimedia;
    url: string;
}

export interface Producto {
    id: number;
    sku?: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precioVenta?: number;
    precioPromo?: number | null;
    stock: number;
    estado: boolean;
    publicado: boolean;
    idCategoria: number;
    nombreCategoria: string;
    urlsMultimedia: string[];
    multimedia?: ProductoMultimedia[];
}

export interface ProductoFiltro {
    id?: number;
    nombre?: string;
    idCategoria?: number;
    estado?: boolean;
    publicado?: boolean;
    precioMin?: number;
    precioMax?: number;
    page?: number;
    size?: number;
    sort?: string;
}