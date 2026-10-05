import { filter } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BotonCarritoComponent } from '../../../shared/components/boton-carrito/boton-carrito.component';
import { BotonComunicacionComponent } from '../../../shared/components/boton-comunicacion/boton-comunicacion.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, BotonCarritoComponent, BotonComunicacionComponent],
  template: `
  <app-header/>
    <main [class.min-h-screen]="!isCompactPage()" class="pt-20 bg-black pb-0">
      <router-outlet></router-outlet>
      <app-boton-carrito></app-boton-carrito>
      <app-boton-comunicacion></app-boton-comunicacion>
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
