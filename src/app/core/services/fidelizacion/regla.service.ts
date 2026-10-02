import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';

import { ApiResponse, PageResponse } from '../../models/common/index.model';

import { buildHttpParamsComponent } from '@/app/shared/utils/build-http-params.component';
import { FidelizacionReglaFiltro, FidelizacionReglaPatchRequest, FidelizacionReglaRequest, FidelizacionReglaResponse } from '../../models/fidelizacion/regla.model';

@Injectable({
    providedIn: 'root'
})
export class FidelizacionReglaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/fidelizacion/reglas`;

    obtenerReglas(filter?: Partial<FidelizacionReglaFiltro>) {
        return this.http.get<ApiResponse<PageResponse<FidelizacionReglaResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerReglaPorId(id: number) {
        return this.http.get<ApiResponse<FidelizacionReglaResponse>>(`${this.apiUrl}/${id}`);
    }

    crearRegla(data: FidelizacionReglaRequest) {
        return this.http.post<ApiResponse<FidelizacionReglaResponse>>(this.apiUrl, data);
    }

    actualizarRegla(id: number, data: FidelizacionReglaRequest) {
        return this.http.put<ApiResponse<FidelizacionReglaResponse>>(`${this.apiUrl}/${id}`, data);
    }

    actualizarParcial(id: number, data: FidelizacionReglaPatchRequest) {
        return this.http.patch<ApiResponse<FidelizacionReglaResponse>>(`${this.apiUrl}/${id}`, data);
    }

    eliminarRegla(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}