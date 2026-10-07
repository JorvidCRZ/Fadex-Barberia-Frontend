import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MiResumenComponent } from './mi-resumen/mi-resumen.component';
import { MisPremiosComponent } from './mis-premios/mis-premios.component';
import { MisTarjetasComponent } from './mis-tarjetas/mis-tarjetas.component';
import { MiHistorialComponent } from './mi-historial/mi-historial.component';
import { FIDELIZACION_CLIENTE_TABS } from '../../../../core/config/tabs.config';

@Component({
  selector: 'app-fidelizacion',
  imports: [CommonModule, TabsModule, MiResumenComponent, MisTarjetasComponent, MiHistorialComponent, MisPremiosComponent],
  templateUrl: './fidelizacion.html'
})
export class FidelizacionComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab = 'resumen';
  tabs = FIDELIZACION_CLIENTE_TABS;

  constructor() {
    this.route.queryParams.subscribe(params => { this.activeTab = params['tab'] || 'resumen'; });
  }

  onTabChange(tab: string | number | undefined): void {
    if (tab === undefined || tab === null) return;
    this.router.navigate([], { relativeTo: this.route, queryParams: { tab: String(tab) }, queryParamsHandling: 'merge', replaceUrl: true, });
  }
}