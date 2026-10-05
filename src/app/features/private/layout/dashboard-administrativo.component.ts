import { Component, inject } from '@angular/core';
import { PrivateShellComponent } from './private-shell.component';
import { TokenService } from '../../../core/services/auth/token.service';

@Component({
  selector: 'app-dashboard-administrativo',
  imports: [PrivateShellComponent],
  template: `<app-private-shell title="Dashboard Administrativo" roleLabel="Administración" roleAccentClass="bg-brand-gold" [userFullName]="userFullName" />`,
})
export class DashboardAdministrativoComponent {
  private readonly tokenService = inject(TokenService);
  readonly userFullName = this.tokenService.getUserDisplayName();
}
