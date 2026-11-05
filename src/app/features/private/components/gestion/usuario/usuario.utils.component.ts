import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Fila que usa la tabla (ya normalizada, la plantilla no adivina nombres de campos) */
export interface UsuarioFila {
  usuarioId: number;
  username: string;
  nombre: string;
  apellido: string;
  roles: string[];
  tieneQr: boolean;
  tienePin: boolean;
}

/** Detalle de un usuario (modales ver y editar) */
export interface UsuarioPerfil {
  usuarioId: number;
  username: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  roles: string[];
  tieneQr: boolean;
  /** undefined si el backend no lo envía */
  tienePin?: boolean;
}

export interface FiltroConsulta {
  rol?: string;
  tieneQr?: boolean;
  multiplesRoles?: boolean;
}

export const REGEX_TELEFONO = /^\d{9}$/;
export const REGEX_PIN = /^\d{4,6}$/;

/** "juan.perez" → "JP", "admin" → "AD" */
export function iniciales(texto: string): string {
  if (!texto) return '';
  const partes = texto.trim().split(/[\s._-]/).filter(Boolean);
  if (partes.length === 0) return '';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

/** Los roles llegan como 'ADMIN' o como { nombre: 'ADMIN' } */
export function nombreRol(rol: unknown): string {
  if (typeof rol === 'string') return rol.trim();
  return String((rol as { nombre?: string } | null)?.nombre ?? '').trim();
}

/** Clase del badge de rol (se pasa a [customClass] de app-status-badge) */
export function claseRol(rol: string): string {
  const r = (rol || '').toLowerCase();
  if (r.includes('admin')) return 'badge-text role-admin';
  if (r.includes('barber')) return 'badge-text role-barbero';
  if (r.includes('recep')) return 'badge-text role-recep';
  return 'badge-text role-default';
}

/** Respuesta de la lista → fila de la tabla */
export function aFilaUsuario(u: any): UsuarioFila {
  return {
    usuarioId: Number(u?.idUsuario ?? u?.usuarioId ?? u?.id),
    username: u?.usuario ?? u?.username ?? '',
    nombre: u?.nombre ?? '',
    apellido: u?.apellido ?? '',
    roles: (u?.roles ?? []).map(nombreRol).filter(Boolean),
    tieneQr: !!u?.tieneQr,
    tienePin: !!u?.tienePin,
  };
}

/** Respuesta de obtenerPorId → detalle. El response es plano: { idUsuario, username, nombre, apellido, email, telefono, rol } */
export function aPerfilUsuario(data: any, idRespaldo: number): UsuarioPerfil {
  const roles = Array.isArray(data?.roles) ? data.roles : data?.rol ? [data.rol] : [];
  return {
    usuarioId: Number(data?.idUsuario ?? idRespaldo),
    username: data?.username ?? '',
    nombre: data?.nombre ?? '',
    apellido: data?.apellido ?? '',
    telefono: data?.telefono ?? '',
    email: data?.email ?? '',
    roles: roles.map(nombreRol).filter(Boolean),
    tieneQr: !!data?.tieneQr,
    tienePin: typeof data?.tienePin === 'boolean' ? data.tienePin : undefined,
  };
}

/** Valores del componente de filtros → parámetros de la consulta al backend */
export function aFiltroConsulta(f: { rol?: string; qr?: string; cantidadRoles?: string } | null | undefined): FiltroConsulta {
  return {
    rol: f?.rol?.trim() || undefined,
    tieneQr: f?.qr === 'conQr' ? true : f?.qr === 'sinQr' ? false : undefined,
    multiplesRoles: f?.cantidadRoles === 'multiplesRoles' ? true : f?.cantidadRoles === 'unRol' ? false : undefined,
  };
}

export function hayFiltroConsulta(f: FiltroConsulta): boolean {
  return Boolean(f.rol || f.tieneQr !== undefined || f.multiplesRoles !== undefined);
}

/** Deja solo dígitos y corta al máximo (teléfono, PIN) */
export function soloDigitos(valor: string, max: number): string {
  return (valor ?? '').replace(/\D/g, '').slice(0, max);
}

export function coincidenCampos(campo: string, confirmacion: string): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const a = grupo.get(campo)?.value ?? '';
    const b = grupo.get(confirmacion)?.value ?? '';
    return a === b ? null : { passwordMismatch: true };
  };
}