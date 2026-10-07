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
import { FidelizacionReglaResponse, FidelizacionReglaRequest, FidelizacionReglaFiltro } from '@/app/core/models/fidelizacion/regla.model';
import { Categoria, CategoriaTipo } from '@/app/core/models/catalogos/categorias.model';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FILTROS_REGLA } from '@/app/core/config/filtros.config';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { buildCategoryTree } from '@/app/shared/utils/buildCategoryTree.component';

@Component({
    standalone: true,
    selector: 'app-reglas',
    imports: [ReglaFormComponent, ReglaTableComponent, DialogModule, ButtonModule, CommonModule, FormsModule, DialogHeaderComponent, FiltrosComponent],
    templateUrl: './reglas.html',
    styleUrl: './reglas.css',
})
export class ReglasComponent implements OnInit {
    private cd = inject(ChangeDetectorRef);
    private notify = inject(NotificationService);
    private reglaService = inject(FidelizacionReglaService);
    private categoriaService = inject(CategoriaService);

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
        this.reglaService.obtenerReglas({ ...this.filtro, page, size, sort: 'reglaId,desc' }).subscribe({
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
        const obs = this.reglaSeleccionada ? this.reglaService.actualizarRegla(this.reglaSeleccionada.reglaId, data) : this.reglaService.crearRegla(data);
        obs.subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cargarReglas(0, this.rows);
                this.resetFormTrigger++;
                this.cerrarFormulario();
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    eliminarRegla(regla: FidelizacionReglaResponse) {
        this.reglaService.eliminarRegla(regla.reglaId).subscribe({
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
        this.reglaService.actualizarParcial(event.id, { campo: 'activo', valor: event.activo }).subscribe({
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