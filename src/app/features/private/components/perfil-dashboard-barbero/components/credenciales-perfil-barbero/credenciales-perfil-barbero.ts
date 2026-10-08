import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { UpdateUsernameRequest } from '@/app/core/models/auth/usuario/update-username-request.model';
import { ChangePasswordRequest } from '@/app/core/models/auth/usuario/change-password-request.model';
import { Divider } from "primeng/divider";

@Component({
  selector: 'app-credenciales-perfil-barbero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Divider],
  templateUrl: './credenciales-perfil-barbero.html',
  styleUrl: './credenciales-perfil-barbero.css',
})
export class CredencialesPerfilBarbero {

  private fb           = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private notification   = inject(NotificationService);

  @Input() usuario:   string = 'No disponible';
  @Input() contrasena: string = 'No disponible';
  @Input() idUsuario:  number = 0;
  @Output() passwordReset  = new EventEmitter<void>();
  @Output() usernameUpdate = new EventEmitter<void>();

  showResetModal       = false;
  showEditUsernameModal = false;
  isSubmitting         = false;

  showCurrentPassword  = false;
  showNewPassword      = false;
  showConfirmPassword  = false;

  // ── Formulario contraseña (ahora incluye currentPassword) ─────────────────

  form = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword:     ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  usernameForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  get f()  { return this.form.controls; }
  get uf() { return this.usernameForm.controls; }

  // ── Reset contraseña ──────────────────────────────────────────────────────

  openResetModal(): void {
    this.form.reset();
    this.showCurrentPassword = false;
    this.showNewPassword     = false;
    this.showConfirmPassword  = false;
    this.showResetModal = true;
  }

  closeResetModal(): void {
    this.showResetModal  = false;
    this.isSubmitting    = false;
    this.form.reset();
  }

  toggleCurrentPassword(): void  { this.showCurrentPassword  = !this.showCurrentPassword; }
  toggleNewPassword(): void      { this.showNewPassword      = !this.showNewPassword; }
  toggleConfirmPassword(): void  { this.showConfirmPassword  = !this.showConfirmPassword; }

  confirmResetPassword(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const currentPassword = this.f.currentPassword.value?.trim() ?? '';
    const newPassword     = this.f.newPassword.value?.trim()     ?? '';
    const confirmPassword = this.f.confirmPassword.value?.trim() ?? '';

    if (newPassword !== confirmPassword) {
      this.f.confirmPassword.setErrors({ mismatch: true });
      return;
    }

    if (currentPassword === newPassword) {
      this.notification.showWarn('La nueva contraseña no puede ser igual a la actual.');
      return;
    }

    this.isSubmitting = true;

    const payload: ChangePasswordRequest = { currentPassword, newPassword, confirmPassword };

    this.usuarioService.changeMyPassword(payload).subscribe({
      next: (res) => {
        this.notification.showSuccess(res?.message || 'Contraseña actualizada correctamente.');
        this.closeResetModal();
        this.passwordReset.emit();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.notification.showHttpError(err, 'Cambiar contraseña');
      },
    });
  }

  // ── Editar usuario ────────────────────────────────────────────────────────

  openEditUsernameModal(): void {
    this.usernameForm.reset({ username: this.usuario });
    this.usernameForm.setErrors(null);
    this.showEditUsernameModal = true;
  }

  closeEditUsernameModal(): void {
    this.showEditUsernameModal = false;
    this.isSubmitting          = false;
    this.usernameForm.reset();
  }

  confirmUpdateUsername(): void {
    if (!this.idUsuario) {
      this.notification.showWarn('No se pudo identificar el usuario.');
      return;
    }
    if (this.usernameForm.invalid) { this.usernameForm.markAllAsTouched(); return; }

    const newUsername = this.uf.username.value?.trim() ?? '';

    if (newUsername === this.usuario) {
      this.notification.showWarn('El nuevo nombre de usuario es igual al actual.');
      return;
    }

    this.isSubmitting = true;
    const payload: UpdateUsernameRequest = { username: newUsername };

    this.usuarioService.updateUsername(this.idUsuario, payload).subscribe({
      next: (res) => {
        this.usuario = newUsername;
        this.notification.showSuccess(res?.message || 'Usuario actualizado correctamente.');
        this.closeEditUsernameModal();
        this.usernameUpdate.emit();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.notification.showHttpError(err, 'Actualizar nombre de usuario');
      },
    });
  }
}