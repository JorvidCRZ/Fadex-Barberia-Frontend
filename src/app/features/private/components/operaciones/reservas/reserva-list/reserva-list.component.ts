import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PaginatorState } from 'primeng/paginator';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { FILTROS_RESERVA } from '@/app/core/config/filtros.config';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { Reserva, ReservaFiltro } from '@/app/core/models/operaciones/Reserva.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { CalendarReservas } from '../reserva-calendar/reserva-calendar.component';
import { ReservaDetalleComponent } from '../reservas-detalle/reserva-detalle.component';
import { ReservarComponent } from '@/app/features/private/pages/reservar/reservar.component';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [
    TableModule, CalendarReservas, ReservaDetalleComponent, ReservarComponent,
    ButtonComponent, EmptyStateComponent, FiltrosComponent, ModalComponent, PageHeaderComponent,
    PaginatorComponent, SearchBarComponent, StatsComponent, StatusBadgeComponent, DateFormatPipe,
  ],
  templateUrl: './reserva-list.html',
})
export class ReservaList implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private notify = inject(NotificationService);
  private reservaService = inject(ReservaService);

  reservas: Reserva[] = [];
  stats: StatsCard[] = [];
  filtro: Partial<ReservaFiltro> = {};
  filtrosFields = [...FILTROS_RESERVA];
  reservaSeleccionada: Reserva | null = null;
  cargado = false;
  totalRecords = 0;
  rows = 10;
  first = 0;
  showDetalle = false;
  mostrarCalendario = false;
  mostrarFormulario = false;
  resetFormTrigger = 0;
  icono = 'pi-calendar';
  texto = 'Reservas';

  get hayFiltros(): boolean {
    return Object.values(this.filtro).some(v => v !== null && v !== undefined && v !== '');
  }

  ngOnInit(): void {
    this.cargarReservas(0, this.rows);
    if (this.route.snapshot.queryParamMap.has('nueva')) { this.abrirCrear(); }
  }

  cargarReservas(page: number, size: number): void {
    this.first = page * size;
    this.cargado = false;
    this.reservaService.obtenerReservas({ ...this.filtro, page, size, sort: 'fecha,desc' }).subscribe({
      next: (resp) => {
        this.reservas = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.actualizarStats();
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargado = true;
        this.cd.detectChanges();
      },
    });
  }

  private actualizarStats(): void {
    const cuenta = (...estados: string[]) =>
      this.reservas.filter(r => estados.includes(r.estadoReserva ?? '')).length;
    this.stats = [
      {
        title: 'Total reservas',
        value: this.totalRecords,
        icon: 'pi pi-calendar',
        description: this.hayFiltros ? 'Según los filtros aplicados' : 'Registradas en el sistema',
      },
      {
        title: 'Confirmadas',
        value: cuenta('CONFIRMADA'),
        icon: 'pi pi-check-circle',
        description: 'En esta página',
        accentClass: 'bg-success',
        iconBgClass: 'bg-success/10',
        accentTextClass: 'text-success',
      },
      {
        title: 'Pendientes de pago',
        value: cuenta('PENDIENTE_PAGO', 'PENDIENTE'),
        icon: 'pi pi-clock',
        description: 'En esta página',
        accentClass: 'bg-warning',
        iconBgClass: 'bg-warning/10',
        accentTextClass: 'text-warning',
      },
      {
        title: 'Finalizadas',
        value: cuenta('FINALIZADA'),
        icon: 'pi pi-verified',
        description: 'En esta página',
        accentClass: 'bg-info',
        iconBgClass: 'bg-info/10',
        accentTextClass: 'text-info',
      },
    ];
  }

  // ---------- Búsqueda, filtros y paginación ----------

  buscarCliente(nombre: string): void {
    this.filtro.clienteNombre = nombre;
    this.cargarReservas(0, this.rows);
  }

  onBuscar(filtros: Partial<ReservaFiltro>): void {
    this.filtro = { ...this.filtro, ...filtros };
    this.cargarReservas(0, this.rows);
  }

  onLimpiar(): void {
    this.filtro = {};
    this.cargarReservas(0, this.rows);
  }

  onPageChange(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.cargarReservas(Math.floor(this.first / this.rows), this.rows);
  }

  // ---------- Modales ----------

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
    this.showDetalle = true;
  }

  cerrarDetalle(): void {
    this.showDetalle = false;
    this.reservaSeleccionada = null;
  }

  abrirCalendario(): void { this.mostrarCalendario = true; }
  abrirCrear(): void { this.mostrarFormulario = true; }
  cerrarFormulario(): void { this.mostrarFormulario = false; }

  onReservaGuardada(): void {
    this.resetFormTrigger++;
    this.mostrarFormulario = false;
    this.cargarReservas(0, this.rows);
  }

  // ---------- Cobro ----------

  puedeCobrar(reserva: Reserva): boolean {
    return reserva.estadoReserva !== 'FINALIZADA' && reserva.estadoReserva !== 'CANCELADA';
  }

  cobrarReserva(reserva: Reserva): void {
    this.router.navigate(['/dashboard/admin/operaciones/pos'], {
      state: {
        reservaCobrar: {
          ...reserva,
          reservaId: reserva.reservaId || reserva.id,
          clienteId: reserva.clienteId,
        },
      },
    });
  }
}