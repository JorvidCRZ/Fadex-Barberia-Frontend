import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { GiroResponse } from '@/app/core/models/ruleta/giro.model';

@Component({
    selector: 'app-giro-table',
    standalone: true,
    imports: [CommonModule, TableModule],
    templateUrl: './giro-table.html',
})
export class GiroTableComponent {
    @Output() lazyLoad = new EventEmitter<TableLazyLoadEvent>();
    @Input({ required: true }) giros: GiroResponse[] = [];
    @Input() cargado = false;
    @Input() totalRecords = 0;
    @Input() rows = 20;
}