import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { Barbero } from '@/app/core/models/gestion/barbero/barbero.model';

@Component({
  selector: 'app-table-barbero',
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, TooltipModule, StatusBadgeComponent],
  templateUrl: './table-barbero.html',
  styleUrl: './table-barbero.css',
})
export class TableBarbero {
  @Input() barberos: Barbero[] = [];
  @Input() totalElements: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() pageSize: number = 7;
  @Input() inhabilitadosMode: boolean = false;
  @Input() isSearchMode: boolean = false;
  @Output() pageChange = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() reactivate = new EventEmitter<number>();

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;
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