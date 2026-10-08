import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { Movimiento, Origen } from '@/app/core/models/fidelizacion/movimiento.model';

@Component({
    selector: 'app-movimiento-table',
    standalone: true,
    imports: [ButtonModule, CommonModule, TableModule, ConfirmPopoverComponent, StatusBadgeComponent],
    templateUrl: './movimiento-table.html',
    styleUrl: './movimiento-table.css',
})
export class MovimientoTableComponent {
    @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
    @Output() eliminar = new EventEmitter<Movimiento>();
    @Input({ required: true }) movimientos: Movimiento[] = [];
    @Input() cargado = false;
    @Input() totalRecords = 0;
    @Input() rows = 20;

    mostrarConfirmacion = false;
    movimientoAEliminar: Movimiento | null = null;

    pedirConfirmacion(movimiento: Movimiento, event: MouseEvent) {
        event.stopPropagation();
        this.movimientoAEliminar = movimiento;
        this.mostrarConfirmacion = true;
    }

    confirmarEliminar() {
        if (!this.movimientoAEliminar) return;
        this.eliminar.emit(this.movimientoAEliminar);
        this.cancelarEliminar();
    }

    cancelarEliminar() {
        this.mostrarConfirmacion = false;
        this.movimientoAEliminar = null;
    }

    get mensajeConfirmacion(): string {
        return this.movimientoAEliminar ? `¿Seguro que deseas eliminar este ajuste de ${this.movimientoAEliminar.puntos} pts?` : '';
    }

    puedeEliminar(movimiento: Movimiento): boolean {
        return movimiento.origen === Origen.AJUSTE;
    }
}