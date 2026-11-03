import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FILTROS_HISTORIAL } from '../../../../core/config/filtros.config';
import { HistorialClienteFiltro, HistorialClienteModel,} from '../../../../core/models/operaciones/historial-cliente.model';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FiltrosComponent } from '../../../../shared/components/filtros/filtros.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '../../../../shared/pipes/dat.pipe';
import { MonedaPipe } from '../../../../shared/pipes/moneda.pipe';

@Component({
  selector: 'app-cliente-historial',
  standalone: true,

  imports: [CommonModule,TableModule,PaginatorModule,ModalComponent,StatusBadgeComponent,
    FiltrosComponent,ButtonComponent,PageHeaderComponent,DateFormatPipe,MonedaPipe,
  ],

  templateUrl: './historial.html',
})
export class ClienteHistorialComponent implements OnInit {

  private reservaService = inject(ReservaService);
  private notify = inject(NotificationService);

  historial = signal<HistorialClienteModel[]>([]);
  loading = signal(false);
  totalRecords = signal(0);
  rows = signal(10);
  first = signal(0);
  filtrosFields = [...FILTROS_HISTORIAL];
  filtros = signal<HistorialClienteFiltro>({});

  hayFiltrosActivos = computed(() => {
    const f = this.filtros();
    return !!(f.estado || f.desde || f.hasta);
  });

  displayModal = signal(false);
  reservaSeleccionada = signal<HistorialClienteModel | null>(null);

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    const size = this.rows();
    const page = Math.floor(this.first() / size);
    const { estado, desde, hasta } = this.filtros();
    this.loading.set(true);
    this.reservaService.getHistorialCliente(page, size, estado, desde, hasta).pipe(finalize(() => this.loading.set(false))).subscribe({

        next: (response) => {
          if (response.success && response.data) {
            this.historial.set(response.data.content);
            this.totalRecords.set(response.data.totalElements);

          } else {
            this.historial.set([]);
            this.totalRecords.set(0);
          }
        },

        error: (err) => {
          console.error('Error cargando el historial:',err);
          this.historial.set([]);
          this.totalRecords.set(0);
          this.notify.showHttpError(err);
        }
      });
  }

 
  onPaginatorChange(event: PaginatorState): void {
    const size = event.rows ?? this.rows();
    const first = event.first ?? 0;
    this.rows.set(size);
    this.first.set(first);
    this.cargarHistorial();
  }


  onBuscar(filtros: HistorialClienteFiltro): void {
    this.filtros.set(filtros);
    this.first.set(0);
    this.cargarHistorial();
  }

  onLimpiar(): void {
    this.filtros.set({});
    this.first.set(0);
    this.cargarHistorial();
  }

  
  recargar(): void {
    this.cargarHistorial();
  }

  verDetalle(reserva: HistorialClienteModel): void {
    this.reservaSeleccionada.set(reserva);
    this.displayModal.set(true);
  }

}