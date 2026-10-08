import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { NotificationService } from '@/app/core/services/common/notification.service';

interface ProductoPos {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string; // URL opcional; si está vacío se muestra un ícono
}

interface LineaCarrito {
  producto: ProductoPos;
  cantidad: number;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './pos.html',
  styleUrls: ['./pos.css']
})
export class PosComponent {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notify = inject(NotificationService);

  // Catálogo en memoria
  productos: ProductoPos[] = [
    { id: 1, nombre: 'Cera Mate Premium', categoria: 'Styling', precio: 28, stock: 15, imagen: '' },
    { id: 2, nombre: 'Aceite de Barba Natural', categoria: 'Barba', precio: 32.5, stock: 20, imagen: '' },
    { id: 3, nombre: 'Pomada Brillante', categoria: 'Styling', precio: 24.9, stock: 12, imagen: '' },
    { id: 4, nombre: 'Máquina ProCut X9', categoria: 'Equipos', precio: 189, stock: 3, imagen: '' },
  ];

  clientes = ['Cliente general', 'Diego Salazar', 'Valeria Quispe', 'Mateo Huamán', 'Camila Rojas', 'Sebastián Flores'];
  comprobantes = ['Boleta', 'Factura'];
  metodos = ['Efectivo', 'Yape', 'Plin', 'Visa', 'Transferencia'];

  cliente = 'Cliente general';
  comprobante = 'Boleta';
  metodo = 'Yape';
  textoBusqueda = '';
  carrito: LineaCarrito[] = [];

  get productosFiltrados(): ProductoPos[] {
    const t = this.textoBusqueda.trim().toLowerCase();
    return t ? this.productos.filter(p => p.nombre.toLowerCase().includes(t) || p.categoria.toLowerCase().includes(t)) : this.productos;
  }

  get totalVenta(): number { return this.carrito.reduce((acc, l) => acc + l.producto.precio * l.cantidad, 0); }
  get subtotal(): number { return this.totalVenta / 1.18; }
  get igv(): number { return this.totalVenta - this.subtotal; }

  private limite(p: ProductoPos): number { return Math.min(p.stock, 10); }

  agregarProducto(p: ProductoPos): void {
    const linea = this.carrito.find(l => l.producto.id === p.id);
    if (linea) {
      this.cambiarCantidad(linea, linea.cantidad + 1);
    } else {
      this.carrito = [...this.carrito, { producto: p, cantidad: 1 }];
    }
  }

  cambiarCantidad(linea: LineaCarrito, nueva: number): void {
    if (nueva < 1) {
      this.carrito = this.carrito.filter(l => l !== linea);
      return;
    }
    const max = this.limite(linea.producto);
    if (nueva > max) {
      this.notify.showWarn(`Límite alcanzado: máximo ${max} unidades.`);
      linea.cantidad = max;
      return;
    }
    linea.cantidad = nueva;
  }

  procesarCobro(): void {
    if (this.carrito.length === 0) {
      this.notify.showWarn('Agregue al menos un ítem al carrito.');
      return;
    }

    // El correlativo y la fecha los asigna la pantalla de ventas.
    const nuevaVenta = {
      ventaId: Date.now(),
      clienteNombre: this.cliente,
      tipoComprobante: this.comprobante,
      metodoPago: this.metodo,
      detalles: this.carrito.map(l => ({
        productoNombre: l.producto.nombre,
        cantidad: l.cantidad,
        precioUnitario: l.producto.precio,
      })),
    };

    this.carrito = [];
    this.router.navigate(['../ventas'], { relativeTo: this.route, state: { nuevaVenta } });
  }

  regresarAlHistorial(): void {
    this.router.navigate(['../ventas'], { relativeTo: this.route });
  }
}