import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CitaBarberoResponseDTO } from '@/app/core/models/gestion/admin/resumen-admin';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-citas-table',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, StatusBadgeComponent],
  template: `
    <div class="relative w-full overflow-x-auto">
      <table class="w-full border-collapse" style="min-width: 800px">
        <thead>
          <tr class="table-header">
            <th class="px-4 py-3 text-center">Cliente</th>
            <th class="px-4 py-3 text-center">Hora</th>
            <th class="px-4 py-3 text-center">Servicio</th>
            <th class="px-4 py-3 text-center">Tipo</th>
            <th class="px-4 py-3 text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          @if (loading) {
            <tr>
              <td colspan="5" class="py-8">
                <app-empty-state tipo="cargando" mensaje="Cargando citas..." />
              </td>
            </tr>
          } @else if (citas.length === 0) {
            <tr>
              <td colspan="5" class="py-8">
                <app-empty-state icono="pi-calendar" mensaje="No hay citas programadas para hoy" />
              </td>
            </tr>
          } @else {
            @for (cita of citas; track cita.idReserva) {
              <tr class="table-row border-b border-ui-border-soft last:border-0">
                <td class="whitespace-nowrap px-4 py-3 text-center">
                  <div class="flex flex-col items-center leading-tight">
                    <span class="text-base font-medium text-text-primary">{{ nombreCompleto(cita) }}</span>
                    @if (cita.telefonoCliente) {
                      <span class="mt-0.5 text-sm text-text-subtle">
                        <i class="pi pi-phone mr-1 text-xs" aria-hidden="true"></i>{{ cita.telefonoCliente }}
                      </span>
                    }
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-center text-base font-medium text-text-primary">
                  <i class="pi pi-clock mr-1.5 text-sm text-brand-gold" aria-hidden="true"></i>{{ hora(cita) }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-center text-base text-text-primary">
                  @if (servicioResumen(cita); as servicios) {
                    <i class="pi pi-scissors mr-1.5 text-sm text-brand-gold" aria-hidden="true"></i>{{ servicios }}
                  } @else {
                    <span class="text-text-subtle"></span>
                  }
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-center">
                  <app-status-badge type="text" [value]="cita.tipoReserva" />
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-center">
                  <app-status-badge type="text" [value]="cita.estado" />
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
})
export class CitasTableComponent {
  @Input() citas: CitaBarberoResponseDTO[] = [];
  @Input() loading = false;

  nombreCompleto(cita: CitaBarberoResponseDTO): string {
    return `${cita.nombreCliente} ${cita.apellidoCliente}`.trim();
  }

  hora(cita: CitaBarberoResponseDTO): string {
    return (cita.horaInicio ?? '').substring(0, 5);
  }

  servicioResumen(cita: CitaBarberoResponseDTO): string {
    const c = cita as any;
    if (typeof c.servicioResumen === 'string' && c.servicioResumen) return c.servicioResumen;
    return (c.servicios ?? []).map((s: any) => (typeof s === 'string' ? s : s?.servicioNombre || s?.nombreCorte || s?.nombre)).filter(Boolean).join(', ');
  }
}