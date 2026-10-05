
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoriaTipo } from '../../../core/models/catalogos/categorias.model';
import { EstadoRecompensa } from '../../../core/models/ruleta/recompensa.model';
import { TipoPremio } from '../../../core/models/ruleta/ruleta-item.model';
import { Origen } from '../../../core/models/fidelizacion/movimiento.model';
import { TipoAlcanceFidelizacion } from '../../../core/models/fidelizacion/regla.model';
import { EstadoReclamo, TipoReclamacion } from '../../../core/models/operaciones/reclamos-model/reclamo.enum.model';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule],
  template: `<span [ngClass]="badgeClass">{{ label }}</span>`,
})
export class StatusBadgeComponent {
  @Input({ required: true }) value!: boolean | string | number;
  @Input() type: 'boolean' | 'text' | 'range' | 'array' | 'category' = 'boolean';
  @Input() trueLabel: string = 'Activo';
  @Input() falseLabel: string = 'Inactivo';
  @Input() warningLimit: number = 10;
  @Input() customClass?: string;


  get label(): string {
    if (this.type === 'category') {
      const value = String(this.value);
      if (value === CategoriaTipo.PRODUCTO) return 'estado-producto';
      if (value === CategoriaTipo.SERVICIO) return 'estado-servicio';
      return 'estado-default';
    }

    if (this.type === 'boolean') { return Boolean(this.value) ? this.trueLabel : this.falseLabel; }
    return String(this.value);
  }

  get badgeClass(): string {
    if (this.customClass) {
      return this.customClass;
    }
    switch (this.type) {
      case 'boolean': return Boolean(this.value) ? 'badge-activo' : 'badge-inactivo';
      case 'text': {
        const estado = String(this.value).toLowerCase();
        const clases: Record<string, string> = {
          producto: 'estado-producto',
          servicio: 'estado-servicio',
          
          [EstadoRecompensa.PENDIENTE.toLowerCase()]: 'estado-pendiente',
          [EstadoRecompensa.CANJEADO.toLowerCase()]: 'estado-ajuste',
          [EstadoRecompensa.VENCIDO.toLowerCase()]: 'estado-reclamo-cerrado',
          [EstadoRecompensa.ANULADO.toLowerCase()]: 'estado-reclamo-anulado',

          [Origen.VENTA.toLowerCase()]: 'estado-venta',
          [Origen.RESERVA.toLowerCase()]: 'estado-reserva',
          [Origen.AJUSTE.toLowerCase()]: 'estado-ajuste',
          
          [TipoPremio.PRODUCTO.toLowerCase()]: 'estado-producto',
          [TipoPremio.SERVICIO.toLowerCase()]: 'estado-servicio',
          [TipoPremio.DESCUENTO.toLowerCase()]: 'estado-descuento',
          [TipoPremio.CUPON.toLowerCase()]: 'estado-cupon',
          [TipoPremio.SIN_PREMIO.toLowerCase()]: 'estado-sin-premio',

          [TipoAlcanceFidelizacion.CATEGORIA.toLowerCase()]: 'estado-categoria',
          [TipoAlcanceFidelizacion.SERVICIO.toLowerCase()]: 'estado-servicio',
          [TipoAlcanceFidelizacion.PRODUCTO.toLowerCase()]: 'estado-producto',
          [TipoAlcanceFidelizacion.COMBO.toLowerCase()]: 'estado-combo',

          confirmada: 'estado-confirmada',
          finalizada: 'estado-finalizada',
          cancelada: 'estado-cancelada',
          no_asistio: 'estado-no_asistio',

          activa: 'estado-activa',
          anulado: 'estado-anulado',
          anulada: 'estado-anulado',
          emitido: 'estado-emitido',
          emitida: 'estado-emitido',

          // EstadoReclamo
          [EstadoReclamo.ABIERTO.toLowerCase()]: 'estado-reclamo-abierto',
          [EstadoReclamo.EN_PROCESO.toLowerCase()]: 'estado-reclamo-en-proceso',
          [EstadoReclamo.RESUELTO.toLowerCase()]: 'estado-reclamo-resuelto',
          [EstadoReclamo.CERRADO.toLowerCase()]: 'estado-reclamo-cerrado',
          [EstadoReclamo.ANULADO.toLowerCase()]: 'estado-reclamo-anulado',

          // TipoReclamacion
          [TipoReclamacion.RECLAMO.toLowerCase()]: 'tipo-reclamacion-reclamo',
          [TipoReclamacion.QUEJA.toLowerCase()]: 'tipo-reclamacion-queja',
        };

        return `badge-text ${clases[estado] || 'estado-default'}`;
      }

      case 'array':
        return 'badge-rol';

      case 'range': {
        const num = Number(this.value);

        if (num === 0) return 'badge-stock-cero';
        if (num <= this.warningLimit) return 'badge-stock-bajo';

        return 'badge-stock-ok';
      }

      default:
        return 'badge-base';
    }

  }
}
