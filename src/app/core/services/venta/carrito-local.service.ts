import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../models/catalogos/productos.model';
import { Servicio } from '../../models/catalogos/servicios.model';

export interface ItemCarrito {
  idItem: number; 
  nombre: string;
  tipo: 'PRODUCTO' | 'SERVICIO';
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
  stockDisponible?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class CarritoLocalService {
  
  private itemsSource = new BehaviorSubject<ItemCarrito[]>([]);
  items$ = this.itemsSource.asObservable();

  private totalSource = new BehaviorSubject<number>(0);
  total$ = this.totalSource.asObservable();

  constructor() {}

  agregarProducto(producto: Producto) {
    const item: ItemCarrito = {
      idItem: producto.id,
      nombre: producto.nombre,
      tipo: 'PRODUCTO',
      precioUnitario: producto.precio,
      cantidad: 1,
      subtotal: producto.precio,
      stockDisponible: producto.stock
    };
    this.procesarIngreso(item);
  }

  agregarServicio(servicio: Servicio) {
    const item: ItemCarrito = {
      idItem: servicio.servicioId,
      nombre: servicio.nombre,
      tipo: 'SERVICIO',
      precioUnitario: servicio.precio,
      cantidad: 1,
      subtotal: servicio.precio
    };
    this.procesarIngreso(item);
  }

  private procesarIngreso(itemNuevo: ItemCarrito) {
    const itemsActuales = this.itemsSource.getValue();
    const existe = itemsActuales.find(i => i.idItem === itemNuevo.idItem && i.tipo === itemNuevo.tipo);

    if (existe) {
      if (existe.tipo === 'PRODUCTO' && existe.cantidad >= (existe.stockDisponible || 0)) {
        throw new Error(`Solo quedan ${existe.stockDisponible} unidades de ${existe.nombre}`);
      }
      existe.cantidad += 1;
      existe.subtotal = existe.cantidad * existe.precioUnitario;
    } else {
      itemsActuales.push(itemNuevo);
    }
    this.actualizarCarrito(itemsActuales);
  }

  actualizarCantidad(idItem: number, tipo: 'PRODUCTO' | 'SERVICIO', nuevaCantidad: number) {
    const items = this.itemsSource.getValue();
    const item = items.find(i => i.idItem === idItem && i.tipo === tipo);
    
    if(item && nuevaCantidad > 0) {
       if (tipo === 'PRODUCTO' && nuevaCantidad > (item.stockDisponible || 0)) {
          throw new Error('Cantidad supera el stock disponible');
       }
       item.cantidad = nuevaCantidad;
       item.subtotal = item.cantidad * item.precioUnitario;
       this.actualizarCarrito(items);
    }
  }

  removerItem(idItem: number, tipo: 'PRODUCTO' | 'SERVICIO') {
    const itemsFiltrados = this.itemsSource.getValue().filter(i => !(i.idItem === idItem && i.tipo === tipo));
    this.actualizarCarrito(itemsFiltrados);
  }

  limpiarCarrito() {
    this.actualizarCarrito([]);
  }

  obtenerItemsActuales(): ItemCarrito[] {
    return this.itemsSource.getValue();
  }

  private actualizarCarrito(items: ItemCarrito[]) {
    this.itemsSource.next(items);
    const total = items.reduce((acc, item) => acc + item.subtotal, 0);
    this.totalSource.next(total);
  }
}