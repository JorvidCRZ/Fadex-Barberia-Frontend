import { NotificationService } from '@/app/core/services/common/notification.service';
import { PersonaService } from '@/app/core/services/gestion/persona.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Divider } from "primeng/divider";

@Component({
  selector: 'app-datos-basicos-perfil-barbero',
  imports: [CommonModule, FormsModule, Divider],
  templateUrl: './datos-basicos-perfil-barbero.html',
  styleUrl: './datos-basicos-perfil-barbero.css',
})
export class DatosBasicosPerfilBarbero implements OnInit {

  @Input() personaId!: number;

  @Input() nombre = '—';
  @Input() apellido = '—';
  @Input() telefono = '—';
  @Input() email = '—';

  private personaService = inject(PersonaService);
  private notificationService = inject(NotificationService);

  editando = false;
  guardando = false;

  form = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  };

  ngOnInit(): void {
    this.resetForm();
  }

  private validarFormulario(): boolean {

    if (this.form.nombre.trim().length > 100) {
      this.notificationService.showError(
        'El nombre no puede superar 100 caracteres.'
      );
      return false;
    }

    if (this.form.apellido.trim().length > 100) {
      this.notificationService.showError(
        'El apellido no puede superar 100 caracteres.'
      );
      return false;
    }

    if (
      this.form.telefono &&
      !/^[0-9]{9}$/.test(this.form.telefono.trim())
    ) {
      this.notificationService.showError(
        'El teléfono debe tener 9 dígitos.'
      );
      return false;
    }

    if (
      this.form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email.trim())
    ) {
      this.notificationService.showError(
        'El email no tiene un formato válido.'
      );
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.form = {
      nombre: this.nombre === '—' ? '' : this.nombre,
      apellido: this.apellido === '—' ? '' : this.apellido,
      telefono: this.telefono === '—' ? '' : this.telefono,
      email: this.email === '—' ? '' : this.email,
    };
  }

  onEditar(): void {
    this.resetForm();
    this.editando = true;
  }

  onCancelar(): void {
    this.editando = false;
    this.resetForm();
  }

  onGuardar(): void {

    if (!this.validarFormulario()) {
      return;
    }

    this.guardando = true;

    this.personaService.actualizarPersona(this.personaId, {
      nombre: this.form.nombre.trim(),
      apellido: this.form.apellido.trim(),
      telefono: this.form.telefono.trim(),
      email: this.form.email.trim(),
    }).subscribe({
      next: (res) => {

        this.guardando = false;

        if (!res?.success) {
          this.notificationService.showError(
            'No se pudieron guardar los cambios.'
          );
          return;
        }

        this.nombre = this.form.nombre || '—';
        this.apellido = this.form.apellido || '—';
        this.telefono = this.form.telefono || '—';
        this.email = this.form.email || '—';

        this.editando = false;

        this.notificationService.showSuccess(
          'Datos actualizados correctamente.'
        );
      },
      error: (err) => {
        this.guardando = false;
        this.notificationService.showHttpError(err, 'Error');
      }
    });
  }
}