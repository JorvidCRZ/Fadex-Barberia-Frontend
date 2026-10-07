import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { Producto } from '@/app/core/models/catalogos/productos.model';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';

@Component({
    standalone: true,
    selector: 'app-producto-selector',
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, ImageModule, SearchBarComponent, SafeImageUrlPipe, SolesPipe],
    templateUrl: './producto-selector.html',
})
export class ProductoSelectorComponent implements OnInit {

    @Input() productoId?: number;
    @Output() seleccionar = new EventEmitter<Producto>();
    private productoService = inject(ProductoService);
    private cd = inject(ChangeDetectorRef);
    productos: Producto[] = [];
    totalRecords = 0;
    loading = false;
    textoBusqueda = '';
    rows = 5;

    ngOnInit() {
        this.cargarProductos(0, this.rows);
    }

    cargarProductos(page: number, size: number) {
        this.loading = true;
        this.productoService.obtenerProductosConFiltro({ page, size, nombre: this.textoBusqueda, estado: true, publicado: true, sort: 'id,asc' }).subscribe({
            next: (resp) => {
                this.productos = resp.data.content;
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
        this.cargarProductos(0, this.rows);
    }

    onLazyLoad(event: TableLazyLoadEvent) {
        const page = Math.floor((event.first ?? 0) / (event.rows ?? 5));
        this.cargarProductos(page, event.rows ?? 5);
    }

    seleccionarProducto(producto: Producto) {
        this.productoId = producto.id;
        this.seleccionar.emit(producto);
    }

}