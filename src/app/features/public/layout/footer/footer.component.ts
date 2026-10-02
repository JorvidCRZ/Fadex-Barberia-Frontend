import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { ButtonModule } from 'primeng/button';
// import { PUBLIC_PAGES } from '@/app/core/config/sites.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, LogoComponent, ButtonModule],
  templateUrl: './footer.html',
})
export class FooterComponent {

  // publicNav = PUBLIC_PAGES;

}
