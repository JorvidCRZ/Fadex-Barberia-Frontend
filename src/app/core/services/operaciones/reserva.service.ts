import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva, ReservaFiltro } from '../../models/operaciones/Reserva.model';
import { ApiResponse, Page } from '../../models/common/index.model';
import { ReservaRequest } from '../../models/reserva/reservaRequest';
import { HistorialClienteModel } from '../../models/operaciones/historial-cliente.model';
import { EstadoReserva } from '../../models/operaciones/EstadoReserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  private API = `${environment.apiUrl}/admin/reservas`;
  private API2 = `${environment.apiUrl}/reservas`;
  private http = inject(HttpClient);

  obtenerReservas(filtro: Partial<ReservaFiltro> & { page: number; size: number; sort?: string }): Observable<ApiResponse<Page<Reserva>>> {
    let params = new HttpParams();
    Object.entries(filtro).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<ApiResponse<Page<Reserva>>>(this.API, { params });
  }

  /** @deprecated usa obtenerReservas(filtro) para tener filtros server-side */
  getReservas(page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reserva>>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ApiResponse<Page<Reserva>>>(this.API, { params });
  }

  guardarReserva(reserva: ReservaRequest): Observable<ApiResponse<Reserva>> {
    return this.http.post<ApiResponse<Reserva>>(this.API2, reserva);
  }

  getMisReservas(page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reserva>>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ApiResponse<Page<Reserva>>>(`${this.API2}/mis-reservas`, { params });
  }

  getAllMisReservas(): Observable<ApiResponse<Reserva[]>> {
    return this.http.get<ApiResponse<Reserva[]>>(`${this.API2}/mis-reservas/todas`);
  }

  cancelarReserva(id: number): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${this.API2}/${id}/cancelar`, {});
  }

  obtenerReservaPorId(id: number): Observable<ApiResponse<Reserva>> {
    return this.http.get<ApiResponse<Reserva>>(`${this.API2}/${id}`);
  }

  getHistorialCliente(page: number = 0, size: number = 10, estado?: EstadoReserva, desde?: Date, hasta?: Date): Observable<ApiResponse<Page<HistorialClienteModel>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (estado) {
      params = params.set('estado', estado);
    }
    if (desde) {
      const fechaDesde = desde instanceof Date ? desde : new Date(desde);
      params = params.set('desde', fechaDesde.toISOString().split('T')[0]);
    }
    if (hasta) {
      const fechaHasta = hasta instanceof Date ? hasta : new Date(hasta);
      params = params.set('hasta', fechaHasta.toISOString().split('T')[0]);
    }
    return this.http.get<ApiResponse<Page<HistorialClienteModel>>>(`${this.API2}/historial`, { params });
  }

  pagarReserva(id: number): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${this.API2}/${id}/pagar`, {});
  }

}