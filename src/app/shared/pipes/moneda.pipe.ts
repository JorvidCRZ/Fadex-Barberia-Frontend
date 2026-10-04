import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda',
  standalone: true,
})
export class MonedaPipe implements PipeTransform {
  transform(value: number | string | null | undefined, decimales: number = 2): string {
    if (value === null || value === undefined || value === '') {
      return 'S/ 0.00';
    }

    const numero = typeof value === 'string' ? Number.parseFloat(value) : value;

    if (Number.isNaN(numero)) {
      return 'S/ 0.00';
    }

    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    }).format(numero);
  }
}

@Pipe({
  name: 'soles',
  standalone: true,
})
export class SolesPipe extends MonedaPipe {}
