import { RuletaTab } from "../models/ruleta/ruleta-grafico.model";

export const RULETA_TABS: RuletaTab[] = [
    { label: 'Ruletas', value: 'ruletas', icon: 'pi pi-spin pi-sync' },
    { label: 'Configuraciones', value: 'configuracion', icon: 'pi pi-cog' },
    { label: 'Items', value: 'items', icon: 'pi pi-gift' },
    // { label: 'Categorías', value: 'categorias', icon: 'pi pi-tags' },
    { label: 'Preview', value: 'preview', icon: 'pi pi-eye' },
];

export const FIDELIZACION_ADMIN_TABS = [
    { label: 'Reglas', value: 'reglas', icon: 'pi pi-list-check' },
    { label: 'Tarjetas', value: 'tarjetas', icon: 'pi pi-id-card' }
];

export const FIDELIZACION_SEGUIMIENTO_TABS = [
    { label: 'Dashboard', value: 'dashboard', icon: 'pi pi-chart-bar' },
    { label: 'Movimientos', value: 'movimientos', icon: 'pi pi-list' },
    { label: 'Giros', value: 'giros', icon: 'pi pi-refresh' },
    { label: 'Recompensas', value: 'recompensas', icon: 'pi pi-gift' }
]

export const FIDELIZACION_CLIENTE_TABS = [
    { label: 'Mi progreso', value: 'resumen', icon: 'pi pi-chart-line' },
    { label: 'Mis tarjetas', value: 'mis-tarjetas', icon: 'pi pi-id-card' },
    // { label: 'Ruleta', value: 'mi-ruleta', icon: 'pi pi-spin pi-sync' },
    { label: 'Mi historial', value: 'mi-historial', icon: 'pi pi-history' },
    { label: 'Mis premios', value: 'mis-premios', icon: 'pi pi-gift' }
]
