import { Injectable, inject } from "@angular/core";
import { environment } from "@/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionFiltro, ConfiguracionPatchRequest, ConfiguracionRequest, ConfiguracionResponse } from "../../models/ruleta/ruleta-configuracion.model";
import { buildHttpParamsComponent } from "@/app/shared/utils/build-http-params.component";
import { ApiResponse, PageResponse } from "../../models/common/index.model";

@Injectable({
    providedIn: 'root'
})
export class ConfiguracionService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/fidelizacion/configuracion`;

    obtenerConfiguraciones(filter?: Partial<ConfiguracionFiltro>) {
        return this.http.get<ApiResponse<PageResponse<ConfiguracionResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerConfiguracionPorId(id: number) {
        return this.http.get<ApiResponse<ConfiguracionResponse>>(`${this.apiUrl}/${id}`);
    }

    crearConfiguracion(data: ConfiguracionRequest) {
        return this.http.post<ApiResponse<ConfiguracionResponse>>(this.apiUrl, data);
    }

    actualizarConfiguracionParcial(id: number, data: ConfiguracionPatchRequest) {
        return this.http.patch<ApiResponse<ConfiguracionResponse>>(`${this.apiUrl}/${id}`, data);
    }

    actualizarConfiguracion(id: number, data: ConfiguracionRequest) {
        return this.http.put<ApiResponse<ConfiguracionResponse>>(`${this.apiUrl}/${id}`, data);
    }

    eliminarConfiguracion(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}