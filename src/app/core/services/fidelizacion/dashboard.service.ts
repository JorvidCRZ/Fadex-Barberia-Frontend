import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponse } from "../../models/common/index.model";
import { environment } from '../../../../environments/environment.development';
import { GiroPorSemana, MovimientoPorSemana } from "../../models/ruleta/giro.model";
import { FidelizacionDashboardAdminResponse, FidelizacionDashboardClienteResponse } from "../../models/fidelizacion/dashboard.model";

@Injectable({
    providedIn: "root"
})
export class FidelizacionDashboardService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/fidelizacion/dashboard`;

    obtenerDashboardCliente() {
        return this.http.get<ApiResponse<FidelizacionDashboardClienteResponse>>(`${this.apiUrl}/cliente`);
    }

    obtenerDashboardAdmin() {
        return this.http.get<ApiResponse<FidelizacionDashboardAdminResponse>>(`${this.apiUrl}/admin`);
    }

    obtenerGirosPorSemana(fechaInicio: string, fechaFin: string) {
        const params = new HttpParams().set("fechaInicio", fechaInicio).set("fechaFin", fechaFin);
        return this.http.get<ApiResponse<GiroPorSemana[]>>(`${this.apiUrl}/admin/giros-por-semana`, { params });
    }

    obtenerMovimientosPorSemana(fechaInicio: string, fechaFin: string) {
        const params = new HttpParams().set("fechaInicio", fechaInicio).set("fechaFin", fechaFin);
        return this.http.get<ApiResponse<MovimientoPorSemana[]>>(`${this.apiUrl}/admin/movimientos-por-semana`, { params });
    }
}