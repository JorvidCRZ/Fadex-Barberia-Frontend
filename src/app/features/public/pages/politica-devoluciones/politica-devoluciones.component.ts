import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfiguracionService } from '../../../../core/services/common/configuracion.service';

@Component({
  selector: 'app-politica-devoluciones',
  imports: [RouterLink],
  templateUrl: './politica-devoluciones.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliticaDevolucionesComponent {
  readonly configuracion = inject(ConfiguracionService);

  constructor() {
    this.configuracion.cargarConfiguracion();
  }
}
