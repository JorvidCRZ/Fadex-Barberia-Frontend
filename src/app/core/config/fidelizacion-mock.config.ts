import { FidelizacionDashboardClienteResponse } from '../models/fidelizacion/dashboard.model';
import { FidelizacionTarjetaResponse } from '../models/fidelizacion/tarjeta.model';
import { Movimiento, Origen } from '../models/fidelizacion/movimiento.model';
import { EstadoRecompensa, RecompensaObtenida } from '../models/ruleta/recompensa.model';
import { GiroResponse } from '../models/ruleta/giro.model';
import { RuletaSegmento } from '../models/ruleta/ruleta-grafico.model';

export const FIDELIZACION_TARJETAS_MOCK: FidelizacionTarjetaResponse[] = [
  {
    id: 1, clienteId: 3, clienteNombreCompleto: 'Juan Pérez', categoriaId: 1,
    categoriaNombre: 'Corte Clásico', progreso: 7, meta: 15, girosPorMeta: 1,
    girosDisponibles: 1, totalGiros: 7, activo: true, cicloActivo: true,
  },
];

export const FIDELIZACION_MOVIMIENTOS_MOCK: Movimiento[] = [
  { id: 1, tarjetaId: 1, clienteId: 3, origen: Origen.RESERVA, idOrigen: 1048, puntos: 1, descripcion: 'Corte clásico realizado', createdAt: '2026-09-01T10:30:00' },
  { id: 2, tarjetaId: 1, clienteId: 3, origen: Origen.RESERVA, idOrigen: 1031, puntos: 1, descripcion: 'Fade + Barba realizado', createdAt: '2026-08-24T16:00:00' },
  { id: 3, tarjetaId: 1, clienteId: 3, origen: Origen.RESERVA, idOrigen: 1016, puntos: 1, descripcion: 'Corte clásico realizado', createdAt: '2026-08-10T11:30:00' },
];

export const FIDELIZACION_RECOMPENSAS_MOCK: RecompensaObtenida[] = [
  {
    id: 1, giroId: 1, clienteId: 3, clienteNombre: 'Juan Pérez', itemId: 1,
    itemNombre: 'Corte gratis', itemImagen: '', colorHex: '#c9a84c', premioMayor: false,
    estado: EstadoRecompensa.CANJEADO, observacion: 'Premio canjeado', codigoCanje: 'FX-CORTE-001',
    fechaObtencion: '2026-08-01T10:00:00', fechaCanje: '2026-08-10T11:00:00', createdAt: '2026-08-01T10:00:00',
  },
];

export const FIDELIZACION_GIROS_MOCK: GiroResponse[] = [
  { id: 1, tarjetaId: 1, clienteId: 3, clienteNombre: 'Juan Pérez', ruletaId: 1, ruletaNombre: 'Ruleta FadeX', itemId: 1, premio: 'Corte gratis', numeroGiro: 1, probFinal: 0.25, probAplicada: 0.25, fecha: '2026-08-01T10:00:00' },
];

export const FIDELIZACION_SEGMENTOS_MOCK: RuletaSegmento[] = [
  { id: 1, label: 'Corte gratis', sublabel: 'Un corte clásico', descripcion: 'Canjea un corte clásico gratis.', peso: 35, tipoPremio: 'PRODUCTO' as never },
  { id: 2, label: '10% descuento', sublabel: 'En tu próximo servicio', descripcion: 'Descuento para tu próxima visita.', peso: 35, tipoPremio: 'DESCUENTO' as never },
  { id: 3, label: 'Barba gratis', sublabel: 'Servicio adicional', descripcion: 'Agrega una barba gratis.', peso: 20, tipoPremio: 'SERVICIO' as never },
  { id: 4, label: 'Sigue participando', sublabel: 'La próxima será tuya', descripcion: 'Continúa acumulando puntos.', peso: 10, tipoPremio: 'CUPON' as never },
];

export const FIDELIZACION_DASHBOARD_MOCK: FidelizacionDashboardClienteResponse = {
  totalTarjetas: 1,
  girosDisponibles: 1,
  tarjetasConGiroDisponible: 1,
  recompensasPendientes: 0,
  tarjetas: FIDELIZACION_TARJETAS_MOCK,
  movimientosRecientes: FIDELIZACION_MOVIMIENTOS_MOCK,
  ultimosGiros: FIDELIZACION_GIROS_MOCK,
  recompensas: FIDELIZACION_RECOMPENSAS_MOCK,
};
