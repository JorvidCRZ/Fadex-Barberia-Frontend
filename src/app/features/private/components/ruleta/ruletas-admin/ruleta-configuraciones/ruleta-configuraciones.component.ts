import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfiguracionFormComponent } from './configuracion-form/configuracion-form.component';
import { ConfiguracionTableComponent } from './configuracion-table/configuracion-table.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { CategoriaService } from '@/app/core/services/catalogos/categoria.service';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';  
import { ConfiguracionResponse, ConfiguracionRequest, ConfiguracionFiltro, ConfiguracionPatchRequest } from '@/app/core/models/ruleta/ruleta-configuracion.model';
import { Categoria, CategoriaTipo } from '@/app/core/models/catalogos/categorias.model';
import { FILTROS_CONFIGURACION } from '@/app/core/config/filtros.config';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { RuletaService } from '@/app/core/services/ruleta/ruleta.service';
import { RuletaResponse } from '@/app/core/models/ruleta/ruleta.model';
import { buildCategoryTree } from '@/app/shared/utils/buildCategoryTree.component';
import { ConfiguracionService } from '@/app/core/services/fidelizacion/configuracion.service';
 
@Component({
  selector: 'app-ruleta-configuraciones',
  imports: [ConfiguracionFormComponent, ConfiguracionTableComponent, DialogModule, ButtonModule,
    CommonModule, FormsModule, SearchBarComponent, DialogHeaderComponent, FiltrosComponent],
  templateUrl: './ruleta-configuraciones.html',
  styleUrl: './ruleta-configuraciones.css',
})
export class RuletaConfiguracionesComponent implements OnInit {

  private cd = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  private configuracionService = inject(ConfiguracionService);
  private categoriaService = inject(CategoriaService);
  private ruletaService = inject(RuletaService); 

  configuracionSeleccionada: ConfiguracionResponse | null = null;
  filtro: Partial<ConfiguracionFiltro> = {};
  categorias: Categoria[] = [];
  ruletas: RuletaResponse[] = [];
  configuraciones: ConfiguracionResponse[] = [];

  filtrosFields = [...FILTROS_CONFIGURACION]; 
  rows = 30;
  pageActual = 0;
  cargado = false;
  totalRecords = 0;
  resetFormTrigger = 0;
  mostrarFormulario = false;
  modo: 'crear' | 'editar' | null = null;
  cargandoEstado: Set<number> = new Set();
  icono = 'pi-cog';
  texto = 'Configuraciones';

  ngOnInit() {
    this.cargarCategorias();
    this.cargarRuletas();
    this.cargarConfiguraciones(0, this.rows);
  }

  cargarConfiguraciones(page: number, size: number): void {
    this.pageActual = page;
    this.cargado = false;
    this.configuracionService.obtenerConfiguraciones({ ...this.filtro, page, size, sort: 'configuracionId,desc' }).subscribe({
      next: (resp) => {
        this.configuraciones = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargado = true;
        this.cd.detectChanges();
      }
    });
  }

  buscarConfiguraciones(nombre: string): void {
    this.filtro.categoriaNombre = nombre;
    this.cargarConfiguraciones(0, this.rows);
  }

  guardarConfiguracion(data: ConfiguracionRequest) {
    if (this.configuracionSeleccionada) { this.editarConfiguracion(data); }
    else { this.crearConfiguracion(data); }
  }

  eliminarConfiguracion(configuracion: ConfiguracionResponse) {
    this.configuracionService.eliminarConfiguracion(configuracion.configuracionId).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarConfiguraciones(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  abrirCrear() {
    this.modo = 'crear';
    this.configuracionSeleccionada = null;
    this.cargarCategorias();
    this.cargarRuletas();
    this.mostrarFormulario = true;
    this.cd.detectChanges();
  }

  abrirEditar(configuracion: ConfiguracionResponse) {
    this.configuracionSeleccionada = { ...configuracion };
    this.modo = 'editar';
    this.cargarCategorias();
    this.cargarRuletas();
    this.mostrarFormulario = true;
    this.cd.detectChanges();
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.configuracionSeleccionada = null;
    this.modo = null;
  }

  private postGuardar(mensaje: string) {
    this.notify.showSuccess(mensaje);
    this.cargarConfiguraciones(0, this.rows);
    this.resetFormTrigger++;
    this.cerrarFormulario();
  }

  private crearConfiguracion(data: ConfiguracionRequest) {
    this.configuracionService.crearConfiguracion(data).subscribe({
      next: (resp) => { this.postGuardar(resp.message); },
      error: (err) => { this.notify.showHttpError(err.message); },
    });
  }

  private editarConfiguracion(data: ConfiguracionRequest) {
    if (!this.configuracionSeleccionada) return;
    this.configuracionService.actualizarConfiguracion(this.configuracionSeleccionada.configuracionId, data).subscribe({
      next: (resp) => { this.postGuardar(resp.message); },
      error: (err) => { this.notify.showHttpError(err.message); },
    });
  }

  private actualizarConfiguracionParcial(configuracion: ConfiguracionResponse, cambios: ConfiguracionPatchRequest, mensaje: string) {
    if (this.cargandoEstado.has(configuracion.configuracionId)) return;
    this.cargandoEstado.add(configuracion.configuracionId);
    this.configuracionService.actualizarConfiguracionParcial(configuracion.configuracionId, cambios).subscribe({
      next: (resp) => {
        Object.assign(configuracion, resp.data);
        this.notify.showSuccess(resp.message || mensaje);
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargarConfiguraciones(this.pageActual, this.rows);
      },
      complete: () => {
        this.cargandoEstado.delete(configuracion.configuracionId);
      }
    });
  }

  private cambiarBooleano(id: number, propiedad: 'activa' | 'mostrarSiempre' | 'crearTarjetaAutomatica', valor: boolean, mensaje: string) {
    const configuracion = this.configuraciones.find(config => config.configuracionId === id);
    if (!configuracion) return;
    configuracion[propiedad] = valor;
    this.actualizarConfiguracionParcial(configuracion, { campo: propiedad, valor }, mensaje);
  }

  onCambiarEstado(event: { id: number; activo: boolean }) {
    this.cambiarBooleano(event.id, 'activa', event.activo, `Configuración ${event.activo ? 'activada' : 'desactivada'} correctamente`);
  }

  onCambiarMostrarSiempre(event: { id: number; mostrarSiempre: boolean }) {
    this.cambiarBooleano(event.id, 'mostrarSiempre', event.mostrarSiempre, 'Configuración actualizada correctamente');
  }

  onCambiarCrearTarjeta(event: { id: number; crearTarjetaAutomatica: boolean; }) {
    this.cambiarBooleano(event.id, 'crearTarjetaAutomatica', event.crearTarjetaAutomatica, 'Configuración actualizada correctamente');
  }

  onLazyLoad(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    const page = Math.floor(first / rows);
    this.cargarConfiguraciones(page, rows);
  }

  private cargarCategorias(): void {
    this.categoriaService.obtenerCategoriasPorTipo(CategoriaTipo.SERVICIO).subscribe({
      next: (resp) => {
        this.categorias = resp.data.content;
        const nodos = buildCategoryTree(this.categorias);
        this.filtrosFields = this.filtrosFields.map(field => field.key === 'categoriaId' ? { ...field, treeOptions: nodos } : field);
        this.cd.detectChanges();
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  private cargarRuletas(): void {
    this.ruletaService.obtenerRuletas().subscribe({
      next: (resp) => { this.ruletas = resp.data.content; this.cd.detectChanges(); },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  onDialogHide() {
    if (this.modo === 'crear') { this.configuracionSeleccionada = null; }
  }

  onBuscar(filtros: Partial<ConfiguracionFiltro>) {
    if (filtros.categoriaId && typeof filtros.categoriaId === 'object') {
      const nodo = filtros.categoriaId as any;
      filtros.categoriaId = nodo.key ?? nodo.data?.id ?? undefined;
    }
    this.filtro = { ...this.filtro, ...filtros };
    this.cargarConfiguraciones(0, this.rows);
  }

  onLimpiar() {
    this.filtro = {};
    this.cargarConfiguraciones(0, this.rows);
  }
}