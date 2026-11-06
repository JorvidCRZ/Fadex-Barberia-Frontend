import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { Persona } from '../../../../core/models/gestion/persona/persona.model';
import { PersonaUpdateRequest } from '../../../../core/models/gestion/persona/persona-update.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { BarberoService } from '../../../../core/services/gestion/barbero.service';
import { ClienteService } from '../../../../core/services/gestion/cliente.service';
import { PersonaService } from '../../../../core/services/gestion/persona.service';
import { UsuarioService } from '../../../../core/services/auth/usuario.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { TokenService } from '../../../../core/services/auth/token.service';

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

// Pega aquí tu lista de permisos del admin
const PERMISOS_ADMIN: string[] = [
  'BARBERO_CREATE', 'BARBERO_VIEW', 'BARBERO_UPDATE', 'BARBERO_DELETE',
];

const PERFIL_VACIO: PerfilCuenta = {
  personaId: 0,
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
};

const passwordsCoinciden = (g: AbstractControl): ValidationErrors | null =>
  g.get('passwordNueva')?.value === g.get('confirmarPassword')?.value ? null : { noCoinciden: true };

const textoValido = (control: AbstractControl): ValidationErrors | null =>
  String(control.value ?? '').trim() ? null : { whitespace: true };

const desdePersona = (p: Persona): PerfilCuenta => ({
  personaId: p.personaId,
  usuarioId: p.usuario?.idUsuario,
  nombre: p.nombre,
  apellido: p.apellido,
  telefono: p.telefono ?? '',
  email: p.email,
  usuario: p.usuario?.user,
});

// ─── Componente ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './perfil.html',
})
export class PerfilComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tokenService = inject(TokenService);
  private readonly personaService = inject(PersonaService);
  private readonly authService = inject(AuthService);
  private readonly barberoService = inject(BarberoService);
  private readonly clienteService = inject(ClienteService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly notify = inject(NotificationService);

  // El rol se obtiene del token
  readonly rol: RolPerfil = this.obtenerRol();
  readonly rolLabel = ROL_LABEL[this.rol];

  // ── Estado ──
  perfil = signal<PerfilCuenta>(PERFIL_VACIO);
  cargando = signal(false);
  guardandoPerfil = signal(false);
  guardandoPassword = signal(false);
  visible = signal<Record<CampoPassword, boolean>>({ actual: false, nueva: false, confirmar: false });

  readonly camposPassword = [
    { control: 'passwordActual', key: 'actual', label: 'Contraseña actual', placeholder: '••••••••', error: 'La contraseña actual es requerida.' },
    { control: 'passwordNueva', key: 'nueva', label: 'Nueva contraseña', placeholder: 'Mín. 8 caracteres', error: 'Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.' },
    { control: 'confirmarPassword', key: 'confirmar', label: 'Confirmar contraseña', placeholder: 'Repite la nueva contraseña', error: 'Confirma una contraseña válida.' },
  ] as const;

  // ── Formularios ──
  formPerfil = this.fb.group({
    nombre: ['', [
      Validators.required,
      textoValido,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/),
    ]],
    apellido: ['', [
      Validators.required,
      textoValido,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/),
    ]],
    email: [{ value: '', disabled: true }, Validators.email],
    telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
  });

  formPassword = this.fb.group(
    {
      passwordActual: ['', [Validators.required, Validators.minLength(6)]],
      passwordNueva: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      ]],
      confirmarPassword: ['', [Validators.required, Validators.minLength(8)]],
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
    this.cargarPerfil$().subscribe({
      next: (p) => {
        this.perfil.set(p);
        this.formPerfil.patchValue({
          nombre: p.nombre,
          apellido: p.apellido,
          telefono: p.telefono,
          email: p.email,
        });
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(`Error cargando perfil ${this.rol}:`, err);
        this.cargando.set(false);
        this.notify.showHttpError(err);
      },
    });
  }

  /** Lo único que cambia por rol: de dónde salen los datos. */
  private cargarPerfil$(): Observable<PerfilCuenta> {
    switch (this.rol) {
      case 'CLIENTE':
        return this.clienteService.obtenerPerfilPropio().pipe(
          map((r) => this.perfilDesdeApi(r.data)),
        );

      case 'BARBERO':
        return this.barberoService.obtenerMiBarberoId().pipe(
          switchMap((r) => this.barberoService.obtenerPorId(r.data)),
          map(({ data }) => ({
            ...desdePersona(data.persona),
            descripcion: data.descripcion || 'Sin descripción disponible',
          })),
        );

      case 'ADMIN': {
        const id = this.userId();
        if (id) {
          return this.usuarioService.obtenerPorId(id).pipe(
            map((r) => this.perfilDesdeApi(r.data)),
          );
        }

        // El token puede traer el username en `sub` en vez de un id numérico:
        // se busca al usuario por nombre, como hacía el código original.
        const username = this.nombreUsuarioToken().toLowerCase();
        return this.usuarioService.buscar(username, 0, 10).pipe(
          map((r) => (r.data?.content ?? []).find((u) => String(u.usuario ?? '').toLowerCase() === username)),
          switchMap((u) => u
            ? this.usuarioService.obtenerPorId(u.idUsuario)
            : throwError(() => new Error('No se encontró el usuario administrador autenticado.'))),
          map((r) => this.perfilDesdeApi(r.data)),
        );
      }
    }
  }

  /** Normaliza respuestas planas o con `persona` anidada. */
  private perfilDesdeApi(data: any): PerfilCuenta {
    const p = data?.persona ?? data;
    return {
      personaId: Number(p?.personaId ?? data?.personaId ?? 0),
      usuarioId: Number(data?.idUsuario ?? p?.usuario?.idUsuario ?? this.userId() ?? 0) || undefined,
      nombre: p?.nombre ?? '',
      apellido: p?.apellido ?? '',
      telefono: p?.telefono ?? '',
      email: p?.email ?? '',
      usuario: data?.username ?? data?.usuario ?? p?.usuario?.user,
      fechaRegistro: data?.fechaRegistro,
      descripcion: data?.descripcion,
      permisos: this.rol === 'ADMIN' ? (data?.permisos ?? PERMISOS_ADMIN) : undefined,
    };
  }

  private userId(): number | null {
    const id = Number(this.tokenService.getUserId());
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  private nombreUsuarioToken(): string {
    const token = this.tokenService.getDecodedToken();
    return String(token?.username ?? token?.user ?? token?.sub ?? '').trim();
  }

  private obtenerRol(): RolPerfil {
    const role = this.tokenService.getPrimaryRole();
    return role === 'admin' ? 'ADMIN' : role === 'barbero' ? 'BARBERO' : 'CLIENTE';
  }

  // ── Acciones ──
  toggleVisible(campo: CampoPassword): void {
    this.visible.update((v) => ({ ...v, [campo]: !v[campo] }));
  }

  campoInvalido(form: AbstractControl, campo: string): boolean {
    const c = form.get(campo);
    return !!(c?.invalid && c?.touched);
  }

  guardarPerfil(): void {
    if (this.formPerfil.invalid) {
      this.formPerfil.markAllAsTouched();
      return;
    }

    const p = this.perfil();
    if (!p.usuarioId && !p.personaId) {
      this.notify.showHttpError(new Error('No se pudo identificar el perfil a actualizar.'));
      return;
    }

    const { nombre, apellido, telefono, email } = this.formPerfil.getRawValue();
    const dto: PersonaUpdateRequest = {
      nombre: nombre!.trim(),
      apellido: apellido!.trim(),
      telefono: (telefono ?? '').trim(),
      email: (email ?? p.email).trim(),
    };

    // Igual que el código original: ADMIN actualiza por usuario;
    // el resto por personaId y, si no hay, por usuario.
    const request$ = this.rol !== 'ADMIN' && p.personaId
      ? this.personaService.actualizarPersona(p.personaId, dto)
      : this.personaService.actualizarPersonaPorUsuarioId(p.usuarioId!, dto);

    this.guardandoPerfil.set(true);
    request$.subscribe({
      next: () => {
        this.perfil.update((actual) => ({ ...actual, ...dto }));
        this.guardandoPerfil.set(false);
        this.notify.showSuccess('Los datos del perfil se guardaron correctamente.');
      },
      error: (err) => {
        console.error('Error guardando perfil:', err);
        this.guardandoPerfil.set(false);
        this.notify.showHttpError(err);
      },
    });
  }

  cambiarPassword(): void {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    const { passwordActual, passwordNueva } = this.formPassword.getRawValue();

    this.guardandoPassword.set(true);
    this.authService.cambiarPassword(passwordActual!, passwordNueva!).subscribe({
      next: () => {
        this.guardandoPassword.set(false);
        this.formPassword.reset();
        this.notify.showSuccess('La contraseña se actualizó correctamente.');
      },
      error: (err) => {
        console.error('Error cambiando contraseña:', err);
        this.guardandoPassword.set(false);
        this.notify.showHttpError(err);
      },
    });
  }
}