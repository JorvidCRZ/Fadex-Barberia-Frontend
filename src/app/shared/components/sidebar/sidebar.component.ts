import { map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TokenService } from '../../../core/services/auth/token.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SidebarItemsService } from '../../../core/services/layout/sidebar-items.service';
import { NotificationService } from '../../../core/services/common/notification.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe, PanelMenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  private router = inject(Router);
  private tokenService = inject(TokenService);
  private notify = inject(NotificationService);
  private sidebarItemsService = inject(SidebarItemsService);

  constructor() {
    this.tokenService.initPermisos();
  }

  menu$ = this.tokenService.permisos$.pipe( map((permisos) => {
      const role = this.tokenService.getPrimaryRole();
      const items = this.sidebarItemsService.getSidebarItems(permisos, role);
      return this.addClickHandlers(items);
    })
  );

  private addClickHandlers(items: MenuItem[]): MenuItem[] {
    return items.map((item) => ({...item,command: (event: any) => {this.handleMenuItemClick(event);
        if (item.command) {
          item.command(event);
        }
      },
      items: item.items ? this.addClickHandlers(item.items) : undefined
    }));
  }

  private handleMenuItemClick(event: any) {
    // Cerrar sidebar en móvil después de hacer clic
    if (window.innerWidth < 768) {
      // Emitir evento para cerrar el sidebar desde el componente padre
      // O simplemente hacer que el overlay se cierre
    }
  }

  logout() {
    this.tokenService.clearTokens();
    this.notify.showSuccess('Has cerrado sesión exitosamente');
    this.router.navigate(['/'], { replaceUrl: true });
  }

  toggleCollapsed() {
    this.collapsedChange.emit(!this.collapsed);
  }
}
