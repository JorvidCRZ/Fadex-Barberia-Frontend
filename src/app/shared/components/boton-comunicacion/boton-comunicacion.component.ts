import { Component, inject} from '@angular/core';
import { ConfiguracionService } from '../../../core/services/common/configuracion.service';

@Component({
  selector: 'app-boton-comunicacion',
  imports: [],
  template: `
  @if (whatsappUrl()) {
    <a [href]="whatsappUrl()" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp" class="fixed bottom-40 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:scale-110 hover:bg-green-600">
      <i class="pi pi-whatsapp text-3xl text-white" aria-hidden="true"></i>
    </a>
  }
  `,
  styleUrl: './boton-comunicacion.scss',
})
export class BotonComunicacionComponent {
  private configService = inject(ConfiguracionService);
  whatsappUrl = this.configService.whatsapp;
}
