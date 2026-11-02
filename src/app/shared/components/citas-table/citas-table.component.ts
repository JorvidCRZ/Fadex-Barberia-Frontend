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
    <div class="citas-table-wrapper">
      <table class="citas-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Hora</th>
            <th>Servicio</th>
            <th>Tipo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          @if (loading) {
            <tr>
              <td colspan="5" class="citas-table__empty">
                <app-empty-state tipo="cargando" mensaje="Cargando citas..." />
              </td>
            </tr>
          } @else if (citas.length === 0) {
            <tr>
              <td colspan="5" class="citas-table__empty">
                <app-empty-state icono="pi-calendar" mensaje="No hay citas programadas para hoy" />
              </td>
            </tr>
          } @else {
            @for (cita of citas; track cita.idReserva) {
              <tr>
                <td>
                  <div class="cliente-nombre">{{ nombreCompleto(cita) }}</div>
                  <div class="cliente-tel">
                    <i class="pi pi-phone mr-1" aria-hidden="true"></i>{{ cita.telefonoCliente }}
                  </div>
                </td>
                <td>
                  <span class="hora">
                    <i class="pi pi-clock mr-1" aria-hidden="true"></i>{{ cita.horaInicio }}
                  </span>
                </td>
                <td>
                  <span class="badge-base servicio-badge">
                    <i class="pi pi-scissors mr-1" aria-hidden="true"></i>{{ servicioResumen(cita) }}
                  </span>
                </td>
                <td>
                  <app-status-badge type="text" [value]="cita.tipoReserva" />
                </td>
                <td>
                  <app-status-badge type="text" [value]="cita.estado" />
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .citas-table-wrapper { overflow-x: auto; }
    .citas-table { width: 100%; border-collapse: collapse; }
    .citas-table thead tr { border-bottom: 1px solid rgb(var(--color-ui-border-soft)); }
    .citas-table th {
      padding: 0.65rem 0.8rem;
      color: var(--color-text-muted);
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-align: left;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .citas-table td {
      padding: 0.75rem 0.8rem;
      border-bottom: 1px solid rgb(var(--color-ui-border-soft));
      color: rgb(var(--color-text-primary));
      font-size: 0.78rem;
      white-space: nowrap;
    }
    .citas-table tbody tr:last-child td { border-bottom: 0; }
    .citas-table tbody tr:hover td { background: rgba(255, 255, 255, 0.02); }
    .citas-table__empty { padding: 2rem 1rem !important; text-align: center; }
    .cliente-nombre { color: rgb(var(--color-brand-white)); font-weight: 600; }
    .cliente-tel { color: var(--color-text-muted); font-size: 0.68rem; margin-top: 0.2rem; }
    .hora { color: rgb(var(--color-brand-white)); font-weight: 500; }
  `,
})
export class CitasTableComponent {
  @Input() citas: CitaBarberoResponseDTO[] = [];
  @Input() loading = false;

  nombreCompleto(cita: CitaBarberoResponseDTO): string {
    return `${cita.nombreCliente} ${cita.apellidoCliente}`.trim();
  }

  servicioResumen(cita: CitaBarberoResponseDTO): string {
    return cita.servicios.map((servicio) => servicio.servicioNombre).filter(Boolean).join(', ') || '—';
  }
}
