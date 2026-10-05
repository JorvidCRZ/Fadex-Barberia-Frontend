import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SERVICIOS_MOCK } from '../../config/servicios-mock.config';
import { mockPageResponse, mockResponse } from '../../config/mock-response.config';
import { Servicio, ServicioFiltro, ServicioRequest } from '../../models/catalogos/servicios.model';
import { ApiResponse, PageResponse } from '../../models/common/index.model';

@Injectable({ providedIn: 'root' })
export class ServicioService {
    private readonly servicios = [...SERVICIOS_MOCK];

    obtenerServicioPublicos(filter: Partial<ServicioFiltro> = {}): Observable<ApiResponse<PageResponse<Servicio>>> {
        return of(mockResponse(mockPageResponse(this.filtrar(filter, true), filter.page ?? 0, filter.size ?? 10)));
    }

    obtenerServicioPublicosId(id: number): Observable<ApiResponse<Servicio>> {
        const servicio = this.servicios.find(item => item.servicioId === id && item.publicado && item.estado);
        return of(mockResponse(servicio ?? null as unknown as Servicio));
    }

    obtenerServiciosConFiltro(filter: Partial<ServicioFiltro> = {}): Observable<ApiResponse<PageResponse<Servicio>>> {
        return of(mockResponse(mockPageResponse(this.filtrar(filter), filter.page ?? 0, filter.size ?? 10)));
    }

    obtenerServicioPorId(id: number): Observable<ApiResponse<Servicio>> {
        const servicio = this.servicios.find(item => item.servicioId === id);
        return of(mockResponse(servicio ?? null as unknown as Servicio));
    }

    crearServicio(data: ServicioRequest, _archivos?: File[]): Observable<ApiResponse<Servicio>> {
        return of(mockResponse({ ...data, servicioId: this.servicios.length + 1, categoriaNombre: '', urlsMultimedia: [] }));
    }

    actualizarServicio(id: number, data: ServicioRequest, _archivos?: File[]): Observable<ApiResponse<Servicio>> {
        return of(mockResponse({ ...data, servicioId: id, categoriaNombre: '', urlsMultimedia: [] }));
    }

    cambiarEstado(id: number, estado: boolean): Observable<ApiResponse<Servicio>> {
        const servicio = this.servicios.find(item => item.servicioId === id);
        return of(mockResponse({ ...(servicio ?? this.servicios[0]), estado }));
    }

    cambiarPublicado(id: number, publicado: boolean): Observable<ApiResponse<Servicio>> {
        const servicio = this.servicios.find(item => item.servicioId === id);
        return of(mockResponse({ ...(servicio ?? this.servicios[0]), publicado }));
    }

    eliminarServicio(_id: number): Observable<void> {
        return of(void 0);
    }

    private filtrar(filter: Partial<ServicioFiltro>, soloPublicados = false): Servicio[] {
        const nombre = filter.nombre?.trim().toLowerCase();
        return this.servicios.filter(servicio =>
            (!soloPublicados || (servicio.publicado && servicio.estado)) &&
            (!nombre || servicio.nombre.toLowerCase().includes(nombre)) &&
            (filter.categoriaId == null || servicio.categoriaId === filter.categoriaId) &&
            (filter.estado == null || servicio.estado === filter.estado) &&
            (filter.publicado == null || servicio.publicado === filter.publicado) &&
            (filter.precioMin == null || servicio.precio >= filter.precioMin) &&
            (filter.precioMax == null || servicio.precio <= filter.precioMax)
        );
    }
}
