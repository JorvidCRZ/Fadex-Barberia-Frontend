export interface ConfiguracionBase {
    nombre: string;
    direccion: string;
    correo: string;
    telefono: string;
    sitioWeb: string;
    logoUrl: string | null;
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    whatsapp: string | null;
    monedaBase: string;
    politicaPrivacidad: string | null;
    terminosCondiciones: string | null;
    politicaDevoluciones: string | null;
}

export interface ConfiguracionEmpresaLocal {
    businessName: string;
    email: string;
    phone: string;
    address: string;
    logoDataUrl: string | null;
    termsAndConditions: string;
    privacyPolicy: string;
    returnsPolicy: string;
}

export interface ConfiguracionRequest extends Omit<ConfiguracionBase, 'logoUrl'> { razonSocial: string; ruc: string;}
export interface ConfiguracionPublica extends ConfiguracionBase { tipoCambioDolar: number; }
export interface TipoCambioRequest { tipoCambioDolar: number; }