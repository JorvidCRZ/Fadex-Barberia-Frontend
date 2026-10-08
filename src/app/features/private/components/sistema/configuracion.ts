import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TokenService } from '../../../../core/services/auth/token.service';

type NotificationKey = 'email' | 'push' | 'appointmentReminders' | 'lowStockAlerts';
type Theme = 'oscuro-premium' | 'claro' | 'automatico' | 'oscuro';

interface AdminSettings {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  notifications: Record<NotificationKey, boolean>;
  theme: Theme;
  accent: string;
  automaticBackup: boolean;
}

const SETTINGS_STORAGE_KEY = 'fadex.admin.settings';
const BACKUP_STORAGE_KEY = 'fadex.admin.settings.backup';

const DEFAULT_SETTINGS: AdminSettings = {
  businessName: 'FadeX',
  phone: '+1 234 567 8900',
  email: 'contacto@fadex.com',
  address: 'Calle Principal 123',
  notifications: {
    email: true,
    push: true,
    appointmentReminders: true,
    lowStockAlerts: true,
  },
  theme: 'oscuro-premium',
  accent: '#d4af37',
  automaticBackup: false,
};

const ACCENT_OPTIONS = [
  { name: 'Dorado', value: '#d4af37' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Morado', value: '#a855f7' },
  { name: 'Rojo', value: '#ef4444' },
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isAdminSettings(value: unknown): value is AdminSettings {
  if (!isRecord(value) || !isRecord(value['notifications'])) {
    return false;
  }

  const notifications = value['notifications'];
  return typeof value['businessName'] === 'string'
    && typeof value['phone'] === 'string'
    && typeof value['email'] === 'string'
    && typeof value['address'] === 'string'
    && typeof notifications['email'] === 'boolean'
    && typeof notifications['push'] === 'boolean'
    && typeof notifications['appointmentReminders'] === 'boolean'
    && typeof notifications['lowStockAlerts'] === 'boolean'
    && (value['theme'] === 'claro'
      || value['theme'] === 'oscuro-premium'
      || value['theme'] === 'automatico'
      || value['theme'] === 'oscuro')
    && ACCENT_OPTIONS.some(option => option.value === value['accent'])
    && typeof value['automaticBackup'] === 'boolean';
}

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class Configuracion {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  readonly settings = signal<AdminSettings>(DEFAULT_SETTINGS);
  readonly accentOptions = ACCENT_OPTIONS;
  readonly accentColor = computed(() =>
    ACCENT_OPTIONS.find(option => option.value === this.settings().accent)?.value ?? DEFAULT_SETTINGS.accent
  );
  readonly savingPassword = signal(false);
  readonly lastBackup = signal<string | null>(null);

  readonly generalForm = this.formBuilder.group({
    businessName: [DEFAULT_SETTINGS.businessName, [Validators.required, Validators.maxLength(100)]],
    phone: [DEFAULT_SETTINGS.phone, [Validators.required, Validators.maxLength(30)]],
    email: [DEFAULT_SETTINGS.email, [Validators.required, Validators.email, Validators.maxLength(150)]],
    address: [DEFAULT_SETTINGS.address, [Validators.required, Validators.maxLength(200)]],
  });

  readonly passwordForm = this.formBuilder.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, {
    validators: (control: AbstractControl) => {
      const newPassword = control.get('newPassword')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return confirmPassword && newPassword !== confirmPassword ? { passwordMismatch: true } : null;
    },
  });

  constructor() {
    this.loadSettings();
  }

  saveGeneralSettings(): void {
    if (this.generalForm.invalid) {
      this.generalForm.markAllAsTouched();
      return;
    }

    const formValue = this.generalForm.getRawValue();
    this.saveSettings({
      ...this.settings(),
      businessName: formValue.businessName.trim(),
      phone: formValue.phone.trim(),
      email: formValue.email.trim(),
      address: formValue.address.trim(),
    }, 'La configuración general se guardó correctamente.');
  }

  updateNotification(key: NotificationKey, event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.saveSettings({
      ...this.settings(),
      notifications: { ...this.settings().notifications, [key]: target.checked },
    }, 'Preferencia de notificación guardada.');
  }

  updateTheme(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)
      || (target.value !== 'claro' && target.value !== 'oscuro-premium' && target.value !== 'automatico')) {
      return;
    }

    this.saveSettings({ ...this.settings(), theme: target.value });
  }

  updateAccent(accent: string): void {
    if (!ACCENT_OPTIONS.some(option => option.value === accent)) {
      return;
    }

    this.saveSettings({ ...this.settings(), accent });
  }

  updateAutomaticBackup(): void {
    this.saveSettings({
      ...this.settings(),
      automaticBackup: !this.settings().automaticBackup,
    }, this.settings().automaticBackup
      ? 'El respaldo automático se desactivó.'
      : 'El respaldo automático se activó.');
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.getRawValue();
    if (currentPassword === newPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Contraseña no válida',
        detail: 'La nueva contraseña debe ser diferente de la actual.',
      });
      return;
    }

    this.savingPassword.set(true);
    this.authService.cambiarPassword(currentPassword, newPassword).subscribe({
      next: (response) => {
        this.savingPassword.set(false);
        this.passwordForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña actualizada',
          detail: response.message || 'La contraseña se cambió correctamente.',
        });
      },
      error: (error: unknown) => {
        this.savingPassword.set(false);
        const message = isRecord(error) && isRecord(error['error']) && typeof error['error']['message'] === 'string'
          ? error['error']['message']
          : 'No se pudo actualizar la contraseña. Verifica la contraseña actual e inténtalo de nuevo.';
        this.messageService.add({ severity: 'error', summary: 'Error al cambiar contraseña', detail: message });
      },
    });
  }

  exportSettings(): void {
    const backup = {
      version: 1,
      createdAt: new Date().toISOString(),
      settings: this.settings(),
    };

    try {
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'fadex-configuracion.json';
      link.click();
      URL.revokeObjectURL(url);
      this.recordBackup(backup);
      this.messageService.add({
        severity: 'success',
        summary: 'Exportación completada',
        detail: 'Se descargó una copia de la configuración guardada en este navegador.',
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al exportar',
        detail: 'No se pudo crear el archivo de configuración.',
      });
    }
  }

  async importSettings(event: Event): Promise<void> {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.files?.length) {
      return;
    }

    const file = target.files[0];
    try {
      const backup: unknown = JSON.parse(await file.text());
      if (!isRecord(backup) || !isAdminSettings(backup['settings'])) {
        throw new Error('El archivo no tiene un formato de configuración válido.');
      }

      const importedSettings = {
        ...backup['settings'],
        theme: this.normalizeTheme(backup['settings'].theme),
      };
      this.generalForm.patchValue({
        businessName: importedSettings.businessName,
        phone: importedSettings.phone,
        email: importedSettings.email,
        address: importedSettings.address,
      });
      if (this.generalForm.invalid) {
        this.generalForm.markAllAsTouched();
        throw new Error('El archivo contiene datos generales que no son válidos.');
      }
      this.saveSettings(importedSettings, 'La configuración se importó correctamente.');
    } catch (error: unknown) {
      const detail = error instanceof Error ? error.message : 'No se pudo leer el archivo seleccionado.';
      this.messageService.add({ severity: 'error', summary: 'Error al importar', detail });
    } finally {
      target.value = '';
    }
  }

  logout(): void {
    this.tokenService.clearTokens();
    void this.router.navigate(['/login']);
  }

  formatBackupDate(value: string | null): string {
    if (!value) {
      return 'Aún no hay respaldos';
    }

    return new Intl.DateTimeFormat('es-PE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  }

  private loadSettings(): void {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const parsedSettings: unknown = JSON.parse(storedSettings);
        if (!isAdminSettings(parsedSettings)) {
          throw new Error('Los datos de configuración guardados tienen un formato no válido.');
        }

        const normalizedSettings = {
          ...parsedSettings,
          theme: this.normalizeTheme(parsedSettings.theme),
        };
        this.settings.set(normalizedSettings);
        this.generalForm.patchValue({
          businessName: normalizedSettings.businessName,
          phone: normalizedSettings.phone,
          email: normalizedSettings.email,
          address: normalizedSettings.address,
        });
      }

      const backupDate = localStorage.getItem(BACKUP_STORAGE_KEY);
      if (backupDate && Number.isFinite(Date.parse(backupDate))) {
        this.lastBackup.set(backupDate);
      }
    } catch (error: unknown) {
      const detail = error instanceof Error ? error.message : 'No se pudieron cargar las preferencias guardadas.';
      this.messageService.add({ severity: 'error', summary: 'Error de configuración', detail });
    }
  }

  private saveSettings(settings: AdminSettings, successMessage?: string): void {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al guardar',
        detail: 'No se pudieron guardar los cambios en este navegador.',
      });
      return;
    }

    this.settings.set(settings);
    if (settings.automaticBackup) {
      try {
        this.recordBackup({ version: 1, createdAt: new Date().toISOString(), settings });
      } catch {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el respaldo automático',
          detail: 'Los cambios se guardaron, pero no se pudo actualizar el respaldo local.',
        });
        return;
      }
    }
    if (successMessage) {
      this.messageService.add({ severity: 'success', summary: 'Cambios guardados', detail: successMessage });
    }
  }

  private recordBackup(backup: { version?: number; createdAt: string; settings: AdminSettings }): void {
    localStorage.setItem(BACKUP_STORAGE_KEY, backup.createdAt);
    localStorage.setItem(`${BACKUP_STORAGE_KEY}.data`, JSON.stringify(backup));
    this.lastBackup.set(backup.createdAt);
  }

  private normalizeTheme(theme: Theme): Exclude<Theme, 'oscuro'> {
    return theme === 'oscuro' ? 'oscuro-premium' : theme;
  }
}
