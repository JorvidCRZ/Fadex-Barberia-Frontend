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
import { of } from 'rxjs';

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

    // Mock Data
    private mockGiros: GiroResponse[] = [
        { id: 1, tarjetaId: 1, clienteId: 101, clienteNombre: 'Juan Pérez', ruletaId: 1, ruletaNombre: 'Ruleta Clásica', itemId: 10, premio: 'Corte Gratis', numeroGiro: 1, probFinal: 0.5, probAplicada: 0.5, fecha: new Date().toISOString() },
        { id: 2, tarjetaId: 2, clienteId: 102, clienteNombre: 'María López', ruletaId: 1, ruletaNombre: 'Ruleta Clásica', itemId: 11, premio: 'Ninguno', numeroGiro: 2, probFinal: 0.1, probAplicada: 0.1, fecha: new Date().toISOString() },
        { id: 3, tarjetaId: 1, clienteId: 101, clienteNombre: 'Juan Pérez', ruletaId: 2, ruletaNombre: 'Ruleta VIP', itemId: 12, premio: 'Pomada', numeroGiro: 3, probFinal: 0.8, probAplicada: 0.8, fecha: new Date().toISOString() },
    ];

    private mockClientes = [
        { clienteId: 101, persona: { nombre: 'Juan', apellido: 'Pérez' } },
        { clienteId: 102, persona: { nombre: 'María', apellido: 'López' } },
    ];

    private mockTarjetas = [
        { id: 1, categoriaNombre: 'Platino' },
        { id: 2, categoriaNombre: 'Oro' },
    ];

    private mockRuletas = [
        { ruletaId: 1, nombre: 'Ruleta Clásica' },
        { ruletaId: 2, nombre: 'Ruleta VIP' },
    ];

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

        let filtered = [...this.mockGiros];
        if (this.filtro.clienteId) {
            filtered = filtered.filter(g => g.clienteId === this.filtro.clienteId);
        }
        if (this.filtro.tarjetaId) {
            filtered = filtered.filter(g => g.tarjetaId === this.filtro.tarjetaId);
        }
        if (this.filtro.ruletaId) {
            filtered = filtered.filter(g => g.ruletaId === this.filtro.ruletaId);
        }

        const content = filtered.slice(page * size, (page + 1) * size);

        of({ data: { content, totalElements: filtered.length } }).subscribe({
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
        of({ data: { content: this.mockClientes } }).subscribe(resp => {
            const opciones = resp.data.content.map(c => ({ label: c.persona.nombre + ' ' + c.persona.apellido, value: c.clienteId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'clienteId' ? { ...f, options: opciones } : f);
        });

        of({ data: { content: this.mockTarjetas } }).subscribe(resp => {
            const opciones = resp.data.content.map(t => ({ label: t.categoriaNombre, value: t.id }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'tarjetaId' ? { ...f, options: opciones } : f);
        });

        of({ data: { content: this.mockRuletas } }).subscribe(resp => {
            const opciones = resp.data.content.map(r => ({ label: r.nombre, value: r.ruletaId }));
            this.filtrosFields = this.filtrosFields.map(f => f.key === 'ruletaId' ? { ...f, options: opciones } : f);
        });
    }
}