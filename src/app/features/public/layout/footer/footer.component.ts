import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PUBLIC_PAGES } from '../../../../core/config/sites.config';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent, ButtonModule],
  templateUrl: './footer.html',
})
export class FooterComponent {
  publicNav = PUBLIC_PAGES;

  servicios = ['Corte clásico', 'Fade / degradado', 'Arreglo de barba', 'Afeitado premium'];

  contacto = [
    { texto: '+51 969 329 494', ruta: '/reclamos' },
    { texto: 'Lima, Perú', ruta: '/nosotros' },
    { texto: 'Lun - Sáb: 10:00 - 21:00', ruta: '/servicios' },
  ];

  redesSociales = [
    { icono: 'pi pi-instagram', url: '#', label: 'Instagram' },
    { icono: 'pi pi-facebook', url: '#', label: 'Facebook' },
  ];
}
