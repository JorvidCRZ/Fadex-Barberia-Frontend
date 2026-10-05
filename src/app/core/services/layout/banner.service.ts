import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse, Page } from '../../models/common/index.model';
import { Banner, BannerFilter, BannerRequest } from '../../models/layout/banner.model';

@Injectable({ providedIn: 'root' })

export class BannerService {
    private http = inject(HttpClient);
    apiUrl = environment.apiUrl + '/banners';

    obtenerBanners(filter: Partial<BannerFilter> = {}) {
        return this.http.get<ApiResponse<Page<Banner>>>(this.apiUrl,{ params: this.construirParams(filter) });
    }

    obtenerBannersPublicos(seccion: string) {
        return this.http.get<ApiResponse<Banner[]>>(`${this.apiUrl}/public/seccion/${seccion}`);
    }

    crearBanner(data: BannerRequest, imagen?: File | null) {
        return this.http.post<ApiResponse<Banner>>(this.apiUrl,this.construirFormData(data, imagen));
    }

    actualizarBanner(id: number, data: BannerRequest, imagen?: File | null) {
        return this.http.put<ApiResponse<Banner>>(`${this.apiUrl}/${id}`,this.construirFormData(data, imagen));
    }

    eliminarBanner(id: number) {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }

    private construirFormData(data: BannerRequest, imagen?: File | null): FormData {
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
        if (imagen) { formData.append('imagen', imagen); }
        return formData;
    }

    private construirParams(filter?: Partial<BannerFilter>): HttpParams {
        if (!filter) return new HttpParams();
        return Object.entries(filter).filter(([_, value]) => value !== undefined && value !== null).reduce((acc, [key, value]) => acc.set(key, String(value)), new HttpParams());
    }
}