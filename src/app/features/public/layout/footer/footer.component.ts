import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PUBLIC_PAGES } from '../../../../core/config/sites.config';
import { ConfiguracionService } from '../../../../core/services/common/configuracion.service';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent, ButtonModule],
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly configuracionService = inject(ConfiguracionService);
  publicNav = PUBLIC_PAGES;

  servicios = ['Corte clásico', 'Fade / degradado', 'Arreglo de barba', 'Afeitado premium'];

  constructor() {
    this.configuracionService.cargarConfiguracion();
  }

  redesSociales = [
    { icono: 'pi pi-instagram', url: '#', label: 'Instagram' },
    { icono: 'pi pi-facebook', url: '#', label: 'Facebook' },
  ];
}
