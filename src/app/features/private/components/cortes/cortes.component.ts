import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { HistorialBarberFiltro } from '@/app/core/models/operaciones/historial-barbero.model';
import { FILTROS_HISTORIAL_BARBERO } from '@/app/core/config/filtros.config';
import { ServicioHistorialDTO } from '@/app/core/models/gestion/barbero/cortes.model';


@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DatePipe, DecimalPipe, TableModule, DialogModule,
    FiltrosComponent, ButtonComponent, MonedaPipe
  ],
  templateUrl: './cortes.html',
  styleUrl: './cortes.scss'
})
export class CortesComponent implements OnInit {

  private readonly reservasService = inject(Reservas);
  private readonly cdr = inject(ChangeDetectorRef);

  servicios: ServicioHistorialDTO[] = [];
  serviciosFiltrados: ServicioHistorialDTO[] = [];
  cargando = false;
  filtros: HistorialBarberFiltro = {};
  filtrosFields: FilterField<HistorialBarberFiltro>[] = FILTROS_HISTORIAL_BARBERO;

  // Modal de detalle
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
        console.log('respuesta historial:', res);

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
            estado: item.estado
          }));

          this.servicios = lista.sort((a, b) =>
            new Date(`${b.fecha}T${b.horaInicio}`).getTime() -
            new Date(`${a.fecha}T${a.horaInicio}`).getTime()
          );

          this.serviciosFiltrados = [...this.servicios];
        } catch (e) {
          console.error('Error procesando historial:', e);
          this.servicios = [];
          this.serviciosFiltrados = [];
        } finally {
          this.cargando = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error cargando historial de cortes:', err);
        this.servicios = [];
        this.serviciosFiltrados = [];
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
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

  etiquetaEstado(estado: string): string {
    switch (estado) {
      case 'FINALIZADA': return 'Finalizada';
      case 'CANCELADA':
      case 'CANCELADA_AUTOMATICA': return 'Cancelada';
      case 'NO_ASISTIO': return 'No asistió';
      default: return estado;
    }
  }

  get hayFiltrosActivos(): boolean {
    return !!(this.filtros.clienteNombre || this.filtros.desde || this.filtros.hasta);
  }

  get totalCortesFinalizados(): number {
    return this.serviciosFiltrados.filter(s => s.estado === 'FINALIZADA').length;
  }

  get ingresosRegistrados(): number {
    return this.serviciosFiltrados
      .filter(s => s.estado === 'FINALIZADA')
      .reduce((total, s) => total + (Number(s.precio) || 0), 0);
  }

  get clientesAtendidos(): number {
    const clientes = this.serviciosFiltrados
      .filter(s => s.estado === 'FINALIZADA')
      .map(s => `${s.clienteNombre ?? ''} ${s.clienteApellido ?? ''}`.trim())
      .filter(nombre => nombre !== '');

    return new Set(clientes).size;
  }
}