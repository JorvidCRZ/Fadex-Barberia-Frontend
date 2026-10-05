import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terminos-condiciones',
  imports: [RouterLink],
  templateUrl: './terminos-condiciones.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminosCondicionesComponent {}
