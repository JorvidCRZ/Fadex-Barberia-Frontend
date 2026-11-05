import { Component, Input } from '@angular/core';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { Reserva } from '@/app/core/models/operaciones/Reserva.model';

/**
 * Ficha de reserva (solo presentación). Se usa dentro de <app-modal>:
 *   <app-reserva-detalle [reserva]="reservaSeleccionada" />
 */
@Component({
  selector: 'app-reserva-detalle',
  standalone: true,
  imports: [StatusBadgeComponent, DateFormatPipe, MonedaPipe],
  template: `
    <div class="flex flex-col gap-4 pt-4 pb-1">

      <div class="flex items-center justify-between gap-3 rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/15 to-brand-gold/5 p-4">
        <div class="flex items-center gap-3">
          <div class="flex size-11 items-center justify-center rounded-xl border border-brand-gold/35 bg-brand-gold/10 text-brand-gold">
            <i class="pi pi-calendar" aria-hidden="true"></i>
          </div>
          <div>
            <p class="m-0 text-[11px] font-semibold uppercase tracking-widest text-text-muted">Fecha de reserva</p>
            <p class="m-0 text-lg font-bold tracking-wide text-brand-gold">{{ reserva.fecha | dateHelper }}</p>
          </div>
        </div>
        <app-status-badge type="text" [value]="reserva.estadoReserva || 'Sin estado'" />
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        @for (campo of campos; track campo.label) {
          <div class="flex items-center gap-3 rounded-xl border border-ui-border-soft bg-ui-black/45 p-3 transition-colors hover:border-brand-gold/35">
            <i [class]="'pi ' + campo.icono + ' text-brand-gold'" aria-hidden="true"></i>
            <div class="min-w-0">
              <p class="m-0 text-[11px] font-semibold uppercase tracking-widest text-text-muted">{{ campo.label }}</p>
              <p class="m-0 truncate text-sm font-semibold"
                 [class]="campo.destacado ? 'text-brand-gold' : 'text-text-primary'">{{ campo.valor }}</p>
            </div>
          </div>
        }
      </div>

      <h3 class="m-0 border-b border-ui-border-soft pb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">Detalle</h3>
      <div class="flex items-center justify-between gap-4 rounded-xl border border-ui-border-soft bg-ui-black/45 p-3">
        <div class="flex min-w-0 items-center gap-3">
          <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
            <i class="pi pi-scissors text-sm" aria-hidden="true"></i>
          </div>
          <div class="min-w-0">
            <p class="m-0 truncate text-sm font-semibold text-text-primary">{{ reserva.servicio || 'N/A' }}</p>
            <p class="m-0 text-xs text-text-muted">Servicio</p>
          </div>
        </div>
        <span class="whitespace-nowrap font-bold text-brand-gold">{{ reserva.total | moneda }}</span>
      </div>

      @if (reserva.recordatorioEnviado) {
        <div class="flex items-center justify-center gap-2 rounded-xl border border-success/30 bg-success/10 px-3 py-2 text-sm font-semibold text-success">
          <i class="pi pi-whatsapp" aria-hidden="true"></i>
          Recordatorio enviado por WhatsApp
        </div>
      }

      <div class="flex items-center justify-between rounded-2xl border border-brand-gold/40 bg-brand-gold/10 px-4 py-3">
        <span class="text-xs font-bold uppercase tracking-widest text-text-secondary">Total</span>
        <span class="text-2xl font-extrabold text-brand-gold">{{ reserva.total | moneda }}</span>
      </div>
    </div>
  `,
})
export class ReservaDetalleComponent {
  @Input({ required: true }) reserva!: Reserva;

  get campos() {
    const r = this.reserva;
    const virtual = r.tipoReserva === 'RESERVA_VIRTUAL';
    return [
      { icono: 'pi-user', label: 'Cliente', valor: r.clienteNombre || 'N/A' },
      { icono: 'pi-id-card', label: 'Barbero', valor: r.barberoNombre || 'N/A' },
      { icono: 'pi-clock', label: 'Horario', valor: `${r.horaInicio} - ${r.horaFin}` },
      { icono: virtual ? 'pi-globe' : 'pi-map-marker', label: 'Tipo', valor: virtual ? 'Virtual' : 'Gratis', destacado: true },
    ];
  }
}