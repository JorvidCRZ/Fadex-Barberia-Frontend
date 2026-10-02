import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
// import { PUBLIC_PAGES } from '@/app/core/config/sites.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {

  // publicNav = PUBLIC_PAGES;

}
