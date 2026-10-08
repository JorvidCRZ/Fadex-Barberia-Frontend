import { Component, Input, OnInit, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PagoResponse } from '../../../../../../core/models/pagos/pago.model';
import { HistorialPagoComponent } from '../historial-pago/historial-pago.component';
import { ConfirmPopoverComponent } from '../../../../../../shared/components/confirm-popover/confirm-popover.component';

@Component({
  selector: 'app-pago-detalle',
  standalone: true,
  imports: [CommonModule, DialogModule, HistorialPagoComponent, ConfirmPopoverComponent],
  templateUrl: './pago-detalle.component.html'
})
export class PagoDetalleComponent implements OnInit {
  @Input({ required: true, alias: 'pago' }) pago_!: PagoResponse;
  @Output() onCerrar = new EventEmitter<void>();
  @Output() onEliminado = new EventEmitter<number>();

  pago = signal<PagoResponse | null>(null);
  loadingAction = signal<boolean>(false);
  innerHistorialVisible = signal<boolean>(false);
  confirmVisible = signal<boolean>(false);

  ngOnInit(): void { this.pago.set(this.pago_); }

  solicitarAnulacion(): void { this.confirmVisible.set(true); }

  ejecutarEliminacion(): void {
    this.confirmVisible.set(false);
    this.onEliminado.emit(this.pago_.id);
  }

  abrirSubHistorial(): void { this.innerHistorialVisible.set(true); }
}