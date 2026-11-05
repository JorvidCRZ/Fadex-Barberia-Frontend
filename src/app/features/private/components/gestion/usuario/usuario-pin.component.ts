import { Component, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { REGEX_PIN } from './usuario.utils.component';


@Component({
  selector: 'app-usuario-pin',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, MessageModule, ModalComponent, ButtonComponent],
  templateUrl: './usuario-pin.html',
})
export class UsuarioPinComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly notify = inject(NotificationService);

  visible = model(false);
  usuarioId = input<number | null>(null);
  asignado = output<void>();

  guardando = signal(false);
  enviado = signal(false);

  form = this.fb.nonNullable.group({
    pin: ['', [Validators.required, Validators.pattern(REGEX_PIN)]],
  });

  constructor() {
    effect(() => {
      if (this.visible()) {
        untracked(() => {
          this.form.reset();
          this.enviado.set(false);
        });
      }
    });
  }

  invalido(): boolean {
    const pin = this.form.controls.pin;
    return pin.invalid && (pin.touched || this.enviado());
  }

  cerrar(): void {
    this.visible.set(false);
  }

  guardar(): void {
    const id = this.usuarioId();
    if (!id) {
      this.notify.showWarn('No se pudo identificar el usuario.');
      return;
    }
    if (this.guardando()) return;

    this.enviado.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    this.usuarioService
      .asignarPin(id, this.form.controls.pin.value.trim())
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('PIN asignado correctamente');
          this.cerrar();
          this.asignado.emit();
        },
        error: (err) => this.notify.showHttpError(err, 'Asignar PIN'),
      });
  }
}