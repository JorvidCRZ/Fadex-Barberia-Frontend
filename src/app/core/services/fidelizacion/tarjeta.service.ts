import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment.development";
import { buildHttpParamsComponent } from "@/app/shared/utils/build-http-params.component";
import { ApiResponse, PageResponse } from "../../models/common/index.model";
import { FidelizacionTarjetaFiltro, FidelizacionTarjetaPatchRequest, FidelizacionTarjetaRequest, FidelizacionTarjetaResponse } from "../../models/fidelizacion/tarjeta.model";

@Injectable({
    providedIn: 'root'
})
export class FidelizacionTarjetaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/fidelizacion/tarjetas`;

    obtenerTarjetas(filter?: Partial<FidelizacionTarjetaFiltro>) {
        return this.http.get<ApiResponse<PageResponse<FidelizacionTarjetaResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerTarjetaPorId(id: number) {
        return this.http.get<ApiResponse<FidelizacionTarjetaResponse>>(`${this.apiUrl}/${id}`);
    }

    crearTarjeta(data: FidelizacionTarjetaRequest) {
        return this.http.post<ApiResponse<FidelizacionTarjetaResponse>>(this.apiUrl, data);
    }

    actualizarTarjeta(id: number, data: FidelizacionTarjetaRequest) {
        return this.http.put<ApiResponse<FidelizacionTarjetaResponse>>(`${this.apiUrl}/${id}`, data);
    }

    actualizarTarjetaParcial(id: number, data: FidelizacionTarjetaPatchRequest) {
        return this.http.patch<ApiResponse<FidelizacionTarjetaResponse>>(`${this.apiUrl}/${id}`, data);
    }

    eliminarTarjeta(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    obtenerMisTarjetas() {
        return this.http.get<ApiResponse<FidelizacionTarjetaResponse[]>>(`${this.apiUrl}/mis-tarjetas`);
    }

    obtenerMiTarjeta(id: number) {
        return this.http.get<ApiResponse<FidelizacionTarjetaResponse>>(`${this.apiUrl}/mis-tarjetas/${id}`);
    }
}