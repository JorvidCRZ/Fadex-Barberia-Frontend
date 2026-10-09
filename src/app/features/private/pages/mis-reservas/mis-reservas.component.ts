import { finalize } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ApiResponse, Page } from '../../../../core/models/common/index.model';
import { Reserva } from '../../../../core/models/operaciones/Reserva.model';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { environment } from '../../../../../environments/environment';
import { RESERVAS_MOCK } from '../../../../core/config/privado-mock.config';
import { ReservarComponent } from '../reservar/reservar.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

type Severidad = 'success' | 'info' | 'warn' | 'danger' | 'secondary';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule,TagModule,ToastModule,TooltipModule,ConfirmDialogModule,
    ReservarComponent,StatusBadgeComponent,DateFormatPipe, MonedaPipe,ButtonComponent
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './mis-reservas.html',
})
export class MisReservasComponent implements OnInit {

  private reservaService = inject(ReservaService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild('dt') table: Table | undefined;

  reservas: Reserva[] = [];
  loading = false;
  totalRecords = 0;
  rows = 10;
  currentPage = 0;

  /** Controla el modal de nueva reserva */
  dialogNuevaReserva = false;

  ngOnInit(): void {
    this.cargarMisReservas();

    // Permite abrir el modal desde otras pantallas:
    // /mi-cuenta/reservas/mis-reservas?nueva=1
    if (this.route.snapshot.queryParamMap.has('nueva')) {
      this.dialogNuevaReserva = true;
    }
  }

  // ── Carga ──────────────────────────────────────────────────────────────────

  cargarMisReservas(event?: TableLazyLoadEvent): void {
    this.loading = true;

    const size = event?.rows || this.rows;
    const page = event ? Math.floor((event.first || 0) / size) : this.currentPage;

    this.currentPage = page;
    this.rows = size;

    if (environment.useMockData) {
      this.reservaService.getMisReservas(page, size)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (response: ApiResponse<Page<Reserva>>) => {
            if (response.success && response.data) {
              this.reservas = response.data.content;
              this.totalRecords = response.data.totalElements;
              this.rows = response.data.pageSize || size;
            } else {
              this.reservas = [];
              this.totalRecords = 0;
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudieron cargar tus reservas',
            });
            this.reservas = [];
            this.totalRecords = 0;
          },
        });
      return;
    }

    this.reservaService.getMisReservas(page, size)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response: ApiResponse<Page<Reserva>>) => {
          if (response.success && response.data) {
            this.reservas = response.data.content;
            this.totalRecords = response.data.totalElements;
            this.rows = response.data.pageSize || size;
          } else {
            this.reservas = [];
            this.totalRecords = 0;
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar tus reservas',
          });
          this.reservas = [];
          this.totalRecords = 0;
        },
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.cargarMisReservas(event);
  }

  recargar(): void {
    this.cargarMisReservas();
  }

  private getReservasMockLocales(): Reserva[] {
    try {
      const raw = localStorage.getItem('fadex_mock_reservas');
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as Reserva[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return [];
      }

      return [...parsed]
        .sort((a, b) => Number(b.reservaId || b.id || 0) - Number(a.reservaId || a.id || 0))
        .map((reserva) => ({
          ...reserva,
          fecha: new Date(reserva.fecha),
          horaInicio: new Date(reserva.horaInicio),
          horaFin: new Date(reserva.horaFin),
        }));
    } catch {
      return RESERVAS_MOCK;
    }
  }

  // ── Nueva reserva (modal) ──────────────────────────────────────────────────

  abrirNuevaReserva(): void {
    this.dialogNuevaReserva = true;
  }

  onReservaCreada(): void {
    this.currentPage = 0;
    this.cargarMisReservas();
  }

  // ── Cancelar ───────────────────────────────────────────────────────────────

  cancelarReserva(reserva: Reserva): void {
    const id = reserva.reservaId || reserva.id;

    this.confirmationService.confirm({
      message: `¿Cancelar la reserva del servicio "${reserva.servicio}"?`,
      header: 'Confirmar cancelación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, cancelar',
      rejectLabel: 'No',
      accept: () => {
        if (environment.useMockData) {
          this.reservas = this.reservas.filter((item) => (item.reservaId || item.id) !== id);
          this.totalRecords = Math.max(0, this.totalRecords - 1);
          this.messageService.add({
            severity: 'success',
            summary: 'Reserva cancelada',
            detail: 'La reserva simulada ha sido cancelada',
          });
          return;
        }

        this.loading = true;
        this.reservaService.cancelarReserva(id)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Reserva cancelada',
                  detail: 'Tu reserva ha sido cancelada exitosamente',
                });
                this.cargarMisReservas();
              }
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo cancelar la reserva',
              });
            },
          });
      },
    });
  }

  // ── Pagar ──────────────────────────────────────────────────────────────────

  irAPagar(reserva: Reserva): void {
    this.router.navigate(['/mi-cuenta/checkout', reserva.reservaId]);
  }

  // ── Reglas de UI ───────────────────────────────────────────────────────────

  puedePagar(reserva: Reserva): boolean {
    return reserva.estadoReserva === 'PENDIENTE_PAGO';
  }

  puedeCancelar(reserva: Reserva): boolean {
    return reserva.estadoReserva === 'PENDIENTE_PAGO';
  }

  /** Acepta '09:30:00', [9, 30] o { hour: 9, minute: 30 } y devuelve 'HH:mm' */

  getSeverity(estado: string): Severidad {
    const severities: Record<string, Severidad> = {
      CONFIRMADA: 'success',
      FINALIZADA: 'success',
      EN_PROCESO: 'info',
      PENDIENTE: 'info',
      PENDIENTE_PAGO: 'warn',
      CANCELADA: 'danger',
    };
    return severities[estado] ?? 'secondary';
  }
}