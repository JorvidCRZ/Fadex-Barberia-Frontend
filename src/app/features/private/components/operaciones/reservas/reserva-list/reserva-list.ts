import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { FILTROS_RESERVA } from '@/app/core/config/filtros.config';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { Reserva, ReservaFiltro } from '@/app/core/models/operaciones/Reserva.model';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { CreateReserva } from '../reserva-create/create-reserva/create-reserva';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, DialogModule, TableModule, DialogHeaderComponent, CreateReserva,
    TooltipModule, StatusBadgeComponent, FiltrosComponent, SearchBarComponent, DateFormatPipe
  ],
  templateUrl: './reserva-list.html',
  styleUrls: ['./reserva-list.css'],
})
export class ReservaList implements OnInit {
  private router = inject(Router);
  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);
  private cd = inject(ChangeDetectorRef);

  reservas: Reserva[] = [];
  cargado = false;
  totalRecords = 0;
  rows = 10;

  filtro: Partial<ReservaFiltro> = {};
  filtrosFields = [...FILTROS_RESERVA];
  texto = 'Reservas';

  showDetalle = false;
  reservaSeleccionada: Reserva | null = null;

  ngOnInit(): void {
    this.cargarReservas(0, this.rows);
  }

  cargarReservas(page: number, size: number): void {
    this.cargado = false;
    this.reservaService.obtenerReservas({ ...this.filtro, page, size, sort: 'fecha,desc' }).subscribe({
      next: (resp) => {
        this.reservas = resp.data.content;
        this.totalRecords = resp.data.totalElements;
        this.cargado = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.notify.showHttpError(err.message);
        this.cargado = true;
        this.cd.detectChanges();
      }
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    this.rows = rows;
    this.cargarReservas(Math.floor(first / rows), rows);
  }

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

  verDetalle(reserva: Reserva): void {
    this.reservaSeleccionada = reserva;
    this.showDetalle = true;
  }

  cobrarReserva(reserva: Reserva): void {
    this.router.navigate(['/dashboard/admin/operaciones/pos'], {
      state: { reservaCobrar: reserva }
    });
  }


  editarReserva(reserva: Reserva): void {
    this.router.navigate([`/dashboard/admin/operaciones/reservas/editar/${reserva.id}`]);
  }


  mostrarFormulario = false;
  resetFormTrigger = 0;
  icono = 'pi-calendar-plus';

  abrirCrear(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  onReservaGuardada(): void {
    this.resetFormTrigger++;
    this.mostrarFormulario = false;
    this.cargarReservas(0, this.rows);
  }

  // AJUSTA los case si EstadoReserva.ts trae otros nombres
  getEstadoClass(estado: string | null): string {
    switch (estado) {
      case 'CONFIRMADA': return 'estado-confirmada';
      case 'PENDIENTE_PAGO': return 'estado-pendiente';
      case 'EN_PROCESO': return 'estado-en-proceso';
      case 'FINALIZADA': return 'estado-completada';
      case 'CANCELADA': return 'estado-cancelada';
      default: return 'estado-default';
    }
  }
}