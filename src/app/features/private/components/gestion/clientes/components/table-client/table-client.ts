import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ClienteFilterMode } from '@/app/core/models/gestion/cliente/cliente-filter.model';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';

@Component({
  selector: 'app-table-client',
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, TooltipModule],
  templateUrl: './table-client.html',
  styleUrl: './table-client.css',
})
export class TableClient {

  @Input() clients: Cliente[] = [];

  @Input() totalElements: number = 0;

  @Input() currentPage: number = 0;

  @Input() totalPages: number = 0;

  @Input() activeFilter: ClienteFilterMode = 'todos';

  @Input() isSearchMode: boolean = false;

  @Input() rows: number = 10;

  @Output() pageChange = new EventEmitter<number>();

  @Output() delete = new EventEmitter<number>();

  @Output() reactivate = new EventEmitter<number>();

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.rows;
    const page = Math.floor(first / rows);
    this.pageChange.emit(page);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onReactivate(id: number): void {
    this.reactivate.emit(id);
  }

  initials(name: string | null | undefined): string {
    if (!name) return '';

    const parts = name.trim().split(' ').filter(Boolean);

    if (parts.length === 0) return '';
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
}