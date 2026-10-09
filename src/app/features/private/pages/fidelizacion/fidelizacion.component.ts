import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { FIDELIZACION_CLIENTE_TABS } from '../../../../core/config/tabs.config';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MiHistorialComponent } from './mi-historial/mi-historial.component';
import { MiResumenComponent } from './mi-resumen/mi-resumen.component';
import { MisPremiosComponent } from './mis-premios/mis-premios.component';
import { MisTarjetasComponent } from './mis-tarjetas/mis-tarjetas.component';

@Component({
  selector: 'app-fidelizacion',
  standalone: true,
  imports: [NgClass, TabsModule, PageHeaderComponent, MiResumenComponent, MisTarjetasComponent, MiHistorialComponent, MisPremiosComponent],
  templateUrl: './fidelizacion.html',
})
export class FidelizacionComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTab = 'resumen';
  readonly tabs = FIDELIZACION_CLIENTE_TABS;

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.activeTab = params['tab'] || 'resumen';
    });
  }

  onTabChange(tab: string | number | undefined): void {
    if (tab === undefined || tab === null) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: String(tab) },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
