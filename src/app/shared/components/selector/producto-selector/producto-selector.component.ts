import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SolesPipe } from '../../../pipes/moneda.pipe';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { SafeImageUrlPipe } from '../../../pipes/safe-image-url.pipe';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { Producto } from '../../../../core/models/catalogos/productos.model';
import { ProductoService } from '../../../../core/services/catalogos/producto.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';

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