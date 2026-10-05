import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ApiResponse } from "../../models/common/index.model";
import { RuletaResponse } from "../../models/ruleta/ruleta.model";
import { RecompensaObtenida } from "../../models/ruleta/recompensa.model";
import { environment } from "../../../../environments/environment.development";
@Injectable({
    providedIn: 'root'
})
export class RuletaEngineService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ruleta`;

    obtenerMiRuleta() {
        return this.http.get<ApiResponse<RuletaResponse>>(`${this.apiUrl}/mi-ruleta`);
    }

    obtenerMiRuletaPorTarjeta(tarjetaId: number) {
        return this.http.get<ApiResponse<RuletaResponse>>(`${this.apiUrl}/mi-ruleta/${tarjetaId}`);
    }

    girar() {
        return this.http.post<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/girar`,{});
    }

    girarTarjeta(tarjetaId: number) {
        return this.http.post<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/girar/${tarjetaId}`,{});
    }
}