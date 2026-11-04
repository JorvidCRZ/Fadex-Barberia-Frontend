import { EstadoReserva } from './EstadoReserva';
import { TipoReserva } from './TipoRserva';

export interface HistorialClienteModel {
  tipo?: 'RESERVA' | 'COMPRA' | null;
  id: number;
  fecha: string;
  horaInicio?: string | null;
  horaFin?: string | null;
  estadoReserva?: string | null;
  tipoReserva?: TipoReserva | string | null;
  nombreBarbero?: string | null;
  nombreServicio?: string | null;
  total: number;
  observacion?: string | null;
  tipoComprobante?: 'BOLETA' | 'FACTURA';
  numeroComprobante?: string;
  metodoPago?: string;
  razonSocial?: string;
  ruc?: string;
  items?: Array<{ nombre: string; cantidad: number; precio?: number; total?: number }>;
  ventaId?: number | null;
}


export interface PageResponseData<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  status?: number;
}

export interface HistorialClienteFiltro {
    estado?: string;
    desde?: Date | string;
    hasta?: Date | string;
}