import { Injectable, inject } from "@angular/core";
import { environment } from "@/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { buildHttpParamsComponent } from "@/app/shared/utils/build-http-params.component";
import { ApiResponse, PageResponse } from "../../models/common/index.model";
import { GiroFiltro, GiroRequest, GiroResponse } from "../../models/ruleta/giro.model";

@Injectable({
    providedIn: 'root'
})
export class GiroService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ruleta/giros`;

    obtenerGiros(filter?: Partial<GiroFiltro>) {
        return this.http.get<ApiResponse<PageResponse<GiroResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerGiroPorId(id: number) {
        return this.http.get<ApiResponse<GiroResponse>>(`${this.apiUrl}/${id}`);
    }

    crearGiro(data: GiroRequest) {
        return this.http.post<ApiResponse<GiroResponse>>(this.apiUrl, data);
    }

    actualizarGiro(id: number, data: GiroRequest) {
        return this.http.put<ApiResponse<GiroResponse>>(`${this.apiUrl}/${id}`, data);
    }

    eliminarGiro(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    obtenerMisGiros() {
        return this.http.get<ApiResponse<GiroResponse[]>>(`${this.apiUrl}/mis-giros`);
    }

    obtenerMiGiro(id: number) {
        return this.http.get<ApiResponse<GiroResponse>>(`${this.apiUrl}/mis-giros/${id}`);
    }
}