import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { finalize } from 'rxjs';
import { CategoriaTableComponent } from './categoria-table/categoria-table.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { CategoriaService } from '@/app/core/services/catalogos/categoria.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { Categoria, CategoriaFiltro } from '@/app/core/models/catalogos/categorias.model';
import { SelectOption } from '@/app/core/models/common/select.option.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { FILTROS_CATEGORIA } from '@/app/core/config/filtros.config';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CategoriaTableComponent, CategoriaFormComponent, SearchBarComponent, FiltrosComponent,
    ButtonComponent, PageHeaderComponent, ModalComponent, StatsComponent,
  ],
  templateUrl: './categorias.html'
})
export class CategoriasComponent implements OnInit {

  private categoriaService = inject(CategoriaService);
  private notify = inject(NotificationService);
  private cd = inject(ChangeDetectorRef);

  filtrosFields = structuredClone(FILTROS_CATEGORIA);
  categoriaSeleccionada: Categoria | null = null;
  categorias: Categoria[] = [];
  categoriaPadre: SelectOption[] = [];
  filtro: Partial<CategoriaFiltro> = {};
  stats: StatsCard[] = [];
  mostrarFormulario = false;
  guardando = false;
  cargandoEstado: Set<number> = new Set();
  rows = 25;
  first = 0;
  pageActual = 0;
  cargado = false;
  totalRecords = 0;
  icono = 'pi-tags';
  texto = 'Categorías';

  /** true si hay algún filtro con valor (incluye el texto del buscador) */
  get hayFiltros(): boolean {
    return Object.values(this.filtro).some(v => v !== null && v !== undefined && v !== '');
  }

  ngOnInit() {
    this.cargarCategoriasPadre();
    this.cargarCategorias(0, this.rows);
  }

  cargarCategorias(page: number, size: number): void {
    this.pageActual = page;
    this.first = page * size; // buscar, limpiar o guardar vuelven a la página 1 del paginador
    this.cargado = false;
    this.categoriaService.obtenerCategoriasConFiltro({ ...this.filtro, page, size }).subscribe({
      next: (resp) => {
        this.categorias = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.actualizarStats();
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargado = true;
      }
    });
  }

  cargarCategoriasPadre(): void {
    this.categoriaService.obtenerCategoriasPadre().subscribe({
      next: (resp) => {
        this.categoriaPadre = resp.data.map(categoria => ({ label: categoria.nombre, value: categoria.id }));
        this.actualizarFiltroPadre();
      },
      error: (err) => this.notify.showHttpError(err.message)
    });
  }

  private actualizarFiltroPadre(): void {
    this.filtrosFields = this.filtrosFields.map(field => {
      if (field.key === 'padreId') { return { ...field, options: [...this.categoriaPadre] }; }
      return field;
    });
    this.cd.detectChanges();
  }

  // =====================================================
  // ESTADÍSTICAS (sobre la página cargada; el total viene del servidor)
  // =====================================================

  private actualizarStats(): void {
    const todas = this.aplanar(this.categorias);
    const activas = todas.filter(c => c.estado).length;
    this.stats = [
      {
        title: 'Total categorías',
        value: this.totalRecords,
        icon: 'pi pi-tags',
        description: this.hayFiltros ? 'Según los filtros aplicados' : 'Registradas en el sistema',
      },
      {
        title: 'Activas',
        value: activas,
        icon: 'pi pi-check-circle',
        description: 'En esta página',
        accentClass: 'bg-success',
        iconBgClass: 'bg-success/10',
        accentTextClass: 'text-success',
      },
      {
        title: 'Inactivas',
        value: todas.length - activas,
        icon: 'pi pi-ban',
        description: 'En esta página',
        accentClass: 'bg-danger',
        iconBgClass: 'bg-danger/10',
        accentTextClass: 'text-danger',
      },
      {
        title: 'Subcategorías',
        value: todas.length - this.categorias.length,
        icon: 'pi pi-sitemap',
        description: 'En esta página',
        accentClass: 'bg-info',
        iconBgClass: 'bg-info/10',
        accentTextClass: 'text-info',
      },
    ];
  }

  private aplanar(lista: Categoria[]): Categoria[] {
    return lista.flatMap(c => [c, ...this.aplanar(c.subcategorias ?? [])]);
  }

  // =====================================================
  // BÚSQUEDA, FILTROS Y PAGINACIÓN
  // =====================================================

  buscarCategorias(nombre: string): void {
    this.filtro.nombre = nombre;
    this.cargarCategorias(0, this.rows);
  }

  onBuscar(filtros: Partial<CategoriaFiltro>) {
    this.filtro = { ...this.filtro, ...filtros };
    this.cargarCategorias(0, this.rows);
  }

  onLimpiar() {
    this.filtro = {};
    this.cargarCategoriasPadre();
    this.cargarCategorias(0, this.rows);
  }

  onPageChange(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.cargarCategorias(Math.floor(this.first / this.rows), this.rows);
  }

  // =====================================================
  // FORMULARIO
  // =====================================================

  abrirCrear() {
    this.categoriaSeleccionada = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(categoria: Categoria) {
    this.categoriaSeleccionada = categoria;
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.categoriaSeleccionada = null;
  }

  guardarCategoria(data: Categoria) {
    if (this.guardando) return;
    if (this.categoriaSeleccionada) { this.editarCategoria(data); }
    else { this.crearCategoria(data); }
  }

  private crearCategoria(data: Categoria) {
    this.guardando = true;
    this.categoriaService.crearCategoria(data)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: (resp) => { this.postGuardar(resp.message); },
        error: (err) => { this.notify.showHttpError(err.message); },
      });
  }

  private editarCategoria(data: Categoria) {
    if (!this.categoriaSeleccionada) return;
    this.guardando = true;
    this.categoriaService.actualizarCategoria(this.categoriaSeleccionada.id, data)
      .pipe(finalize(() => { this.guardando = false; this.cd.detectChanges(); }))
      .subscribe({
        next: (resp) => { this.postGuardar(resp.message); },
        error: (err) => { this.notify.showHttpError(err.message); },
      });
  }

  private postGuardar(mensaje: string) {
    this.categoriaService.clearCategoriasCache();
    this.notify.showSuccess(mensaje);
    this.cargarCategorias(0, this.rows);
    this.cerrarFormulario();
  }

  // =====================================================
  // ELIMINAR Y CAMBIAR ESTADO
  // =====================================================

  eliminarCategoria(categoria: Categoria) {
    this.categoriaService.eliminarCategoria(categoria.id).subscribe({
      next: (resp) => {
        this.categoriaService.clearCategoriasCache();
        this.notify.showSuccess(resp.message);
        this.cargarCategorias(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message)
    });
  }

  onCambiarEstado(event: { id: number, activo: boolean }) {
    if (this.cargandoEstado.has(event.id)) return;
    const categoria = this.findCategoriaById(event.id, this.categorias);
    if (!categoria) return;
    const estadoAnterior = categoria.estado;
    categoria.estado = event.activo;
    this.actualizarStats();
    this.cargandoEstado.add(event.id);
    this.categoriaService.cambiarEstado(event.id, event.activo).subscribe({
      next: () => {
        this.notify.showSuccess(`Categoría ${event.activo ? 'activada' : 'desactivada'} exitosamente`);
      },
      error: (err: any) => {
        categoria.estado = estadoAnterior;
        this.actualizarStats();
        this.notify.showHttpError(err.message);
      },
      complete: () => { this.cargandoEstado.delete(event.id); }
    });
  }

  private findCategoriaById(id: number, list: Categoria[] | undefined): Categoria | null {
    if (!list || list.length === 0) return null;
    for (const cat of list) {
      if (cat.id === id) return cat;
      if (cat.subcategorias && cat.subcategorias.length) {
        const found = this.findCategoriaById(id, cat.subcategorias);
        if (found) return found;
      }
    }
    return null;
  }
}