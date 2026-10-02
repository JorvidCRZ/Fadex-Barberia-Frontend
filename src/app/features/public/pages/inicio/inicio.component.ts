import { Component } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { HOME_BANNERS } from '../../../../core/config/banner.config';

@Component({
  selector: 'app-inicio',
  imports: [BannerComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class InicioComponent {
  readonly banners = HOME_BANNERS;
}
