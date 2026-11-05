import { finalize } from 'rxjs';
import { Component, effect, inject, model, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';

/** Marca el grupo con { mismatch: true } cuando las contraseñas no coinciden. */
const coincidenPasswords: ValidatorFn = (group) => {
  const password = group.get('password')?.value ?? '';
  const confirm = group.get('passwordConfirm')?.value ?? '';
  return password && confirm && password !== confirm ? { mismatch: true } : null;
};

@Component({
  selector: 'app-registrar-client',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, PasswordModule,
    ButtonComponent, ModalComponent,
  ],
  templateUrl: './cliente-registrar.html',
  styleUrl: './cliente-modal.scss',
})
export class ClienteRegistrarComponent {

  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private notify = inject(NotificationService);

  visible = model(false);
  guardado = output<void>();
  guardando = signal(false);
  displayConfirm = signal(false);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      telefono: ['', [Validators.required, Validators.pattern('^\\d{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
    },
    { validators: coincidenPasswords },
  );

  constructor() {
    effect(() => {
      if (this.visible()) this.form.reset();
    });
  }

  get f() {
    return this.form.controls;
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const soloDigitos = input.value.replace(/\D/g, '').slice(0, 9);
    input.value = soloDigitos;
    this.f.telefono.setValue(soloDigitos);
  }

  volver(): void {
    this.visible.set(false);
  }

  abrirConfirmacion(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.showError('Por favor corrige los campos marcados antes de continuar.', 'Error de validación');
      return;
    }
    this.displayConfirm.set(true);
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.guardando.set(true);
    const v = this.form.getRawValue();

    const payload: any = {
      nombre: v.nombre,
      apellido: v.apellido,
      telefono: v.telefono,
      email: v.email,
      username: v.usuario,
      password: v.password,
      idRol: 3,
    };

    this.usuarioService
      .registrarCliente(payload)
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: (res: any) => {
          this.displayConfirm.set(false);
          this.notify.showSuccess(res?.message || 'Cliente creado correctamente');
          this.visible.set(false);
          this.guardado.emit();
        },
        error: (err: any) => {
          console.error('Error al registrar cliente:', err);
          this.displayConfirm.set(false);
          this.notify.showHttpError(err, 'Crear cliente');
        },
      });
  }
}