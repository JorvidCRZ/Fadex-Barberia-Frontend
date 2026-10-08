import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { FidelizacionMovimientoService } from '@/app/core/services/fidelizacion/movimiento.service';
import { Movimiento, MovimientoFiltro, MovimientoRequest, Origen } from '@/app/core/models/fidelizacion/movimiento.model';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { FILTROS_MOVIMIENTO } from '@/app/core/config/filtros.config';
import { MovimientoTableComponent } from './movimiento-table/movimiento-table.component';
import { MovimientoFormComponent } from './movimiento-form/movimiento-form.component';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { FidelizacionTarjetaService } from '@/app/core/services/fidelizacion/tarjeta.service';
import { of } from 'rxjs';

@Component({
    selector: 'app-movimientos-admin',
    standalone: true,
    imports: [CommonModule, ButtonModule, DialogModule, DialogHeaderComponent, FiltrosComponent, MovimientoTableComponent, MovimientoFormComponent],
    templateUrl: './movimientos.html',
})
export class MovimientosAdminComponent implements OnInit {
    private cd = inject(ChangeDetectorRef);
    private notify = inject(NotificationService);
    private clienteService = inject(ClienteService);
    private tarjetaService = inject(FidelizacionTarjetaService);
    private movimientoService = inject(FidelizacionMovimientoService);

    // Mock Data
    private mockMovimientos: Movimiento[] = [
        { id: 1, clienteId: 101, tarjetaId: 1, puntos: 100, origen: Origen.VENTA, idOrigen: 10, descripcion: 'Bonificación bienvenida', clienteNombre: 'Juan Pérez', createdAt: new Date().toISOString() },
        { id: 2, clienteId: 101, tarjetaId: 1, puntos: -50, origen: Origen.AJUSTE, idOrigen: 11, descripcion: 'Canje de premio', clienteNombre: 'Juan Pérez', createdAt: new Date().toISOString() },
        { id: 3, clienteId: 102, tarjetaId: 2, puntos: 200, origen: Origen.VENTA, idOrigen: 12, descripcion: 'Compra de producto', clienteNombre: 'María López', createdAt: new Date().toISOString() },
    ];

    private mockClientes = [
        { clienteId: 101, persona: { nombre: 'Juan', apellido: 'Pérez' } },
        { clienteId: 102, persona: { nombre: 'María', apellido: 'López' } },
    ];

    private mockTarjetas = [
        { id: 1, categoriaNombre: 'Platino' },
        { id: 2, categoriaNombre: 'Oro' },
    ];

    movimientos: Movimiento[] = [];
    cargado = false;
    totalRecords = 0;
    rows = 20;
    filtro: Partial<MovimientoFiltro> = {};
    filtrosFields = [...FILTROS_MOVIMIENTO];

    mostrarForm = false;
    texto = 'Movimientos';
    icono = 'pi pi-history';

    ngOnInit(): void {
        this.cargarMovimientos(0, this.rows);
        this.cargarFiltros();
    }

    cargarMovimientos(page: number, size: number): void {
        this.cargado = false;

        let filtered = [...this.mockMovimientos];
        if (this.filtro.clienteId) {
            filtered = filtered.filter(m => m.clienteId === this.filtro.clienteId);
        }
        if (this.filtro.tarjetaId) {
            filtered = filtered.filter(m => m.tarjetaId === this.filtro.tarjetaId);
        }

        const content = filtered.slice(page * size, (page + 1) * size);

        of({ data: { content, totalElements: filtered.length } }).subscribe({
            next: (resp) => {
                this.movimientos = resp.data.content;
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
        this.cargarMovimientos(Math.floor(first / rows), rows);
    }

    onBuscar(filtros: Partial<MovimientoFiltro>): void {
        this.filtro = { ...this.filtro, ...filtros };
        this.cargarMovimientos(0, this.rows);
    }

    onLimpiar(): void {
        this.filtro = {};
        this.cargarMovimientos(0, this.rows);
    }

    abrirCrear(): void {
        this.mostrarForm = true;
    }

    cerrarForm(): void {
        this.mostrarForm = false;
    }

    guardarAjuste(data: MovimientoRequest): void {
        const nuevoMovimiento = {
            id: this.mockMovimientos.length + 1,
            ...data,
            fecha: new Date().toISOString(),
            usuarioId: 1,
        } as any;
        this.mockMovimientos.push(nuevoMovimiento);

        of({ message: 'Movimiento creado correctamente' }).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cerrarForm();
                this.cargarMovimientos(0, this.rows);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    eliminarMovimiento(movimiento: Movimiento): void {
        this.mockMovimientos = this.mockMovimientos.filter(m => m.id !== movimiento.id);
        of({ message: 'Movimiento eliminado correctamente' }).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cargarMovimientos(0, this.rows);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }


    cargarFiltros() {
        of({ data: { content: this.mockClientes } }).subscribe(resp => {
            const opciones = resp.data.content.map(c => ({label: c.persona.nombre + ' ' + c.persona.apellido,value: c.clienteId}));
            this.filtrosFields = this.filtrosFields.map(f =>f.key === 'clienteId'? { ...f, options: opciones }: f);
        });

        of({ data: { content: this.mockTarjetas } }).subscribe(resp => {
            const opciones = resp.data.content.map(t => ({label: t.categoriaNombre, value: t.id}));
            this.filtrosFields = this.filtrosFields.map(f =>f.key === 'tarjetaId'? { ...f, options: opciones }: f);
        });
    }
}