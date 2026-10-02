import { Injectable, inject } from "@angular/core";
import { environment } from "@/environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { RuletaCategoriaFiltro, RuletaCategoriaRequest, RuletaCategoriaResponse } from "../../models/ruleta/ruleta-categoria.model";
import { buildHttpParamsComponent } from "@/app/shared/utils/build-http-params.component";
import { ApiResponse, PageResponse } from "../../models/common/index.model";

@Injectable({
    providedIn: 'root'
})
export class RuletaCategoriaService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/ruleta/categorias`;

    obtenerCategorias(filter?: Partial<RuletaCategoriaFiltro>) {
        return this.http.get<ApiResponse<PageResponse<RuletaCategoriaResponse>>>(this.apiUrl, { params: buildHttpParamsComponent(filter) });
    }

    obtenerCategoriaPorId(id: number) {
        return this.http.get<ApiResponse<RuletaCategoriaResponse>>(`${this.apiUrl}/${id}`);
    }

    crearCategoria(data: RuletaCategoriaRequest) {
        return this.http.post<ApiResponse<RuletaCategoriaResponse>>(this.apiUrl, data);
    }

    actualizarCategoria(id: number, data: RuletaCategoriaRequest) {
        return this.http.put<ApiResponse<RuletaCategoriaResponse>>(`${this.apiUrl}/${id}`, data);
    }

    eliminarCategoria(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}