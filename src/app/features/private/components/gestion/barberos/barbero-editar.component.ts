import { Component, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { TextareaModule } from 'primeng/textarea';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { PersonaService } from '@/app/core/services/gestion/persona.service';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import {
  BarberoVista, EMAIL_PATTERN, SUELDO_MAX, TELEFONO_PATTERN, USUARIO_PATTERN,
  aBarberoVista, mensajeError, passwordsIguales,
} from './barbero-utils.component';

type Seccion = 'datos' | 'acceso';

@Component({
  selector: 'app-barbero-editar',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, InputNumberModule, KeyFilterModule, MessageModule, PasswordModule, TextareaModule,
    ModalComponent, ButtonComponent, EmptyStateComponent,
  ],
  templateUrl: './barbero-editar.html',
})
export class BarberoEditarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly barberoService = inject(BarberoService);
  private readonly personaService = inject(PersonaService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly notify = inject(NotificationService);

  visible = model(false);
  barberoId = input<number | null>(null);
  guardado = output<void>();

  barbero = signal<BarberoVista | null>(null);
  seccion = signal<Seccion>('datos');
  cargando = signal(false);
  error_ = signal<string | null>(null);
  guardando = signal(false);
  cambiandoUsuario = signal(false);
  cambiandoPassword = signal(false);

  /** Datos personales y profesionales */
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    telefono: ['', [Validators.pattern(TELEFONO_PATTERN)]],
    email: ['', [Validators.email, Validators.pattern(EMAIL_PATTERN)]],
    experiencia: [0 as number | null, [Validators.required, Validators.min(0), Validators.max(60)]],
    sueldo: [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(SUELDO_MAX)]],
    comision: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
    descripcion: ['', [Validators.maxLength(500)]],
  });

  /** Credenciales: cada una se guarda por separado */
  usernameCtrl = this.fb.nonNullable.control('', [
    Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern(USUARIO_PATTERN),
  ]);
  passForm = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsIguales('newPassword', 'confirmPassword') },
  );

  private readonly mensajes: Record<string, Record<string, string>> = {
    nombre: { required: 'El nombre es requerido.' },
    apellido: { required: 'El apellido es requerido.' },
    telefono: { pattern: 'Debe contener 9 dígitos.' },
    email: { pattern: 'Ingresa un email válido.' },
    experiencia: { required: 'Indica los años de experiencia.' },
    sueldo: { required: 'El sueldo es requerido.', min: 'El sueldo debe ser mayor a 0.' },
    comision: { required: 'La comisión es requerida.' },
  };

  constructor() {
    effect(() => {
      const id = this.barberoId();
      if (this.visible() && id) untracked(() => this.cargar(id));
    });
  }

  private cargar(id: number): void {
    this.cargando.set(true);
    this.error_.set(null);
    this.barbero.set(null);
    this.seccion.set('datos');

    this.barberoService
      .obtenerPorId(id)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (res: any) => {
          if (!res?.data || res.success === false) {
            this.error_.set(res?.message || 'No se pudo cargar el barbero.');
            return;
          }
          const b = aBarberoVista(res.data, { id });
          this.barbero.set(b);
          this.form.reset({
            nombre: b.nombre,
            apellido: b.apellido,
            telefono: b.telefono,
            email: b.email,
            experiencia: b.experiencia ?? 0,
            sueldo: b.sueldo,
            comision: b.comision ?? 0,
            descripcion: b.descripcion,
          });
          this.usernameCtrl.reset(b.usuario);
          this.passForm.reset();
        },
        error: () => this.error_.set('Error al cargar el barbero.'),
      });
  }

  // ═══════════════ Mensajes de error ═══════════════

  error(campo: string): string | null {
    return mensajeError(this.form.get(campo), this.mensajes[campo]);
  }

  errorUsuario(): string | null {
    return mensajeError(this.usernameCtrl, {
      required: 'El usuario es requerido.',
      pattern: 'No puede contener espacios.',
    });
  }

  errorPassword(): string | null {
    return mensajeError(this.passForm.controls.newPassword, { required: 'La contraseña es requerida.' });
  }

  errorConfirm(): string | null {
    const c = this.passForm.controls.confirmPassword;
    if (c.touched && this.passForm.hasError('passwordMismatch')) return 'Las contraseñas no coinciden.';
    return mensajeError(c, { required: 'Repite la contraseña.' });
  }

  cerrar(): void {
    this.visible.set(false);
  }

  // ═══════════════ Datos ═══════════════

  guardar(): void {
    const id = this.barberoId();
    const b = this.barbero();
    if (!id || !b || this.guardando()) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    this.guardando.set(true);

    forkJoin([
      this.personaService.actualizarPersona(b.personaId, {
        nombre: v.nombre.trim(),
        apellido: v.apellido.trim(),
        telefono: v.telefono,
        email: v.email.trim().toLowerCase(),
      }),
      this.barberoService.actualizar(id, {
        experiencia: v.experiencia ?? 0,
        sueldo: v.sueldo ?? 0,
        comision: v.comision ?? 0,
        descripcion: v.descripcion.trim(),
      }),
    ])
      .pipe(finalize(() => this.guardando.set(false)))
      .subscribe({
        next: ([persona, barbero]) => {
          if (!persona?.success || !barbero?.success) {
            this.notify.showError('No se pudieron guardar todos los cambios.');
            return;
          }
          this.notify.showSuccess('Datos actualizados correctamente.');
          this.guardado.emit();
          this.cerrar();
        },
        error: (err) => this.notify.showHttpError(err, 'Actualizar barbero'),
      });
  }

  // ═══════════════ Acceso ═══════════════

  cambiarUsuario(): void {
    const b = this.barbero();
    if (!b?.usuarioId) {
      this.notify.showWarn('No se pudo identificar el usuario asociado al barbero.');
      return;
    }
    if (this.usernameCtrl.invalid) {
      this.usernameCtrl.markAsTouched();
      return;
    }

    const username = this.usernameCtrl.value.trim();
    if (username === b.usuario) {
      this.notify.showWarn('El nuevo nombre de usuario es igual al actual.');
      return;
    }

    this.cambiandoUsuario.set(true);
    this.usuarioService
      .updateUsername(b.usuarioId, { username })
      .pipe(finalize(() => this.cambiandoUsuario.set(false)))
      .subscribe({
        next: (res) => {
          this.barbero.set({ ...b, usuario: username });
          this.notify.showSuccess(res?.message || 'Nombre de usuario actualizado correctamente');
        },
        error: (err) => this.notify.showHttpError(err, 'Actualizar nombre de usuario'),
      });
  }

  restablecerPassword(): void {
    const b = this.barbero();
    if (!b?.usuarioId) {
      this.notify.showWarn('No se pudo identificar el usuario asociado al barbero.');
      return;
    }
    if (this.passForm.invalid) {
      this.passForm.markAllAsTouched();
      return;
    }

    this.cambiandoPassword.set(true);
    this.usuarioService
      .resetPassword(b.usuarioId, { newPassword: this.passForm.controls.newPassword.value })
      .pipe(finalize(() => this.cambiandoPassword.set(false)))
      .subscribe({
        next: (res) => {
          this.notify.showSuccess(res?.message || 'Contraseña restablecida correctamente');
          this.passForm.reset();
        },
        error: (err) => this.notify.showHttpError(err, 'Resetear contraseña'),
      });
  }
}