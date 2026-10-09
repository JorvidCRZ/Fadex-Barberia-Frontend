import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { ReglaFormComponent } from './regla-form/regla-form.component';
import { ReglaTableComponent } from './regla-table/regla-table.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { CategoriaService } from '@/app/core/services/catalogos/categoria.service';
import { FidelizacionReglaService } from '@/app/core/services/fidelizacion/regla.service';
import { FidelizacionReglaResponse, FidelizacionReglaRequest, FidelizacionReglaFiltro, TipoAlcanceFidelizacion } from '@/app/core/models/fidelizacion/regla.model';
import { Categoria, CategoriaTipo } from '@/app/core/models/catalogos/categorias.model';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FILTROS_REGLA } from '@/app/core/config/filtros.config';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { buildCategoryTree } from '@/app/shared/utils/buildCategoryTree.component';
import { of } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-reglas',
    imports: [ReglaFormComponent, ReglaTableComponent, DialogModule, ButtonModule, CommonModule, FormsModule, DialogHeaderComponent, FiltrosComponent],
    templateUrl: './reglas.html',
})
export class ReglasComponent implements OnInit {
    private cd = inject(ChangeDetectorRef);
    private notify = inject(NotificationService);
    private reglaService = inject(FidelizacionReglaService);
    private categoriaService = inject(CategoriaService);

    // Mock Data
    private mockReglas: FidelizacionReglaResponse[] = [
        { reglaId: 1, categoriaId: 1, categoriaNombre: 'Corte', tipoAlcance: TipoAlcanceFidelizacion.CATEGORIA, puntos: 10, activo: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { reglaId: 2, categoriaId: 2, categoriaNombre: 'Barba', tipoAlcance: TipoAlcanceFidelizacion.CATEGORIA, puntos: 20, activo: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { reglaId: 3, categoriaId: 1, categoriaNombre: 'Corte', tipoAlcance: TipoAlcanceFidelizacion.SERVICIO, servicioId: 10, servicioNombre: 'Corte Clásico', puntos: 50, activo: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { reglaId: 4, categoriaId: 3, categoriaNombre: 'Tratamientos', tipoAlcance: TipoAlcanceFidelizacion.PRODUCTO, productoId: 20, productoNombre: 'Mascarilla Facial', puntos: 15, activo: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { reglaId: 5, categoriaId: 2, categoriaNombre: 'Barba', tipoAlcance: TipoAlcanceFidelizacion.CATEGORIA, puntos: 100, activo: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ];

    private mockCategorias: any[] = [
        { id: 1, nombre: 'Corte', subcategorias: [], tipo: CategoriaTipo.SERVICIO, descripcion: '', estado: true, padreId: null, padreNombre: '' },
        { id: 2, nombre: 'Barba', subcategorias: [], tipo: CategoriaTipo.SERVICIO, descripcion: '', estado: true, padreId: null, padreNombre: '' },
        { id: 3, nombre: 'Tratamientos', subcategorias: [], tipo: CategoriaTipo.SERVICIO, descripcion: '', estado: true, padreId: null, padreNombre: '' },
    ];

    reglaSeleccionada: FidelizacionReglaResponse | null = null;
    filtro: Partial<FidelizacionReglaFiltro> = {};
    categorias: Categoria[] = [];
    reglas: FidelizacionReglaResponse[] = [];
    filtrosFields = [...FILTROS_REGLA];

    rows = 20;
    cargado = false;
    totalRecords = 0;
    resetFormTrigger = 0;
    mostrarFormulario = false;
    icono = 'pi-percentage';
    texto = 'Reglas de puntos';

    ngOnInit(): void {
        this.cargarCategorias();
        this.cargarReglas(0, this.rows);
    }

    cargarReglas(page: number, size: number): void {
        this.cargado = false;

        let filtered = [...this.mockReglas];
        if (this.filtro.categoriaId) {
            filtered = filtered.filter(r => r.categoriaId === this.filtro.categoriaId);
        }
        if (this.filtro.activo !== undefined) {
            filtered = filtered.filter(r => r.activo === this.filtro.activo);
        }

        const content = filtered.slice(page * size, (page + 1) * size);

        of({ data: { content, totalElements: filtered.length } }).subscribe({
            next: (resp) => {
                this.reglas = resp.data.content;
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

    onLazyLoad(event: TableLazyLoadEvent) {
        const first = event.first ?? 0;
        const rows = event.rows ?? this.rows;
        this.cargarReglas(Math.floor(first / rows), rows);
    }

    abrirCrear() {
        this.reglaSeleccionada = null;
        this.mostrarFormulario = true;
    }

    abrirEditar(regla: FidelizacionReglaResponse) {
        this.reglaSeleccionada = { ...regla };
        this.mostrarFormulario = true;
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.reglaSeleccionada = null;
    }

    guardarRegla(data: FidelizacionReglaRequest) {
        let resp;
        if (this.reglaSeleccionada) {
            const index = this.mockReglas.findIndex(r => r.reglaId === this.reglaSeleccionada!.reglaId);
            if (index !== -1) {
                this.mockReglas[index] = { ...this.mockReglas[index], ...data } as any;
            }
            resp = of({ message: 'Regla actualizada correctamente' });
        } else {
            const newRegla = {
                reglaId: this.mockReglas.length + 1,
                ...data,
                categoriaNombre: 'Categoria Mock',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            } as any;
            this.mockReglas.push(newRegla);
            resp = of({ message: 'Regla creada correctamente' });
        }

        resp.subscribe({
            next: (res) => {
                this.notify.showSuccess(res.message);
                this.cargarReglas(0, this.rows);
                this.resetFormTrigger++;
                this.cerrarFormulario();
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    eliminarRegla(regla: FidelizacionReglaResponse) {
        this.mockReglas = this.mockReglas.filter(r => r.reglaId !== regla.reglaId);
        of({ message: 'Regla eliminada correctamente' }).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cargarReglas(0, this.rows);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    onCambiarEstado(event: { id: number; activo: boolean }) {
        const regla = this.reglas.find(r => r.reglaId === event.id);
        if (!regla) return;
        const estadoAnterior = regla.activo;
        regla.activo = event.activo;

        const mockRegla = this.mockReglas.find(r => r.reglaId === event.id);
        if (mockRegla) mockRegla.activo = event.activo;

        of({ message: 'Estado actualizado correctamente', data: regla }).subscribe({
            next: (resp) => {
                Object.assign(regla, resp.data);
                this.notify.showSuccess(resp.message);
            },
            error: (err) => {
                regla.activo = estadoAnterior;
                this.notify.showHttpError(err.message);
            }
        });
    }

    private cargarCategorias(): void {
        of({ data: { content: this.mockCategorias } }).subscribe({
            next: (resp) => {
                this.categorias = resp.data.content;
                const nodos = buildCategoryTree(this.categorias);
                this.filtrosFields = this.filtrosFields.map(field => field.key === 'categoriaId' ? { ...field, treeOptions: nodos } : field);
                this.cd.detectChanges();
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    onDialogHide() {
        this.reglaSeleccionada = null;
    }

    onBuscar(filtros: Partial<FidelizacionReglaFiltro>) {
        if (filtros.categoriaId && typeof filtros.categoriaId === 'object') {
            const nodo = filtros.categoriaId as any;
            filtros.categoriaId = nodo.key ?? nodo.data?.id ?? undefined;
        }
        this.filtro = { ...this.filtro, ...filtros };
        this.cargarReglas(0, this.rows);
    }

    onLimpiar() {
        this.filtro = {};
        this.cargarReglas(0, this.rows);
    }
}