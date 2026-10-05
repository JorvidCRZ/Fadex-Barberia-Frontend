import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { environment } from '../../../../environments/environment.development';
import { BannerService } from '../../../core/services/layout/banner.service';
import { Banner } from '../../../core/models/layout/banner.model';

@Component({
    selector: 'app-banner',
    imports: [CommonModule, CarouselModule],
    templateUrl: './banner.html',
    styleUrl: './banner.scss',
})
export class BannerComponent implements OnInit {
    apiBaseUrl = environment.apiBaseUrl;
    @Input() bannerKey = '';
    @Input() banners: Banner[] = [];

    private bannerService = inject(BannerService);
    private cd = inject(ChangeDetectorRef);

    responsiveOptions = [{ breakpoint: '1024px', numVisible: 1, numScroll: 1 }];

    ngOnInit() {
        if (this.banners.length === 0 && this.bannerKey) {this.cargarBanner();}
    }

    cargarBanner() {
        this.bannerService.obtenerBannersPublicos(this.bannerKey).subscribe(resp => {
            setTimeout(() => {
                this.banners = resp.data || [];
                this.cd.detectChanges();
            }, 0);
        });
    }

    obtenerUrlImagen(urlImagen: string): string {
        return urlImagen.startsWith('/') ? urlImagen : this.apiBaseUrl + urlImagen;
    }
}
