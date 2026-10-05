import { Component, inject } from '@angular/core';
import { PrivateShellComponent } from './private-shell.component';
import { TokenService } from '../../../core/services/auth/token.service';

@Component({
  selector: 'app-dashboard-barbero',
  imports: [PrivateShellComponent],
  template: `<app-private-shell title="Panel Barbero" roleLabel="Área del barbero" roleAccentClass="bg-brand-amber" [userFullName]="userFullName" />`,
})
export class DashboardBarberoComponent {
  private readonly tokenService = inject(TokenService);
  readonly userFullName = this.tokenService.getUserDisplayName();
}
