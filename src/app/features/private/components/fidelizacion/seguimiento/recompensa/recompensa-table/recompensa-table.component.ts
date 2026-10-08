import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmPopoverComponent } from '@/app/shared/components/confirm-popover/confirm-popover.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { EstadoRecompensa, RecompensaObtenida } from '@/app/core/models/ruleta/recompensa.model';

@Component({
    selector: 'app-recompensa-table',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, ConfirmPopoverComponent, StatusBadgeComponent],
    templateUrl: './recompensa-table.html',
})
export class RecompensaTableComponent {
    @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
    @Output() canjear = new EventEmitter<RecompensaObtenida>();
    @Output() cambiarEstado = new EventEmitter<{ recompensa: RecompensaObtenida; nuevoEstado: EstadoRecompensa }>();

    @Input({ required: true }) recompensas: RecompensaObtenida[] = [];
    @Input() cargado = false;
    @Input() totalRecords = 0;
    @Input() rows = 20;
    @Input() recienCanjeadoId: number | null = null;

    readonly EstadoRecompensa = EstadoRecompensa;

    expandedRowKeys: Record<number, boolean> = {};

    // --- Confirmación de cambio de estado ---
    mostrarConfirmacion = false;
    accionPendiente: { recompensa: RecompensaObtenida; nuevoEstado: EstadoRecompensa; mensaje: string } | null = null;

    puedeCanjear(recompensa: RecompensaObtenida): boolean {
        return recompensa.estado === EstadoRecompensa.PENDIENTE;
    }

    onCanjear(recompensa: RecompensaObtenida, event: MouseEvent): void {
        event.stopPropagation();
        this.canjear.emit(recompensa);
    }

    onVencer(recompensa: RecompensaObtenida, event: MouseEvent): void {
        event.stopPropagation();
        this.pedirCambioEstado(recompensa, EstadoRecompensa.VENCIDO, `¿Marcar la recompensa de ${recompensa.clienteNombre} como vencida?`);
    }

    onAnular(recompensa: RecompensaObtenida, event: MouseEvent): void {
        event.stopPropagation();
        this.pedirCambioEstado(recompensa, EstadoRecompensa.ANULADO, `¿Anular la recompensa de ${recompensa.clienteNombre}? Esta acción no se puede deshacer.`);
    }

    onReactivar(recompensa: RecompensaObtenida, event: MouseEvent): void {
        event.stopPropagation();
        this.pedirCambioEstado(recompensa, EstadoRecompensa.PENDIENTE, `¿Reactivar esta recompensa como pendiente?`);
    }

    private pedirCambioEstado(recompensa: RecompensaObtenida, nuevoEstado: EstadoRecompensa, mensaje: string): void {
        this.accionPendiente = { recompensa, nuevoEstado, mensaje };
        this.mostrarConfirmacion = true;
    }

    confirmarCambioEstado(): void {
        if (!this.accionPendiente) return;
        this.cambiarEstado.emit({ recompensa: this.accionPendiente.recompensa, nuevoEstado: this.accionPendiente.nuevoEstado });
        this.cancelarCambioEstado();
    }

    cancelarCambioEstado(): void {
        this.mostrarConfirmacion = false;
        this.accionPendiente = null;
    }

    get mensajeConfirmacion(): string {
        return this.accionPendiente?.mensaje ?? '';
    }

    pasos(recompensa: RecompensaObtenida) {
        return [
            { label: 'Obtenida', fecha: recompensa.fechaObtencion, activo: true, icono: 'pi pi-sparkles' },
            { label: 'Vencimiento', fecha: recompensa.fechaVencimiento, activo: !!recompensa.fechaVencimiento, icono: 'pi pi-clock' },
            { label: 'Canjeada', fecha: recompensa.fechaCanje, activo: !!recompensa.fechaCanje, icono: 'pi pi-check-circle' },
        ];
    }
}