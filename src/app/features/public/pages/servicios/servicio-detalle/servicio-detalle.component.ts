import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Servicio } from '../../../../../core/models/catalogos/servicios.model';
import { TokenService } from '@/app/core/services/auth/token.service';
import { NotificationService } from '@/app/core/services/common/notification.service';

import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { SolesPipe } from '../../../../../shared/pipes/moneda.pipe';
import { SafeImageUrlPipe } from '../../../../../shared/pipes/safe-image-url.pipe';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge.component';

@Component({
  standalone: true,
  selector: 'app-servicio-detalle',
  imports: [CommonModule, SafeImageUrlPipe, SolesPipe, StatusBadgeComponent, ButtonComponent],
  templateUrl: './servicio-detalle.html',
})
export class ServicioDetalleComponent {
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly notify = inject(NotificationService);

  @Input() servicio: Servicio | null = null;
  @Input() cargando = false;
  @Output() cerrar = new EventEmitter<void>();

  readonly imagenPorDefecto = '/assets/servicio.jpg';

  // "Mis reservas" abre el modal de reserva cuando recibe ?nueva=1
  private readonly rutaMisReservas = '/mi-cuenta/reservas/mis-reservas';

  getImagen(): string {
    return this.servicio?.urlsMultimedia?.length ? this.servicio.urlsMultimedia[0] : this.imagenPorDefecto;
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(this.imagenPorDefecto)) { return; }
    img.src = this.imagenPorDefecto;
  }

  onReservar(): void {
    if (!this.servicio) { return; }

    const servicioId = this.servicio.servicioId;

    // Sin sesión: al login, y al entrar vuelve a "Mis reservas" con el modal abierto
    if (!this.tokenService.isLogged()) {
      this.notify.showWarn('Inicia sesión para agendar tu cita');
      this.cerrar.emit();
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: `${this.rutaMisReservas}?nueva=1&servicioId=${servicioId}` },
      });
      return;
    }

    // Con sesión: directo a "Mis reservas" con el modal abierto y el servicio elegido
    this.cerrar.emit();
    this.router.navigate([this.rutaMisReservas], {
      queryParams: { nueva: 1, servicioId },
    });
  }
}