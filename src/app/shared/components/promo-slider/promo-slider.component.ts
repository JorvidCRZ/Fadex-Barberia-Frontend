
import { Component, Input, OnInit, inject, signal, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Banner } from '../../../core/models/layout/banner.model';
import { BannerService } from '../../../core/services/layout/banner.service';
import { environment } from '../../../../environments/environment.development';


@Component({
  selector: 'app-promo-slider',
  imports: [CommonModule, CarouselModule],
  templateUrl: './promo-slider.html',
  styleUrls: ['./promo-slider.scss'],
})
export class PromoSliderComponent implements OnInit {

  @Input() bannerKey!: string;

  private sliderService = inject(BannerService);
  private cdr = inject(ChangeDetectorRef);
  sliders = signal<Banner[]>([]);
  apiBaseUrl = environment.apiBaseUrl;

  isMobile = false;

  ngOnInit() {
    this.cargarSliders();
    this.onResize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 1024;
    this.cdr.detectChanges();
  }

  getNumVisible(base: number): number {
    return Math.min(base, this.sliders().length || 1);
  }

  getResponsiveOptions() {
    const total = this.sliders().length || 1;
    return [
      { breakpoint: '1400px', numVisible: Math.min(4, total), numScroll: 1 },
      { breakpoint: '1199px', numVisible: Math.min(3, total), numScroll: 1 },
      { breakpoint: '991px', numVisible: Math.min(2, total), numScroll: 1 },
      { breakpoint: '767px', numVisible: Math.min(1, total), numScroll: 1 }
    ];
  }

  cargarSliders() {
    this.sliderService.obtenerBannersPublicos(this.bannerKey).subscribe(resp => {
      this.sliders.set(resp.data || []);
    });
  }
}
