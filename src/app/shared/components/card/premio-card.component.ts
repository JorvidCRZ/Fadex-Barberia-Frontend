import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { SolesPipe } from '../../pipes/moneda.pipe';
import { SafeImageUrlPipe } from '../../pipes/safe-image-url.pipe';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PremioCard } from '../../../core/models/ruleta/ruleta-grafico.model';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
    selector: 'app-premio-card',
    standalone: true,
    imports: [ ButtonModule, SafeImageUrlPipe, SolesPipe, StatusBadgeComponent, ImageModule],
    templateUrl: './premio-card.html'
})
export class PremioCardComponent {
    @Input({ required: true }) premio!: PremioCard;
    @Input() editable = false;
    @Input() compact = false;
    @Input() mostrarPrecio = true;
    @Input() mostrarDescripcion = true;
    @Input() mostrarSubtitulo = true;
    @Input() mostrarBadge = true;
    @Input() botonTexto = 'Cambiar';
    @Output() editar = new EventEmitter<void>();
}