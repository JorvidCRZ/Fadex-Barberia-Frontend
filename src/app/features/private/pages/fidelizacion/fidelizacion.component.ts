import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MisPremiosComponent } from './mis-premios/mis-premios.component';
import { MisTarjetasComponent } from './mis-tarjetas/mis-tarjetas.component';

@Component({
  selector: 'app-fidelizacion',
  standalone: true,
  imports: [PageHeaderComponent, MisTarjetasComponent, MisPremiosComponent],
  templateUrl: './fidelizacion.html',
})
export class FidelizacionComponent {}