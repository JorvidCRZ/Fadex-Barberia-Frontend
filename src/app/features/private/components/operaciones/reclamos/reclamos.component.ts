import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReclamoTableComponent } from './reclamo-table/reclamo-table.component';
import { ReclamoFormComponent } from './reclamo-form/reclamo-form.component';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ReclamoRequest, ReclamoResponse } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';

@Component({
  selector: 'app-reclamos',
  imports: [CommonModule, ButtonModule, DialogModule, DialogHeaderComponent, ReclamoTableComponent, ReclamoFormComponent],
  templateUrl: './reclamos.html',
  styleUrl: './reclamos.css',
})
export class ReclamosComponent {
  private router = inject(Router);
  private notify = inject(NotificationService);

  mostrarFormulario = false;
  private siguienteId = 4;

  // Registros en memoria (se pierden al recargar la página).
  // El cast evita errores si el modelo tiene enums o campos extra.
  reclamos: ReclamoResponse[] = [
    {
      idReclamo: 3, numeroReclamo: 'REC-028', nombreCliente: 'Sebastián Flores',
      correoCliente: 'sebastian@correo.com', telefonoCliente: '987654321',
      tipoReclamacion: 'Servicio', tipoProblema: 'DEMORA_ATENCION', causaReclamo: 'FALTA_PERSONAL',
      descripcion: 'Tiempo de espera', estadoReclamo: 'EN_REVISION', esPublico: false, adjuntos: [],
      fechaReclamo: '2026-06-17T10:30:00', fechaOcurrencia: '2026-06-17T09:00:00',
    },
    {
      idReclamo: 2, numeroReclamo: 'REC-027', nombreCliente: 'Camila Rojas',
      correoCliente: 'camila@correo.com', telefonoCliente: '912345678',
      tipoReclamacion: 'Producto', tipoProblema: 'PRODUCTO_INCOMPLETO', causaReclamo: 'ERROR_DESPACHO',
      descripcion: 'Producto incompleto', estadoReclamo: 'RESUELTO', esPublico: false, adjuntos: [],
      solucionReclamo: 'REPOSICION', detalleSolucion: 'Se repuso el producto faltante.',
      montoReclamado: 25, montoCompensado: 25,
      fechaReclamo: '2026-06-15T15:10:00', fechaOcurrencia: '2026-06-14T00:00:00',
      fechaResolucion: '2026-06-16T11:00:00',
    },
    {
      idReclamo: 1, numeroReclamo: 'REC-026', nombreCliente: 'Mateo Huamán',
      correoCliente: 'mateo@correo.com', telefonoCliente: '956789123',
      tipoReclamacion: 'Atención', tipoProblema: 'REPROGRAMACION', causaReclamo: 'CAMBIO_AGENDA',
      descripcion: 'Reprogramación', estadoReclamo: 'CERRADO', esPublico: false, adjuntos: [],
      notasInternas: 'Cliente no respondió a la propuesta.',
      fechaReclamo: '2026-06-12T09:45:00', fechaOcurrencia: '2026-06-11T00:00:00',
      fechaResolucion: '2026-06-13T10:00:00',
    },
  ] as unknown as ReclamoResponse[];

  abrirCrear(): void { this.mostrarFormulario = true; }
  cerrarFormulario(): void { this.mostrarFormulario = false; }

  abrirVer(id: number): void {
    const reclamo = this.reclamos.find(r => r.idReclamo === id);
    this.router.navigate(['/dashboard/admin/operaciones/reclamos', id], { state: { reclamo } });
  }

  guardarReclamo(data: { request: ReclamoRequest; archivos?: File[] }): void {
    const id = this.siguienteId++;
    const nuevo = {
      ...data.request,
      idReclamo: id,
      numeroReclamo: `REC-${String(25 + id).padStart(3, '0')}`,
      estadoReclamo: 'EN_REVISION',
      esPublico: false,
      adjuntos: [],
      fechaReclamo: new Date().toISOString(),
      fechaOcurrencia: data.request.fechaOcurrencia ?? new Date().toISOString(),
    } as unknown as ReclamoResponse;

    this.reclamos = [nuevo, ...this.reclamos];
    this.notify.showSuccess('Reclamo creado correctamente');
    this.cerrarFormulario();
  }
}