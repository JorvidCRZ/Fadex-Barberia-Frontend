import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule],
  template: `
    <div class="producto-page-paginator">
      <p-paginator
        [first]="first"
        [rows]="rows"
        [totalRecords]="totalRecords"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [showCurrentPageReport]="true"
        [currentPageReportTemplate]="'Página {currentPage} de {totalPages} · {totalRecords} ' + etiqueta"
        (onPageChange)="pageChange.emit($event)" />
    </div>
  `,
})
export class PaginatorComponent {
  @Input() first = 0;
  @Input() rows = 10;
  @Input() totalRecords = 0;
  /** Texto después del total: 'venta(s)', 'reserva(s)', 'categoría(s)' */
  @Input() etiqueta = 'registro(s)';
  /** Debe incluir el valor de [rows], si no el selector queda vacío */
  @Input() rowsPerPageOptions: number[] = [5, 10, 25, 50];
  @Output() pageChange = new EventEmitter<PaginatorState>();
}