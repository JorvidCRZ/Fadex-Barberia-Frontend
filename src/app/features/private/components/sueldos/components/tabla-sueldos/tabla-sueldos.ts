import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { PlanillaBarbero } from '@/app/core/models/planilla/planilla.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-sueldos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, TableModule, TooltipModule, StatusBadgeComponent
  ],
  templateUrl: './tabla-sueldos.html',
  styleUrl: './tabla-sueldos.scss',
})
export class TablaSueldos implements OnInit {

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
    this.aniosDisponibles = [2023, 2024, 2025, 2026];
  }

  cargarDatos(page: number, size: number): void {
    this.cargado = false;
    this.page = page;
    this.size = size;

    // Datos de memoria (Mock)
    const mockBarberos: PlanillaBarbero[] = [
      {
        barberoId: 1,
        nombreBarbero: 'Juan Pérez',
        sueldoBase: 500000,
        cantidadVentas: 25,
        totalVentas: 1200,
        porcentajeComision: 10,
        montoComision: 120000,
        sueldoFinal: 620000,
      },
      {
        barberoId: 2,
        nombreBarbero: 'María López',
        sueldoBase: 500000,
        cantidadVentas: 30,
        totalVentas: 1500,
        porcentajeComision: 10,
        montoComision: 150000,
        sueldoFinal: 650000,
      },
      {
        barberoId: 3,
        nombreBarbero: 'Carlos Ruiz',
        sueldoBase: 500000,
        cantidadVentas: 15,
        totalVentas: 800,
        porcentajeComision: 10,
        montoComision: 80000,
        sueldoFinal: 580000,
      },
      {
        barberoId: 4,
        nombreBarbero: 'Ana García',
        sueldoBase: 500000,
        cantidadVentas: 40,
        totalVentas: 2000,
        porcentajeComision: 10,
        montoComision: 200000,
        sueldoFinal: 700000,
      },
      {
        barberoId: 5,
        nombreBarbero: 'Luis Torres',
        sueldoBase: 500000,
        cantidadVentas: 20,
        totalVentas: 1000,
        porcentajeComision: 10,
        montoComision: 100000,
        sueldoFinal: 600000,
      }
    ];

    this.barberos = mockBarberos;
    this.totalElements = mockBarberos.length;
    this.cargado = true;
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