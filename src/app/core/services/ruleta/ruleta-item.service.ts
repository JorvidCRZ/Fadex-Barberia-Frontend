import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { ApiResponse, PageResponse } from '../../models/common/index.model';
import { RuletaItemFiltro, RuletaItemRequest, RuletaItemResponse } from '../../models/ruleta/ruleta-item.model';
import { buildHttpParamsComponent } from '@/app/shared/utils/build-http-params.component';
import { buildFormData } from '@/app/shared/utils/build-form-data.component';

@Injectable({
    providedIn: 'root'
})
export class RuletaItemService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ruleta/items`;

    obtenerItems(filter?: Partial<RuletaItemFiltro>) {
        return this.http.get<ApiResponse<PageResponse<RuletaItemResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerItemPorId(id: number) {
        return this.http.get<ApiResponse<RuletaItemResponse>>(`${this.apiUrl}/${id}`);
    }

    crearItem(data: RuletaItemRequest, imagen?: File) {
        return this.http.post<ApiResponse<RuletaItemResponse>>(this.apiUrl, buildFormData('data', data, imagen ? [imagen] : undefined, 'imagen'));
    }

    actualizarItem(id: number, data: RuletaItemRequest, imagen?: File) {
        return this.http.put<ApiResponse<RuletaItemResponse>>(`${this.apiUrl}/${id}`, buildFormData('data', data, imagen ? [imagen] : undefined, 'imagen'));
    }

    cambiarEstado(id: number, activo: boolean) {
        return this.http.patch<ApiResponse<RuletaItemResponse>>(`${this.apiUrl}/${id}/estado`, {}, { params: buildHttpParamsComponent({ activo }) });
    }

    eliminarItem(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}