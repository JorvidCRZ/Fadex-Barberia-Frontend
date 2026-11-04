import { FidelizacionTarjetaResponse } from '../../../core/models/fidelizacion/tarjeta.model';

export type TarjetaConMeta = FidelizacionTarjetaResponse & { meta: number };

export const tieneMeta = (t: FidelizacionTarjetaResponse): boolean => !!t.meta;

export const progresoPct = (t: FidelizacionTarjetaResponse): number => t.meta ? Math.min((t.progreso / t.meta) * 100, 100) : 0;

export const slots = (t: FidelizacionTarjetaResponse): number[] => t.meta ? Array.from({ length: t.meta }, (_, i) => i + 1) : [];

export const puedeCanjear = (t: FidelizacionTarjetaResponse): boolean => t.girosDisponibles > 0 && t.cicloActivo;