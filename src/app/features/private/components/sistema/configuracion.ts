import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfiguracionEmpresaLocal } from '../../../../core/models/common/empresa.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ConfiguracionService, LOCAL_CONFIGURACION_EMPRESA_KEY } from '../../../../core/services/common/configuracion.service';

const DEFAULT_SETTINGS: ConfiguracionEmpresaLocal = {
  businessName: 'FadeX Barbería',
  email: 'contacto@fadexbarberia.com',
  phone: '',
  address: 'Lima, Perú',
  logoDataUrl: null,
  termsAndConditions: '',
  privacyPolicy: '',
  returnsPolicy: '',
};

const MAX_LOGO_SIZE = 1024 * 1024;
const ALLOWED_LOGO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isConfiguracionEmpresaLocal(value: unknown): value is ConfiguracionEmpresaLocal {
  if (!isRecord(value)) return false;
  const settings = value;
  return typeof settings['businessName'] === 'string'
    && typeof settings['email'] === 'string'
    && typeof settings['phone'] === 'string'
    && typeof settings['address'] === 'string'
    && (typeof settings['logoDataUrl'] === 'string' || settings['logoDataUrl'] === null)
    && typeof settings['termsAndConditions'] === 'string'
    && typeof settings['privacyPolicy'] === 'string'
    && typeof settings['returnsPolicy'] === 'string';
}

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class Configuracion {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly configuracionService = inject(ConfiguracionService);

  readonly settingsForm = this.formBuilder.group({
    businessName: [DEFAULT_SETTINGS.businessName, [Validators.required, Validators.maxLength(100)]],
    email: [DEFAULT_SETTINGS.email, [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: [DEFAULT_SETTINGS.phone, Validators.maxLength(30)],
    address: [DEFAULT_SETTINGS.address, Validators.maxLength(200)],
    termsAndConditions: [DEFAULT_SETTINGS.termsAndConditions],
    privacyPolicy: [DEFAULT_SETTINGS.privacyPolicy],
    returnsPolicy: [DEFAULT_SETTINGS.returnsPolicy],
  });
  readonly logoDataUrl = signal<string | null>(DEFAULT_SETTINGS.logoDataUrl);
  readonly logoName = computed(() => this.logoDataUrl() ? 'Logo de la empresa' : 'Sin logo');

  constructor() {
    this.loadSettings();
  }

  onLogoSelected(event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;

    const file = input.files?.[0];
    if (!file) return;

    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formato no compatible',
        detail: 'Selecciona una imagen PNG, JPG o WebP.',
      });
      input.value = '';
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      this.messageService.add({
        severity: 'error',
        summary: 'Imagen demasiado grande',
        detail: 'El logo debe pesar como máximo 1 MB.',
      });
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.messageService.add({
          severity: 'error',
          summary: 'No se pudo leer la imagen',
          detail: 'Vuelve a seleccionar el archivo del logo.',
        });
        input.value = '';
        return;
      }

      this.logoDataUrl.set(reader.result);
      input.value = '';
    };
    reader.onerror = () => {
      this.messageService.add({
        severity: 'error',
        summary: 'No se pudo leer la imagen',
        detail: 'Vuelve a seleccionar el archivo del logo.',
      });
      input.value = '';
    };
    reader.readAsDataURL(file);
  }

  saveSettings(): void {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    const formValue = this.settingsForm.getRawValue();
    const settings: ConfiguracionEmpresaLocal = {
      ...formValue,
      businessName: formValue.businessName.trim(),
      email: formValue.email.trim(),
      phone: formValue.phone.trim(),
      address: formValue.address.trim(),
      logoDataUrl: this.logoDataUrl(),
    };

    try {
      localStorage.setItem(LOCAL_CONFIGURACION_EMPRESA_KEY, JSON.stringify(settings));
    } catch (error: unknown) {
      console.error('No se pudo guardar la configuración local de empresa.', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error al guardar',
        detail: 'No se pudieron guardar los cambios en este navegador. Revisa el espacio disponible.',
      });
      return;
    }

    this.configuracionService.aplicarConfiguracionLocal(settings);
    this.messageService.add({
      severity: 'success',
      summary: 'Cambios guardados',
      detail: 'La configuración se guardó en este navegador y ya está disponible en las páginas públicas.',
    });
  }

  private loadSettings(): void {
    try {
      const storedSettings = localStorage.getItem(LOCAL_CONFIGURACION_EMPRESA_KEY);
      if (!storedSettings) return;

      const parsedSettings: unknown = JSON.parse(storedSettings);
      if (!isConfiguracionEmpresaLocal(parsedSettings)) {
        throw new Error('Los datos locales de configuración tienen un formato no válido.');
      }

      this.settingsForm.patchValue(parsedSettings);
      this.logoDataUrl.set(parsedSettings.logoDataUrl);
      this.configuracionService.aplicarConfiguracionLocal(parsedSettings);
    } catch (error: unknown) {
      const detail = error instanceof Error
        ? error.message
        : 'No se pudieron cargar los datos de configuración guardados.';
      console.error('No se pudo cargar la configuración local de empresa.', error);
      this.messageService.add({ severity: 'error', summary: 'Error de configuración', detail });
    }
  }
}
