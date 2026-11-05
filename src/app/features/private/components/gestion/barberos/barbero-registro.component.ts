import { Component, effect, inject, model, output, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { BarberoRegister } from '@/app/core/models/auth/usuario/barbero-register.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import {
  EMAIL_PATTERN, SUELDO_MAX, TELEFONO_PATTERN, USUARIO_PATTERN, mensajeError, passwordsIguales,
} from './barbero-utils.component';

@Component({
  selector: 'app-barbero-nuevo',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, InputNumberModule, KeyFilterModule, MessageModule, PasswordModule,
    ModalComponent, ButtonComponent,
  ],
  templateUrl: './barbero-registro.html',
})
export class BarberoRegistroComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly notify = inject(NotificationService);

  visible = model(false);
  creado = output<void>();

  guardando = signal(false);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.pattern(TELEFONO_PATTERN)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(EMAIL_PATTERN)]],

      experiencia: [0 as number | null, [Validators.required, Validators.min(0), Validators.max(60)]],
      sueldo: [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(SUELDO_MAX)]],
      comision: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],

      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(USUARIO_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      passwordConfirm: ['', Validators.required],
    },
    { validators: passwordsIguales('password', 'passwordConfirm') },
  );

  /** Mensajes propios por campo; lo que no esté aquí usa el mensaje genérico de mensajeError() */
  private readonly mensajes: Record<string, Record<string, string>> = {
    nombre: { required: 'El nombre es requerido.' },
    apellido: { required: 'El apellido es requerido.' },
    telefono: { required: 'El teléfono es requerido.', pattern: 'Debe contener 9 dígitos.' },
    email: { required: 'El email es requerido.', pattern: 'Ingresa un email válido.' },
    experiencia: { required: 'Indica los años de experiencia.' },
    sueldo: { required: 'El sueldo es requerido.', min: 'El sueldo debe ser mayor a 0.' },
    comision: { required: 'La comisión es requerida.' },
    usuario: { required: 'El usuario es requerido.', pattern: 'No puede contener espacios.' },
    password: { required: 'La contraseña es requerida.' },
    passwordConfirm: { required: 'Confirma la contraseña.' },
  };

  constructor() {
    // Cada vez que el modal se abre, el formulario empieza limpio
    effect(() => {
      if (this.visible()) untracked(() => this.form.reset());
    });
  }

  error(campo: string): string | null {
    const confirm = this.form.controls.passwordConfirm;
    if (campo === 'passwordConfirm' && confirm.touched && this.form.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden.';
    }
    return mensajeError(this.form.get(campo), this.mensajes[campo]);
  }

  cerrar(): void {
    this.visible.set(false);
  }

  guardar(): void {
    if (this.guardando()) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const payload: BarberoRegister = {
      idRol: 2,
      nombre: v.nombre.trim(),
      apellido: v.apellido.trim(),
      telefono: v.telefono,
      email: v.email.trim().toLowerCase(),
      username: v.usuario.trim(),
      password: v.password,
      experiencia: v.experiencia ?? 0,
      sueldo: v.sueldo ?? 0,
      comision: v.comision ?? 0,
      descripcion: '',
      fotoUrl: null,
    };

    this.guardando.set(true);
    this.usuarioService.registrarBarbero(payload).subscribe({
      next: (res) => {
        this.guardando.set(false);
        this.notify.showSuccess(res?.message || 'Barbero creado correctamente');
        this.cerrar();
        this.creado.emit();
      },
      error: (err) => {
        this.guardando.set(false);
        this.notify.showHttpError(err, 'Crear barbero');
      },
    });
  }
}