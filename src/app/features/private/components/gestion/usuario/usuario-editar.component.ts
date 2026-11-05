import { Component, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { Observable, finalize, forkJoin } from 'rxjs';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { PersonaService } from '@/app/core/services/gestion/persona.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { campoInvalido } from '@/app/shared/utils/form-utils.component';
import { REGEX_TELEFONO, aPerfilUsuario, coincidenCampos, soloDigitos } from './usuario.utils.component';

@Component({
  selector: 'app-usuario-editar',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, MessageModule, ModalComponent, ButtonComponent, EmptyStateComponent],
  templateUrl: './usuario-editar.html',
})
export class UsuarioEditarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly personaService = inject(PersonaService);
  private readonly notify = inject(NotificationService);

  visible = model(false);
  usuarioId = input<number | null>(null);
  guardado = output<void>();

  cargando = signal(false);
  guardando = signal(false);
  error = signal('');
  enviado = signal(false);

  private usernameOriginal = '';

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.maxLength(100)]],
      apellido: ['', [Validators.maxLength(100)]],
      telefono: ['', [Validators.pattern(REGEX_TELEFONO)]],
      email: ['', [Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.minLength(8)]],
      passwordConfirm: [''],
    },
    { validators: coincidenCampos('password', 'passwordConfirm') },
  );

  constructor() {
    effect(() => {
      const abierto = this.visible();
      const id = this.usuarioId();
      untracked(() => {
        if (abierto && id) this.cargar(id);
      });
    });
  }

  invalido(campo: string): boolean {
    return campoInvalido(this.form, campo, this.enviado());
  }

  get noCoinciden(): boolean {
    return this.form.hasError('passwordMismatch') && (this.form.controls.passwordConfirm.touched || this.enviado());
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

  private cargar(id: number): void {
    this.cargando.set(true);
    this.error.set('');
    this.enviado.set(false);

    this.usuarioService
      .obtenerPorId(id)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (res) => {
          const u = aPerfilUsuario(res?.data, id);
          this.usernameOriginal = u.username;
          this.form.reset({
            nombre: u.nombre,
            apellido: u.apellido,
            telefono: u.telefono,
            email: u.email,
            username: u.username,
            password: '',
            passwordConfirm: '',
          });
        },
        error: () => this.error.set('No se pudo cargar el usuario.'),
      });
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

    const v = this.form.getRawValue();
    const username = v.username.trim();

    const tareas: Observable<unknown>[] = [
      this.personaService.actualizarPersonaPorUsuarioId(id, {
        nombre: v.nombre.trim(),
        apellido: v.apellido.trim(),
        telefono: v.telefono.trim(),
        email: v.email.trim(),
      }),
    ];
    if (username !== this.usernameOriginal) {
      tareas.push(this.usuarioService.updateUsername(id, { username }));
    }
    if (v.password) {
      tareas.push(this.usuarioService.resetPassword(id, { newPassword: v.password.trim() }));
    }

    this.guardando.set(true);
    forkJoin(tareas)
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Usuario actualizado correctamente.');
          this.cerrar();
          this.guardado.emit();
        },
        error: (err) => this.notify.showHttpError(err, 'Actualizar usuario'),
      });
  }
}