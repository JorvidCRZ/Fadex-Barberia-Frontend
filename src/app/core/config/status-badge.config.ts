/** Debe coincidir con los tonos de $badge-tones en _badges.scss */
export type BadgeTone =
  | 'indigo' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  | 'orange' | 'emerald' | 'sky' | 'cyan' | 'teal' | 'violet' | 'purple' | 'fuchsia' | 'rose';

/** 'PENDIENTE_PAGO', 'Pendiente pago' y 'pendiente-pago' → 'pendiente_pago' */
export const normalizarEstado = (valor: unknown): string =>
  String(valor ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');

/**
 * 1) Coincidencia exacta. Es lo único que hay que tocar para fijar el color de un estado.
 *    Las claves van normalizadas (minúsculas, con guion bajo).
 */
export const TONO_POR_ESTADO: Record<string, BadgeTone> = {
  // Reservas / citas
  confirmada: 'success',
  pendiente: 'warning',
  pendiente_pago: 'warning',
  en_proceso: 'info',
  finalizada: 'info',
  cancelada: 'danger',
  no_asistio: 'neutral',

  // Órdenes / ventas
  pagado: 'orange',
  preparando: 'info',
  enviado: 'sky',
  entregado: 'success',
  devuelto: 'violet',
  cancelado: 'danger',
  emitido: 'warning',
  emitida: 'warning',
  anulado: 'danger',
  anulada: 'danger',
  activa: 'success',
  activo: 'success',
  recibida_parcial: 'sky',

  // Entrega y pago
  web: 'cyan',
  presencial: 'neutral',
  delivery: 'sky',
  recojo_tienda: 'emerald',
  efectivo: 'emerald',
  transferencia: 'info',
  tarjeta: 'indigo',
  yape: 'violet',
  pasarela: 'fuchsia',

  // Reclamos
  abierto: 'warning',
  resuelto: 'success',
  cerrado: 'neutral',
  reclamo: 'orange',
  queja: 'purple',

  // Recompensas / fidelización / premios
  canjeado: 'warning',
  vencido: 'neutral',
  venta: 'emerald',
  ajuste: 'warning',
  producto: 'info',
  servicio: 'purple',
  descuento: 'success',
  cupon: 'indigo',
  sin_premio: 'neutral',
  categoria: 'indigo',
  combo: 'indigo',
};

/**
 * 2) Si no hay coincidencia exacta, se prueba por palabra clave.
 *    El orden importa: 'inactivo' tiene que caer en danger antes de que 'activ' lo tome como success.
 */
const REGLAS: ReadonlyArray<readonly [RegExp, BadgeTone]> = [
  [/(cancel|anul|rechaz|fall|error|inactiv|elimin|defectuos)/, 'danger'],
  [/(pend|abiert|espera)/, 'warning'],
  [/(proceso|prepar|curso)/, 'info'],
  [/(confirm|activ|pagad|entreg|resuel|complet|aprob|exito)/, 'success'],
  [/(finaliz|terminad)/, 'info'],
  [/(cerrad|vencid)/, 'neutral'],
];

/** 3) Si nada coincide: neutral. */
export function tonoDeEstado(valor: unknown): BadgeTone {
  const clave = normalizarEstado(valor);
  return TONO_POR_ESTADO[clave] ?? REGLAS.find(([re]) => re.test(clave))?.[1] ?? 'neutral';
}