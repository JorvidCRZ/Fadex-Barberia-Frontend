import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORIAS_MOCK } from '../../config/categorias-mock.config';
import { mockPage, mockResponse } from '../../config/mock-response.config';
import { Categoria, CategoriaFiltro, CategoriaRequest, CategoriaTipo } from '../../models/catalogos/categorias.model';
import { ApiResponse, Page } from '../../models/common/index.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
    private readonly categorias = [...CATEGORIAS_MOCK];
    private categoriasCache: Categoria[] | null = null;

    clearCategoriasCache(): void {
        this.categoriasCache = null;
    }

    obtenerCategorias(page = 0, size = 10): Observable<ApiResponse<Page<Categoria>>> {
        return of(mockResponse(mockPage(this.categorias, page, size)));
    }

    obtenerCategoriasConFiltro(filter: CategoriaFiltro = {}): Observable<ApiResponse<Page<Categoria>>> {
        const filtradas = this.categorias.filter(categoria =>
            (filter.nombre == null || categoria.nombre.toLowerCase().includes(filter.nombre.toLowerCase())) &&
            (filter.estado == null || categoria.estado === filter.estado) &&
            (filter.tipo == null || categoria.tipo === filter.tipo)
        );
        return of(mockResponse(mockPage(filtradas, filter.page ?? 0, filter.size ?? 10)));
    }

    obtenerCategoriasPadre(): Observable<ApiResponse<Categoria[]>> {
        return of(mockResponse(this.categorias.filter(categoria => categoria.padreId === null)));
    }

    obtenerCategoriasActivas(): Observable<ApiResponse<Page<Categoria>>> {
        if (!this.categoriasCache) {
            this.categoriasCache = this.categorias.filter(categoria => categoria.estado);
        }
        return of(mockResponse(mockPage(this.categoriasCache, 0, 1000)));
    }

    obtenerCategoriasPorTipo(tipo: CategoriaTipo): Observable<ApiResponse<Page<Categoria>>> {
        return of(mockResponse(mockPage(this.categorias.filter(categoria => categoria.tipo === tipo && categoria.estado), 0, 1000)));
    }

    buscarCategoriaPorId(id: number): Observable<ApiResponse<Categoria>> {
        return of(mockResponse(this.categorias.find(categoria => categoria.id === id) ?? null as unknown as Categoria));
    }

    crearCategoria(data: CategoriaRequest): Observable<ApiResponse<Categoria>> {
        return of(mockResponse({ ...data, id: this.categorias.length + 1, padreNombre: null }));
    }

    actualizarCategoria(id: number, data: CategoriaRequest): Observable<ApiResponse<Categoria>> {
        return of(mockResponse({ ...data, id, padreNombre: null }));
    }

    cambiarEstado(id: number, estado: boolean): Observable<ApiResponse<Categoria>> {
        const categoria = this.categorias.find(item => item.id === id);
        return of(mockResponse({ ...(categoria ?? this.categorias[0]), estado }));
    }

    eliminarCategoria(_id: number): Observable<ApiResponse<void>> {
        return of(mockResponse(undefined));
    }
}
