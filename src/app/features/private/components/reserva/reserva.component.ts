import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { CitaBarberoResponseDTO, EstadoCita } from '@/app/core/models/reserva/reserva.model';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    SlicePipe, TableModule, PaginatorModule,
    ButtonComponent, PageHeaderComponent, StatusBadgeComponent,
  ],
  templateUrl: './reserva.html',
})
export class ReservaComponent implements OnInit {
  private readonly reservasService = inject(Reservas);
  private readonly cdr = inject(ChangeDetectorRef);

  citas: CitaBarberoResponseDTO[] = [];
  pagina: CitaBarberoResponseDTO[] = [];
  first = 0;
  rows = 10;
  cargando = false;
  accionEnCurso: number | null = null;

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;

    this.reservasService.getCitasHoy().subscribe({
      next: (res: any) => {
        // Soporta array directo o ApiResponse<List>
        const data = res?.data ?? res;
        this.citas = Array.isArray(data) ? data : (data?.content ?? []);
        this.first = 0;
        this.actualizarPagina();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando citas de hoy:', err);
        this.citas = [];
        this.pagina = [];
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
    this.pagina = this.citas.slice(this.first, this.first + this.rows);
  }

  puedeIniciar(cita: CitaBarberoResponseDTO): boolean {
    return cita.estado === 'CONFIRMADA';
  }

  puedeFinalizar(cita: CitaBarberoResponseDTO): boolean {
    return cita.estado === 'EN_PROCESO';
  }

  puedeMarcarNoAsistio(cita: CitaBarberoResponseDTO): boolean {
    return cita.estado === 'CONFIRMADA' || cita.estado === 'PENDIENTE_PAGO';
  }

  onCambiarEstado(cita: CitaBarberoResponseDTO, nuevoEstado: EstadoCita): void {
    this.accionEnCurso = cita.idReserva;

    this.reservasService.cambiarEstado(cita.idReserva, nuevoEstado).subscribe({
      next: () => {
        cita.estado = nuevoEstado;
        this.accionEnCurso = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cambiando estado:', err);
        this.accionEnCurso = null;
        this.cdr.detectChanges();
      },
    });
  }
}