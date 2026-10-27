import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { Router, ActivatedRoute } from '@angular/router';

import { VentaTableComponent } from './venta-table/venta-table.component';
import { VentaFormComponent } from './venta-form/venta-form.component';
import { VentaResumenComponent } from './venta-resumen/venta-resumen.component';

import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';

import { NotificationService } from '@/app/core/services/common/notification.service';
import { VentaService } from '@/app/core/services/venta/venta.service';
import { TokenService } from '@/app/core/services/auth/token.service'; 

import { Venta } from '@/app/core/models/ventas/venta.model';
import { VentaDetalle } from '@/app/core/models/ventas/detalle.model';
import { VentaFiltro } from '@/app/core/models/ventas/venta.model';
import { FILTROS_VENTA } from '@/app/core/config/filtros.config';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    VentaTableComponent,
    VentaFormComponent,
    VentaResumenComponent,
    SearchBarComponent,
    DialogHeaderComponent,
    FiltrosComponent
  ],
  templateUrl: './ventas.html'
})
export class VentasComponent implements OnInit {

  private ventaService = inject(VentaService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tokenService = inject(TokenService); 

  ventas: Venta[] = [];
  ventaSeleccionada: Venta | null = null;
  mostrarFormulario = false;

  rows = 25;
  totalRecords = 0;
  cargado = false;

  totalVentas = 0;
  ingresos = 0;
  promedio = 0;

  filtro: VentaFiltro = {};
  filtrosFields = FILTROS_VENTA;

  esBarbero = false;
  userId: number | null = null;

  ngOnInit(): void {
    this.esBarbero = this.router.url.includes('/barbero');
    
    const id = Number(this.tokenService.getUserId());
    this.userId = isNaN(id) ? null : id;

    this.cargarVentas(0, this.rows);
  }

  cargarVentas(page: number, size: number): void {
    this.cargado = false;

    this.filtro.page = page;
    this.filtro.size = size;

    const peticion$ = (this.esBarbero && this.userId)
      ? this.ventaService.obtenerMisVentas(this.userId) 
      : this.ventaService.obtenerVentas(this.filtro);  

    peticion$.subscribe({
      next: (resp) => {
        this.ventas = resp.data.map((venta: Venta) => {

          const total = (venta.detalles ?? []).reduce(
            (acc: number, det: VentaDetalle) => acc + (det.subtotal ?? 0),
            0
          );

          return {
            ...venta,
            total
          };

        });
        this.calcularResumen();
        this.cargado = true;
      },
      error: () => {
        console.warn('Backend no disponible, manteniendo datos actuales.');
        this.cargado = true;
      }
    });
  }

  crearVenta(data: any): void {
    this.ventaService.crearVenta(data).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarVentas(0, this.rows);
        this.cerrarFormulario();
      },
      error: () => {
        console.warn('Backend no conectado, simulando creación en UI...');
        const idGenerado = Math.floor(Math.random() * 10000);
        const ventaSimulada: Venta = {
          ...data,
          ventaId: idGenerado,
          numeroCorrelativo: `VEN-SIM-${idGenerado}`,
          fecha: new Date(),
          clienteNombre: data.clienteNombre ?? '',
          barberoNombre: 'Sin asignar',
          total: (data.detalles ?? []).reduce(
            (acc: number, det: any) => acc + (det.precioUnitario * det.cantidad), 0
          )
        } as unknown as Venta;

        this.ventas = [ventaSimulada, ...this.ventas];
        this.calcularResumen();
        this.notify.showSuccess('Venta registrada (Modo Simulación)');
        this.cerrarFormulario();
      }
    });
  }

  eliminarVenta(venta: Venta): void {
    this.ventaService.eliminarVenta(venta.ventaId).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarVentas(0, this.rows);
      },
      error: () => {
        this.ventas = this.ventas.filter(v => v.ventaId !== venta.ventaId);
        this.calcularResumen();
      }
    });
  }

  guardarVenta(data: any): void {
    this.crearVenta(data);
  }

  buscarVentas(filtrosAplicados: VentaFiltro): void {
    this.filtro = filtrosAplicados;
    this.cargarVentas(0, this.rows);
  }

  buscarPorTexto(valor: string): void {
    this.filtro = { cliente: valor };
    this.cargarVentas(0, this.rows);
  }

  limpiarFiltros(): void {
    this.filtro = {};
    this.cargarVentas(0, this.rows);
  }

  abrirCrearVenta(): void {
    this.router.navigate(['../pos'], { relativeTo: this.route });
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? 25;
    this.cargarVentas(Math.floor(first / rows), rows);
  }

  calcularResumen(): void {
    this.totalVentas = this.ventas.length;
    this.ingresos = this.ventas.reduce((acc, venta) => {
      return acc + (venta.detalles ?? []).reduce(
        (sum, det) => sum + (Number(det.precioUnitario) * Number(det.cantidad)), 0
      );
    }, 0);
    this.promedio = this.totalVentas > 0 ? this.ingresos / this.totalVentas : 0;
  }
}