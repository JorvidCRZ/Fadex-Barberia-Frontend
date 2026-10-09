import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanillaBarbero } from '@/app/core/models/planilla/planilla.model';

@Component({
  selector: 'app-grafico-sueldos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grafico-sueldos.html',
  styleUrl: './grafico-sueldos.scss',
})
export class GraficoSueldosComponent implements OnInit {

  tipoGrafico: 'completo' | 'comision' = 'comision';
  mes = new Date().getMonth() + 1;
  anio = new Date().getFullYear();
  barberos: PlanillaBarbero[] = [];
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
    this.cargarDatos();
  }

  cargarAnios(): void {
    this.aniosDisponibles = [2023, 2024, 2025, 2026];
  }

  cargarDatos(): void {
    // Datos de memoria (Mock)
    this.barberos = [
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
  }

  aplicarFiltro(): void {
    this.cargarDatos();
  }

  get barberosGrafico(): PlanillaBarbero[] {
    return [...this.barberos]
      .filter(b => b.cantidadVentas > 0)
      .sort((a, b) =>
        this.tipoGrafico === 'comision'
          ? b.montoComision - a.montoComision
          : b.sueldoFinal - a.sueldoFinal
      )
      .slice(0, 10);
  }

  get maxValor(): number {
    if (!this.barberosGrafico.length) return 100;
    const max = Math.max(
      ...this.barberosGrafico.map(b =>
        this.tipoGrafico === 'comision'
          ? b.montoComision
          : b.sueldoFinal
      )
    );
    return Math.ceil(max / 100) * 100;
  }
}