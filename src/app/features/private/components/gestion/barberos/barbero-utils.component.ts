import { AbstractControl, ValidatorFn } from '@angular/forms';

export const TELEFONO_PATTERN = /^\d{9}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Sin espacios */
export const USUARIO_PATTERN = /^\S+$/;
/** Máx. 8 enteros y 2 decimales */
export const SUELDO_PATTERN = /^\d{1,8}(\.\d{1,2})?$/;
export const SUELDO_MAX = 99999999.99;
/** Máx. 3 enteros y 2 decimales */
export const COMISION_PATTERN = /^\d{1,3}(\.\d{1,2})?$/;

/** Barbero "plano": lo que usan la tabla y los tres modales, sin importar cómo lo mande el backend */
export interface BarberoVista {
  barberoId: number;
  personaId: number;
  usuarioId: number;
  nombre: string;
  apellido: string;
  nombreCompleto: string;
  iniciales: string;
  email: string;
  telefono: string;
  usuario: string;
  experiencia: number | null;
  sueldo: number | null;
  comision: number | null;
  descripcion: string;
  fechaIngreso: string | null;
  ocupado: boolean;
  inhabilitado: boolean;
}

const texto = (v: unknown): string => (v ?? '').toString().trim();
const numero = (v: unknown): number | null => (v == null || v === '' ? null : Number(v));

export function aBarberoVista(b: any, opciones: { id?: number; inhabilitado?: boolean } = {}): BarberoVista {
  const persona = b?.persona ?? b?.personaResponse ?? b?.personaDto ?? b?.personaDTO ?? {};
  const usuario = persona?.usuario ?? b?.usuario ?? {};

  const nombre = texto(persona.nombre ?? b?.nombre ?? b?.nombres ?? b?.personaNombre);
  const apellido = texto(persona.apellido ?? b?.apellido ?? b?.apellidos ?? b?.personaApellido);
  const nombreCompleto = `${nombre} ${apellido}`.trim();

  return {
    barberoId: Number(b?.barberoId ?? b?.idBarbero ?? b?.id ?? opciones.id ?? 0),
    personaId: Number(persona.personaId ?? b?.personaId ?? 0),
    usuarioId: Number(usuario.idUsuario ?? b?.idUsuario ?? b?.usuarioId ?? 0),
    nombre,
    apellido,
    nombreCompleto,
    iniciales: ((nombre[0] ?? '') + (apellido[0] ?? '')).toUpperCase() || 'BR',
    email: texto(persona.email ?? persona.correo ?? b?.email ?? b?.correo),
    telefono: texto(persona.telefono ?? b?.telefono),
    usuario: texto(usuario.user ?? usuario.username ?? b?.username ?? b?.usuarioNombre),
    experiencia: numero(b?.experiencia),
    sueldo: numero(b?.sueldo),
    comision: numero(b?.comision),
    descripcion: texto(b?.descripcion),
    fechaIngreso: b?.fechaIngreso ?? null,
    ocupado: !!b?.ocupado,
    inhabilitado: !!opciones.inhabilitado,
  };
}

/** Error { passwordMismatch } en el grupo cuando los dos campos no coinciden */
export const passwordsIguales =
  (a: string, b: string): ValidatorFn =>
  (grupo) => {
    const x = grupo.get(a)?.value;
    const y = grupo.get(b)?.value;
    return x && y && x !== y ? { passwordMismatch: true } : null;
  };

/**
 * Mensaje del primer error de un control, solo si ya fue tocado.
 * `personalizados` pisa el mensaje por defecto: { required: 'El nombre es requerido.' }
 */
export function mensajeError(control: AbstractControl | null, personalizados: Record<string, string> = {}): string | null {
  if (!control || !control.touched || !control.errors) return null;

  const clave = Object.keys(control.errors)[0];
  if (personalizados[clave]) return personalizados[clave];

  const e = control.errors[clave];
  switch (clave) {
    case 'required': return 'Este campo es requerido.';
    case 'email': return 'Ingresa un email válido.';
    case 'minlength': return `Mínimo ${e.requiredLength} caracteres.`;
    case 'maxlength': return `Máximo ${e.requiredLength} caracteres.`;
    case 'min': return `El valor mínimo es ${e.min}.`;
    case 'max': return `El valor máximo es ${e.max}.`;
    case 'pattern': return 'El formato no es válido.';
    default: return 'Valor no válido.';
  }
}