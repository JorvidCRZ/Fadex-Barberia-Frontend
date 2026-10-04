import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-servicios',
  imports: [CommonModule, PaginatorModule, ServicioListaComponent, ServicioDetalleComponent, FiltrosComponent],
  templateUrl: './servicios.html'
})
export class ServiciosComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly servicioService = inject(ServicioService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly notify = inject(NotificationService);

  servicios: Servicio[] = [];
  cargando = true;
  servicioSeleccionado: Servicio | null = null;
  mostrarModal = false;
  cargandoDetalle = false;

  page = 0;
  size = 10;
  totalRecords = 0;

  filtros: ServicioFiltro = {};
  filtrosFields = [...FILTROS_SERVICIO_PUBLICO];

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategoriasPorTipo(CategoriaTipo.SERVICIO).subscribe({
      next: (resp) => {
        const nodos = buildCategoryTree(resp.data?.content ?? []);
        this.filtrosFields = this.filtrosFields.map(filtro => filtro.key === 'categoriaId' ? { ...filtro, treeOptions: nodos } : filtro);
      },
      error: (error) => {
        this.notify.showHttpError(error.message);
      }
    });
  }

  cargarServicios(): void {
    this.cargando = true;
    this.servicioService.obtenerServicioPublicos({ ...this.filtros, page: this.page, size: this.size }).subscribe({
      next: (resp) => {
        this.servicios = resp.data.content;
        this.totalRecords = resp.data.totalElements ?? this.servicios.length;
        this.cargando = false;
      },
      error: (error) => {
        this.notify.showHttpError(error.message);
        this.servicios = [];
        this.cargando = false;
      }
    });
  }

  onPaginatorChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size;
    this.page = Math.floor(first / rows);
    this.size = rows;
    this.cargarServicios();
  }

  abrirDetalle(id: number): void {
    this.mostrarModal = true;
    this.cargandoDetalle = true;
    this.servicioService.obtenerServicioPublicosId(id).subscribe({
      next: (resp) => {
        this.servicioSeleccionado = resp.data;
        this.cargandoDetalle = false;
      },
      error: (error) => {
        this.cargandoDetalle = false;
        this.notify.showHttpError(error.message);
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    setTimeout(() => (this.servicioSeleccionado = null), 300);
  }

  irAReservar(): void {
    if (!this.servicioSeleccionado) return;
    const idServicio = this.servicioSeleccionado.servicioId;
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
    this.page = 0;
    this.cargarServicios();
  }

  onLimpiar(): void {
    this.filtros = {};
    this.page = 0;
    this.cargarServicios();
  }
}