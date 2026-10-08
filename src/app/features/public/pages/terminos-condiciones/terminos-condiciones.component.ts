import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfiguracionService } from '../../../../core/services/common/configuracion.service';

@Component({
  selector: 'app-terminos-condiciones',
  imports: [RouterLink],
  templateUrl: './terminos-condiciones.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminosCondicionesComponent {
  readonly configuracion = inject(ConfiguracionService);

  constructor() {
    this.configuracion.cargarConfiguracion();
  }
}
