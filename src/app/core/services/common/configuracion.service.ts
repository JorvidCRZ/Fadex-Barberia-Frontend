import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/common/index.model';
import { ConfiguracionPublica } from '../../models/common/empresa.model';
import { REDES_SOCIALES, WHATSAPP_TEMPORAL_URL } from '../../config/redes.config';

@Injectable({
    providedIn: 'root',
})

export class ConfiguracionService {
    readonly redesSociales = REDES_SOCIALES;
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/configuracion`;
    private _config = signal< ConfiguracionPublica | null>(null);
    readonly config = this._config.asReadonly();
    readonly monedaBase = computed(() => this._config()?.monedaBase ?? 'PEN');
    readonly tipoCambioDolar = computed(() => this._config()?.tipoCambioDolar ?? 1);
    readonly nombre = computed(() => this._config()?.nombre ?? '');
    readonly logoUrl = computed(() => this._config()?.logoUrl ?? null);
    readonly telefono = computed(() => this._config()?.telefono ?? '');
    readonly correo = computed(() => this._config()?.correo ?? '');
    readonly sitioWeb = computed(() => this._config()?.sitioWeb ?? '');
    readonly politicaPrivacidad = computed(() => this._config()?.politicaPrivacidad ?? null);
    readonly terminosCondiciones = computed(() => this._config()?.terminosCondiciones ?? null);
    readonly condiciones_uso = computed(() => this._config()?.politicaDevoluciones ?? null);
    readonly whatsapp = computed(() => WHATSAPP_TEMPORAL_URL);
    readonly redes = computed(() => {
        const c = this._config();
        return [
            { icon: 'pi-facebook', label: 'Facebook', url: c?.facebook },
            { icon: 'pi-instagram', label: 'Instagram', url: c?.instagram },
            { icon: 'pi-whatsapp', label: 'WhatsApp', url: WHATSAPP_TEMPORAL_URL },
            { icon: 'pi-tiktok', label: 'TikTok', url: c?.tiktok },
        ].filter(r => !!r.url);
    });

  
    cargarConfiguracion() {
        if (this._config()) return;
        this.http.get<ApiResponse<ConfiguracionPublica>>(`${this.apiUrl}/publica`).subscribe({
            next: (res) => {
                if (!res.data) return;
                this._config.set(res.data);
            },
            error: () => {
                this._config.set(null);
                sessionStorage.setItem('monedaBase', 'PEN');
                sessionStorage.setItem('tipoCambio', '1');
                sessionStorage.setItem('igv', '18');
            }
        });
    }

    recargarConfiguracion() {
        this._config.set(null);
        this.cargarConfiguracion();
    }

    obtenerConfiguracionPublica() {
        return this.http.get<ApiResponse<ConfiguracionPublica>>(`${this.apiUrl}/publica`);
    }
}