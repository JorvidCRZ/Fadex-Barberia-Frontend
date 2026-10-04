import { Producto } from './productos.model';

export interface CarritoItem {
    producto: Producto;
    cantidad: number;
}
