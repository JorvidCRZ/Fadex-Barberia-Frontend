import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaBarberoResponseDTO, EstadoCita } from '../../models/reserva/reserva.model';
import { environment } from '@/environments/environment';

export interface ServicioHistorialDTO {
  idReserva: number;
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  nombreCorte: string;
  fecha: string;
  horaInicio: string;
  duracion: number;
  precio: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class Reservas {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/barbero/citas`;

  getCitasHoy(): Observable<CitaBarberoResponseDTO[]> {
    return this.http.get<CitaBarberoResponseDTO[]>(`${this.baseUrl}/hoy`);
  }

  cambiarEstado(idReserva: number, nuevoEstado: EstadoCita): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${idReserva}/estado`, {
      estado: nuevoEstado
    });
  }

  getHistorialServicios(): Observable<ServicioHistorialDTO[]> {
    return this.http.get<ServicioHistorialDTO[]>(`${this.baseUrl}/historial`);
  }

getHistorialCortesBarbero(desde?: string, hasta?: string, clienteNombre?: string): Observable<any> {
  const params: any = {};
  if (desde) params['desde'] = desde;
  if (hasta) params['hasta'] = hasta;
  if (clienteNombre) params['clienteNombre'] = clienteNombre;
  return this.http.get<any>(`${environment.apiUrl}/barbero/historial`, { params });
}
}