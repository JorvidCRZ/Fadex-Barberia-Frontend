import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { PUBLIC_PAGES } from '../../../../core/config/sites.config';
import { TokenService } from '../../../../core/services/auth/token.service';
import { CarritoItem } from '../../../../core/models/catalogos/carrito.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private tokenService = inject(TokenService);
  publicNav = PUBLIC_PAGES;
  isAuthenticated = this.tokenService.isLogged();
  profileLink = [this.tokenService.getHomeByRole()];

  mobileActions = [
    {label: 'Carrito',icon: 'pi pi-shopping-cart',route: '/carrito',requiresAuth: false,badge: '0',},
    // { label: 'Avisos', icon: 'pi pi-bell', route: null, requiresAuth: true, badge: '2' },
    { label: 'Reclamos', icon: 'pi pi-book', route: '/reclamos', requiresAuth: true, badge: null },
  ];

  private items = signal<CarritoItem[]>([]);
  cartItemCount = computed(() => this.items().reduce((total, item) => total + item.cantidad, 0));
}
