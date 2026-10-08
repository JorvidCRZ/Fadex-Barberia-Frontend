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
import { Categoria, CategoriaTipo } from '@/app/core/models/catalogos/categorias.model';
import { TarjetaGraficoComponent } from '@/app/shared/components/tarjeta/tarjeta-grafico.component';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { of } from 'rxjs';

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

  // Mock Data
  private mockTarjetas: FidelizacionTarjetaResponse[] = [
    { id: 1, clienteId: 101, categoriaId: 1, clienteNombreCompleto: 'Juan Pérez', categoriaNombre: 'Platino', activo: true, cicloActivo: true, progreso: 500, meta: 1000, girosPorMeta: 5, girosDisponibles: 2, totalGiros: 10 },
    { id: 2, clienteId: 102, categoriaId: 2, clienteNombreCompleto: 'María López', categoriaNombre: 'Oro', activo: true, cicloActivo: false, progreso: 300, meta: 1000, girosPorMeta: 5, girosDisponibles: 0, totalGiros: 10 },
    { id: 3, clienteId: 103, categoriaId: 1, clienteNombreCompleto: 'Carlos Ruiz', categoriaNombre: 'Platino', activo: false, cicloActivo: false, progreso: 100, meta: 1000, girosPorMeta: 5, girosDisponibles: 0, totalGiros: 10 },
  ];

  private mockCategorias: Categoria[] = [
    { id: 1, nombre: 'Platino', subcategorias: [], tipo: CategoriaTipo.SERVICIO, descripcion: 'Categoría Platino', estado: true, padreId: null, padreNombre: '' },
    { id: 2, nombre: 'Oro', subcategorias: [], tipo: CategoriaTipo.SERVICIO, descripcion: 'Categoría Oro', estado: true, padreId: null, padreNombre: '' },
    { id: 3, nombre: 'Plata', subcategorias: [], tipo: CategoriaTipo.SERVICIO, descripcion: 'Categoría Plata', estado: true, padreId: null, padreNombre: '' },
  ];

  private mockClientes: any[] = [
    { clienteId: 101, persona: { nombre: 'Juan', apellido: 'Pérez' } },
    { clienteId: 102, persona: { nombre: 'María', apellido: 'López' } },
    { clienteId: 103, persona: { nombre: 'Carlos', apellido: 'Ruiz' } },
  ];

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

    let filtered = [...this.mockTarjetas];
    if (this.filtro.clienteId) {
        filtered = filtered.filter(t => t.clienteId === this.filtro.clienteId);
    }
    if (this.filtro.categoriaId) {
        filtered = filtered.filter(t => t.categoriaId === this.filtro.categoriaId);
    }
    if (this.filtro.activo !== undefined) {
        filtered = filtered.filter(t => t.activo === this.filtro.activo);
    }

    const content = filtered.slice(page * size, (page + 1) * size);

    of({ data: { content, totalElements: filtered.length } }).subscribe({
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

    const mockTarjeta = this.mockTarjetas.find(t => t.id === tarjeta.id);
    if (mockTarjeta) {
        (mockTarjeta as any)[campo] = valor;
    }

    of({ message: 'Estado actualizado correctamente' }).subscribe({
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
    const newTarjeta: FidelizacionTarjetaResponse = {
        id: this.mockTarjetas.length + 1,
        clienteId: data.clienteId,
        categoriaId: data.categoriaId,
        clienteNombreCompleto: 'Cliente Mock',
        categoriaNombre: 'Categoria Mock',
        activo: true,
        cicloActivo: true,
        progreso: 0,
        meta: 1000,
        girosPorMeta: 5,
        girosDisponibles: 0,
        totalGiros: 10,
    };
    this.mockTarjetas.push(newTarjeta);

    of({ message: 'Tarjeta creada correctamente' }).subscribe({
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
    this.mockTarjetas = this.mockTarjetas.filter(t => t.id !== tarjeta.id);
    of({ message: 'Tarjeta eliminada correctamente' }).subscribe({
      next: (resp) => {
        this.notify.showSuccess(resp.message);
        this.cargarTarjetas(0, this.rows);
      },
      error: (err) => this.notify.showHttpError(err.message),
    });
  }

  private cargarCategorias(): void {
    of({ data: { content: this.mockCategorias } }).subscribe({
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
    of({ data: { content: this.mockClientes } }).subscribe({
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
    return categorias.map(c => ({
      key: String(c.id),
      label: c.nombre,
      data: c.id,
      children: c.subcategorias?.length ? this.construirTree(c.subcategorias) : []
    }));
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