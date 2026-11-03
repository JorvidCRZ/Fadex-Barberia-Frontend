import { map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TokenService } from '../../../core/services/auth/token.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { ROL_LABEL, RolUsuario, USER_MENU } from '../../../core/config/menu.usuario.config';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MenuModule],
  template: `
    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-ui-border bg-ui-elevated text-text-secondary transition-colors duration-200 hover:border-brand-gold hover:text-brand-gold"
      aria-haspopup="true"
      aria-label="Menú de usuario"
      (click)="menu.toggle($event)"
    >
      <i class="pi pi-user"></i>
    </button>

    <p-menu
      #menu
      [model]="items()"
      [popup]="true"
    />
  `,
})
export class UserMenuComponent {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private notify = inject(NotificationService);

  items = toSignal(
    this.tokenService.permisos$.pipe(map((permisos) => this.construirMenu(permisos))),
    { initialValue: [] as MenuItem[] },
  );

  private construirMenu(permisos: string[]): MenuItem[] {
    const rol = this.tokenService.getPrimaryRole() as RolUsuario;
    const entradas = USER_MENU[rol] ?? [];
    // Raíz del rol: /dashboard/admin, /dashboard/barbero o /mi-cuenta
    const base = this.tokenService.getHomeByRole();
    const omitirPermisos = rol === 'cliente';

    const titulo = [this.tokenService.getUserDisplayName(), ROL_LABEL[rol]].filter(Boolean).join(' · ');

    // Antes el icono del header llevaba directo al panel; ahora es la primera opción del menú.
    const panel: MenuItem = { label: 'Mi panel', icon: 'pi pi-home', routerLink: [base] };

    const navegacion: MenuItem[] = [
      panel,
      ...entradas
        .filter((e) => omitirPermisos || permisos.length === 0 || !e.permission || permisos.includes(e.permission))
        .map((e) => ({ label: e.label, icon: e.icon, routerLink: [base, ...e.route] })),
    ];

    return [
      {
        label: titulo,
        items: [
          ...navegacion,
          { separator: true },
          { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() },
        ],
      },
    ];
  }

  logout(): void {
    this.tokenService.clearTokens();
    this.notify.showSuccess('Has cerrado sesión exitosamente');
    this.router.navigate(['/'], { replaceUrl: true });
  }
}