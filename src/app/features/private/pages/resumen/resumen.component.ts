import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ResumenCliente } from '../../../../core/services/gestion/resumen-cliente.service';
import { ClienteDetalleResumenDTO, ServicioResponseDTO } from '../../../../core/models/gestion/cliente/ClienteResumen.model';
import { environment } from '../../../../../environments/environment';
import { HISTORIAL_RECIENTE_MOCK, PROXIMAS_CITAS_MOCK, RESUMEN_CLIENTE_MOCK } from '../../../../core/config/privado-mock.config';
import { TokenService } from '../../../../core/services/auth/token.service';

interface CitaResumen {
  reservaId: number;
  fecha: string;
  hora: string;
  servicio: string;
  barbero: string;
  estado: string;
  monto: number | string;
}

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.html',
  styleUrl: './resumen.scss',
})
export class ResumenComponent implements OnInit {
  private svc    = inject(ResumenCliente);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  username          = '';
  proximasCitas:    CitaResumen[] = [];
  historialReciente: CitaResumen[] = [];
  kpis:             ClienteDetalleResumenDTO | null = null;
  loading           = true;
  error             = '';

 ngOnInit(): void {
  this.username = this.tokenService.getUserDisplayName() || 'Cliente Demo';

  if (environment.useMockData) {
    this.proximasCitas = PROXIMAS_CITAS_MOCK.map(r => this.mapCita(r));
    this.historialReciente = HISTORIAL_RECIENTE_MOCK.map(r => this.mapCita(r));
    this.kpis = RESUMEN_CLIENTE_MOCK;
    this.loading = false;
    return;
  }

  this.svc.cargarDashboard().subscribe({
    next: ({ proximasCitas, historialReciente, kpis }) => {
this.proximasCitas = proximasCitas.map((r: any) => ({
  reservaId: r.reservaId,
  fecha:     r.fecha,
  hora:      r.horaInicio?.substring(0, 5) ?? '--',
  servicio:  r.servicio ?? '—',
  barbero:   r.barberoNombre ?? '—',
  estado:    r.estadoReserva,
  monto:     r.tipoReserva === 'RESERVA_GRATIS' ? 'Gratis' : (r.total ?? '—'),
}));

this.historialReciente = historialReciente.map((r: any) => ({
  reservaId: r.reservaId,
  fecha:     r.fecha,
  hora:      r.horaInicio?.substring(0, 5) ?? '--',
  servicio:  r.servicio ?? '—',
  barbero:   r.barberoNombre ?? '—',
  estado:    r.estadoReserva,
  monto:     r.tipoReserva === 'RESERVA_GRATIS' ? 'Gratis' : (r.total ?? '—'),
}));

      this.kpis    = kpis;
      this.loading = false;
    },
    error: (err) => {
      console.error('ERROR DASHBOARD:', err);
      this.error   = 'Error al cargar el dashboard. Intenta nuevamente.';
      this.loading = false;
    },
  });
}

  private mapCita(r: {
    reservaId: number;
    fecha: string;
    horaInicio: string;
    servicio: string;
    barberoNombre: string;
    estado: string;
    total: number;
    tipoReserva: string;
  }): CitaResumen {
    return {
      reservaId: r.reservaId,
      fecha: r.fecha,
      hora: r.horaInicio?.substring(0, 5) ?? '--',
      servicio: r.servicio,
      barbero: r.barberoNombre,
      estado: r.estado,
      monto: r.tipoReserva === 'RESERVA_GRATIS' ? 'Gratis' : r.total,
    };
  }
  onVerDetalle(id: number)  { this.router.navigate(['/mi-cuenta/reservas', id]); }
  onVerHistorial()          { this.router.navigate(['/mi-cuenta/historial']); }
  onReservar(s: ServicioResponseDTO) {
    this.router.navigate(['/mi-cuenta/reservar'], { queryParams: { servicioId: s.servicioId } });
  }

formatFechaCorta(fecha: string): string {
  if (!fecha || fecha === 'Sin visitas') return '—';
  const d = new Date(fecha.includes('T') ? fecha : fecha + 'T00:00:00');
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
}

formatFechaCita(fecha: string): string {
  if (!fecha || fecha === 'Sin visitas') return '—';
  const d = new Date(fecha.includes('T') ? fecha : fecha + 'T00:00:00');
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' });
}

formatFechaTabla(fecha: string): string {
  if (!fecha) return '--';
  const d = new Date(fecha.includes('T') ? fecha : fecha + 'T00:00:00');
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}

formatUltimaVisita(fecha: string): string {
  if (!fecha || fecha === 'Sin visitas') return 'Sin visitas';
  
  const d = new Date(fecha.includes('T') ? fecha : fecha + 'T00:00:00');
  if (isNaN(d.getTime())) return 'Sin visitas';
  
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  
  const dias = Math.floor((hoy.getTime() - d.getTime()) / 86400000);
  
  if (dias < 0)  return 'Reciente';
  if (dias === 0) return 'Hoy';
  if (dias === 1) return 'Ayer';
  if (dias < 30)  return `Hace ${dias} días`;
  const meses = Math.floor(dias / 30);
  return `Hace ${meses} mes${meses > 1 ? 'es' : ''}`;
}

}