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
        const filtro = { ...this.filtro, page, size, sort: 'fechaObtencion,desc' };
        this.recompensaService.obtenerRecompensas(filtro).subscribe({
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
        this.recompensaService.canjearRecompensa(codigoCanje).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cerrarCanjear();
                this.recienCanjeadoId = idActual;
                this.cd.detectChanges();

                setTimeout(() => {
                    this.cargarRecompensas(0, this.rows); 
                }, 1500);

                setTimeout(() => (this.recienCanjeadoId = null), 1500);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    onCambiarEstado({ recompensa, nuevoEstado }: { recompensa: RecompensaObtenida; nuevoEstado: EstadoRecompensa }): void {
        this.recompensaService.cambiarEstado(recompensa.id, nuevoEstado).subscribe({
            next: (resp) => {
                this.notify.showSuccess(resp.message);
                this.cargarRecompensas(0, this.rows);
            },
            error: (err) => this.notify.showHttpError(err.message),
        });
    }

    cargarFiltros() {
        this.clienteService.listar().subscribe(resp => {
            const opciones = resp.data.content.map(c => ({ label: c.persona.nombre + ' ' + c.persona.apellido, value: c.clienteId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'clienteId' ? { ...f, options: opciones } : f);
        });

        this.itemService.obtenerItems().subscribe(resp => {
            const opciones = resp.data.content.map(i => ({ label: i.nombre, value: i.itemId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'itemId' ? { ...f, options: opciones } : f);
        });
    }
}