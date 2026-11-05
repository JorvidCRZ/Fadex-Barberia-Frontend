import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { PUBLIC_PAGES } from '../../../../core/config/sites.config';
import { TokenService } from '../../../../core/services/auth/token.service';
import { CarritoService } from '../../../../core/services/catalogos/carrito.service';
import { AuthService } from '@/app/core/services/auth/auth.service';
import { NotificationService } from '@/app/core/services/common/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notify = inject(NotificationService);
  private carritoService = inject(CarritoService);
  publicNav = PUBLIC_PAGES;
  isAuthenticated = this.tokenService.isAuthenticated;
  profileLink = computed(() => [this.tokenService.getHomeByRole()]);
  logout(): void {
    this.tokenService.clearTokens();
    this.router.navigate(['/'], { replaceUrl: true });
    this.authService.logout();
    this.notify.showSuccess('Has cerrado sesión exitosamente');
  }

  mobileActions = [
    {label: 'Carrito',icon: 'pi pi-shopping-cart',route: '/carrito',requiresAuth: false,badge: '0',},
    // { label: 'Avisos', icon: 'pi pi-bell', route: null, requiresAuth: true, badge: '2' },
    { label: 'Reclamos', icon: 'pi pi-book', route: '/reclamos', requiresAuth: true, badge: null },
  ];

  cartItemCount = this.carritoService.cantidad;
}
