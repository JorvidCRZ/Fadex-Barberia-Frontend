import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { HistorialBarberFiltro } from '@/app/core/models/operaciones/historial-barbero.model';
import { EstadoReserva } from '@/app/core/models/operaciones/EstadoReserva';
import { FILTROS_HISTORIAL_BARBERO } from '@/app/core/config/filtros.config';
import { ServicioHistorialDTO } from '@/app/core/models/gestion/barbero/cortes.model';

@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [
    DateFormatPipe, SlicePipe, TableModule, PaginatorModule, FiltrosComponent, ButtonComponent, MonedaPipe,
    PageHeaderComponent, StatsComponent, StatusBadgeComponent, ModalComponent,
  ],
  templateUrl: './cortes.html',
})
export class CortesComponent implements OnInit {
  private readonly reservasService = inject(Reservas);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly moneda = new MonedaPipe();

  servicios: ServicioHistorialDTO[] = [];
  serviciosFiltrados: ServicioHistorialDTO[] = [];
  pagina: ServicioHistorialDTO[] = [];
  first = 0;
  rows = 10;
  cargando = false;
  filtros: HistorialBarberFiltro = {};
  filtrosFields: FilterField<HistorialBarberFiltro>[] = FILTROS_HISTORIAL_BARBERO;
  stats: StatsCard[] = [];

  displayModal = false;
  servicioSeleccionado: ServicioHistorialDTO | null = null;

  ngOnInit(): void {
    this.cargarHistorial();
  }

  private aISO(valor: unknown): string | undefined {
    if (!valor) return undefined;
    if (valor instanceof Date) {
      const y = valor.getFullYear();
      const m = String(valor.getMonth() + 1).padStart(2, '0');
      const d = String(valor.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return String(valor).slice(0, 10);
  }

  cargarHistorial(): void {
    this.cargando = true;

    const desde = this.aISO(this.filtros.desde);
    const hasta = this.aISO(this.filtros.hasta);
    const clienteNombre = this.filtros.clienteNombre?.trim() || undefined;

    this.reservasService.getHistorialCortesBarbero(desde, hasta, clienteNombre).subscribe({
      next: (res: any) => {
        try {
          // Soporta ApiResponse<List>, ApiResponse<Page> o array directo
          const data = res?.data ?? res;
          const crudo: any[] = Array.isArray(data) ? data : (data?.content ?? []);

          const lista: ServicioHistorialDTO[] = crudo.map((item: any) => ({
            reservaId: item.reservaId,
            clienteNombre: item.clienteNombre,
            clienteApellido: item.clienteApellido,
            servicioNombre: item.servicioNombre,
            fecha: item.fecha,
            horaInicio: item.horaInicio,
            horaFin: item.horaFin,
            duracion: item.duracion,
            precio: item.precio,
            estado: item.estado,
          }));

          this.servicios = lista.sort(
            (a, b) =>
              new Date(`${b.fecha}T${b.horaInicio}`).getTime() -
              new Date(`${a.fecha}T${a.horaInicio}`).getTime(),
          );
          this.serviciosFiltrados = [...this.servicios];
        } catch (e) {
          console.error('Error procesando historial:', e);
          this.servicios = [];
          this.serviciosFiltrados = [];
        } finally {
          this.first = 0;
          this.actualizarPagina();
          this.actualizarStats();
          this.cargando = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error cargando historial de cortes:', err);
        this.servicios = [];
        this.serviciosFiltrados = [];
        this.first = 0;
        this.actualizarPagina();
        this.actualizarStats();
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  onPaginator(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.actualizarPagina();
  }

  private actualizarPagina(): void {
    this.pagina = this.serviciosFiltrados.slice(this.first, this.first + this.rows);
  }

  onBuscar(filtros: HistorialBarberFiltro): void {
    this.filtros = filtros;
    this.cargarHistorial();
  }

  onLimpiar(): void {
    this.filtros = {};
    this.cargarHistorial();
  }

  verDetalle(servicio: ServicioHistorialDTO): void {
    this.servicioSeleccionado = servicio;
    this.displayModal = true;
  }

  get hayFiltrosActivos(): boolean {
    return !!(this.filtros.clienteNombre || this.filtros.desde || this.filtros.hasta);
  }

  /** Se calcula una sola vez por carga para que <app-stats> no reciba un array nuevo en cada ciclo. */
  private actualizarStats(): void {
    const finalizados = this.serviciosFiltrados.filter((s) => s.estado === EstadoReserva.FINALIZADA);

    const ingresos = finalizados.reduce((total, s) => total + (Number(s.precio) || 0), 0);

    const clientes = new Set(
      finalizados
        .map((s) => `${s.clienteNombre ?? ''} ${s.clienteApellido ?? ''}`.trim())
        .filter((nombre) => nombre !== ''),
    );

    this.stats = [
      {
        title: 'Cortes finalizados',
        value: finalizados.length,
        icon: 'pi pi-check-circle',
        description: 'Servicios completados',
      },
      {
        title: 'Ingresos registrados',
        value: this.moneda.transform(ingresos),
        icon: 'pi pi-wallet',
        description: 'Total de servicios finalizados',
        accentClass: 'bg-green-500',
        accentTextClass: 'text-green-400',
        iconBgClass: 'bg-green-500/10',
      },
      {
        title: 'Clientes atendidos',
        value: clientes.size,
        icon: 'pi pi-users',
        description: 'Clientes únicos atendidos',
        accentClass: 'bg-blue-500',
        accentTextClass: 'text-blue-400',
        iconBgClass: 'bg-blue-500/10',
      },
    ];
  }
}