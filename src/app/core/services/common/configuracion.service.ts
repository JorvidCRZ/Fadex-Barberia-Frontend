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

    private readonly configuracionMock: ConfiguracionPublica = {
        nombre: 'FadeX Barbería',
        direccion: 'Lima, Perú',
        correo: 'contacto@fadexbarberia.com',
        telefono: '',
        sitioWeb: '',
        logoUrl: null,
        facebook: 'https://www.facebook.com/fadexbarberia',
        instagram: 'https://www.instagram.com/fadexbarberia/',
        tiktok: 'https://www.tiktok.com/@fadexbarberia',
        whatsapp: WHATSAPP_TEMPORAL_URL,
        monedaBase: 'PEN',
        tipoCambioDolar: 1,
        politicaPrivacidad: null,
        terminosCondiciones: null,
        politicaDevoluciones: null,
    };

    cargarConfiguracion() {
        if (this._config()) return;

        if (environment.useMockData) {
            this._config.set(this.configuracionMock);
            this.guardarValoresBase(this.configuracionMock);
            return;
        }

        this.http.get<ApiResponse<ConfiguracionPublica>>(`${this.apiUrl}/publica`).subscribe({
            next: (res) => {
                if (!res.data) return;
                this._config.set(res.data);
                this.guardarValoresBase(res.data);
            },
            error: () => {
                this._config.set(null);
                this.guardarValoresBase(this.configuracionMock);
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

    private guardarValoresBase(configuracion: ConfiguracionPublica): void {
        sessionStorage.setItem('monedaBase', configuracion.monedaBase);
        sessionStorage.setItem('tipoCambio', String(configuracion.tipoCambioDolar));
        sessionStorage.setItem('igv', '18');
    }
}