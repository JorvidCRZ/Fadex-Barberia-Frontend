import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { PUBLIC_PAGES } from '../../../../core/config/sites.config';
import { TokenService } from '../../../../core/services/auth/token.service';
import { CarritoService } from '../../../../core/services/catalogos/carrito.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private tokenService = inject(TokenService);
  private carritoService = inject(CarritoService);
  publicNav = PUBLIC_PAGES;
  isAuthenticated = this.tokenService.isAuthenticated;
  profileLink = computed(() => [this.tokenService.getHomeByRole()]);

  mobileActions = [
    {label: 'Carrito',icon: 'pi pi-shopping-cart',route: '/carrito',requiresAuth: false,badge: '0',},
    // { label: 'Avisos', icon: 'pi pi-bell', route: null, requiresAuth: true, badge: '2' },
    { label: 'Reclamos', icon: 'pi pi-book', route: '/reclamos', requiresAuth: true, badge: null },
  ];

  cartItemCount = this.carritoService.cantidad;
}
