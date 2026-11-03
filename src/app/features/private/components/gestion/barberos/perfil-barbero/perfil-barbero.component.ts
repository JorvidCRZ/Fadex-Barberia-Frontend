import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { Barbero } from '@/app/core/models/gestion/barbero/barbero.model';
import { HeaderPerfilBarbero } from "./components/header-perfil-barbero/header-perfil-barbero";
import { DatosBasicosPerfilBarbero } from "./components/datos-basicos-perfil-barbero/datos-basicos-perfil-barbero";
import { CredencialesPerfilBarbero } from "./components/credenciales-perfil-barbero/credenciales-perfil-barbero";

@Component({
  selector: 'app-perfil-barbero',
  standalone: true,
  imports: [CommonModule, HeaderPerfilBarbero, DatosBasicosPerfilBarbero, CredencialesPerfilBarbero],
  templateUrl: './perfil-barbero.html',
  styleUrl: './perfil-barbero.scss',
})
export class PerfilBarbero implements OnInit {
  private readonly route          = inject(ActivatedRoute);
  private readonly barberoService = inject(BarberoService);
  private readonly cd             = inject(ChangeDetectorRef);

  barbero: Barbero | null = null;
  loading      = false;
  errorMessage = '';
  barberoId    = 0;
  personaId = 0;

  barberoNombre      = 'Barbero';
  barberoIniciales   = 'BR';
  barberoDescripcion = 'Sin descripción disponible';

  nombre       = '—';
  apellido     = '—';
  telefono     = '—';
  email        = '—';
  fechaIngreso = '—';
  experiencia  = '—';
  sueldo       = '—';
  comision     = '—';
  descripcion  = '—';
  usuario      = 'No disponible';
  contrasena   = 'No disponible';
  idUsuario    = 0;

  volver = (): void => { window.history.back(); };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!Number.isInteger(id) || id <= 0) {
        this.barberoId = 0;
        this.errorMessage = 'No se encontró el barbero solicitado.';
        this.loading = false;
        this.cd.detectChanges();
        return;
      }

      this.barberoId = id;
      this.cargarBarbero(id);
    });
  }

  private cargarBarbero(id: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.barberoService.obtenerPorId(id).subscribe({
      next: (res) => {
        this.loading = false;
        const data = res?.data;
        if (!data || res.success === false) {
          this.errorMessage = res?.message || 'No se pudo cargar el perfil del barbero.';
          this.cd.detectChanges();
          return;
        }
        this.barbero = this.normalizarBarbero(data, id);
        this.actualizarVista(this.barbero);
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Error al cargar el perfil del barbero.';
        this.cd.detectChanges();
      }
    });
  }

  private normalizarBarbero(data: any, id: number): Barbero {
    const personaData = data.persona ?? data.personaResponse ?? data.personaDto ?? {};
    const usuarioData = personaData.usuario ?? data.usuario ?? {};

    return {
      ...data,
      barberoId: Number(data.barberoId ?? data.idBarbero ?? data.id ?? id),
      persona: {
        ...personaData,
        personaId: Number(personaData.personaId ?? data.personaId ?? 0),
        nombre: personaData.nombre ?? data.nombre ?? data.nombres ?? '',
        apellido: personaData.apellido ?? data.apellido ?? data.apellidos ?? '',
        telefono: personaData.telefono ?? data.telefono ?? '',
        email: personaData.email ?? personaData.correo ?? data.email ?? data.correo ?? '',
        usuario: {
          ...usuarioData,
          idUsuario: Number(usuarioData.idUsuario ?? data.idUsuario ?? data.usuarioId ?? 0),
          user: usuarioData.user ?? usuarioData.username ?? data.username ?? data.usuarioNombre ?? '',
          password: usuarioData.password ?? data.password ?? '',
        },
      },
    } as Barbero;
  }

  private actualizarVista(barbero: Barbero): void {
    const persona        = barbero.persona;
    const nombreCompleto = [persona?.nombre, persona?.apellido].filter(Boolean).join(' ') || 'Barbero';

    this.personaId = persona?.personaId ?? 0;

    this.barberoNombre      = nombreCompleto;
    this.barberoIniciales   = this.getInitials(this.barberoNombre);
    this.barberoDescripcion = barbero.descripcion || 'Sin descripción disponible';

    this.nombre      = persona?.nombre   || '—';
    this.apellido    = persona?.apellido || '—';
    this.telefono    = persona?.telefono || '—';
    this.email       = persona?.email    || '—';
    this.fechaIngreso = this.formatFecha(barbero.fechaIngreso);
    this.experiencia  = barbero.experiencia != null ? `${barbero.experiencia} años` : '—';
    this.sueldo       = barbero.sueldo      != null ? `S/ ${barbero.sueldo.toFixed(2)}` : '—';
    this.comision     = barbero.comision    != null ? `${barbero.comision}%` : '—';
    this.descripcion  = barbero.descripcion || '—';

    this.idUsuario  = persona?.usuario?.idUsuario ?? 0;
    this.usuario    = persona?.usuario?.user      || 'No disponible';
    this.contrasena = this.maskPassword(persona?.usuario?.password || '');
  }

  private getInitials(name: string): string {
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return 'BR';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  private maskPassword(password: string): string {
    if (!password) return 'No disponible';
    if (password.length <= 4) return password;
    const maskedLength = Math.min(Math.max(password.length - 4, 8), 16);
    return `${'•'.repeat(maskedLength)}${password.slice(-4)}`;
  }

  private formatFecha(fecha: string): string {
    if (!fecha) return '—';
    const date = new Date(fecha);
    if (Number.isNaN(date.getTime())) return fecha;
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