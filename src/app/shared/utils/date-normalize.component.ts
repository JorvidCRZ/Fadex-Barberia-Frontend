export class DateHelper {
    static format(fecha: string | Date | null | undefined): string {
        if (!fecha) { return '-'; }

        const valor = String(fecha).trim();

        if (/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
            const [anio, mes, dia] = valor.split('-').map(Number);
            const date = new Date(anio, mes - 1, dia);
            if (isNaN(date.getTime())) { return '-'; }
            const diaFormateado = String(date.getDate()).padStart(2, '0');
            const mesFormateado = String(date.getMonth() + 1).padStart(2, '0');
            const anioFormateado = date.getFullYear();
            return `${diaFormateado}/${mesFormateado}/${anioFormateado}`;
        }

        const date = fecha instanceof Date ? fecha : new Date(valor.replace(/\.(\d{3})\d+/, '.$1'));
        if (isNaN(date.getTime())) { return '-'; }

        const tieneHora = /T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/i.test(valor)
            || /\s\d{2}:\d{2}(:\d{2})?(\.\d+)?$/i.test(valor);

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();

        if (!tieneHora) {
            return `${dia}/${mes}/${anio}`;
        }

        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    }
}