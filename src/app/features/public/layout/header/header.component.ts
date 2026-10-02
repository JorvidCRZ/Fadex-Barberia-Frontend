import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { TokenService } from '@/app/core/services/auth/token.service';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { PUBLIC_PAGES } from '../../../../core/config/sites.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LogoComponent],
  templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {
  // private tokenService = inject(TokenService);
  isAuthenticated = false;
  profileLink = ['/login'];

  publicNav = PUBLIC_PAGES;

  ngOnInit() {
    // this.isAuthenticated = this.tokenService.isLogged();
    // this.profileLink = [this.tokenService.getHomeByRole()];
  }
}
