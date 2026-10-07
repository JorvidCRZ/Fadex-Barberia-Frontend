import { finalize } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ApiResponse, Page } from '../../../../core/models/common/index.model';
import { Reserva } from '../../../../core/models/operaciones/Reserva.model';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { environment } from '../../../../../environments/environment';
import { RESERVAS_MOCK } from '../../../../core/config/privado-mock.config';


@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './mis-reservas.html'
})
export class MisReservasComponent implements OnInit {

  private reservaService = inject(ReservaService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  @ViewChild('dt') table: Table | undefined;

  reservas: Reserva[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  currentPage: number = 0;

  // Filtros (para aplicar en el backend)
  estadoFiltro: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  estados = [
    { label: 'Todos', value: '' },
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Confirmada', value: 'CONFIRMADA' },
    { label: 'En Proceso', value: 'EN_PROCESO' },
    { label: 'Finalizada', value: 'FINALIZADA' },
    { label: 'Cancelada', value: 'CANCELADA' }
  ];

  ngOnInit(): void {
    this.cargarMisReservas();
  }

  cargarMisReservas(event?: TableLazyLoadEvent): void {
    this.loading = true;

    const page = event ? Math.floor((event.first || 0) / (event.rows || this.rows)) : this.currentPage;
    const size = event?.rows || this.rows;

    this.currentPage = page;
    this.rows = size;

    if (environment.useMockData) {
      this.reservaService.getMisReservas(page, size)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response: ApiResponse<Page<Reserva>>) => {
            if (response.success && response.data) {
              const reservas = response.data.content.filter(reserva =>
                !this.estadoFiltro || reserva.estadoReserva === this.estadoFiltro,
              );

              this.reservas = reservas;
              this.totalRecords = reservas.length;
            } else {
              this.reservas = [];
              this.totalRecords = 0;
            }
          },
          error: () => {
            this.reservas = [];
            this.totalRecords = 0;
          }
        });
      return;
    }

    console.log(`Cargando reservas - Página: ${page}, Tamaño: ${size}`);

    this.reservaService.getMisReservas(page, size)
      .pipe(finalize(() => {
        this.loading = false;
        console.log('Loading completado');
      }))
      .subscribe({
        next: (response: ApiResponse<Page<Reserva>>) => {
          console.log('Respuesta del API:', response);

          if (response.success && response.data) {
            this.reservas = response.data.content.map(item => ({
              ...item,
              id: item.id,
              estado: item.estadoReserva
            }));

            this.totalRecords = response.data.totalElements;
            this.rows = response.data.pageSize || size;
          } else {
            console.warn('La respuesta no tiene datos:', response);
            this.reservas = [];
            this.totalRecords = 0;
          }
        },
        error: (error) => {
          console.error('Error al cargar reservas:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar tus reservas'
          });
          this.reservas = [];
          this.totalRecords = 0;
          this.loading = false;
        }
      });
  }

  aplicarFiltros(): void {
    // Resetear a primera página y recargar con filtros
    this.currentPage = 0;
    this.cargarMisReservas();
  }

  limpiarFiltros(): void {
    this.estadoFiltro = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.currentPage = 0;
    this.cargarMisReservas();
  }

  cancelarReserva(reserva: Reserva): void {
    const id = reserva.reservaId || reserva.id;
    console.log(reserva);
    console.log('ID:', id);

    this.confirmationService.confirm({
      message: `¿Cancelar la reserva del servicio "${reserva.servicio}"?`,
      header: 'Confirmar cancelación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, cancelar',
      rejectLabel: 'No',
      accept: () => {
        if (environment.useMockData) {
          const index = this.reservas.findIndex(item => (item.reservaId || item.id) === id);
          if (index >= 0) {
            this.reservas = this.reservas.filter((_, currentIndex) => currentIndex !== index);
            this.totalRecords = Math.max(0, this.totalRecords - 1);
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Reserva cancelada',
            detail: 'La reserva simulada ha sido cancelada',
          });
          return;
        }

        this.loading = true;
        this.reservaService.cancelarReserva(id)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Reserva cancelada',
                  detail: 'Tu reserva ha sido cancelada exitosamente'
                });
                this.cargarMisReservas(); // Recargar la página actual
              }
            },
            error: (error) => {
              console.error('Error al cancelar:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cancelar la reserva'
              });
            }
          });
      }
    });
  }

  obtenerFechaHora(reserva: Reserva): Date {
    return new Date(`${reserva.fecha}T${reserva.horaInicio}`);
  }

  puedeCancelar(reserva: Reserva): boolean {
    const estadosPermitidos = ['PENDIENTE_PAGO'];
    const estadoActual = reserva.estadoReserva || reserva.estadoReserva;
    return estadosPermitidos.includes(estadoActual || '');
  }

  getSeverity(estado: string): string {
    const severities: Record<string, string> = {
      'CONFIRMADA': 'success',
      'PENDIENTE': 'warning',
      'EN_PROCESO': 'info',
      'FINALIZADA': 'success',
      'CANCELADA': 'danger'
    };
    return severities[estado] || 'secondary';
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.cargarMisReservas(event);
  }

  irNuevaReserva(): void {
    this.router.navigate(['/mi-cuenta/reservar/agendar']);
  }

  recargar(): void {
    this.cargarMisReservas();
  }

  irAPagar(reserva: Reserva): void {
    this.router.navigate(['/mi-cuenta/checkout', reserva.reservaId]);
  }
  puedePagar(reserva: Reserva): boolean {
    return reserva.estadoReserva === 'PENDIENTE_PAGO';
  }
}