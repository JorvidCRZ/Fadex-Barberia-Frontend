import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectModule } from 'primeng/select';

import { VentaTableComponent } from './venta-table/venta-table.component';
import { VentaResumenComponent } from './venta-resumen/venta-resumen.component';
import { NotificationService } from '@/app/core/services/common/notification.service';

// Valores base del resumen (como en el prototipo). Las ventas nuevas se suman a estos.
const BASE_TOTAL_VENTAS = 245;
const BASE_INGRESOS = 12480;
// Las ventas creadas desde el POS tienen ventaId >= a este valor.
const ID_INICIAL_NUEVAS = 246;

// ── Estado en memoria a nivel de módulo: sobrevive a la navegación Ventas <-> POS
//    (se pierde al recargar la página).
let siguienteCorrelativo = 246;
let ventasMemoria: any[] = [
  {
    ventaId: 245, numeroCorrelativo: 'V-00245', clienteNombre: 'Diego Salazar', tipoComprobante: 'Boleta',
    metodoPago: 'Yape', fecha: '2026-06-18T10:42:00',
    detalles: [
      { servicioNombre: 'Corte Clásico', cantidad: 1, precioUnitario: 55 },
      { productoNombre: 'Pomada Brillante', cantidad: 1, precioUnitario: 24.9 },
    ],
  },
  {
    ventaId: 244, numeroCorrelativo: 'V-00244', clienteNombre: 'Valeria Quispe', tipoComprobante: 'Factura',
    metodoPago: 'Visa', fecha: '2026-06-18T09:18:00',
    detalles: [
      { servicioNombre: 'Corte + Barba', cantidad: 1, precioUnitario: 88 },
      { productoNombre: 'Aceite de Barba Natural', cantidad: 1, precioUnitario: 32.5 },
      { productoNombre: 'Cera Mate Premium', cantidad: 1, precioUnitario: 28 },
    ],
  },
  {
    ventaId: 243, numeroCorrelativo: 'V-00243', clienteNombre: 'Mateo Huamán', tipoComprobante: 'Boleta',
    metodoPago: 'Efectivo', fecha: '2026-06-17T17:05:00',
    detalles: [{ servicioNombre: 'Afeitado Tradicional', cantidad: 1, precioUnitario: 35 }],
  },
  {
    ventaId: 242, numeroCorrelativo: 'V-00242', clienteNombre: 'Sebastián Flores', tipoComprobante: 'Boleta',
    metodoPago: 'Yape', fecha: '2026-06-17T12:30:00',
    detalles: [
      { servicioNombre: 'Corte Clásico', cantidad: 1, precioUnitario: 55 },
      { servicioNombre: 'Perfilado de Barba', cantidad: 1, precioUnitario: 40 },
      { productoNombre: 'Cera Mate Premium', cantidad: 1, precioUnitario: 28 },
      { servicioNombre: 'Tratamiento Capilar', cantidad: 1, precioUnitario: 89 },
    ],
  },
];

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, VentaTableComponent, VentaResumenComponent],
  templateUrl: './ventas.html'
})
export class VentasComponent implements OnInit {
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ventas = signal<any[]>(ventasMemoria);

  texto = signal('');
  comprobante = signal<string | null>(null);
  metodo = signal<string | null>(null);
  mostrarFiltros = signal(false);

  readonly comprobantes = ['Boleta', 'Factura'];
  readonly metodos = ['Efectivo', 'Yape', 'Plin', 'Visa', 'Transferencia'];

  ventasFiltradas = computed(() => {
    const t = this.texto().trim().toLowerCase();
    return this.ventas().filter(v =>
      (!t || String(v.clienteNombre).toLowerCase().includes(t) || String(v.numeroCorrelativo ?? '').toLowerCase().includes(t)) &&
      (!this.comprobante() || v.tipoComprobante === this.comprobante()) &&
      (!this.metodo() || v.metodoPago === this.metodo())
    );
  });

  resumen = computed(() => {
    const nuevas = this.ventas().filter(v => v.ventaId >= ID_INICIAL_NUEVAS);
    const montoNuevas = nuevas.reduce(
      (acc, v) => acc + (v.detalles ?? []).reduce((s: number, d: any) => s + d.cantidad * d.precioUnitario, 0), 0);
    const totalVentas = BASE_TOTAL_VENTAS + nuevas.length;
    const ingresos = BASE_INGRESOS + montoNuevas;
    return { totalVentas, ingresos, promedio: ingresos / totalVentas };
  });

  ngOnInit(): void {
    // El POS manda la venta nueva por el estado de navegación del router.
    const nueva = history.state?.nuevaVenta;
    if (nueva && !ventasMemoria.some(v => v.ventaId === nueva.ventaId)) {
      const venta = {
        ...nueva,
        numeroCorrelativo: `V-${String(siguienteCorrelativo++).padStart(5, '0')}`,
        fecha: new Date().toISOString(),
      };
      this.actualizar([venta, ...ventasMemoria]);
      this.notify.showSuccess('¡Venta registrada con éxito!');
    }
  }

  private actualizar(lista: any[]): void {
    ventasMemoria = lista;
    this.ventas.set(lista);
  }

  eliminarVenta(venta: any): void {
    this.actualizar(this.ventas().filter(v => v.ventaId !== venta.ventaId));
    this.notify.showSuccess('Venta eliminada correctamente');
  }

  limpiarFiltros(): void {
    this.comprobante.set(null);
    this.metodo.set(null);
  }

  toggleFiltros(): void { this.mostrarFiltros.update(v => !v); }

  abrirCrearVenta(): void {
    this.router.navigate(['../pos'], { relativeTo: this.route });
  }
}