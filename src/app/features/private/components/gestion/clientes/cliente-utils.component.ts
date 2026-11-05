import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';

/** "Nombre Apellido" o '—' si no hay datos. */
export function nombreCompleto(cliente: Cliente | null | undefined): string {
  const p = cliente?.persona;
  return `${p?.nombre ?? ''} ${p?.apellido ?? ''}`.trim() || '—';
}

/** Iniciales para el avatar: 'JP', o 'CL' si no hay nombre. */
export function iniciales(cliente: Cliente | null | undefined): string {
  const partes = nombreCompleto(cliente).split(' ').filter(Boolean);
  if (!partes.length || partes[0] === '—') return 'CL';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}