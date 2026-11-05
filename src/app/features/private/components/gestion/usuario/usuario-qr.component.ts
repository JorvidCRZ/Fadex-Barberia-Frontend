import { Component, inject, input, model, output, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';

@Component({
  selector: 'app-usuario-qr',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './usuario-qr.html',
})
export class UsuarioQrComponent {
  private readonly usuarioService = inject(UsuarioService);
  private readonly notify = inject(NotificationService);

  visible = model(false);
  usuarioId = input<number | null>(null);
  /** true si el usuario ya tiene QR (el anterior quedará inválido) */
  regenerar = input(false);
  /** Imagen del QR actual, solo para mostrarla atenuada al regenerar */
  qrActual = input<string | null>(null);
  generado = output<void>();

  generando = signal(false);

  cerrar(): void {
    this.visible.set(false);
  }

  confirmar(): void {
    const id = this.usuarioId();
    if (!id) {
      this.notify.showWarn('No se pudo identificar el usuario.');
      return;
    }
    if (this.generando()) return;

    this.generando.set(true);
    this.usuarioService
      .regenerarQr(id)
      .pipe(finalize(() => this.generando.set(false)))
      .subscribe({
        next: (blob) => {
          if (!(blob instanceof Blob)) {
            this.notify.showWarn('No se pudo generar el QR.');
            return;
          }
          this.notify.showSuccess('Código QR generado correctamente');
          this.cerrar();
          this.generado.emit();
        },
        error: (err) => this.notify.showHttpError(err, 'Generar QR'),
      });
  }
}