import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { ReglasComponent } from './reglas/reglas.component';
import { FIDELIZACION_ADMIN_TABS } from '@/app/core/config/tabs.config';
import { ActivatedRoute, Router } from '@angular/router';
import { TarjetasComponent } from './tarjetas/tarjetas.component';

@Component({
    selector: 'app-fidelizacion-admin',
    standalone: true,
    imports: [CommonModule, TabsModule, ReglasComponent, TarjetasComponent],
    templateUrl: './fidelizacion.html', 
})
export class FidelizacionAdminComponent {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    activeTab = 'reglas';
    tabs = FIDELIZACION_ADMIN_TABS;

    constructor() {
        this.route.queryParams.subscribe(params => { this.activeTab = params['tab'] || 'reglas'; });
    }

    onTabChange(tab: string | number | undefined): void {
        if (tab === undefined || tab === null) return;
        this.router.navigate([], { relativeTo: this.route, queryParams: { tab: String(tab) }, queryParamsHandling: 'merge', replaceUrl: true, });
    }
}