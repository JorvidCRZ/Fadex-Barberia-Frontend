import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../auth/token.service';
import { forkJoin, map, Observable, catchError, of } from 'rxjs';
import { environment } from '@/environments/environment'; // antes apuntaba a environment.development
import { ClienteDetalleResumenDTO, ServicioResponseDTO } from '../../models/gestion/cliente/ClienteResumen.model';
import { ApiResponse } from '../../models/common/index.model';

const BASE = environment.apiUrl;

/** Estados que no tiene sentido mostrar como "próxima cita" */
const ESTADOS_EXCLUIDOS = ['CANCELADA', 'CANCELADA_AUTOMATICA', 'NO_ASISTIO', 'FINALIZADA'];

@Injectable({ providedIn: 'root' })
export class ResumenCliente {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  getClienteId(): number {
    const id = this.tokenService.getUserId();
    if (!id) throw new Error('No hay cliente autenticado');
    return Number(id);
  }

  getUsername(): string {
    return this.tokenService.getDecodedToken()?.sub?.split('@')[0] ?? 'Cliente';
  }

  getKpis(): Observable<ClienteDetalleResumenDTO> {
    return this.http
      .get<ApiResponse<ClienteDetalleResumenDTO>>(`${BASE}/clientes/perfil-propio/resumen`)
      .pipe(map(res => res.data));
  }

  getRecomendados(): Observable<ServicioResponseDTO[]> {
    return this.http
      .get<ApiResponse<any>>(`${BASE}/servicios`)
      .pipe(
        map(res => {
          const data = res.data?.content ?? res.data ?? [];
          return data.slice(0, 3);
        })
      );
  }

  cargarDashboard() {
    const reservas$ = this.http
      .get<any>(`${BASE}/reservas/mis-reservas?page=0&size=40`)
      .pipe(
        map(res => res?.data?.content || []),
        catchError((err) => {
          console.error('Error cargando reservas:', err);
          return of([]);
        })
      );

    return forkJoin({
      reservas: reservas$,
      kpis: this.getKpis(),
      // Si falla, no tumba todo el dashboard (el componente ni siquiera lo muestra)
      servicios: this.getRecomendados().pipe(catchError(() => of([] as ServicioResponseDTO[]))),
    }).pipe(
      map(({ reservas, kpis, servicios }) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const proximasCitas = [...reservas]
          .filter((r: any) => {
            const estado = r.estadoReserva ?? r.estado;
            // `T00:00:00` evita que la fecha se interprete en UTC (en Lima UTC-5 se corría un día atrás)
            return new Date(`${r.fecha}T00:00:00`) >= hoy && !ESTADOS_EXCLUIDOS.includes(estado);
          })
          .sort((a: any, b: any) =>
            new Date(`${a.fecha}T${a.horaInicio}`).getTime() -
            new Date(`${b.fecha}T${b.horaInicio}`).getTime()
          )
          .slice(0, 3);

        const historialReciente = [...reservas]
          .sort((a: any, b: any) =>
            new Date(`${b.fecha}T${b.horaInicio}`).getTime() -
            new Date(`${a.fecha}T${a.horaInicio}`).getTime()
          )
          .slice(0, 5);

        return { proximasCitas, historialReciente, kpis, servicios };
      })
    );
  }
}