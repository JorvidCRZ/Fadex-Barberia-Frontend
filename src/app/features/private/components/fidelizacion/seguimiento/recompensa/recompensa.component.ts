import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { RecompensaService } from '@/app/core/services/ruleta/recompensa.service';
import { EstadoRecompensa, RecompensaFiltro, RecompensaObtenida } from '@/app/core/models/ruleta/recompensa.model';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { RecompensaTableComponent } from './recompensa-table/recompensa-table.component';
import { RecompensaCanjearFormComponent } from './recompensa-form/recompensa-form.component';
import { RuletaItemService } from '@/app/core/services/ruleta/ruleta-item.service';
import { FILTROS_RECOMPENSA } from '@/app/core/config/filtros.config';
import { of } from 'rxjs';

@Component({
    selector: 'app-recompensas',
    standalone: true,
    imports: [CommonModule, DialogModule, DialogHeaderComponent, FiltrosComponent, RecompensaTableComponent, RecompensaCanjearFormComponent],
    templateUrl: './recompensa.html',
})
export class RecompensaComponent implements OnInit {
    private cd = inject(ChangeDetectorRef);
    private notify = inject(NotificationService);
    private clienteService = inject(ClienteService);
    private itemService = inject(RuletaItemService);
    private recompensaService = inject(RecompensaService);

    // Mock Data
    private mockRecompensas: RecompensaObtenida[] = [
        { id: 1, giroId: 100, clienteId: 101, clienteNombre: 'Juan Pérez', itemId: 10, itemNombre: 'Corte Gratis', itemImagen: '', colorHex: '#fff', premioMayor: false, estado: EstadoRecompensa.PENDIENTE, observacion: '', fechaObtencion: new Date().toISOString(), codigoCanje: 'C1', createdAt: new Date().toISOString() },
        { id: 2, giroId: 101, clienteId: 102, clienteNombre: 'María López', itemId: 11, itemNombre: 'Pomada Modeladora', itemImagen: '', colorHex: '#fff', premioMayor: false, estado: EstadoRecompensa.CANJEADO, observacion: '', fechaObtencion: new Date().toISOString(), codigoCanje: 'C2', createdAt: new Date().toISOString() },
        { id: 3, giroId: 102, clienteId: 101, clienteNombre: 'Juan Pérez', itemId: 12, itemNombre: 'Mascarilla Facial', itemImagen: '', colorHex: '#fff', premioMayor: false, estado: EstadoRecompensa.VENCIDO, observacion: '', fechaObtencion: new Date().toISOString(), codigoCanje: 'C3', createdAt: new Date().toISOString() },
    ];

    private mockClientes = [
        { clienteId: 101, persona: { nombre: 'Juan', apellido: 'Pérez' } },
        { clienteId: 102, persona: { nombre: 'María', apellido: 'López' } },
    ];

    private mockItems = [
        { itemId: 10, nombre: 'Corte Gratis' },
        { itemId: 11, nombre: 'Pomada Modeladora' },
        { itemId: 12, nombre: 'Mascarilla Facial' },
    ];

    recompensas: RecompensaObtenida[] = [];
    cargado = false;
    totalRecords = 0;
    rows = 20;
    filtro: Partial<RecompensaFiltro> = {};
    filtrosFields = [...FILTROS_RECOMPENSA];

    mostrarCanjear = false;
    recompensaSeleccionada: RecompensaObtenida | null = null;

    texto = 'Recompensas';
    icono = 'pi pi-gift';

    ngOnInit(): void {
        this.cargarRecompensas(0, this.rows);
        this.cargarFiltros();
    }

    cargarRecompensas(page: number, size: number): void {
        this.cargado = false;

        let filtered = [...this.mockRecompensas];
        if (this.filtro.clienteId) {
            filtered = filtered.filter(r => r.clienteId === this.filtro.clienteId);
        }
        if (this.filtro.itemId) {
            filtered = filtered.filter(r => r.itemId === this.filtro.itemId);
        }
        if (this.filtro.estado !== undefined) {
            filtered = filtered.filter(r => r.estado === this.filtro.estado);
        }

        const content = filtered.slice(page * size, (page + 1) * size);

        of({ data: { content, totalElements: filtered.length } }).subscribe({
            next: (resp) => {
                this.recompensas = resp.data.content;
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
        this.cargarRecompensas(Math.floor(first / rows), rows);
    }

    onBuscar(filtros: Partial<RecompensaFiltro>): void {
        this.filtro = { ...this.filtro, ...filtros };
        this.cargarRecompensas(0, this.rows);
    }

    onLimpiar(): void {
        this.filtro = {};
        this.cargarRecompensas(0, this.rows);
    }

    abrirCanjear(recompensa: RecompensaObtenida): void {
        this.recompensaSeleccionada = recompensa;
        this.mostrarCanjear = true;
    }

    cerrarCanjear(): void {
        this.mostrarCanjear = false;
        this.recompensaSeleccionada = null;
    }

    recienCanjeadoId: number | null = null;

    confirmarCanje(codigoCanje: string): void {
        const idActual = this.recompensaSeleccionada?.id ?? null;

        of({ message: 'Recompensa canjeada correctamente' }).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cerrarCanjear();
                this.recienCanjeadoId = idActual;
                this.cd.detectChanges();

                if (idActual !== null) {
                    const rec = this.mockRecompensas.find(r => r.id === idActual);
                    if (rec) rec.estado = EstadoRecompensa.CANJEADO;
                }

                setTimeout(() => {
                    this.cargarRecompensas(0, this.rows);
                }, 1500);

                setTimeout(() => (this.recienCanjeadoId = null), 1500);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    onCambiarEstado({ recompensa, nuevoEstado }: { recompensa: RecompensaObtenida; nuevoEstado: EstadoRecompensa }): void {
        const rec = this.mockRecompensas.find(r => r.id === recompensa.id);
        if (rec) rec.estado = nuevoEstado;

        of({ message: 'Estado actualizado correctamente' }).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cargarRecompensas(0, this.rows);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    cargarFiltros() {
        of({ data: { content: this.mockClientes } }).subscribe(resp => {
            const opciones = resp.data.content.map(c => ({ label: c.persona.nombre + ' ' + c.persona.apellido, value: c.clienteId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'clienteId' ? { ...f, options: opciones } : f);
        });

        of({ data: { content: this.mockItems } }).subscribe(resp => {
            const opciones = resp.data.content.map(i => ({ label: i.nombre, value: i.itemId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'itemId' ? { ...f, options: opciones } : f);
        });
    }
}