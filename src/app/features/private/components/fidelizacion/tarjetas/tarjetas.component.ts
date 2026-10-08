import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { TableLazyLoadEvent } from 'primeng/table';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FidelizacionTarjetaService } from '@/app/core/services/fidelizacion/tarjeta.service';
import { FidelizacionTarjetaFiltro, FidelizacionTarjetaResponse } from '@/app/core/models/fidelizacion/tarjeta.model';
import { TarjetaTableComponent } from './tarjeta-table/tarjeta-table.component';
import { TarjetaFormComponent } from './tarjeta-form/tarjeta-form.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { FILTROS_TARJETA } from '@/app/core/config/filtros.config';
import { CategoriaService } from '@/app/core/services/catalogos/categoria.service';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';
import { TarjetaGraficoComponent } from '@/app/shared/components/tarjeta/tarjeta-grafico.component';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';

@Component({
  selector: 'app-tarjetas',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, SelectModule,
    DialogHeaderComponent, TarjetaTableComponent, TarjetaFormComponent, FiltrosComponent, TarjetaGraficoComponent
  ],
  templateUrl: './tarjetas.html',
  styleUrl: './tarjetas.css',
})
export class TarjetasComponent implements OnInit {
  private cd = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  private tarjetaService = inject(FidelizacionTarjetaService);
  private categoriaService = inject(CategoriaService);
  private clienteService = inject(ClienteService);

  tarjetas: FidelizacionTarjetaResponse[] = [];
  cargado = false;
  totalRecords = 0;
  rows = 20;

  filtro: Partial<FidelizacionTarjetaFiltro> = {};
  filtrosFields = [...FILTROS_TARJETA];

  mostrarForm = false;
  mostrarPreview = false;
  tarjetaSeleccionada: FidelizacionTarjetaResponse | null = null;
  resetFormTrigger = 0;
  texto = 'Tarjetas';
  icono = 'pi pi-id-card';
  categorias: Categoria[] = [];
  clienteNombrePreview = '';
  variantePreview: 'admin' | 'cliente' = 'admin';

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarCategorias();
    this.cargarTarjetas(0, this.rows);
  }

  cargarTarjetas(page: number, size: number): void {
    this.cargado = false;
    const filtro = { ...this.filtro, page, size, sort: 'id,desc' };
    this.tarjetaService.obtenerTarjetas(filtro).subscribe({
      next: (resp) => {
        this.tarjetas = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargado = true;
        this.cd.detectChanges();
      },
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    this.cargarTarjetas(Math.floor(first / rows), rows);
  }

  aplicarFiltros(): void {
    this.cargarTarjetas(0, this.rows);
  }

  onCambiarEstado(event: { tarjeta: FidelizacionTarjetaResponse; campo: 'activo' | 'cicloActivo'; valor: boolean }): void {
    const { tarjeta, campo, valor } = event;
    const anterior = tarjeta[campo];
    (tarjeta as any)[campo] = valor;

    this.tarjetaService.actualizarTarjetaParcial(tarjeta.id, { campo, valor }).subscribe({
      next: (resp) => this.notify.showSuccess(resp.message),
      error: (err) => {
        (tarjeta as any)[campo] = anterior;
        this.notify.showHttpError(err.message);
      },
    });
  }

  abrirCrear(): void {
    this.mostrarForm = true;
  }

  cerrarForm(): void {
    this.mostrarForm = false;
  }

  guardarTarjeta(data: { clienteId: number; categoriaId: number }): void {
    this.tarjetaService.crearTarjeta(data).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.resetFormTrigger++;
        this.cerrarForm();
        this.cargarTarjetas(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  eliminarTarjeta(tarjeta: FidelizacionTarjetaResponse): void {
    this.tarjetaService.eliminarTarjeta(tarjeta.id).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarTarjetas(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  private cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (resp) => {
        this.categorias = resp.data.content;
        const tree = this.construirTree(this.categorias);
        this.filtrosFields = this.filtrosFields.map(f => f.key === 'categoriaId' ? { ...f, treeOptions: tree } : f);
        this.cd.detectChanges();
      },
      error: (err) => this.notify.showHttpError(err.message)
    });
  }

  private cargarClientes(): void {
    this.clienteService.listar(0, 1000).subscribe({
      next: (resp) => {
        const clientes = resp.data.content.map((c: any) => ({
          label: `${c.persona.nombre} ${c.persona.apellido}`,
          value: c.clienteId
        }));
        this.filtrosFields = this.filtrosFields.map(f => f.key === 'clienteId' ? { ...f, options: clientes } : f);
        this.cd.detectChanges();
      },
      error: (err) => this.notify.showHttpError(err.message)
    });
  }


  private construirTree(categorias: Categoria[]): any[] {
    return categorias.map(c => ({ key: String(c.id), label: c.nombre, data: c.id, children: c.subcategorias?.length ? this.construirTree(c.subcategorias) : [] }));
  }

  onBuscar(filtros: Partial<FidelizacionTarjetaFiltro>) {
    if (filtros.categoriaId && typeof filtros.categoriaId === 'object') {
      const nodo = filtros.categoriaId as any;
      filtros.categoriaId = nodo.key ?? nodo.data?.id ?? undefined;
    }
    this.filtro = { ...this.filtro, ...filtros };
    this.cargarTarjetas(0, this.rows);
  }

  onLimpiar() {
    this.filtro = {};
    this.cargarTarjetas(0, this.rows);
  }

  verPreview(tarjeta: FidelizacionTarjetaResponse): void {
    this.tarjetaSeleccionada = tarjeta;
    this.clienteNombrePreview = tarjeta.clienteNombreCompleto;
    this.variantePreview = 'admin';
    this.mostrarPreview = true;
  }

  cambiarVariantePreview(): void {
    this.variantePreview = this.variantePreview === 'admin' ? 'cliente' : 'admin';
  }

  get tarjetasPreview(): FidelizacionTarjetaResponse[] {
    return this.tarjetaSeleccionada ? [this.tarjetaSeleccionada] : [];
  }

}