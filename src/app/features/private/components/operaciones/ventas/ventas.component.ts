import { Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { VentaTableComponent } from './venta-table/venta-table.component';
import { VentaResumenComponent } from './venta-resumen/venta-resumen.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FILTROS_VENTA } from '@/app/core/config/filtros.config';
import { StatsCard } from '@/app/core/models/common/card.model';

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
  imports: [CommonModule, FormsModule, SelectModule, TableModule, DialogModule, ButtonModule, TooltipModule, VentaTableComponent, VentaResumenComponent, SearchBarComponent, FiltrosComponent, StatsComponent, DialogHeaderComponent],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VentasComponent implements OnInit {
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  esBarbero = false;

  ventas = signal<any[]>(ventasMemoria);

  texto = signal('');
  comprobante = signal<string | null>(null);
  metodo = signal<string | null>(null);
  mostrarFiltros = signal(false);

  readonly comprobantes = ['Boleta', 'Factura'];
  readonly metodos = ['Efectivo', 'Yape', 'Plin', 'Visa', 'Transferencia'];

  readonly filtrosVentaBarbero = FILTROS_VENTA;
  readonly textoBarbero = signal('');
  readonly filtrosBarbero = signal<Record<string, any>>({});
  filtrosAbiertos = true;
  ventaDetalle: any | null = null;
  mostrarDetalle = false;
  ventaACancelar: any | null = null;
  mostrarConfirmacionCancelacion = false;
  readonly ventasBarberoCanceladas = new Set<number>();
  private readonly ventasBarberoBase = [
    { ventaId: 101, numeroCorrelativo: 'V-0101', clienteNombre: 'Ariana Gómez', tipoComprobante: 'Boleta', metodoPago: 'Yape', fecha: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), detalles: [{ productoNombre: 'Corte Clásico', cantidad: 1, precioUnitario: 55 }, { servicioNombre: 'Afeitado', cantidad: 1, precioUnitario: 40 }] },
    { ventaId: 102, numeroCorrelativo: 'V-0102', clienteNombre: 'Ronaldo Ponce', tipoComprobante: 'Factura', metodoPago: 'Transferencia', fecha: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), detalles: [{ servicioNombre: 'Corte + Barba', cantidad: 1, precioUnitario: 90 }] },
    { ventaId: 103, numeroCorrelativo: 'V-0103', clienteNombre: 'Camila Vela', tipoComprobante: 'Boleta', metodoPago: 'Efectivo', fecha: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), detalles: [{ productoNombre: 'Pomada Premium', cantidad: 2, precioUnitario: 30 }, { servicioNombre: 'Perfilado', cantidad: 1, precioUnitario: 35 }] },
    { ventaId: 104, numeroCorrelativo: 'V-0104', clienteNombre: 'Javier Núñez', tipoComprobante: 'Boleta', metodoPago: 'Plin', fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), detalles: [{ servicioNombre: 'Fade', cantidad: 1, precioUnitario: 75 }, { productoNombre: 'Aceite', cantidad: 1, precioUnitario: 22 }] },
    { ventaId: 105, numeroCorrelativo: 'V-0105', clienteNombre: 'Mateo Rojas', tipoComprobante: 'Factura', metodoPago: 'Visa', fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), detalles: [{ servicioNombre: 'Corte Premium', cantidad: 1, precioUnitario: 85 }, { productoNombre: 'Gel', cantidad: 1, precioUnitario: 18 }] },
    { ventaId: 106, numeroCorrelativo: 'V-0106', clienteNombre: 'Sofía Mena', tipoComprobante: 'Boleta', metodoPago: 'Yape', fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), detalles: [{ servicioNombre: 'Lavado + Corte', cantidad: 1, precioUnitario: 65 }] },
  ];
  readonly ventasBarbero = signal<any[]>(this.generarVentasBarbero());

  ventasFiltradas = computed(() => {
    const t = this.texto().trim().toLowerCase();
    return this.ventas().filter(v =>
      (!t || String(v.clienteNombre).toLowerCase().includes(t) || String(v.numeroCorrelativo ?? '').toLowerCase().includes(t)) &&
      (!this.comprobante() || v.tipoComprobante === this.comprobante()) &&
      (!this.metodo() || v.metodoPago === this.metodo())
    );
  });

  readonly ventasBarberoFiltradas = computed(() => {
    const texto = this.textoBarbero().trim().toLowerCase();
    const filtros = this.filtrosBarbero();
    const desde = filtros['fechaInicio'] ? new Date(filtros['fechaInicio']) : null;
    const hasta = filtros['fechaFin'] ? new Date(filtros['fechaFin']) : null;

    if (desde) desde.setHours(0, 0, 0, 0);
    if (hasta) hasta.setHours(23, 59, 59, 999);

    return this.ventasBarbero().filter(v => {
      const fecha = new Date(v.fecha);
      const coincideTexto = !texto || [v.clienteNombre, v.numeroCorrelativo, v.metodoPago].some(valor => String(valor ?? '').toLowerCase().includes(texto));
      const coincideNumero = !filtros['numeroCorrelativo'] || String(v.numeroCorrelativo ?? '').toLowerCase().includes(String(filtros['numeroCorrelativo']).trim().toLowerCase());
      const coincideCliente = !filtros['cliente'] || String(v.clienteNombre ?? '').toLowerCase().includes(String(filtros['cliente']).trim().toLowerCase());
      const coincideComprobante = !filtros['tipoComprobante'] || v.tipoComprobante === filtros['tipoComprobante'];
      const coincideDesde = !desde || fecha >= desde;
      const coincideHasta = !hasta || fecha <= hasta;

      return coincideTexto && coincideNumero && coincideCliente && coincideComprobante && coincideDesde && coincideHasta;
    });
  });

  readonly statsVentasBarbero = computed<StatsCard[]>(() => {
    const ventas = this.ventasBarberoFiltradas();
    const ingresos = ventas
      .filter(v => !this.ventasBarberoCanceladas.has(v.ventaId))
      .reduce((sum, v) => sum + this.calcularTotalVenta(v), 0);
    const canceladas = ventas.filter(v => this.ventasBarberoCanceladas.has(v.ventaId)).length;

    return [
      { title: 'Ventas', value: ventas.length, icon: 'pi pi-chart-bar', description: 'Totales en el filtro actual', accentClass: 'bg-brand-gold', accentTextClass: 'text-brand-gold', iconBgClass: 'bg-brand-gold/10' },
      { title: 'Canceladas', value: canceladas, icon: 'pi pi-ban', description: 'Ventas anuladas por el barbero', accentClass: 'bg-red-500', accentTextClass: 'text-red-400', iconBgClass: 'bg-red-500/10' },
      { title: 'Ingresos', value: `S/ ${ingresos.toFixed(2)}`, icon: 'pi pi-wallet', description: 'Monto neto del periodo', accentClass: 'bg-emerald-500', accentTextClass: 'text-emerald-400', iconBgClass: 'bg-emerald-500/10' },
    ];
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
    this.esBarbero = this.router.url.includes('/barbero');

    if (this.esBarbero) {
      this.ventasBarbero.set(this.generarVentasBarbero());
      return;
    }

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

  private generarVentasBarbero(): any[] {
    return this.ventasBarberoBase.map((venta: any) => ({
      ...venta,
      estado: this.ventasBarberoCanceladas.has(venta.ventaId) ? 'Cancelada' : 'Completada',
      total: this.calcularTotalVenta(venta),
    }));
  }

  calcularTotalVenta(venta: any): number {
    return (venta.detalles ?? []).reduce((acc: number, detalle: any) => {
      return acc + Number(detalle.cantidad ?? 0) * Number(detalle.precioUnitario ?? 0);
    }, 0);
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

  buscarBarbero(texto: string): void {
    this.textoBarbero.set(texto ?? '');
  }

  aplicarFiltrosBarbero(filtros: Record<string, any>): void {
    this.filtrosBarbero.set(filtros ?? {});
  }

  limpiarFiltrosBarbero(): void {
    this.textoBarbero.set('');
    this.filtrosBarbero.set({});
  }

  abrirDetalleVentaBarbero(venta: any): void {
    this.ventaDetalle = venta;
    this.mostrarDetalle = true;
  }

  cerrarDetalleVentaBarbero(): void {
    this.mostrarDetalle = false;
    this.ventaDetalle = null;
  }

  abrirConfirmacionCancelacion(venta: any): void {
    this.ventaACancelar = venta;
    this.mostrarConfirmacionCancelacion = true;
  }

  cerrarConfirmacionCancelacion(): void {
    this.mostrarConfirmacionCancelacion = false;
    this.ventaACancelar = null;
  }

  cancelarVentaBarbero(): void {
    const venta = this.ventaACancelar;
    if (!venta || this.ventasBarberoCanceladas.has(venta.ventaId)) {
      this.cerrarConfirmacionCancelacion();
      return;
    }

    this.ventasBarberoCanceladas.add(venta.ventaId);
    this.ventasBarbero.set(this.generarVentasBarbero());
    this.notify.showSuccess(`Venta ${venta.numeroCorrelativo ?? '#' + venta.ventaId} cancelada correctamente`);
    this.cerrarConfirmacionCancelacion();
  }
}