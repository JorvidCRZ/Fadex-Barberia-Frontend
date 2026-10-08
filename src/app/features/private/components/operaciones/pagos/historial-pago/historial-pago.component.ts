import { Component, Input, OnInit, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialPagoResponse, PagoResponse } from '../../../../../../core/models/pagos/pago.model';

@Component({
  selector: 'app-historial-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-pago.component.html'
})
export class HistorialPagoComponent implements OnInit {
  @Input({ required: true }) pago!: PagoResponse;
  @Output() onCerrar = new EventEmitter<void>();

  pagoInfo = signal<PagoResponse | null>(null);
  timelineEventos = signal<HistorialPagoResponse[]>([]);
  loadingData = signal<boolean>(false);

  ngOnInit(): void {
    this.pagoInfo.set(this.pago);
    // Historial en memoria: un único evento de registro.
    this.timelineEventos.set([
      { id: 1, fecha: this.pago.fecha, clienteNombre: this.pago.clienteNombre },
    ] as unknown as HistorialPagoResponse[]);
  }

  getIconData(descripcion: string): { icon: string, colorClass: string } {
    const desc = descripcion.toUpperCase();
    if (desc.includes('CREAT') || desc.includes('REGISTR')) return { icon: 'pi-plus-circle', colorClass: 'text-[#C9A84C] border-[#C9A84C]' };
    if (desc.includes('COMPLET') || desc.includes('APROB')) return { icon: 'pi-check-circle', colorClass: 'text-green-500 border-green-500' };
    if (desc.includes('ANUL') || desc.includes('ELIMIN')) return { icon: 'pi-times-circle', colorClass: 'text-red-500 border-red-500' };
    return { icon: 'pi-info-circle', colorClass: 'text-[#888] border-[#888]' };
  }
}