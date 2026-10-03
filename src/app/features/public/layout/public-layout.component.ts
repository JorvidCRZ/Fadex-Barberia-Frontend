import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
  <app-header/>
    <main [class.min-h-screen]="!isCompactPage()" class="sm:pt-22 bg-black pb-0">
      <router-outlet></router-outlet>
    </main>
  <app-footer/>`,})
  
export class PublicLayoutComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly isCompactPage = signal(this.isInicioPage(this.router.url));

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => this.isCompactPage.set(this.isInicioPage(event.urlAfterRedirects)));
  }

  private isInicioPage(url: string): boolean {
    return url === '/' || url === '/inicio';
  }
}
