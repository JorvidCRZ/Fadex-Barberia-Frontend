import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfiguracionService } from '../../../../core/services/common/configuracion.service';

@Component({
  selector: 'app-politica-privacidad',
  imports: [RouterLink],
  templateUrl: './politica-privacidad.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliticaPrivacidadComponent {
  private readonly configuracionService = inject(ConfiguracionService);
  readonly politicaPrivacidad = this.configuracionService.politicaPrivacidad;
}