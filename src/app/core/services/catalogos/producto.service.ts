import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRODUCTOS_MOCK } from '../../config/productos-mock.config';
import { mockPage, mockResponse } from '../../config/mock-response.config';
import { Producto, ProductoFiltro, ProductoRequest } from '../../models/catalogos/productos.model';
import { ApiResponse, Page } from '../../models/common/index.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
    private readonly productos = [...PRODUCTOS_MOCK];

    obtenerProductosPublico(filter: ProductoFiltro = {}): Observable<ApiResponse<Page<Producto>>> {
        return of(mockResponse(mockPage(this.filtrar(filter, true), filter.page ?? 0, filter.size ?? 12)));
    }

    obtenerProductosPublicoId(id: number): Observable<ApiResponse<Producto>> {
        return this.buscarProductoPublico(id);
    }

    obtenerProductoId(id: number): Observable<ApiResponse<Producto>> {
        return this.buscarProducto(id);
    }

    obtenerProductos(page = 0, size = 10): Observable<ApiResponse<Page<Producto>>> {
        return of(mockResponse(mockPage(this.productos, page, size)));
    }

    obtenerProductosConFiltro(filter: ProductoFiltro = {}): Observable<ApiResponse<Page<Producto>>> {
        return of(mockResponse(mockPage(this.filtrar(filter), filter.page ?? 0, filter.size ?? 10)));
    }

    obtenerProductosActivos(): Observable<ApiResponse<Page<Producto>>> {
        return of(mockResponse(mockPage(this.productos.filter(producto => producto.estado), 0, 1000)));
    }

    buscarProductoPorId(id: number): Observable<ApiResponse<Producto>> {
        return this.buscarProducto(id);
    }

    crearProducto(data: ProductoRequest, _imagenes?: File[]): Observable<ApiResponse<Producto>> {
        const producto = { ...data, id: this.productos.length + 1, nombreCategoria: '', urlsMultimedia: [] } as Producto;
        return of(mockResponse(producto));
    }

    actualizarProducto(id: number, data: ProductoRequest, _imagenes?: File[]): Observable<ApiResponse<Producto>> {
        const producto = { ...data, id, nombreCategoria: '', urlsMultimedia: [] } as Producto;
        return of(mockResponse(producto));
    }

    cambiarEstado(id: number, estado: boolean): Observable<ApiResponse<Producto>> {
        const producto = this.productos.find(item => item.id === id);
        return of(mockResponse({ ...(producto ?? this.productos[0]), estado }));
    }

    cambiarPublicado(id: number, publicado: boolean): Observable<ApiResponse<Producto>> {
        const producto = this.productos.find(item => item.id === id);
        return of(mockResponse({ ...(producto ?? this.productos[0]), publicado }));
    }

    eliminarProducto(id: number): Observable<ApiResponse<void>> {
        return of(mockResponse(undefined));
    }

    private buscarProductoPublico(id: number): Observable<ApiResponse<Producto>> {
        const producto = this.productos.find(item => item.id === id && item.publicado && item.estado);
        return producto ? of(mockResponse(producto)) : this.productoNoEncontrado();
    }

    private buscarProducto(id: number): Observable<ApiResponse<Producto>> {
        const producto = this.productos.find(item => item.id === id);
        return producto ? of(mockResponse(producto)) : this.productoNoEncontrado();
    }

    private productoNoEncontrado(): Observable<ApiResponse<Producto>> {
        return of(mockResponse(null as unknown as Producto));
    }

    private filtrar(filter: ProductoFiltro, soloPublicados = false): Producto[] {
        const nombre = filter.nombre?.trim().toLowerCase();
        return this.productos.filter(producto =>
            (!soloPublicados || (producto.publicado && producto.estado)) &&
            (!nombre || producto.nombre.toLowerCase().includes(nombre)) &&
            (filter.idCategoria == null || producto.idCategoria === filter.idCategoria) &&
            (filter.estado == null || producto.estado === filter.estado) &&
            (filter.publicado == null || producto.publicado === filter.publicado) &&
            (filter.precioMin == null || producto.precio >= filter.precioMin) &&
            (filter.precioMax == null || producto.precio <= filter.precioMax)
        );
    }
}
