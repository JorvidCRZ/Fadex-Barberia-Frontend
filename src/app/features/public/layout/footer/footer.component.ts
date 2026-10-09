import { Component, computed, inject } from '@angular/core';
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
  private readonly configuracionService = inject(ConfiguracionService);
  readonly nombreEmpresa = this.configuracionService.nombre;
  publicNav = PUBLIC_PAGES;

  servicios = ['Corte clásico', 'Fade / degradado', 'Arreglo de barba', 'Afeitado premium'];

  contacto = computed(() => [
    { texto: this.configuracionService.telefono() || '+51 969 329 494', ruta: '/reclamos' },
    { texto: this.configuracionService.direccion() || 'Lima, Perú', ruta: '/nosotros' },
    { texto: 'Lun - Sáb: 10:00 - 21:00', ruta: '/servicios' },
  ]);

  redesSociales = [
    { icono: 'pi pi-instagram', url: '#', label: 'Instagram' },
    { icono: 'pi pi-facebook', url: '#', label: 'Facebook' },
  ];
}