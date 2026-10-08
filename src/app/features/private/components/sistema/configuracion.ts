import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfiguracionPublica } from '../../../../core/models/common/empresa.model';
import { ConfiguracionService } from '../../../../core/services/common/configuracion.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, ButtonComponent],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class Configuracion {
  private readonly fb = inject(FormBuilder);
  private readonly configuracionService = inject(ConfiguracionService);
  private readonly notificationService = inject(NotificationService);
  readonly maxLogoSize = 1024 * 1024;

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: [''],
    direccion: [''],
    logoUrl: [''],
    politicaPrivacidad: [''],
    terminosCondiciones: [''],
    politicaDevoluciones: [''],
  });

  constructor() {
    this.form.disable();
    this.configuracionService.cargarConfiguracion();
    effect(() => {
      const configuracion = this.configuracionService.config();
      if (!configuracion) return;
      this.cargarFormulario(configuracion);
      this.form.enable();
    });
  }

  get logoUrl(): string {
    return this.form.controls.logoUrl.value;
  }

  async seleccionarLogo(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      this.notificationService.showError('Selecciona una imagen PNG, JPG o WebP.', 'Formato no válido');
      input.value = '';
      return;
    }

    if (file.size > this.maxLogoSize) {
      this.notificationService.showError('El logo debe pesar como máximo 1 MB.', 'Imagen demasiado grande');
      input.value = '';
      return;
    }

    try {
      const reader = new FileReader();
      const logo = await new Promise<string>((resolve, reject) => {
        reader.onload = () => typeof reader.result === 'string'
          ? resolve(reader.result)
          : reject(new Error('No se pudo leer el archivo de imagen.'));
        reader.onerror = () => reject(reader.error ?? new Error('No se pudo leer el archivo de imagen.'));
        reader.readAsDataURL(file);
      });
      this.form.controls.logoUrl.setValue(logo);
    } catch (error: unknown) {
      console.error('Error al cargar el logo de la empresa.', error);
      this.notificationService.showError('Inténtalo nuevamente.', 'No se pudo cargar el logo');
    } finally {
      input.value = '';
    }
  }

  eliminarLogo(): void {
    this.form.controls.logoUrl.setValue('');
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.showError('Ingresa un nombre y un correo válido.', 'Revisa los datos');
      return;
    }

    const valores = this.form.getRawValue();
    const configuracion: ConfiguracionPublica = {
      ...this.configuracionService.obtenerConfiguracionActual(),
      ...valores,
      logoUrl: valores.logoUrl || null,
    };
    const guardado = this.configuracionService.guardarConfiguracionLocal(configuracion);

    if (!guardado) {
      this.notificationService.showError(
        'El navegador no tiene espacio disponible. Reduce el tamaño del logo e inténtalo nuevamente.',
        'No se pudo guardar la configuración',
      );
      return;
    }

    this.notificationService.showSuccess('Los cambios se guardaron en este navegador.', 'Configuración guardada');
  }

  private cargarFormulario(config: ConfiguracionPublica): void {
    this.form.patchValue({
      nombre: config.nombre ?? '',
      correo: config.correo ?? '',
      telefono: config.telefono ?? '',
      direccion: config.direccion ?? '',
      logoUrl: config.logoUrl ?? '',
      politicaPrivacidad: config.politicaPrivacidad ?? '',
      terminosCondiciones: config.terminosCondiciones ?? '',
      politicaDevoluciones: config.politicaDevoluciones ?? '',
    });
  }
}
