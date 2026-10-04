import { Component, inject} from '@angular/core';
import { ConfiguracionService } from '../../../core/services/common/configuracion.service';

@Component({
  selector: 'app-boton-comunicacion',
  imports: [],
  templateUrl: './boton-comunicacion.html',
  styleUrl: './boton-comunicacion.scss',
})
export class BotonComunicacionComponent {
  private configService = inject(ConfiguracionService);
  whatsappUrl = this.configService.whatsapp;
}
