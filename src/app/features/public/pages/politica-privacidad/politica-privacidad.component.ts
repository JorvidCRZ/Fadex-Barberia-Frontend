import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politica-privacidad',
  imports: [RouterLink],
  templateUrl: './politica-privacidad.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliticaPrivacidadComponent {}
