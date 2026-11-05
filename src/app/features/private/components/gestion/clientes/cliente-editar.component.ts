import { finalize, Observable } from 'rxjs';
import { Component, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';
import { PersonaService } from '@/app/core/services/gestion/persona.service';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';

const coincidenPasswords: ValidatorFn = (group) => {
  const nueva = group.get('newPassword')?.value ?? '';
  const confirm = group.get('confirmPassword')?.value ?? '';
  return nueva && confirm && nueva !== confirm ? { mismatch: true } : null;
};

/**
 * Modal para editar un cliente en tres pestañas: datos, usuario y contraseña.
 *
 *   <app-editar-client [(visible)]="displayEditar" [cliente]="clienteEditar()" (guardado)="onGuardado()" />
 */
@Component({
  selector: 'app-editar-client',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ModalComponent, ButtonComponent],
  templateUrl: './cliente-editar.html',
  styleUrl: './cliente-modal.scss',
})
export class ClienteEditarComponent {

  private fb = inject(FormBuilder);
  private personaService = inject(PersonaService);
  private usuarioService = inject(UsuarioService);
  private notify = inject(NotificationService);

  visible = model(false);
  cliente = input<Cliente | null>(null);
  guardado = output<void>();

  guardando = signal(false);

  datosForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    email: ['', [Validators.required, Validators.email]],
  });

  usernameForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  passwordForm = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: coincidenPasswords },
  );

  get df() { return this.datosForm.controls; }
  get uf() { return this.usernameForm.controls; }
  get pf() { return this.passwordForm.controls; }

  constructor() {
    // Cada vez que se abre el modal se cargan los formularios con los datos del cliente.
    effect(() => {
      const abierto = this.visible();
      const c = this.cliente();
      if (abierto && c) untracked(() => this.cargarFormularios(c));
    });
  }

  private cargarFormularios(c: Cliente): void {
    const p = c.persona;
    this.datosForm.reset({
      nombre: p?.nombre ?? '',
      apellido: p?.apellido ?? '',
      telefono: p?.telefono ?? '',
      email: p?.email ?? '',
    });
    this.usernameForm.reset({ username: p?.usuario?.user ?? ''     });
    this.passwordForm.reset();
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const soloDigitos = input.value.replace(/\D+/g, '').slice(0, 9);
    input.value = soloDigitos;
    this.df.telefono.setValue(soloDigitos);
  }

  guardarDatos(): void {
    const persona = this.cliente()?.persona;
    if (!persona) return;

    if (this.datosForm.invalid) {
      this.datosForm.markAllAsTouched();
      return;
    }

    this.ejecutar(
      this.personaService.actualizarPersona(persona.personaId, this.datosForm.getRawValue() as any),
      'Datos actualizados correctamente',
      'Actualizar datos',
    );
  }

  guardarUsername(): void {
    const usuario = this.cliente()?.persona?.usuario;
    if (!usuario?.idUsuario) {
      this.notify.showWarn('No se pudo identificar el usuario asociado al cliente.');
      return;
    }

    if (this.usernameForm.invalid) {
      this.usernameForm.markAllAsTouched();
      return;
    }

    const username = this.uf.username.value.trim();
    if (username === usuario.user) {
      this.notify.showWarn('El nuevo nombre de usuario es igual al actual.');
      return;
    }

    this.ejecutar(
      this.usuarioService.updateUsername(usuario.idUsuario, { username }),
      'Nombre de usuario actualizado correctamente',
      'Actualizar nombre de usuario',
    );
  }

  guardarPassword(): void {
    const usuario = this.cliente()?.persona?.usuario;
    if (!usuario?.idUsuario) {
      this.notify.showWarn('No se pudo identificar el usuario asociado al cliente.');
      return;
    }

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.ejecutar(
      this.usuarioService.resetPassword(usuario.idUsuario, { newPassword: this.pf.newPassword.value.trim() }),
      'Contraseña restablecida correctamente',
      'Resetear contraseña',
    );
  }

  private ejecutar(peticion: Observable<any>, mensajeOk: string, tituloError: string): void {
    this.guardando.set(true);

    peticion.pipe(finalize(() => this.guardando.set(false))).subscribe({
      next: (res) => {
        this.notify.showSuccess(res?.message || mensajeOk);
        this.visible.set(false);
        this.guardado.emit();
      },
      error: (err) => {
        console.error(`Error en "${tituloError}":`, err);
        this.notify.showHttpError(err, tituloError);
      },
    });
  }
}