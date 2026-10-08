import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { GiroService } from '@/app/core/services/ruleta/giro.service';
import { GiroFiltro, GiroResponse } from '@/app/core/models/ruleta/giro.model';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { FILTROS_GIRO } from '@/app/core/config/filtros.config';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { FidelizacionTarjetaService } from '@/app/core/services/fidelizacion/tarjeta.service';
import { RuletaService } from '@/app/core/services/ruleta/ruleta.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { GiroTableComponent } from './giro-table/giro-table.component';

@Component({
    selector: 'app-giros',
    standalone: true,
    imports: [CommonModule, FiltrosComponent, GiroTableComponent],
    templateUrl: './giros.html',
})
export class GirosComponent implements OnInit {
    private cd = inject(ChangeDetectorRef);
    private notify = inject(NotificationService);
    private clienteService = inject(ClienteService);
    private tarjetaService = inject(FidelizacionTarjetaService);
    private ruletaService = inject(RuletaService);
    private giroService = inject(GiroService);

    giros: GiroResponse[] = [];
    cargado = false;
    totalRecords = 0;
    rows = 20;
    filtro: Partial<GiroFiltro> = {};
    filtrosFields = [...FILTROS_GIRO];

    texto = 'Historial de Giros';
    icono = 'pi pi-refresh';

    ngOnInit(): void {
        this.cargarGiros(0, this.rows);
        this.cargarFiltros();
    }

    cargarGiros(page: number, size: number): void {
        this.cargado = false;
        const filtro = { ...this.filtro, page, size, sort: 'createdAt,desc' };
        this.giroService.obtenerGiros(filtro).subscribe({
            next: (resp) => {
                this.giros = resp.data.content;
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
        this.cargarGiros(Math.floor(first / rows), rows);
    }

    onBuscar(filtros: Partial<GiroFiltro>): void {
        this.filtro = { ...this.filtro, ...filtros };
        this.cargarGiros(0, this.rows);
    }

    onLimpiar(): void {
        this.filtro = {};
        this.cargarGiros(0, this.rows);
    }

    cargarFiltros() {
        this.clienteService.listar().subscribe(resp => {
            const opciones = resp.data.content.map(c => ({ label: c.persona.nombre + ' ' + c.persona.apellido, value: c.clienteId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'clienteId' ? { ...f, options: opciones } : f);
        });

        this.tarjetaService.obtenerTarjetas().subscribe(resp => {
            const opciones = resp.data.content.map(t => ({ label: t.categoriaNombre, value: t.id }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'tarjetaId' ? { ...f, options: opciones } : f);
        });

        this.ruletaService.obtenerRuletas().subscribe(resp => {
            const opciones = resp.data.content.map(r => ({ label: r.nombre, value: r.ruletaId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'ruletaId' ? { ...f, options: opciones } : f);
        });
    }
}