import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { ApiResponse, PageResponse } from '../../models/common/index.model';
import { buildHttpParamsComponent } from '@/app/shared/utils/build-http-params.component';
import { Movimiento, MovimientoFiltro, MovimientoRequest } from '../../models/fidelizacion/movimiento.model';

@Injectable({
    providedIn: 'root'
})
export class FidelizacionMovimientoService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/fidelizacion/movimientos`;

    obtenerMovimientos(filter?: Partial<MovimientoFiltro>) {
        return this.http.get<ApiResponse<PageResponse<Movimiento>>>(this.apiUrl,{params: buildHttpParamsComponent(filter)});
    }

    obtenerMovimientoPorId(id: number) {return this.http.get<ApiResponse<Movimiento>>(`${this.apiUrl}/${id}`);
    }

    crearMovimiento(data: MovimientoRequest) {
        return this.http.post<ApiResponse<Movimiento>>(this.apiUrl,data);
    }

    actualizarMovimiento(id: number, data: MovimientoRequest) {
        return this.http.put<ApiResponse<Movimiento>>(`${this.apiUrl}/${id}`,data);
    }

    eliminarMovimiento(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    obtenerMovimientosPorCliente(clienteId: number) {
        return this.http.get<ApiResponse<Movimiento[]>>(`${this.apiUrl}/cliente/${clienteId}`);
    }

    obtenerMisMovimientos() {
        return this.http.get<ApiResponse<Movimiento[]>>(`${this.apiUrl}/mis-movimientos`);
    }

    obtenerUltimosMovimientos(limite: number = 5) {
        return this.http.get<ApiResponse<Movimiento[]>>(`${this.apiUrl}/ultimos`,{params: buildHttpParamsComponent({ limite })});
    }
}