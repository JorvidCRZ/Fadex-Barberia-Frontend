import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
// import { TokenService } from '@/app/core/services/auth/token.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonComponent, ModalComponent],
  template: `
   @if (!verificado) {
  <div class="flex min-h-screen items-center justify-center bg-ui-black">
    <div class="text-center">
      <i class="pi pi-spin pi-spinner text-4xl text-brand-gold"></i>
      <p class="mt-4 text-text-primary">Verificando acceso...</p>
    </div>
  </div>
}
<app-modal [(visible)]="showModal" titulo="Acceso restringido" mode="ver" icono="pi-lock" maxWidth="26rem" [cerrable]="false">
  <div class="py-4 text-center">
    <div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-brand-gold-soft">
      <i class="pi pi-lock text-2xl text-brand-gold"></i>
    </div>
    <h3 class="mb-2 text-xl font-bold text-text-primary">¡Necesitas iniciar sesión!</h3>
    <p class="mb-6 text-sm text-text-secondary">Para agendar una cita debes tener una cuenta activa. Inicia sesión para continuar.</p>
    <div class="flex justify-center gap-3">
      <app-button variant="cancel" icon="pi-times" label="Cancelar" (clicked)="cancelar()" />
      <app-button variant="primary" icon="pi-sign-in" label="Iniciar sesión" (clicked)="irALogin()" />
    </div>
  </div>
</app-modal>
  `,
})
export class ReservasComponent implements OnInit {
  showModal = false;
  verificado = false;

  // constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.verificarAutenticacion();
  }

  verificarAutenticacion(): void {
    setTimeout(() => {
      // const isLoggedIn = this.tokenService.isLogged();
      // if (isLoggedIn) {
      //   this.router.navigate(['/mi-cuenta/reservar/agendar']);
      // } else {
      this.showModal = true;
      // }
      // this.verificado = true;
    }, 1000);
  }

  irALogin(): void {
    this.showModal = false;
    // this.router.navigate(['/login'], { queryParams: { returnUrl: '/mi-cuenta/reservar/agendar' }});
  }

  cancelar(): void {
    this.showModal = false;
    // this.router.navigate(['/']);
  }
}