import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ResumenBarbero, VentaBarbero } from '@core/models/planilla/venta-barbero.model';
import { BarberoVentasTablaComponent } from './components/barbero-ventas-tabla/barbero-ventas-tabla.component';
import { BarberoHeaderComponent } from './components/barbero-header/barbero-header.component';
import { BarberoKpisComponent } from './components/barbero-kpis/barbero-kpis.component';

@Component({
  selector: 'app-mi-sueldo-analisis',
  imports: [CommonModule, BarberoHeaderComponent, BarberoKpisComponent, BarberoVentasTablaComponent],
  templateUrl: './mi-sueldo-analisis.html',
  styleUrl: './mi-sueldo-analisis.scss',
})
export class MiSueldoAnalisis implements OnInit {

  private readonly route    = inject(ActivatedRoute);

  barberoId!: number;

  resumen!: ResumenBarbero;
  ventas: VentaBarbero[] = [];

  page          = 0;
  size          = 10;
  totalElements = 0;
  totalPages    = 0;

  mesActual  = new Date().getMonth() + 1;
  anioActual = new Date().getFullYear();

  cargando        = false;
  cargandoVentas  = false;

  ngOnInit(): void {
    this.barberoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTodo();
  }

  cargarTodo(): void {
    this.cargarResumen();
    this.cargarVentas(0);
  }

  cargarResumen(): void {
    this.cargando = true;
    // Datos de memoria (Mock)
    this.resumen = {
      barberoId: this.barberoId,
      nombreBarbero: 'Barbero Ejemplo',
      sueldoBase: 500000,
      porcentajeComision: 10,
      cantidadVentas: 30,
      totalVentas: 1200,
      montoComision: 150000,
      sueldoFinal: 650000,
    };
    this.cargando = false;
  }

  cargarVentas(page = 0): void {
    this.cargandoVentas = true;
    // Datos de memoria (Mock)
    const allMockVentas: VentaBarbero[] = Array.from({ length: 45 }, (_, i) => ({
      ventaId: i + 1,
      fecha: new Date().toISOString(),
      nombreCliente: `Cliente ${i + 1}`,
      total: 20 + Math.floor(Math.random() * 30),
    }));

    const start = page * this.size;
    const end = start + this.size;

    this.ventas        = allMockVentas.slice(start, end);
    this.page          = page;
    this.totalElements = allMockVentas.length;
    this.totalPages    = Math.ceil(allMockVentas.length / this.size);
    this.cargandoVentas = false;
  }

  cambiarPagina(nuevaPagina: number): void {
  this.cargarVentas(nuevaPagina);
}

aplicarFiltro(filtro: { mes: number; anio: number }): void {
  console.log('filtro recibido:', filtro);
  this.mesActual  = filtro.mes;
  this.anioActual = filtro.anio;
  this.cargarTodo();
}





}