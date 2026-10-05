import { GiroResponse } from "../ruleta/giro.model";
import { RecompensaObtenida } from "../ruleta/recompensa.model";
import { Movimiento } from "./movimiento.model";
import { FidelizacionTarjetaResponse, TarjetaPorCategoria } from "./tarjeta.model";

export interface FidelizacionDashboardClienteResponse {
    totalTarjetas: number;
    girosDisponibles: number;
    tarjetasConGiroDisponible: number;
    recompensasPendientes: number;

    tarjetas: FidelizacionTarjetaResponse[];
    movimientosRecientes: Movimiento[];
    ultimosGiros: GiroResponse[];
    recompensas: RecompensaObtenida[];
}

export interface FidelizacionDashboardAdminResponse {
    totalTarjetas: number;
    totalConfiguraciones: number;
    totalGiros: number;
    totalRecompensas: number;

    movimientosRecientes: Movimiento[];
    ultimasRecompensas: RecompensaObtenida[];
    tarjetasPorCategoria: TarjetaPorCategoria[];
}