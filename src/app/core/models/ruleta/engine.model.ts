import { RecompensaObtenida } from "./recompensa.model";
import { RuletaResponse } from "./ruleta.model";

export interface ResultadoGiroResponse {
    recompensa: RecompensaObtenida | null;
}

export interface RuletaEngineResponse {
    ruleta: RuletaResponse;
}