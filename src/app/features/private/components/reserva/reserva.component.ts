import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Reservas } from '@/app/core/services/reserva/reserva.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { CitaBarberoResponseDTO, EstadoCita } from '@/app/core/models/reserva/reserva.model';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TableModule,
    ButtonComponent,
  ],
  templateUrl: './reserva.html',
  styleUrl: './reserva.scss',
})
export class ReservaComponent implements OnInit {

  private readonly reservasService = inject(Reservas);
  private readonly cdr = inject(ChangeDetectorRef);

  citas: CitaBarberoResponseDTO[] = [];
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
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando citas de hoy:', err);
        this.citas = [];
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
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
      }
    });
  }

}