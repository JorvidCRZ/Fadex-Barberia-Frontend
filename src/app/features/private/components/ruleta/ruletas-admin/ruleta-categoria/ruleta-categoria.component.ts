import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuletaItemResponse, TipoPremio } from '@/app/core/models/ruleta/ruleta-item.model';
import { ResumenCategoria } from '@/app/core/models/ruleta/ruleta-grafico.model';

@Component({
    standalone: true,
    selector: 'app-ruleta-categoria',
    imports: [CommonModule],
    templateUrl: './ruleta-categoria.html',
    styleUrl: './ruleta-categoria.css',
})
export class RuletaCategoriasComponent {
    @Input({ required: true }) set items(value: RuletaItemResponse[]) {this._items = value ?? [];this.mostrarEstado = true;this.recalcular();}
    resumen: ResumenCategoria[] = [];
    probabilidadTotal = 0;
    mostrarEstado = true;

    get items(): RuletaItemResponse[] { return this._items; }
    private _items: RuletaItemResponse[] = [];

    private readonly etiquetas: Record<TipoPremio, string> = {
        [TipoPremio.DESCUENTO]: 'Descuento',
        [TipoPremio.SERVICIO]: 'Servicio',
        [TipoPremio.PRODUCTO]: 'Producto',
        [TipoPremio.CUPON]: 'Cupón',
        [TipoPremio.SIN_PREMIO]: 'Sin premio',
    };

    private readonly estilos: Record<TipoPremio, string> = {
        [TipoPremio.DESCUENTO]: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
        [TipoPremio.SERVICIO]: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
        [TipoPremio.PRODUCTO]: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
        [TipoPremio.CUPON]: 'bg-violet-500/10 text-violet-400 border border-violet-500/30',
        [TipoPremio.SIN_PREMIO]: 'bg-red-500/10 text-red-400 border border-red-500/30',
    };

    private recalcular(): void {
        const activos = this._items.filter(i => i.activo);
        const grupos = new Map<TipoPremio, { cantidad: number, probabilidad: number }>();

        for (const item of activos) {
            const actual = grupos.get(item.tipoPremio) ?? { cantidad: 0, probabilidad: 0 };
            actual.cantidad += 1;
            actual.probabilidad += item.probabilidad ?? 0;
            grupos.set(item.tipoPremio, actual);
        }

        this.resumen = Array.from(grupos.entries()).map(([tipo, datos]) => ({
            tipo,
            etiqueta: this.etiquetas[tipo],
            cantidad: datos.cantidad,
            probabilidadTotal: Math.round(datos.probabilidad * 100) / 100,
            clases: this.estilos[tipo],
        })).sort((a, b) => b.probabilidadTotal - a.probabilidadTotal);

        this.probabilidadTotal = Math.round(activos.reduce((sum, i) => sum + (i.probabilidad ?? 0), 0) * 100) / 100;
    }

    get balanceado(): boolean {
        return Math.abs(this.probabilidadTotal - 100) < 0.01;
    }

    get diferencia(): number {
        return Math.round((100 - this.probabilidadTotal) * 100) / 100;
    }

    cerrarEstado() {
    this.mostrarEstado = false;
}
}