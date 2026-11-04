import { EstadoReserva } from './EstadoReserva';
import { TipoReserva } from './TipoRserva';

export interface HistorialClienteModel {
  id: number;
  fecha: string;        
  horaInicio: string;   
  horaFin: string;      
  estadoReserva: EstadoReserva;
  tipoReserva: TipoReserva;
  nombreBarbero: string;
  nombreServicio: string;
  total: number;
  observacion: string;
  tipoComprobante?: 'BOLETA' | 'FACTURA';
  numeroComprobante?: string;
  metodoPago?: string;
  razonSocial?: string;
  ruc?: string;
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
    estado?: EstadoReserva;
    desde?: Date;
    hasta?: Date;
}