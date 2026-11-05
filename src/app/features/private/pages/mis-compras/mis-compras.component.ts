import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Venta } from '../../../../core/models/ventas/venta.model';
import { VentaDetalle } from '../../../../core/models/ventas/detalle.model';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { VentaService } from '@/app/core/services/venta/venta.service';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';

@Component({
  selector: 'app-mis-compras',
  standalone: true,

  imports: [
    CommonModule, TableModule, PaginatorModule, ModalComponent, StatusBadgeComponent,
    ButtonComponent, PageHeaderComponent, DateFormatPipe, MonedaPipe,PaginatorComponent,
  ],

  templateUrl: './mis-compras.html',
})
export class MisComprasComponent implements OnInit {

  private ventaService = inject(VentaService);
  private notify = inject(NotificationService);
  private router = inject(Router);

  compras = signal<Venta[]>([]);
  loading = signal(false);
  rows = signal(10);
  first = signal(0);

  totalRecords = computed(() => this.compras().length);

  paginaActual = computed(() =>
    this.compras().slice(this.first(), this.first() + this.rows()),
  );

  displayModal = signal(false);
  compraSeleccionada = signal<Venta | null>(null);
  descargandoId = signal<number | null>(null);

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras(): void {
    this.loading.set(true);

    this.ventaService
      .obtenerMisCompras()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const data = response.success && Array.isArray(response.data) ? response.data : [];

          const conProductos = data
            .filter((v) => this.productosDe(v).length > 0)
            .sort((a, b) => this.fechaDe(b) - this.fechaDe(a)); // más recientes primero

          this.compras.set(conProductos);
        },
        error: (err) => {
          console.error('Error cargando mis productos:', err);
          this.compras.set([]);
          this.notify.showHttpError(err);
        },
      });
  }

  onPaginatorChange(event: PaginatorState): void {
    this.rows.set(event.rows ?? this.rows());
    this.first.set(event.first ?? 0);
  }

  recargar(): void {
    this.first.set(0);
    this.cargarCompras();
  }

  verDetalle(compra: Venta): void {
    this.compraSeleccionada.set(compra);
    this.displayModal.set(true);
  }

  irAProductos(): void {
    this.router.navigate(['/productos']);
  }

  descargarComprobante(compra: Venta): void {
    this.descargandoId.set(compra.ventaId);

    this.ventaService
      .descargarComprobantePdf(compra.ventaId)
      .pipe(finalize(() => this.descargandoId.set(null)))
      .subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `comprobante-${compra.numeroCorrelativo ?? compra.ventaId}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error descargando comprobante:', err);
          this.notify.showHttpError(err);
        },
      });
  }

  // ── Helpers de la vista ────────────────────────────────

  /** Solo las líneas de producto (se descartan las de servicios) */
  productosDe(compra: Venta): VentaDetalle[] {
    return (compra.detalles ?? []).filter((d) => !!d.productoId && !d.servicioId);
  }

  cantidadProductos(compra: Venta): number {
    return this.productosDe(compra).reduce((total, d) => total + d.cantidad, 0);
  }

  resumenProductos(compra: Venta): string {
    const productos = this.productosDe(compra);
    if (!productos.length) return '—';
    const primero = productos[0].productoNombre ?? 'Producto';
    return productos.length > 1 ? `${primero} +${productos.length - 1} más` : primero;
  }

  fechaCompra(compra: Venta): string | undefined {
    return compra.fechaEmision ?? compra.fecha;
  }

  private fechaDe(compra: Venta): number {
    const f = this.fechaCompra(compra);
    return f ? new Date(f).getTime() : 0;
  }
}