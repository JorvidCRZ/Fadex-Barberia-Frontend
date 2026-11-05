import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { finalize } from 'rxjs';
import { ReclamoTableComponent } from './reclamo-table/reclamo-table.component';
import { ReclamoFormComponent } from './reclamo-form/reclamo-form.component';
import { ReclamoActualizarComponent } from './reclamo-actualizar/reclamo-actualizar.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { ReclamoService } from '@/app/core/services/operaciones/reclamo.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ReclamoFiltro } from '@/app/core/models/operaciones/reclamos-model/reclamo.filtro.model';
import { ReclamoRequest, ReclamoResponse, ReclamoSolucionRequest } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';
import { RECLAMOS_STATS_CONFIG, StatsCard } from '@/app/core/models/common/card.model';
import { FILTROS_RECLAMO } from '@/app/core/config/filtros.config';

@Component({
  selector: 'app-reclamos',
  standalone: true,
  imports: [
    ReclamoTableComponent, ReclamoFormComponent, ReclamoActualizarComponent,
    SearchBarComponent, FiltrosComponent, StatsComponent, ButtonComponent, PageHeaderComponent, ModalComponent,
  ],
  templateUrl: './reclamos.html',
})
export class ReclamosComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  private notify = inject(NotificationService);
  private reclamoService = inject(ReclamoService);

  filtrosReclamo = FILTROS_RECLAMO;
  reclamos: ReclamoResponse[] = [];
  statsCards: StatsCard[] = [];
  reclamoSeleccionado: ReclamoResponse | null = null;
  filtro: Partial<ReclamoFiltro> = {};
  mostrarFormulario = false;
  mostrarFormularioActualizar = false;
  guardando = false;
  resetFormTrigger = 0;
  cargado = false;
  totalRecords = 0;
  rows = 25;
  first = 0;
  texto = 'Reclamos';
  icono = 'pi-exclamation-triangle';
  private pageActual = 0;

  get hayFiltros(): boolean {
    return Object.values(this.filtro).some(v => v !== null && v !== undefined && v !== '');
  }

  ngOnInit(): void {
    this.cargarResumen();
    this.cargarReclamos(0, this.rows);
  }

  cargarReclamos(page: number, size: number): void {
    this.pageActual = page;
    this.first = page * size;
    this.cargado = false;
    this.reclamoService.listarReclamos({ ...this.filtro, page, size }).subscribe({
      next: (resp) => {
        this.reclamos = resp.data?.content ?? [];
        this.totalRecords = resp.data?.totalElements ?? 0;
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err);
        this.cargado = true;
        this.cd.detectChanges();
      },
    });
  }

  cargarResumen(): void {
    this.reclamoService.obtenerResumenReclamos().subscribe({
      next: (resp) => {
        const resumen = resp.data;
        this.statsCards = RECLAMOS_STATS_CONFIG.map(item => ({
          title: item.title,
          icon: item.icon,
          value: resumen[item.key] ?? 0,
          accentClass: item.accentClass,
          accentTextClass: item.accentTextClass,
          iconBgClass: item.iconBgClass,
        }));
        this.cd.detectChanges();
      },
      error: (err) => this.notify.showHttpError(err),
    });
  }

  // ---------- Búsqueda, filtros y paginación ----------

  buscarReclamos(valor: string): void {
    this.filtro = { ...this.filtro, numeroReclamo: valor || undefined };
    this.cargarReclamos(0, this.rows);
  }

  onBuscar(filtros: ReclamoFiltro): void {
    this.filtro = { ...this.filtro, ...filtros };
    this.cargarReclamos(0, this.rows);
  }

  onLimpiar(): void {
    this.filtro = {};
    this.cargarReclamos(0, this.rows);
  }

  onPageChange(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.cargarReclamos(Math.floor(this.first / this.rows), this.rows);
  }

  // ---------- Modales ----------

  abrirCrear(): void { this.mostrarFormulario = true; }
  cerrarFormulario(): void { this.mostrarFormulario = false; }

  abrirActualizar(reclamo: ReclamoResponse): void {
    this.reclamoSeleccionado = { ...reclamo };
    this.mostrarFormularioActualizar = true;
  }

  cerrarActualizar(): void {
    this.mostrarFormularioActualizar = false;
    this.reclamoSeleccionado = null;
  }

  abrirVer(id: number): void {
    this.router.navigate(['/dashboard/admin/operaciones/reclamos', id]);
  }

  // ---------- CRUD ----------

  guardarReclamo(data: { request: ReclamoRequest; archivos?: File[] }): void {
    if (this.guardando) return;
    this.guardando = true;
    this.reclamoService.crearReclamo(data.request, data.archivos)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Reclamo creado correctamente');
          this.resetFormTrigger++;
          this.cerrarFormulario();
          this.cargarReclamos(0, this.rows);
          this.cargarResumen();
        },
        error: (err) => this.notify.showHttpError(err),
      });
  }

  guardarActualizacion(data: ReclamoSolucionRequest): void {
    if (!this.reclamoSeleccionado || this.guardando) return;
    this.guardando = true;
    this.reclamoService.actualizarSolucionReclamo(this.reclamoSeleccionado.idReclamo, data)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Reclamo actualizado correctamente');
          this.cerrarActualizar();
          this.cargarReclamos(this.pageActual, this.rows);
          this.cargarResumen();
        },
        error: (err) => this.notify.showHttpError(err),
      });
  }

  eliminarReclamo(reclamo: ReclamoResponse): void {
    this.reclamoService.eliminarReclamo(reclamo.idReclamo).subscribe({
      next: () => {
        this.notify.showSuccess('Reclamo eliminado correctamente');
        this.cargarReclamos(this.pageActual, this.rows);
        this.cargarResumen();
      },
      error: (err) => this.notify.showHttpError(err),
    });
  }
}