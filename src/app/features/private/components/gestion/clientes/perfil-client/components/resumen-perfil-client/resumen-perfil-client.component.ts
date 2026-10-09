import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { ClienteDetalleResumen } from '@/app/core/models/gestion/cliente/cliente-detalle-resumen.model';

@Component({
  selector: 'app-resumen-perfil-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-perfil-client.html',
  styleUrl: './resumen-perfil-client.scss',
})
export class ResumenPerfilClient implements OnInit {

  private clienteService = inject(ClienteService);

  @Input() clienteId!: number;

  @Input() clienteNombre: string = '';

  resumen!: ClienteDetalleResumen;

  metricas: any[] = [];

  totalGastado: string = 'S/ 0.00';

  ultimaVisita: string = 'Sin visitas';


  ngOnInit(): void {

    if (!this.clienteId) {
      console.error('clienteId no definido');
      return;
    }

    this.resumen = {
      totalReservas: 18,
      totalCortes: 14,
      totalCompras: 6,
      totalGastado: 420,
      ultimaVisita: '07/10/2026',
    };
    this.metricas = [
      { valor: this.resumen.totalReservas, etiqueta: 'Reservas' },
      { valor: this.resumen.totalCortes, etiqueta: 'Cortes' },
      { valor: this.resumen.totalCompras, etiqueta: 'Compras' },
    ];
    this.totalGastado = `S/ ${this.resumen.totalGastado.toFixed(2)}`;
    this.ultimaVisita = this.resumen.ultimaVisita;
    // this.cargarResumen();

  }


  cargarResumen(): void {

    this.clienteService.obtenerResumenCliente(this.clienteId)
      .subscribe({

        next: (response) => {

          const data = response.data;

          this.resumen = data;

          this.metricas = [

            {
              valor: data.totalReservas,
              etiqueta: 'Reservas'
            },

            {
              valor: data.totalCortes,
              etiqueta: 'Cortes'
            },

            {
              valor: data.totalCompras,
              etiqueta: 'Compras'
            }

          ];

          this.totalGastado = `S/ ${data.totalGastado.toFixed(2)}`;

          this.ultimaVisita = data.ultimaVisita;

        },

        error: (err) => {
          console.error('Error al cargar resumen del cliente', err);
        }

      });

  }

}