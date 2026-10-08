import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { RuletaService } from '@/app/core/services/ruleta/ruleta.service';
import { RuletaItemService } from '@/app/core/services/ruleta/ruleta-item.service';
import { RuletaResponse, RuletaRequest, RuletaFiltro } from '@/app/core/models/ruleta/ruleta.model';
import { RuletaItemResponse, RuletaItemRequest, RuletaItemFiltro } from '@/app/core/models/ruleta/ruleta-item.model';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { TableLazyLoadEvent } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { RuletaAdminFormComponent } from './ruleta-admin-form/ruleta-admin-form.component';
import { RuletaAdminTableComponent } from './ruleta-admin-table/ruleta-admin-table.component';
import { RuletaPreviewComponent } from './ruleta-preview/ruleta-preview.component';
import { RuletaItemFormComponent } from './ruleta-item/ruleta-item-form/ruleta-item-form.component';
import { RuletaItemTableComponent } from './ruleta-item/ruleta-item-table/ruleta-item-table.component';
import { RULETA_TABS } from '@/app/core/config/tabs.config';
import { ActivatedRoute, Router } from '@angular/router';
import { RuletaConfiguracionesComponent } from './ruleta-configuraciones/ruleta-configuraciones.component';
import { FILTROS_ITEM, FILTROS_RULETA } from '@/app/core/config/filtros.config';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';


@Component({
  selector: 'app-ruletas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, RuletaPreviewComponent, TabsModule, RuletaAdminFormComponent, RuletaConfiguracionesComponent,
    RuletaAdminTableComponent, RuletaItemFormComponent, RuletaItemTableComponent, DialogHeaderComponent, SearchBarComponent,FiltrosComponent],
  templateUrl: './ruletas-admin.html',
  styleUrl: './ruletas-admin.css',
})
export class RuletasAdminComponent implements OnInit {

  private cd = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  private ruletaService = inject(RuletaService);
  private ruletaItemService = inject(RuletaItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  icono = 'pi-refresh';
  activeTab = 'ruletas';
  ruletas: RuletaResponse[] = [];
  ruletaSeleccionada: RuletaResponse | null = null;
  ruletaEnEdicion: RuletaResponse | null = null;
  mostrarFormRuleta = false;
  cargadoRuletas = false;
  totalRuletas = 0;
  rows = 20;
  resetRuletaFormTrigger = 0;
  filtroRuleta: Partial<RuletaFiltro> = {};
  filtroItem: Partial<RuletaItemFiltro> = {};

  items: RuletaItemResponse[] = [];
  itemEnEdicion: RuletaItemResponse | null = null;
  mostrarFormItem = false;
  cargadoItems = false;
  resetItemFormTrigger = 0;
  tabs = RULETA_TABS;
  filtrosFields = [...FILTROS_RULETA];
  FILTROS_ITEM = [...FILTROS_ITEM];
  texto = 'Ruletas';

  constructor() {
    this.route.queryParams.subscribe(params => {this.activeTab = params['tab'] || 'ruletas';});
  }

  ngOnInit(): void {
    this.cargarRuletas(0, this.rows);
  }

  onTabChange(tab: string | number | undefined): void {
    if (tab === undefined || tab === null) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: String(tab) },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  get previewActivo(): boolean {
    return this.activeTab === 'preview';
  }

  cargarRuletas(page: number, size: number): void {
    this.cargadoRuletas = false;
    this.ruletaService.obtenerRuletas({ ...this.filtroRuleta, page, size, sort: 'ruletaId,desc' }).subscribe({
      next: (resp) => {
        this.ruletas = resp.data.content;
        this.totalRuletas = resp.data.totalElements;
        this.cargadoRuletas = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargadoRuletas = true;
        this.cd.detectChanges();
      }
    });
  }

  buscarRuletas(nombre: string): void {
    this.filtroRuleta.nombre = nombre;
    this.cargarRuletas(0, this.rows);
  }

  onLazyLoadRuletas(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    this.cargarRuletas(Math.floor(first / rows), rows);
  }

  onCambiarEstadoRuleta(event: { id: number; activo: boolean }) {
    const ruleta = this.ruletas.find(item => item.ruletaId === event.id);
    if (!ruleta) return;

    ruleta.activa = event.activo;
    this.ruletaService.cambiarEstado(event.id, event.activo).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        if (this.ruletaSeleccionada?.ruletaId === event.id) {
          this.ruletaSeleccionada = { ...this.ruletaSeleccionada, activa: event.activo };
        }
      },
      error: (err) => {
        ruleta.activa = !event.activo;
        this.notify.showHttpError(err.message);
      },
    });
  }

  onCambiarEstadoItem(event: { id: number; activo: boolean }) {
    const item = this.items.find(i => i.itemId === event.id);
    if (!item) return;

    item.activo = event.activo;
    this.ruletaItemService.cambiarEstado(event.id, event.activo).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        if (this.ruletaSeleccionada?.ruletaId === event.id) {
          this.ruletaSeleccionada = { ...this.ruletaSeleccionada, activa: event.activo };
        }
      },
      error: (err) => {
        item.activo = !event.activo;
        this.notify.showHttpError(err.message);
      },
    });
  }

  abrirCrearRuleta() {
    this.ruletaEnEdicion = null;
    this.mostrarFormRuleta = true;
  }

  abrirEditarRuleta(ruleta: RuletaResponse) {
    this.ruletaEnEdicion = { ...ruleta };
    this.mostrarFormRuleta = true;
  }

  cerrarFormRuleta() {
    this.mostrarFormRuleta = false;
    this.ruletaEnEdicion = null;
  }

  guardarRuleta(data: RuletaRequest) {
    const obs = this.ruletaEnEdicion
      ? this.ruletaService.actualizarRuleta(this.ruletaEnEdicion.ruletaId, data)
      : this.ruletaService.crearRuleta(data);

    obs.subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarRuletas(0, this.rows);
        this.resetRuletaFormTrigger++;
        this.cerrarFormRuleta();
        if (this.ruletaSeleccionada?.ruletaId === resp.data.ruletaId) {
          this.ruletaSeleccionada = resp.data;
        }
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  eliminarRuleta(ruleta: RuletaResponse) {
    this.ruletaService.eliminarRuleta(ruleta.ruletaId).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        if (this.ruletaSeleccionada?.ruletaId === ruleta.ruletaId) {
          this.ruletaSeleccionada = null;
          this.items = [];
        }
        this.cargarRuletas(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  seleccionarRuletaParaPremios(ruleta: RuletaResponse) {
    this.ruletaSeleccionada = ruleta;
    this.cargarItems();
  }

  cargarItems(): void {
    if (!this.ruletaSeleccionada) return;
    this.cargadoItems = false;
    this.ruletaItemService.obtenerItems({ ruletaId: this.ruletaSeleccionada.ruletaId, page: 0, size: 100, sort: 'ordenDisplay,asc' }).subscribe({
      next: (resp) => {
        this.items = resp.data.content;
        this.cargadoItems = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargadoItems = true;
        this.cd.detectChanges();
      }
    });
  }

  abrirCrearItem() {
    this.itemEnEdicion = null;
    this.mostrarFormItem = true;
  }

  abrirEditarItem(item: RuletaItemResponse) {
    this.itemEnEdicion = { ...item };
    this.mostrarFormItem = true;
  }

  cerrarFormItem() {
    this.mostrarFormItem = false;
    this.itemEnEdicion = null;
  }

  guardarItem(event: { data: RuletaItemRequest, imagen?: File | null }) {
    const obs = this.itemEnEdicion ? this.ruletaItemService.actualizarItem(this.itemEnEdicion.itemId, event.data, event.imagen || undefined) : this.ruletaItemService.crearItem(event.data, event.imagen || undefined);
    obs.subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarItems();
        this.resetItemFormTrigger++;
        this.cerrarFormItem();
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  eliminarItem(item: RuletaItemResponse) {
    this.ruletaItemService.eliminarItem(item.itemId).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarItems();
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  onBuscar(filtros: Partial<RuletaFiltro>) {
    this.filtroRuleta = { ...this.filtroRuleta, ...filtros };
    this.cargarRuletas(0, this.rows);
  }

  onLimpiar() {
    this.filtroRuleta = {};
    this.cargarRuletas(0, this.rows);
  }
}