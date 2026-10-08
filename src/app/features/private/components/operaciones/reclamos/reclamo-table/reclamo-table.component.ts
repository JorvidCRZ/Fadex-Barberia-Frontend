import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ReclamoResponse } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';
import { formatearTexto } from '@/app/shared/utils/formatear-text.utils.component';

@Component({
  selector: 'app-reclamo-table',
  imports: [CommonModule, TableModule],
  templateUrl: './reclamo-table.html',
  styleUrl: './reclamo-table.css',
})
export class ReclamoTableComponent {
  @Input({ required: true }) reclamos: ReclamoResponse[] = [];
  @Input() rows = 10;
  @Output() ver = new EventEmitter<number>();

  private readonly estados: Record<string, { label: string; clase: string }> = {
    EN_REVISION: { label: 'En revisión', clase: 'text-amber-400 border-amber-500/60 bg-amber-500/10' },
    RESUELTO: { label: 'Resuelto', clase: 'text-blue-400 border-blue-500/60 bg-blue-500/10' },
    CERRADO: { label: 'Cerrado', clase: 'text-red-400 border-red-500/60 bg-red-500/10' },
  };

  estado(valor: unknown) {
    const clave = String(valor ?? '');
    return this.estados[clave] ?? { label: formatearTexto(clave), clase: 'text-gray-300 border-gray-500/60 bg-gray-500/10' };
  }

  clasificacion(valor: unknown): string {
    return formatearTexto(String(valor ?? ''));
  }

  verReclamo(reclamo: ReclamoResponse): void {
    this.ver.emit(reclamo.idReclamo);
  }
}