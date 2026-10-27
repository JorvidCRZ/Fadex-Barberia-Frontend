import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { Servicio, ServicioFiltro, ServicioRequest } from '../../models/catalogos/servicios.model';
import { ApiResponse, PageResponse } from '../../models/common/index.model';
import { buildHttpParamsComponent } from '@/app/shared/utils/build-http-params.component';
import { buildFormData } from '@/app/shared/utils/build-form-data.component';

@Injectable({
    providedIn: 'root'
})
export class ServicioService {

    private apiUrl = `${environment.apiUrl}/servicios`;
    private http = inject(HttpClient);

    obtenerServicioPublicos(filter?: Partial<ServicioFiltro>) {
        return this.http.get<ApiResponse<PageResponse<Servicio>>>(`${this.apiUrl}/publicados`, { params: buildHttpParamsComponent(filter) });
    }

    obtenerServicioPublicosId(id: number) {
        return this.http.get<ApiResponse<Servicio>>(`${this.apiUrl}/publicados/${id}`);
    }

    obtenerServiciosConFiltro(filter?: Partial<ServicioFiltro>) {
        return this.http.get<ApiResponse<PageResponse<Servicio>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerServicioPorId(id: number) {
        return this.http.get<ApiResponse<Servicio>>(`${this.apiUrl}/${id}`);
    }

    crearServicio(data: ServicioRequest, archivos?: File[]) {
        return this.http.post<ApiResponse<Servicio>>(this.apiUrl,buildFormData('servicio', data, archivos));
    }

    actualizarServicio(id: number, data: ServicioRequest, archivos?: File[]) {
        return this.http.put<ApiResponse<Servicio>>(`${this.apiUrl}/${id}`,buildFormData('servicio', data, archivos));
    }
    cambiarEstado(id: number, estado: boolean) {
        return this.http.patch<ApiResponse<Servicio>>(`${this.apiUrl}/${id}/estado`, {}, { params: buildHttpParamsComponent({ estado }) });
    }

    cambiarPublicado(id: number, publicado: boolean) {
        return this.http.patch<ApiResponse<Servicio>>(`${this.apiUrl}/${id}/publicacion`, {}, { params: buildHttpParamsComponent({ publicado }) });
    }

    eliminarServicio(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}