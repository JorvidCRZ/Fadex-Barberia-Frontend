import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Router, ActivatedRoute } from '@angular/router';

import { VentaTableComponent } from './venta-table/venta-table.component';
import { VentaFormComponent } from './venta-form/venta-form.component';

import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';

import { NotificationService } from '@/app/core/services/common/notification.service';
import { VentaService } from '@/app/core/services/venta/venta.service';
import { TokenService } from '@/app/core/services/auth/token.service';

import { Venta } from '@/app/core/models/ventas/venta.model';
import { VentaDetalle } from '@/app/core/models/ventas/detalle.model';
import { VentaFiltro } from '@/app/core/models/ventas/venta.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { FILTROS_VENTA } from '@/app/core/config/filtros.config';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    VentaTableComponent,
    VentaFormComponent,
    SearchBarComponent,
    FiltrosComponent,
    ButtonComponent,
    PageHeaderComponent,
    StatsComponent,
    ModalComponent,
  ],
  templateUrl: './ventas.html',
})
export class VentasComponent implements OnInit {
  private ventaService = inject(VentaService);
  private notify = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tokenService = inject(TokenService);
  private cdr = inject(ChangeDetectorRef);
  private readonly moneda = new MonedaPipe();

  ventas: Venta[] = [];
  ventaSeleccionada: Venta | null = null;
  mostrarFormulario = false;

  first = 0;
  rows = 25;
  totalRecords = 0;
  cargado = false;

  stats: StatsCard[] = [];

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
    this.rows = size;
    this.first = page * size;

    this.filtro.page = page;
    this.filtro.size = size;

    const peticion$ =
      this.esBarbero && this.userId
        ? this.ventaService.obtenerMisVentas(this.userId)
        : this.ventaService.obtenerVentas(this.filtro);

    peticion$.subscribe({
      next: (resp) => {
        const datos = resp.data as Venta[] | { content?: Venta[]; totalElements?: number };
        const lista = Array.isArray(datos) ? datos : (datos.content ?? []);

        const normalizadas = lista.map((venta: Venta) => {
          const totalDetalles = (venta.detalles ?? []).reduce(
            (acc: number, det: VentaDetalle) =>
              acc + Number(det.subtotal ?? (det.precioUnitario ?? 0) * (det.cantidad ?? 0)),
            0,
          );
          const total = Number(venta.total ?? totalDetalles);

          return {
            ...venta,
            subtotal: Number(venta.subtotal ?? total / 1.18),
            igv: Number(venta.igv ?? total - total / 1.18),
            total,
          };
        });

        // Las "mis ventas" del barbero llegan completas (sin paginar en el servidor): se pagina aquí.
        this.ventas = Array.isArray(datos)
          ? normalizadas.slice(this.first, this.first + size)
          : normalizadas;

        this.totalRecords = Array.isArray(datos)
          ? normalizadas.length
          : (datos.totalElements ?? normalizadas.length);

        this.calcularResumen(normalizadas);
        this.cargado = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando ventas:', err);
        this.notify.showError('No se pudieron cargar las ventas.');
        this.ventas = [];
        this.totalRecords = 0;
        this.calcularResumen([]);
        this.cargado = true;
        this.cdr.detectChanges();
      },
    });
  }

  crearVenta(data: any): void {
    this.ventaService.crearVenta(data).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarVentas(0, this.rows);
        this.cerrarFormulario();
      },
      error: (err) => {
        console.error('Error creando venta:', err);
        this.notify.showError('No se pudo registrar la venta.');
      },
    });
  }

  eliminarVenta(venta: Venta): void {
    this.ventaService.eliminarVenta(venta.ventaId).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarVentas(0, this.rows);
      },
      error: (err) => {
        console.error('Error eliminando venta:', err);
        this.notify.showError('No se pudo eliminar la venta.');
      },
    });
  }

  descargarComprobante(venta: Venta): void {
    this.ventaService.descargarComprobantePdf(venta.ventaId).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = this.nombreArchivoComprobante(venta);
        enlace.click();
        URL.revokeObjectURL(url);
      },
      error: (err: unknown) => {
        console.error('Error descargando comprobante:', err);
        this.notify.showError('No se pudo descargar el comprobante.');
      },
    });
  }

  private nombreArchivoComprobante(venta: Venta): string {
    const tipo = venta.tipoComprobante?.toLowerCase() ?? 'comprobante';
    const numero =
      venta.serieComprobante && venta.numeroComprobante
        ? `${venta.serieComprobante}-${venta.numeroComprobante}`
        : venta.numeroCorrelativo || String(venta.ventaId);
    return `${tipo}-${numero}.pdf`;
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

  onPaginator(event: PaginatorState): void {
    const rows = event.rows ?? this.rows;
    const first = event.first ?? 0;
    this.cargarVentas(Math.floor(first / rows), rows);
  }

  /** ingresos y promedio salen de las ventas cargadas (la página actual en admin, todas en barbero). */
  private calcularResumen(cargadas: Venta[]): void {
    const ingresos = cargadas.reduce(
      (acc, venta) =>
        acc +
        (venta.detalles ?? []).reduce(
          (sum, det) => sum + Number(det.precioUnitario) * Number(det.cantidad),
          0,
        ),
      0,
    );
    const promedio = cargadas.length > 0 ? ingresos / cargadas.length : 0;
    const alcance = this.esBarbero ? 'De tus ventas' : 'De la página actual';

    this.stats = [
      {
        title: 'Total ventas',
        value: this.totalRecords,
        icon: 'pi pi-file',
        description: 'Según los filtros aplicados',
      },
      {
        title: 'Ingresos totales',
        value: this.moneda.transform(ingresos),
        icon: 'pi pi-dollar',
        description: alcance,
        accentClass: 'bg-green-500',
        accentTextClass: 'text-green-400',
        iconBgClass: 'bg-green-500/10',
      },
      {
        title: 'Promedio por venta',
        value: this.moneda.transform(promedio),
        icon: 'pi pi-chart-line',
        description: alcance,
        accentClass: 'bg-blue-500',
        accentTextClass: 'text-blue-400',
        iconBgClass: 'bg-blue-500/10',
      },
    ];
  }
}