import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RuletaItemResponse } from '@/app/core/models/ruleta/ruleta-item.model';
import { RuletaResponse } from '@/app/core/models/ruleta/ruleta.model';
import { RuletaSegmento } from '@/app/core/models/ruleta/ruleta-grafico.model';
import { RuletaGraficoComponent } from '@/app/shared/components/ruleta/ruleta-grafico.component';

@Component({
    selector: 'app-ruleta-preview',
    standalone: true,
    imports: [CommonModule, RuletaGraficoComponent],
    templateUrl: './ruleta-preview.html',
    styleUrl: './ruleta-preview.css'
})
export class RuletaPreviewComponent implements OnChanges {
    @Input({ required: true }) items: RuletaItemResponse[] = [];
    @Input() ruleta: RuletaResponse | null = null;
    @Input() activa = false;

    musicaActiva = false;
    segmentos: RuletaSegmento[] = [];
    resultado: RuletaItemResponse | null = null;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['activa']) {
            this.musicaActiva = this.activa;
        }
        if (changes['items']) {
            this.segmentos = this.items.filter(item => item.activo).map(item => ({
                id: item.itemId,
                label: item.nombre,
                sublabel: `${item.probabilidad}%`,
                tipoPremio: item.tipoPremio,
                imagen: item.imagenUrl,
                peso: item.probabilidad,
                data: item
            }));
        }
    }

    onPremioGanado(segmento: RuletaSegmento): void {
        this.resultado = segmento.data as RuletaItemResponse;
    }
}