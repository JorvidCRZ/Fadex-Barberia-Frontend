import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment.development";
import { ApiResponse, PageResponse } from "../../models/common/index.model";
import { RecompensaFiltro, RecompensaObtenidaRequest, RecompensaObtenida, EstadoRecompensa } from "../../models/ruleta/recompensa.model";
import { buildHttpParamsComponent } from "@/app/shared/utils/build-http-params.component";

@Injectable({
    providedIn: 'root'
})
export class RecompensaService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/recompensas/obtenidas`;

    obtenerRecompensas(filter?: Partial<RecompensaFiltro>) {
        return this.http.get<ApiResponse<PageResponse<RecompensaObtenida>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerRecompensaPorId(id: number) {
        return this.http.get<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/${id}`);
    }

    crearRecompensa(data: RecompensaObtenidaRequest) {
        return this.http.post<ApiResponse<RecompensaObtenida>>(this.apiUrl, data);
    }

    actualizarRecompensa(id: number, data: RecompensaObtenidaRequest) {
        return this.http.put<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/${id}`, data);
    }

    eliminarRecompensa(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    obtenerMisRecompensas() {
        return this.http.get<ApiResponse<RecompensaObtenida[]>>(`${this.apiUrl}/mis-recompensas`);
    }

    obtenerMiRecompensa(id: number) {
        return this.http.get<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/mis-recompensas/${id}`);
    }

    canjearRecompensa(codigoCanje: string) {
        return this.http.patch<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/canjear`, { codigoCanje });
    }

    girarRuleta() {
        return this.http.post<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/girar`, {});
    }

    cambiarEstado(id: number, estado: EstadoRecompensa, observacion?: string) {
        return this.http.patch<ApiResponse<RecompensaObtenida>>(`${this.apiUrl}/${id}/estado`, { estado, observacion });
    }

}