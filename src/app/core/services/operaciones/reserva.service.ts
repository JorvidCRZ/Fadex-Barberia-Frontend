import { Observable, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse, Page } from '../../models/common/index.model';
import { ReservaRequest } from '../../models/reserva/reservaRequest';
import { EstadoReserva } from '../../models/operaciones/EstadoReserva';
import { environment } from '../../../../environments/environment.development';
import { Reserva, ReservaFiltro } from '../../models/operaciones/Reserva.model';
import { HistorialClienteModel } from '../../models/operaciones/historial-cliente.model';
import { TipoReserva } from '../../models/operaciones/TipoRserva';
import { SERVICIOS_MOCK } from '../../config/servicios-mock.config';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  private API = `${environment.apiUrl}/admin/reservas`;
  private API2 = `${environment.apiUrl}/reservas`;
  private http = inject(HttpClient);
  private readonly LOCAL_RESERVAS_KEY = 'fadex_mock_reservas';
  private readonly LOCAL_BARBEROS_KEY = 'fadex_mock_barberos';

  private getMockBarberos(): any[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const almacenado = localStorage.getItem(this.LOCAL_BARBEROS_KEY);
    if (almacenado) {
      try {
        const parsed = JSON.parse(almacenado);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        return this.getBarberosPorDefecto();
      }
    }

    const porDefecto = this.getBarberosPorDefecto();
    localStorage.setItem(this.LOCAL_BARBEROS_KEY, JSON.stringify(porDefecto));
    return porDefecto;
  }

  private getBarberosPorDefecto(): any[] {
    return [
      { barberoId: 1001, persona: { nombre: 'Carlos', apellido: 'Ramírez' }, especialidad: 'Corte clásico', nombreCompleto: 'Carlos Ramírez' },
      { barberoId: 1002, persona: { nombre: 'Miguel', apellido: 'Torres' }, especialidad: 'Barba y perfilado', nombreCompleto: 'Miguel Torres' },
      { barberoId: 1003, persona: { nombre: 'Ana', apellido: 'Gómez' }, especialidad: 'Fade moderno', nombreCompleto: 'Ana Gómez' },
    ];
  }

private getMockReservas(): Reserva[] {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  const almacenado = localStorage.getItem(this.LOCAL_RESERVAS_KEY);
  if (almacenado) {
    try {
      const parsed = JSON.parse(almacenado) as Reserva[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [];
      }

      return [...parsed]
        .sort((a, b) => Number(b.reservaId || b.id || 0) - Number(a.reservaId || a.id || 0));
    } catch {
      return [];
    }
  }

  const porDefecto: Reserva[] = [
    {
      id: 1,
      reservaId: 1,
      clienteNombre: 'Cliente Demo',
      barberoNombre: 'Carlos Ramírez',
      servicio: 'Corte clásico',
      fecha: new Date('2026-10-10'),
      horaInicio: new Date('2026-10-10T10:00:00'),
      horaFin: new Date('2026-10-10T11:00:00'),
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
      total: 35,
      estadoReserva: EstadoReserva.CONFIRMADA,
    },
    {
      id: 2,
      reservaId: 2,
      clienteNombre: 'Cliente Demo',
      barberoNombre: 'Miguel Torres',
      servicio: 'Arreglo de barba',
      fecha: new Date('2026-09-28'),
      horaInicio: new Date('2026-09-28T15:00:00'),
      horaFin: new Date('2026-09-28T15:45:00'),
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
      total: 30,
      estadoReserva: EstadoReserva.FINALIZADA,
    },
  ];

  localStorage.setItem(this.LOCAL_RESERVAS_KEY, JSON.stringify(porDefecto));
  return porDefecto;
}
  

  private getBarberoNombreLocal(barberoId: number | null): string {
    if (!barberoId) {
      return 'Barbero local';
    }

    const item = this.getMockBarberos().find((b: any) => Number(b.barberoId) === Number(barberoId));
    if (item) {
      return `${item.persona?.nombre ?? ''} ${item.persona?.apellido ?? ''}`.trim() || item.nombreCompleto || 'Barbero local';
    }

    const mapa: Record<number, string> = {
      1001: 'Carlos Ramírez',
      1002: 'Miguel Torres',
      1003: 'Ana Gómez',
    };

    return mapa[Number(barberoId)] || `Barbero ${barberoId}`;
  }

  private getServicioNombreLocal(servicioId: number | null): string {
    if (!servicioId) {
      return 'Servicio general';
    }


    const servicio = SERVICIOS_MOCK.find((item) => Number(item.servicioId) === Number(servicioId));
    return servicio?.nombre || `Servicio ${servicioId}`;
  }
  private cambiarEstadoMock(id: number, estado: EstadoReserva): Observable<ApiResponse<string>> {
  const lista = this.getMockReservas().map((r) =>
    Number(r.reservaId || r.id) === Number(id) ? { ...r, estadoReserva: estado } : r
  );
  localStorage.setItem(this.LOCAL_RESERVAS_KEY, JSON.stringify(lista));

  return of({
    success: true,
    message: 'Estado actualizado localmente',
    timestamp: new Date().toISOString(),
    data: 'OK',
  });
}

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
  if (environment.useMockData) {
    const siguienteId = Date.now();
    const fecha = new Date(`${reserva.fecha}T${reserva.horaInicio}:00`);
    const fin = new Date(fecha.getTime() + 60 * 60 * 1000);
    const nombreBarbero = this.getBarberoNombreLocal(Number(reserva.barberoId));
    const nombreServicio = this.getServicioNombreLocal(Number(reserva.servicioId));
    const precioServicio = SERVICIOS_MOCK.find((item) => Number(item.servicioId) === Number(reserva.servicioId))?.precio ?? 35;

    const nuevaReserva: Reserva = {
      id: siguienteId,
      reservaId: siguienteId,
      clienteNombre: 'Cliente Demo',
      barberoNombre: nombreBarbero,
      servicio: nombreServicio,
      fecha: new Date(reserva.fecha),
      horaInicio: fecha,
      horaFin: fin,
      tipoReserva: TipoReserva.RESERVA_PRESENCIAL_INSTANTANEO,
      total: precioServicio,
      estadoReserva: EstadoReserva.PENDIENTE_PAGO,
    };

    const existentes = this.getMockReservas();

    localStorage.setItem(this.LOCAL_BARBEROS_KEY, JSON.stringify(this.getBarberosPorDefecto()));
    localStorage.setItem(this.LOCAL_RESERVAS_KEY, JSON.stringify([nuevaReserva, ...existentes]));

    return of({
      success: true,
      message: 'Reserva creada localmente',
      timestamp: new Date().toISOString(),
      data: nuevaReserva,
    });
  }

  return this.http.post<ApiResponse<Reserva>>(this.API2, reserva);
}

  getMisReservas(page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reserva>>> {
    if (environment.useMockData) {
      const reservas = this.getMockReservas();
      const inicio = page * size;
      const content = reservas.slice(inicio, inicio + size);
      const response: ApiResponse<Page<Reserva>> = {
        success: true,
        message: 'Reservas locales cargadas',
        timestamp: new Date().toISOString(),
        data: {
          content,
          pageNumber: page,
          pageSize: size,
          totalElements: reservas.length,
          totalPages: Math.max(1, Math.ceil(reservas.length / size)),
          first: page === 0,
          last: inicio + size >= reservas.length,
        },
      };

      return of(response);
    }

    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ApiResponse<Page<Reserva>>>(`${this.API2}/mis-reservas`, { params });
  }

  getAllMisReservas(): Observable<ApiResponse<Reserva[]>> {
    return this.http.get<ApiResponse<Reserva[]>>(`${this.API2}/mis-reservas/todas`);
  }
cancelarReserva(id: number): Observable<ApiResponse<string>> {
  if (environment.useMockData) {
    return this.cambiarEstadoMock(id, EstadoReserva.CANCELADA);
  }
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
  if (environment.useMockData) {
    return this.cambiarEstadoMock(id, EstadoReserva.CONFIRMADA);
  }
  return this.http.patch<ApiResponse<string>>(`${this.API2}/${id}/pagar`, {});
}
cambiarEstadoReserva(id: number, estado: EstadoReserva): Observable<ApiResponse<string>> {
  return this.cambiarEstadoMock(id, estado);
}

}