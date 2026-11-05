import { Component, effect, inject, model, output, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { AdminRegister } from '@/app/core/models/auth/usuario/admin-register.model';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { coincidenCampos, REGEX_TELEFONO, soloDigitos } from './usuario.utils.component';

const ID_ROL_ADMIN = 1;

@Component({
  selector: 'app-usuario-registrar',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, MessageModule, ModalComponent, ButtonComponent],
  templateUrl: './usuario-registrar.html',
})
export class UsuarioRegistrarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly notify = inject(NotificationService);

  visible = model(false);
  creado = output<void>();

  guardando = signal(false);
  enviado = signal(false);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      telefono: ['', [Validators.pattern(REGEX_TELEFONO)]],
      email: ['', [Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: coincidenCampos('password', 'passwordConfirm') },
  );

  constructor() {
    // Cada vez que se abre, el formulario empieza limpio
    effect(() => {
      if (this.visible()) {
        untracked(() => {
          this.form.reset();
          this.enviado.set(false);
        });
      }
    });
  }

  invalido(campo: string): boolean {
    return campoInvalido(this.form, campo, this.enviado());
  }

  get noCoinciden(): boolean {
    const confirmacion = this.form.controls.passwordConfirm;
    return this.form.hasError('passwordMismatch') && (confirmacion.touched || this.enviado());
  }

  onTelefono(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = soloDigitos(input.value, 9);
    input.value = valor;
    this.form.controls.telefono.setValue(valor);
  }

  cerrar(): void {
    this.visible.set(false);
  }

  guardar(): void {
    if (this.guardando()) return;
    this.enviado.set(true);
    marcarFormulario(this.form);

    if (this.form.invalid) {
      this.notify.showError('Por favor corrige los campos marcados antes de continuar.', 'Error de validación');
      return;
    }

    const v = this.form.getRawValue();
    const payload: AdminRegister = {
      nombre: v.nombre.trim(),
      apellido: v.apellido.trim(),
      telefono: v.telefono.trim() || undefined,
      email: v.email.trim() || undefined,
      username: v.username.trim(),
      password: v.password,
      idRol: ID_ROL_ADMIN,
    };

    this.guardando.set(true);
    this.usuarioService
      .registrarAdmin(payload)
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Administrador registrado correctamente.');
          this.cerrar();
          this.creado.emit();
        },
        error: (err) => this.notify.showHttpError(err, 'No se pudo registrar el administrador'),
      });
  }
}