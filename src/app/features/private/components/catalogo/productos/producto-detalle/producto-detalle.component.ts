import { Component, Input, OnChanges } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';
import { Producto } from '@/app/core/models/catalogos/productos.model';
import { INVENTARIO_CONFIG } from '@/app/core/config/valores.config';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [ImageModule, StatusBadgeComponent, SafeImageUrlPipe, SolesPipe],
  templateUrl: './producto-detalle.html'
})
export class ProductoDetalleComponent implements OnChanges {
  @Input({ required: true }) producto!: Producto;

  readonly stockMinimo = INVENTARIO_CONFIG.STOCK_MINIMO_GLOBAL;
  activa = 0;

  get imagenes(): string[] {
    return this.producto?.urlsMultimedia ?? [];
  }

  get imagenActual(): string | undefined {
    return this.imagenes[this.activa] ?? this.imagenes[0];
  }

  ngOnChanges(): void {
    this.activa = 0;
  }

  seleccionar(index: number): void {
    this.activa = index;
  }
}