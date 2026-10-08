import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RecompensaObtenida } from '@/app/core/models/ruleta/recompensa.model';

@Component({
    selector: 'app-recompensa-canjear-form',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './recompensa-form.html',
})
export class RecompensaCanjearFormComponent {
    @Input({ required: true }) recompensa!: RecompensaObtenida;
    @Output() confirmar = new EventEmitter<string>();
    @Output() cancelarEvento = new EventEmitter();

    onConfirmar(): void {
        this.confirmar.emit(this.recompensa.codigoCanje);
    }

    onCancelar(): void {
        this.cancelarEvento.emit();
    }
}