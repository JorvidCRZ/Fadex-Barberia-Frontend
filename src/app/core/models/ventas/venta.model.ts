import { VentaDetalle } from "./detalle.model";


export interface Venta {

  ventaId: number;
  numeroCorrelativo?: string;
  clienteId?: number;
  barberoId?: number;
  clienteNombre?: string;
  barberoNombre?: string;
  fecha?: string;
  tipoComprobante?: 'BOLETA' | 'FACTURA';
  serieComprobante?: string;
  numeroComprobante?: string;
  metodoPago?: string;
  detalles?: VentaDetalle[];
  subtotal?: number;
  igv?: number;
  total?: number;
  fechaEmision?: string;

}

export interface VentaFiltro {
    cliente?: string;
    numeroCorrelativo?: string;
    tipoComprobante?: 'BOLETA' | 'FACTURA';
    fechaInicio?: string | Date;
    fechaFin?: string | Date;
    page?: number;
    size?: number;
    sort?: string;
}