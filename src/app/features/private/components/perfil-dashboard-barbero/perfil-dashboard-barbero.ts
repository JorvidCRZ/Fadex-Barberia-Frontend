import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { Barbero } from '@/app/core/models/gestion/barbero/barbero.model';

import { HeaderPerfilBarbero } from '../perfil-dashboard-barbero/components/header-perfil-barbero/header-perfil-barbero';
import { DatosBasicosPerfilBarbero } from '../perfil-dashboard-barbero/components/datos-basicos-perfil-barbero/datos-basicos-perfil-barbero';
import { CredencialesPerfilBarbero } from '../perfil-dashboard-barbero/components/credenciales-perfil-barbero/credenciales-perfil-barbero';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-perfil-dashboard-barbero',
  standalone: true,
  imports: [
    HeaderPerfilBarbero,
    DatosBasicosPerfilBarbero,
    CredencialesPerfilBarbero,
    CommonModule,
    Toast
],
  templateUrl: './perfil-dashboard-barbero.html',
  styleUrl: './perfil-dashboard-barbero.css',
})
export class PerfilDashboardBarbero implements OnInit {

  private readonly barberoService = inject(BarberoService);

  barbero: Barbero | null = null;

  loading = false;
  errorMessage = '';

  barberoId = 0;
  personaId = 0;

  barberoNombre = 'Barbero';
  barberoIniciales = 'BR';
  barberoDescripcion = 'Sin descripción disponible';

  nombre = '—';
  apellido = '—';
  telefono = '—';
  email = '—';


  usuario = 'No disponible';
  contrasena = 'No disponible';
  idUsuario = 0;

  volver = (): void => {
    window.history.back();
  };

  ngOnInit(): void {

    this.loading = true;

    this.barberoService.obtenerMiBarberoId().subscribe({
      next: (res) => {

        if (!res?.success || !res.data) {
          this.loading = false;
          this.errorMessage = 'No se encontró el barbero asociado.';
          return;
        }

        this.barberoId = res.data;
        this.cargarBarbero(this.barberoId);
      },
      error: () => {
        this.loading = false;
        this.errorMessage =
          'No se pudo obtener el barbero autenticado.';
      }
    });
  }

  private cargarBarbero(id: number): void {

    this.loading = true;
    this.errorMessage = '';

    this.barberoService.obtenerPorId(id).subscribe({
      next: (res) => {

        this.loading = false;

        if (!res?.success || !res.data) {
          this.errorMessage =
            res?.message ||
            'No se pudo cargar el perfil del barbero.';
          return;
        }

        this.barbero = res.data;
        this.actualizarVista(res.data);
      },
      error: () => {
        this.loading = false;
        this.errorMessage =
          'Error al cargar el perfil del barbero.';
      }
    });
  }

  private actualizarVista(barbero: Barbero): void {

    const persona = barbero.persona;

    const nombreCompleto =
      [persona?.nombre, persona?.apellido]
        .filter(Boolean)
        .join(' ') || 'Barbero';

    this.personaId = persona?.personaId || 0;

    this.barberoNombre = nombreCompleto;
    this.barberoIniciales = this.getInitials(nombreCompleto);
    this.barberoDescripcion =
      barbero.descripcion || 'Sin descripción disponible';

    this.nombre = persona?.nombre || '—';
    this.apellido = persona?.apellido || '—';
    this.telefono = persona?.telefono || '—';
    this.email = persona?.email || '—';

    this.idUsuario =
      persona?.usuario?.idUsuario || 0;

    this.usuario =
      persona?.usuario?.user || 'No disponible';

    this.contrasena = this.maskPassword(
      persona?.usuario?.password || ''
    );
  }

  private getInitials(name: string): string {

    const parts = name
      .split(' ')
      .filter(Boolean);

    if (parts.length === 0) return 'BR';

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return `${parts[0][0]}${parts[1][0]}`
      .toUpperCase();
  }

  private maskPassword(password: string): string {

    if (!password) {
      return 'No disponible';
    }

    if (password.length <= 4) {
      return password;
    }

    const maskedLength = Math.min(
      Math.max(password.length - 4, 8),
      16
    );

    return `${'•'.repeat(maskedLength)}${password.slice(-4)}`;
  }

  private formatFecha(fecha: string): string {

    if (!fecha) return '—';

    const date = new Date(fecha);

    if (Number.isNaN(date.getTime())) {
      return fecha;
    }

    return date.toLocaleDateString('es-PE');
  }

  onPasswordReset(): void {

    if (!this.barberoId) return;

    this.cargarBarbero(this.barberoId);
  }

  onUsernameUpdate(): void {

    if (!this.barberoId) return;

    this.cargarBarbero(this.barberoId);
  }
}