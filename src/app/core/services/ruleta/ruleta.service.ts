import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment.development";
import { ApiResponse, PageResponse } from "../../models/common/index.model";
import { RuletaFiltro, RuletaRequest, RuletaResponse } from "../../models/ruleta/ruleta.model";

import { buildHttpParamsComponent } from "@/app/shared/utils/build-http-params.component";

@Injectable({
    providedIn: 'root'
})
export class RuletaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ruleta`;

    obtenerRuletas(filter?: Partial<RuletaFiltro>) {
        return this.http.get<ApiResponse<PageResponse<RuletaResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerRuletaPorId(id: number) {
        return this.http.get<ApiResponse<RuletaResponse>>(`${this.apiUrl}/${id}`);
    }

    obtenerRuletasActivas() {
        return this.http.get<ApiResponse<RuletaResponse[]>>(`${this.apiUrl}/activas`);
    }

    crearRuleta(data: RuletaRequest) {
        return this.http.post<ApiResponse<RuletaResponse>>(this.apiUrl, data);
    }

    actualizarRuleta(id: number, data: RuletaRequest) {
        return this.http.put<ApiResponse<RuletaResponse>>(`${this.apiUrl}/${id}`, data);
    }

    cambiarEstado(id: number, activa: boolean) {
        return this.http.patch<ApiResponse<RuletaResponse>>(`${this.apiUrl}/${id}/estado`, {}, { params: buildHttpParamsComponent({ activa }) });
    }

    eliminarRuleta(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    obternerMisRuletas() {
        return this.http.get<ApiResponse<RuletaResponse>>(`${this.apiUrl}/mi-ruleta`);
    }
}