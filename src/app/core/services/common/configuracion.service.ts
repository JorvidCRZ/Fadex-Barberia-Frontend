import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/common/index.model';
import { ConfiguracionPublica } from '../../models/common/empresa.model';
import { REDES_SOCIALES, WHATSAPP_TEMPORAL_URL } from '../../config/redes.config';

const LOCAL_CONFIG_KEY = 'fadex.public.configuration';

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
    readonly direccion = computed(() => this._config()?.direccion ?? '');
    readonly sitioWeb = computed(() => this._config()?.sitioWeb ?? '');
    readonly politicaPrivacidad = computed(() => this._config()?.politicaPrivacidad ?? null);
    readonly terminosCondiciones = computed(() => this._config()?.terminosCondiciones ?? null);
    readonly politicaDevoluciones = computed(() => this._config()?.politicaDevoluciones ?? null);
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
            const configuracion = this.aplicarConfiguracionLocal(this.configuracionMock);
            this._config.set(configuracion);
            this.guardarValoresBase(configuracion);
            return;
        }

        this.http.get<ApiResponse<ConfiguracionPublica>>(`${this.apiUrl}/publica`).subscribe({
            next: (res) => {
                if (!res.data) return;
                const configuracion = this.aplicarConfiguracionLocal(res.data);
                this._config.set(configuracion);
                this.guardarValoresBase(configuracion);
            },
            error: () => {
                const configuracion = this.aplicarConfiguracionLocal(this.configuracionMock);
                this._config.set(configuracion);
                this.guardarValoresBase(configuracion);
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

    obtenerConfiguracionActual(): ConfiguracionPublica {
        return this._config() ?? this.aplicarConfiguracionLocal(this.configuracionMock);
    }

    guardarConfiguracionLocal(configuracion: ConfiguracionPublica): boolean {
        try {
            localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(configuracion));
        } catch (error: unknown) {
            console.error('No se pudo guardar la configuración de la empresa en este navegador.', error);
            return false;
        }

        this._config.set(configuracion);
        this.guardarValoresBase(configuracion);
        return true;
    }

    private aplicarConfiguracionLocal(base: ConfiguracionPublica): ConfiguracionPublica {
        try {
            const stored = localStorage.getItem(LOCAL_CONFIG_KEY);
            if (!stored) return base;

            const parsed: unknown = JSON.parse(stored);
            if (typeof parsed !== 'object' || parsed === null) {
                throw new Error('El archivo local de configuración tiene un formato inválido.');
            }

            const value = parsed as Partial<ConfiguracionPublica>;
            return {
                ...base,
                nombre: typeof value.nombre === 'string' ? value.nombre : base.nombre,
                direccion: typeof value.direccion === 'string' ? value.direccion : base.direccion,
                correo: typeof value.correo === 'string' ? value.correo : base.correo,
                telefono: typeof value.telefono === 'string' ? value.telefono : base.telefono,
                logoUrl: typeof value.logoUrl === 'string' || value.logoUrl === null ? value.logoUrl : base.logoUrl,
                politicaPrivacidad: typeof value.politicaPrivacidad === 'string' || value.politicaPrivacidad === null
                    ? value.politicaPrivacidad
                    : base.politicaPrivacidad,
                terminosCondiciones: typeof value.terminosCondiciones === 'string' || value.terminosCondiciones === null
                    ? value.terminosCondiciones
                    : base.terminosCondiciones,
                politicaDevoluciones: typeof value.politicaDevoluciones === 'string' || value.politicaDevoluciones === null
                    ? value.politicaDevoluciones
                    : base.politicaDevoluciones,
            };
        } catch (error: unknown) {
            console.error('No se pudieron cargar las preferencias locales de la empresa.', error);
            return base;
        }
    }

    private guardarValoresBase(configuracion: ConfiguracionPublica): void {
        sessionStorage.setItem('monedaBase', configuracion.monedaBase);
        sessionStorage.setItem('tipoCambio', String(configuracion.tipoCambioDolar));
        sessionStorage.setItem('igv', '18');
    }
}