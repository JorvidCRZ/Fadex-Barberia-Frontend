import { DecimalPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FidelizacionTarjetaResponse } from '@/app/core/models/fidelizacion/tarjeta.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ProgresoBarraComponent } from '@/app/shared/components/tarjeta/pogreso-barra.component';
import { progresoPct, puedeCanjear, slots, tieneMeta } from '../tarjeta.utils.component';

@Component({
  standalone: true,
  selector: 'app-tarjeta-cliente',
  imports: [NgClass, DecimalPipe, ButtonComponent, ProgresoBarraComponent],
  templateUrl: './tarjeta-cliente.html',
})
export class TarjetaClienteComponent {
  @Input({ required: true }) tarjeta!: FidelizacionTarjetaResponse;
  @Output() verRuleta = new EventEmitter<FidelizacionTarjetaResponse>();

  expandida = signal(false);

  readonly tieneMeta = tieneMeta;
  readonly progresoPct = progresoPct;
  readonly slots = slots;
  readonly puedeCanjear = puedeCanjear;
  @Input() soloLectura = false;

}