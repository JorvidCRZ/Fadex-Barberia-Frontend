import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { UsuarioTablaResponse } from '@/app/core/models/gestion/usuario.model';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, TooltipModule, StatusBadgeComponent],
  templateUrl: './table-users.html',
  styleUrl: './table-users.css',
})
export class TableUsers {

  @Input() usuarios: UsuarioTablaResponse[] = [];
  @Input() totalElements = 0;
  @Input() pageSize = 10;
  @Input() inhabilitadosMode = false;
  @Input() isSearchMode = false;

  @Output() pageChange = new EventEmitter<{ page: number; size: number }>();
  @Output() delete = new EventEmitter<number>();
  @Output() reactivate = new EventEmitter<number>();
  @Output() createAdmin = new EventEmitter<void>();

  onLazyLoad(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;
    this.pageChange.emit({ page: Math.floor(first / rows), size: rows });
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onReactivate(id: number): void {
    this.reactivate.emit(id);
  }

  onCreateAdmin(): void {
    this.createAdmin.emit();
  }

  private getRoleList(usuario: any): string[] {
    return (usuario?.roles || []).map((rol: any) => (rol?.nombre || rol || '').toString().toUpperCase()).filter(Boolean);
  }

  hasRole(usuario: any, role: string): boolean {
    return this.getRoleList(usuario).includes(role.toUpperCase());
  }

  canDisable(usuario: any): boolean {
    return this.hasRole(usuario, 'BARBERO') || this.hasRole(usuario, 'CLIENTE');
  }

  initials(username: string): string {
    if (!username) return '';
    const parts = username.trim().split(/[\s._-]/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  getRoleBadgeClass(rol: string): string {
    const r = (rol || '').toLowerCase();
    if (r.includes('admin')) return 'badge-text role-admin';
    if (r.includes('barber')) return 'badge-text role-barbero';
    if (r.includes('recep')) return 'badge-text role-recep';
    return 'badge-text role-default';
  }
}