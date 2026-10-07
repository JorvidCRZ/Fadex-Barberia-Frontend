import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Servicio } from '@/app/core/models/catalogos/servicios.model';
import { ServicioService } from '@/app/core/services/catalogos/servicio.service';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { ImageModule } from 'primeng/image';

@Component({
    standalone: true,
    selector: 'app-servicio-selector',
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, SearchBarComponent,SafeImageUrlPipe , SolesPipe, ImageModule],
    templateUrl: './servicio-selector.html'
})
export class ServicioSelectorComponent implements OnInit {
    @Input() servicioId?: number;
    @Output() seleccionar = new EventEmitter<Servicio>();

    private servicioService = inject(ServicioService);
    private cd = inject(ChangeDetectorRef);

    servicios: Servicio[] = [];
    totalRecords = 0;
    loading = false;
    rows = 5;
    textoBusqueda = '';

    ngOnInit(): void {
        this.cargarServicios(0, this.rows);
    }

    cargarServicios(page: number, size: number) {
        this.loading = true;
        this.servicioService.obtenerServiciosConFiltro({ page, size, nombre: this.textoBusqueda, estado: true, publicado: true, sort: 'servicioId,asc' }).subscribe({
            next: (resp) => {
                this.servicios = resp.data.content;
                this.totalRecords = resp.data.totalElements;
                this.loading = false;
                this.cd.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cd.detectChanges();
            }
        });
    }

    buscar(nombre: string) {
        this.textoBusqueda = nombre;
        this.cargarServicios(0, this.rows);
    }

    onLazyLoad(event: TableLazyLoadEvent) {
        const page = Math.floor((event.first ?? 0) / (event.rows ?? this.rows));
        this.cargarServicios(page, event.rows ?? this.rows);
    }

    seleccionarServicio(servicio: Servicio) {
        this.servicioId = servicio.servicioId;
        this.seleccionar.emit(servicio);
    }
}