// actividad-client.ts

import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { ActividadReciente } from '@/app/core/models/gestion/cliente/ActividadReciente.model';

@Component({
  selector: 'app-actividad-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actividad-client.html'
})
export class ActividadClient implements OnInit {

  @Input() clienteNombre: string = 'Cliente';
  @Input() clienteId!: number;

  private clienteService = inject(ClienteService);

  // TODAS las actividades
  actividades: ActividadReciente[] = [];

  // SOLO las visibles en el card
  actividadesVisibles: ActividadReciente[] = [];

  cargando = false;
  error = false;

  ngOnInit(): void {
    if (this.clienteId) {
      this.cargarActividad();
    }
  }

  cargarActividad(): void {
    this.cargando = true;
    this.error = false;

    this.clienteService
      .obtenerActividadReciente(this.clienteId)
      .subscribe({
        next: (response) => {
          this.cargando = false;
          this.actividades = response.data ?? [];

          // SOLO 10 visibles
          this.actividadesVisibles = this.actividades.slice(0, 10);
        },
        error: (error) => {
          console.error('Error cargando actividades', error);
          this.cargando = false;
          this.error = true;
          this.actividades = [];
          this.actividadesVisibles = [];
        }
      });
  }

  verTodas(): void {
    console.log('Abrir modal de actividades');
  }

  obtenerColor(tipo: string): string {
    switch (tipo) {
      case 'CORTE':  return 'bg-yellow-500';
      case 'COMPRA': return 'bg-emerald-500';
      case 'PAGO':   return 'bg-sky-500';
      default:       return 'bg-gray-500';
    }
  }

  obtenerTextColor(tipo: string): string {
    switch (tipo) {
      case 'CORTE':  return 'text-yellow-400';
      case 'COMPRA': return 'text-emerald-400';
      case 'PAGO':   return 'text-sky-400';
      default:       return 'text-gray-400';
    }
  }

  mostrarModal = false;
  filtroActual = 'TODOS';
  actividadesFiltradas: ActividadReciente[] = [];

  abrirModal(): void {
    this.mostrarModal = true;
    this.actividadesFiltradas = this.actividades;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  filtrar(tipo: string): void {
    this.filtroActual = tipo;

    if (tipo === 'TODOS') {
      this.actividadesFiltradas = this.actividades;
      return;
    }

    this.actividadesFiltradas = this.actividades.filter(
      actividad => actividad.tipo === tipo
    );
  }
}