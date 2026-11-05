import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TokenService } from '../../../../core/services/auth/token.service';
import { FILTROS_SERVICIO_PUBLICO } from '../../../../core/config/filtros.config';
import { CategoriaTipo } from '../../../../core/models/catalogos/categorias.model';
import { ServicioListaComponent } from './servicio-lista/servicio-lista.component';
import { ServicioService } from '../../../../core/services/catalogos/servicio.service';
import { buildCategoryTree } from '../../../../shared/utils/buildCategoryTree.component';
import { CategoriaService } from '../../../../core/services/catalogos/categoria.service';
import { ServicioDetalleComponent } from './servicio-detalle/servicio-detalle.component';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { Servicio, ServicioFiltro } from '../../../../core/models/catalogos/servicios.model';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { SERVICIOS_BANNERS } from '../../../../core/config/banner.config';

@Component({
  standalone: true,
  selector: 'app-servicios',
  imports: [CommonModule, PaginatorModule, ServicioListaComponent, ServicioDetalleComponent, FiltrosComponent, BannerComponent],
  templateUrl: './servicios.html'
})
export class ServiciosComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly servicioService = inject(ServicioService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly notify = inject(NotificationService);

  banners = [...SERVICIOS_BANNERS];
  servicios = signal<Servicio[]>([]);
  cargando = signal(true);
  servicioSeleccionado = signal<Servicio | null>(null);
  mostrarModal = signal(false);
  cargandoDetalle = signal(false);

  page = signal(0);
  size = signal(10);
  totalRecords = signal(0);

  filtros: ServicioFiltro = {};
  filtrosFields = signal([...FILTROS_SERVICIO_PUBLICO]);

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategoriasPorTipo(CategoriaTipo.SERVICIO).subscribe({
      next: (resp) => {
        const nodos = buildCategoryTree(resp.data?.content ?? []);
        this.filtrosFields.update(fields =>
          fields.map(f => f.key === 'categoriaId' ? { ...f, treeOptions: nodos } : f));
      },
      error: (error) => this.notify.showHttpError(error.message),
    });
  }

  cargarServicios(): void {
    this.cargando.set(true);
    this.servicioService
      .obtenerServicioPublicos({ ...this.filtros, page: this.page(), size: this.size() })
      .subscribe({
        next: (resp) => {
          this.servicios.set(resp.data.content);
          this.totalRecords.set(resp.data.totalElements ?? resp.data.content.length);
          this.cargando.set(false);
        },
        error: (error) => {
          this.notify.showHttpError(error.message);
          this.servicios.set([]);
          this.cargando.set(false);
        },
      });
  }

  onPaginatorChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const page = Math.floor(first / rows);
    // Evita recargar si el paginator emite al inicializarse
    if (page === this.page() && rows === this.size()) { return; }
    this.page.set(page);
    this.size.set(rows);
    this.cargarServicios();
  }

  abrirDetalle(id: number): void {
    this.mostrarModal.set(true);
    this.cargandoDetalle.set(true);
    this.servicioService.obtenerServicioPublicosId(id).subscribe({
      next: (resp) => {
        this.servicioSeleccionado.set(resp.data);
        this.cargandoDetalle.set(false);
      },
      error: (error) => {
        this.cargandoDetalle.set(false);
        this.notify.showHttpError(error.message);
      },
    });
  }

  cerrarModal(): void {
    this.mostrarModal.set(false);
    setTimeout(() => this.servicioSeleccionado.set(null), 300);
  }

  irAReservar(): void {
    const servicio = this.servicioSeleccionado();
    if (!servicio) return;
    const idServicio = servicio.servicioId;
    this.cerrarModal();

    if (this.tokenService.isLogged()) {
      if (this.tokenService.getPrimaryRole() === 'cliente') {
        this.router.navigate(['/mi-cuenta/reservar/agendar'], {
          queryParams: { servicioId: idServicio }
        });
      } else {
        this.router.navigate([`/dashboard/${this.tokenService.getPrimaryRole()}/operaciones/reservas/nueva`]);
      }
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/mi-cuenta/reservar/agendar?servicioId=${idServicio}` } });
    }
  }

  onBuscar(valores: Partial<ServicioFiltro>): void {
    if (valores.categoriaId && typeof valores.categoriaId === 'object') {
      const nodo = valores.categoriaId as any;
      valores.categoriaId = Number(nodo.key ?? nodo.data?.id) || undefined;
    }
    this.filtros = { ...valores };
    this.page.set(0);
    this.cargarServicios();
  }

  onLimpiar(): void {
    this.filtros = {};
    this.page.set(0);
    this.cargarServicios();
  }
}