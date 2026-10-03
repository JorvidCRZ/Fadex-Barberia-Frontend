// import { PermissionCode } from "../auth/rol.model";

export interface BannerBase {
    orden: number;
    titulo: string;
    activo: boolean;
    subtitulo: string;
    urlDestino: string;
    tituloBoton?: string;
    seccion: BannerSeccion;
    fechaInicio: string | null;
    fechaFin: string | null;
}

export interface BannerFilter {
    page?: number;
    size?: number;
    titulo?: string;
    activo?: boolean;
    seccion?: string;
}

export interface SidebarItem {
    id?: string;
    label: string;
    icon?: string;
    routerLink?: string[];
    routerLinkActiveOptions?: any;
    linkClass?: string;
    roles?: string[];   
    // permission?: PermissionCode | PermissionCode[];
    items?: SidebarItem[];
}

export interface BannerRequest extends BannerBase { }
export interface Banner extends BannerBase { id: number; urlImagen: string; }
export type BannerSeccion = 'HOME_TOP' | 'HOME_MIDDLE' | 'HOME_BOTTOM';
