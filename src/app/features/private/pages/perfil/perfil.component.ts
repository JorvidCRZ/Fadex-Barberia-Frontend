import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TokenService } from '../../../../core/services/auth/token.service';
import { UsuarioService } from '../../../../core/services/auth/usuario.service';
import { PersonaService } from '../../../../core/services/gestion/persona.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { environment } from '../../../../../environments/environment';

// ─── Modelo ───────────────────────────────────────────────────────────────────

type RolPerfil = 'ADMIN' | 'BARBERO' | 'CLIENTE';
type CampoPassword = 'actual' | 'nueva' | 'confirmar';

interface PerfilCuenta {
  personaId: number;
  usuarioId?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  usuario?: string;
  fechaRegistro?: string;
  descripcion?: string;   // barbero
  permisos?: string[];    // admin
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const ROL_LABEL: Record<RolPerfil, string> = {
  ADMIN: 'Administrador',
  BARBERO: 'Barbero',
  CLIENTE: 'Cliente',
};

// Clases completas en el .ts para que Tailwind las detecte
const NIVELES = [
  { label: '', bar: '', text: '' },
  { label: 'Muy débil', bar: 'bg-danger', text: 'text-danger' },
  { label: 'Débil', bar: 'bg-orange-400', text: 'text-orange-400' },
  { label: 'Moderada', bar: 'bg-yellow-400', text: 'text-yellow-400' },
  { label: 'Fuerte', bar: 'bg-success', text: 'text-success' },
];

const ADMIN_PROFILE_STORAGE_KEY = 'fadex.admin.profile';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function firstString(value: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
  }
  return undefined;
}

function isAdminProfile(value: Record<string, unknown>): value is Record<'nombre' | 'apellido' | 'telefono' | 'email', string> {
  return typeof value['nombre'] === 'string'
    && typeof value['apellido'] === 'string'
    && typeof value['telefono'] === 'string'
    && typeof value['email'] === 'string';
}

const passwordsCoinciden = (g: AbstractControl): ValidationErrors | null =>
  g.get('passwordNueva')?.value === g.get('confirmarPassword')?.value ? null : { noCoinciden: true };

const PERFILES_MEMORIA: Record<RolPerfil, PerfilCuenta> = {
  ADMIN: { personaId: 1, usuarioId: 1, nombre: 'Administrador', apellido: 'Demo', telefono: '', email: '', usuario: 'admin' },
  BARBERO: { personaId: 2, usuarioId: 2, nombre: 'Carlos', apellido: 'Ramírez', telefono: '982321324', email: 'barbero@fadex.com', usuario: 'barbero', descripcion: 'Barbero especializado en cortes clásicos y degradados.' },
  CLIENTE: { personaId: 3, usuarioId: 3, nombre: 'Juan', apellido: 'Pérez', telefono: '982321324', email: 'jdcruzp11@gmail.com', usuario: 'cliente', fechaRegistro: '2026-01-15' },
};

// ─── Componente ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ToastModule],
  templateUrl: './perfil.html',
})
export class PerfilComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly personaService = inject(PersonaService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly notificationService = inject(NotificationService);

  // El rol viene de la ruta: data: { rol: 'CLIENTE' | 'BARBERO' | 'ADMIN' }
  readonly rol: RolPerfil = this.obtenerRol();
  readonly rolLabel = ROL_LABEL[this.rol];

  // ── Estado ──
  perfil = signal<PerfilCuenta>(PERFILES_MEMORIA.CLIENTE);
  cargando = signal(false);
  guardandoPerfil = signal(false);
  guardandoPassword = signal(false);
  visible = signal<Record<CampoPassword, boolean>>({ actual: false, nueva: false, confirmar: false });

  readonly camposPassword = [
    { control: 'passwordActual', key: 'actual', label: 'Contraseña actual', placeholder: '••••••••', error: 'La contraseña actual es requerida.' },
    { control: 'passwordNueva', key: 'nueva', label: 'Nueva contraseña', placeholder: 'Mín. 8 caracteres', error: 'Mínimo 8 caracteres.' },
    { control: 'confirmarPassword', key: 'confirmar', label: 'Confirmar contraseña', placeholder: 'Repite la nueva contraseña', error: 'Confirma tu nueva contraseña.' },
  ] as const;

  // ── Formularios ──
  formPerfil = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: [{ value: '', disabled: true }],
    telefono: ['', [Validators.pattern(/^\d{9,15}$/)]],
  });

  formPassword = this.fb.group(
    {
      passwordActual: ['', [Validators.required, Validators.minLength(6)]],
      passwordNueva: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', [Validators.required]],
    },
    { validators: passwordsCoinciden },
  );

  // ── Derivados ──
  iniciales = computed(() => {
    const p = this.perfil();
    return ((p.nombre?.[0] ?? '') + (p.apellido?.[0] ?? '')).toUpperCase() || '··';
  });

  miembroDesde = computed(() => {
    const f = this.perfil().fechaRegistro;
    if (!f) return '';
    const d = new Date(f);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('es-PE', { month: 'long', year: 'numeric' });
  });

  get seguridad() {
    const v: string = this.formPassword.get('passwordNueva')?.value ?? '';
    const nivel = [v.length >= 8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^A-Za-z0-9]/.test(v)]
      .filter(Boolean).length;
    return { nivel, ...NIVELES[nivel] };
  }

  get noCoinciden(): boolean {
    return !!this.formPassword.errors?.['noCoinciden']
      && !!this.formPassword.get('confirmarPassword')?.touched;
  }

  // ── Carga ──
  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    if (this.rol === 'ADMIN') {
      this.cargarPerfilAdmin();
      return;
    }

    this.establecerPerfil({ ...PERFILES_MEMORIA[this.rol] });
  }

  private cargarPerfilAdmin(): void {
    const tokenValue: unknown = this.tokenService.getDecodedToken();
    if (!isRecord(tokenValue)) {
      this.cargando.set(false);
      this.notificationService.showError('No se pudo cargar la información del administrador.');
      return;
    }

    let userId: number | undefined;
    const tokenUserId = this.tokenService.getUserId();
    if (typeof tokenUserId === 'number' && Number.isSafeInteger(tokenUserId)) {
      userId = tokenUserId;
    } else if (typeof tokenUserId === 'string' && /^\d+$/.test(tokenUserId)) {
      const parsedId = Number(tokenUserId);
      if (Number.isSafeInteger(parsedId)) userId = parsedId;
    }

    if (!environment.useMockData && userId) {
      this.cargarAdminDesdeApi(userId, tokenValue);
      return;
    }

    try {
      const savedProfile = localStorage.getItem(ADMIN_PROFILE_STORAGE_KEY);
      if (savedProfile) {
        const parsedProfile: unknown = JSON.parse(savedProfile);
        if (isRecord(parsedProfile) && isAdminProfile(parsedProfile)) {
          this.establecerPerfil({ ...PERFILES_MEMORIA.ADMIN, ...parsedProfile, usuarioId: userId });
          return;
        }
      }
    } catch {
      this.notificationService.showError('No se pudieron leer los datos guardados del perfil.');
    }

    const fullName = firstString(tokenValue, 'fullName', 'nombreCompleto', 'name');
    const [nombre = 'Administrador', ...surname] = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];
    this.establecerPerfil({
      ...PERFILES_MEMORIA.ADMIN,
      usuarioId: userId,
      nombre,
      apellido: surname.join(' ') || 'Demo',
      email: firstString(tokenValue, 'email', 'emailAddress') ?? '',
      telefono: firstString(tokenValue, 'telefono', 'phone_number') ?? '',
    });
  }

  private cargarAdminDesdeApi(userId: number, tokenValue: Record<string, unknown>): void {
    this.usuarioService.obtenerPorId(userId).subscribe({
      next: response => {
        const data: unknown = response.data;
        if (!isRecord(data)
          || typeof data['nombre'] !== 'string'
          || typeof data['apellido'] !== 'string'
          || typeof data['email'] !== 'string') {
          this.cargando.set(false);
          this.notificationService.showError('Los datos recibidos del perfil no tienen un formato válido.');
          return;
        }

        this.establecerPerfil({
          ...PERFILES_MEMORIA.ADMIN,
          usuarioId: userId,
          nombre: data['nombre'],
          apellido: data['apellido'],
          email: data['email'],
          telefono: typeof data['telefono'] === 'string' ? data['telefono'] : '',
        });
      },
      error: error => {
        this.cargando.set(false);
        this.notificationService.showHttpError(error, 'Cargar perfil');
        const fullName = firstString(tokenValue, 'fullName', 'nombreCompleto', 'name');
        const [nombre = 'Administrador', ...surname] = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];
        this.establecerPerfil({
          ...PERFILES_MEMORIA.ADMIN,
          usuarioId: userId,
          nombre,
          apellido: surname.join(' ') || '',
          email: firstString(tokenValue, 'email', 'emailAddress') ?? '',
          telefono: firstString(tokenValue, 'telefono', 'phone_number') ?? '',
        });
      },
    });
  }

  private establecerPerfil(perfil: PerfilCuenta): void {
    this.perfil.set(perfil);
    this.formPerfil.patchValue({
      nombre: perfil.nombre,
      apellido: perfil.apellido,
      telefono: perfil.telefono,
      email: perfil.email,
    });
    this.cargando.set(false);
  }

  // ── Acciones ──
  guardarPerfil(): void {
    if (this.formPerfil.invalid) {
      this.formPerfil.markAllAsTouched();
      return;
    }

    const { nombre, apellido, telefono } = this.formPerfil.getRawValue();
    const updatedProfile = {
      nombre: nombre?.trim() ?? '',
      apellido: apellido?.trim() ?? '',
      telefono: telefono?.trim() ?? '',
      email: this.perfil().email,
    };

    if (this.rol !== 'ADMIN') {
      this.perfil.update(actual => ({ ...actual, ...updatedProfile }));
      this.notificationService.showSuccess('Datos actualizados correctamente.');
      return;
    }

    if (environment.useMockData) {
      try {
        localStorage.setItem(ADMIN_PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
        this.perfil.update(actual => ({ ...actual, ...updatedProfile }));
        this.notificationService.showSuccess('Datos actualizados correctamente.');
      } catch {
        this.notificationService.showError('No se pudieron guardar los datos del perfil en este navegador.');
      }
      return;
    }

    const userId = this.perfil().usuarioId;
    if (!userId) {
      this.notificationService.showError('No se pudo identificar el usuario para guardar los datos.');
      return;
    }

    this.guardandoPerfil.set(true);
    this.personaService.actualizarPersonaPorUsuarioId(userId, updatedProfile).subscribe({
      next: response => {
        this.perfil.update(actual => ({ ...actual, ...updatedProfile }));
        this.guardandoPerfil.set(false);
        this.notificationService.showSuccess(response.message || 'Datos actualizados correctamente.');
      },
      error: error => {
        this.guardandoPerfil.set(false);
        this.notificationService.showHttpError(error, 'Actualizar datos del perfil');
      },
    });
  }

  cambiarPassword(): void {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    this.guardandoPassword.set(true);

    const { passwordActual, passwordNueva } = this.formPassword.getRawValue();
    if (!passwordActual || !passwordNueva) {
      this.guardandoPassword.set(false);
      this.notificationService.showWarn('Completa la contraseña actual y la nueva contraseña.');
      return;
    }

    if (passwordActual === passwordNueva) {
      this.guardandoPassword.set(false);
      this.notificationService.showWarn('La nueva contraseña debe ser diferente de la actual.');
      return;
    }

    this.authService.cambiarPassword(passwordActual, passwordNueva).subscribe({
      next: response => {
        this.guardandoPassword.set(false);
        this.formPassword.reset();
        this.notificationService.showSuccess(response.message || 'La contraseña se cambió correctamente.');
      },
      error: error => {
        this.guardandoPassword.set(false);
        this.notificationService.showHttpError(error, 'Cambiar contraseña');
      },
    });
  }

  toggleVisible(campo: CampoPassword): void {
    this.visible.update((v) => ({ ...v, [campo]: !v[campo] }));
  }

  campoInvalido(form: AbstractControl, campo: string): boolean {
    const c = form.get(campo);
    return !!(c?.invalid && c?.touched);
  }

  private obtenerRol(): RolPerfil {
    const role = this.tokenService.getPrimaryRole();
    return role === 'admin' ? 'ADMIN' : role === 'barbero' ? 'BARBERO' : 'CLIENTE';
  }

}