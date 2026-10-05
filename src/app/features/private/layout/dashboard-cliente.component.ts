import { Component, inject } from '@angular/core';
import { PrivateShellComponent } from './private-shell.component';
import { TokenService } from '../../../core/services/auth/token.service';

@Component({
  selector: 'app-dashboard-cliente',
  imports: [PrivateShellComponent],
  template: `<app-private-shell title="Mi cuenta" roleLabel="Área del cliente" roleAccentClass="bg-blue-500" [userFullName]="userFullName" />`,
})
export class DashboardClienteComponent {
  private readonly tokenService = inject(TokenService);
  readonly userFullName = this.tokenService.getUserDisplayName();
}