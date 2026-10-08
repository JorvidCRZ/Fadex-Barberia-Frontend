import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { PlanillaService } from '@core/services/planilla/planilla.service';
import { PlanillaBarbero } from '@/app/core/models/planilla/planilla.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-sueldos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, TableModule, TooltipModule, StatusBadgeComponent
  ],
  templateUrl: './tabla-sueldos.html',
  styleUrl: './tabla-sueldos.css',
})
export class TablaSueldos implements OnInit {

  private readonly planillaService = inject(PlanillaService);
  private readonly router = inject(Router);

  barberos: PlanillaBarbero[] = [];
  cargado = false;

  page = 0;
  size = 10;
  totalElements = 0;

  mes = new Date().getMonth() + 1;
  anio = new Date().getFullYear();
  aniosDisponibles: number[] = [];

  readonly meses = [
    { id: 1,  nombre: 'Enero' },
    { id: 2,  nombre: 'Febrero' },
    { id: 3,  nombre: 'Marzo' },
    { id: 4,  nombre: 'Abril' },
    { id: 5,  nombre: 'Mayo' },
    { id: 6,  nombre: 'Junio' },
    { id: 7,  nombre: 'Julio' },
    { id: 8,  nombre: 'Agosto' },
    { id: 9,  nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' },
  ];

  ngOnInit(): void {
    this.cargarAnios();
    this.cargarDatos(0, this.size);
  }

  cargarAnios(): void {
    this.planillaService.obtenerAnios().subscribe({
      next: (r) => { this.aniosDisponibles = r.data; },
      error: (err) => console.error('Error al cargar años', err)
    });
  }

  cargarDatos(page: number, size: number): void {
    this.cargado = false;
    this.page = page;
    this.size = size;

    this.planillaService
      .getDetalle(this.mes, this.anio, page, size)
      .subscribe({
        next: (response) => {
          this.barberos = response.data.content;
          this.totalElements = response.data.totalElements;
          this.cargado = true;
        },
        error: (err) => {
          console.error(err);
          this.cargado = true;
        }
      });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size;
    this.cargarDatos(Math.floor(first / rows), rows);
  }

  aplicarFiltro(): void {
    this.cargarDatos(0, this.size);
  }

  verDetalle(barbero: PlanillaBarbero): void {
    this.router.navigate(['/dashboard/admin/sueldos', barbero.barberoId]);
  }

  getIniciales(nombre: string | null | undefined): string {
    return (nombre ?? '').slice(0, 2).toUpperCase();
  }
}