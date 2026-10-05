import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '../utils/date-normalize.component';
@Pipe({
    name: 'dateHelper',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {
    transform(fecha: string | Date | null | undefined): string {
        return DateHelper.format(fecha);
    }
}