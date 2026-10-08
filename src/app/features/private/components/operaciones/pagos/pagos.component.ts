import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { NotificationService } from '../../../../../core/services/common/notification.service';
import { PagoResponse } from '../../../../../core/models/pagos/pago.model';

import { PagoFormComponent } from './pago-form/pago-form.component';
import { PagoDetalleComponent } from './pago-detalle/pago-detalle.component';

// Valores base del resumen (como en el prototipo). Los pagos nuevos se suman a estos.
const BASE_VALES_HOY = 18;
const BASE_RECAUDACION = 2516.7;
// Los pagos creados en esta sesión tienen id >= a este valor.
const ID_INICIAL_NUEVOS = 8042;

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, DialogModule, ButtonModule, PagoFormComponent, PagoDetalleComponent],
  templateUrl: './pagos.component.html',
})
export class PagosComponent {
  private readonly notificationService = inject(NotificationService);

  // Registros en memoria (se pierden al recargar la página).
  // El cast evita errores si el modelo tiene enums o campos extra.
  pagos = signal<PagoResponse[]>([
    { id: 8041, reservaId: 101, clienteNombre: 'Diego Salazar', barberoNombre: 'Renzo Castillo', metodo: 'Yape', tipo: 'Servicio', monto: 55, fecha: '2026-06-18T10:42:00' },
    { id: 8040, reservaId: 100, clienteNombre: 'Valeria Quispe', barberoNombre: 'Álvaro Mendoza', metodo: 'Visa', tipo: 'Producto', monto: 89, fecha: '2026-06-18T09:18:00' },
    { id: 8039, reservaId: 99, clienteNombre: 'Mateo Huamán', barberoNombre: 'José Luis Ramos', metodo: 'Efectivo', tipo: 'Servicio', monto: 35, fecha: '2026-06-17T17:05:00' },
  ] as unknown as PagoResponse[]);

  private siguienteId = ID_INICIAL_NUEVOS;

  filtroCliente = signal('');

  pagosFiltrados = computed(() => {
    const texto = this.filtroCliente().trim().toLowerCase();
    return texto ? this.pagos().filter(p => p.clienteNombre.toLowerCase().includes(texto)) : this.pagos();
  });

  resumen = computed(() => {
    const nuevos = this.pagos().filter(p => p.id >= ID_INICIAL_NUEVOS);
    return {
      totalHoy: BASE_VALES_HOY + nuevos.length,
      montoTotal: BASE_RECAUDACION + nuevos.reduce((acc, p) => acc + (p.monto || 0), 0),
    };
  });

  formVisible = signal<boolean>(false);
  detalleVisible = signal<boolean>(false);
  pagoSeleccionado = signal<PagoResponse | null>(null);

  abrirNuevoPago(): void { this.formVisible.set(true); }

  verDetalle(pago: PagoResponse): void {
    this.pagoSeleccionado.set(pago);
    this.detalleVisible.set(true);
  }

  onPagoGuardado(nuevo: PagoResponse): void {
    const registro = { ...nuevo, id: this.siguienteId++, fecha: new Date().toISOString() } as PagoResponse;
    this.pagos.update(lista => [registro, ...lista]);
    this.formVisible.set(false);
    this.notificationService.showSuccess('Pago registrado correctamente');
  }

  onPagoEliminado(id: number): void {
    this.pagos.update(lista => lista.filter(p => p.id !== id));
    this.detalleVisible.set(false);
    this.pagoSeleccionado.set(null);
    this.notificationService.showSuccess('Pago eliminado.');
  }
}