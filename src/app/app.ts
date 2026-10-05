import { Toast } from 'primeng/toast';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { LoadingService } from './core/services/common/loading.service';
import { ConfiguracionService } from './core/services/common/configuracion.service';

registerLocaleData(localeEsPe);

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Toast, ProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly configService = inject(ConfiguracionService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly loadingService = inject(LoadingService);
  readonly isLoading = toSignal(this.loadingService.isLoading$, { initialValue: false });

  protected readonly title = signal('fadex-barberia-frontend');
  // private tokenService = inject(TokenService);

  ngOnInit(): void {
    this.configService.cargarConfiguracion();

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
    // this.tokenService.initPermisos();
  }
}
