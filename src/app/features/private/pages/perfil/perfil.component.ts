import { Component, OnInit, computed, inject, signal } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, map, of, switchMap } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
import { Persona } from '../../../../core/models/gestion/persona/persona.model';
import { PersonaUpdateRequest } from '../../../../core/models/gestion/persona/persona-update.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { BarberoService } from '../../../../core/services/gestion/barbero.service';
import { PersonaService } from '../../../../core/services/gestion/persona.service';
import { UsuarioService } from '../../../../core/services/auth/usuario.service';
import { NotificationService } from '../../../../core/services/common/notification.service';
// import { ClienteService } from '../../../../core/services/gestion/cliente.service';
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

const passwordsCoinciden = (g: AbstractControl): ValidationErrors | null =>
  g.get('passwordNueva')?.value === g.get('confirmarPassword')?.value ? null : { noCoinciden: true };

const desdePersona = (p: Persona): PerfilCuenta => ({
  personaId: p.personaId,
  usuarioId: p.usuario?.idUsuario,
  nombre: p.nombre,
  apellido: p.apellido,
  telefono: p.telefono ?? '',
  email: p.email,
  usuario: p.usuario?.user,
});

const PERFILES_MEMORIA: Record<RolPerfil, PerfilCuenta> = {
  ADMIN: { personaId: 1, usuarioId: 1, nombre: 'Administrador', apellido: 'Demo', telefono: '900000000', email: 'admin@gmail.com', usuario: 'admin', permisos: PERMISOS_ADMIN },
  BARBERO: { personaId: 2, usuarioId: 2, nombre: 'Carlos', apellido: 'Ramírez', telefono: '982321324', email: 'barbero@fadex.com', usuario: 'barbero', descripcion: 'Barbero especializado en cortes clásicos y degradados.' },
  CLIENTE: { personaId: 3, usuarioId: 3, nombre: 'Juan', apellido: 'Pérez', telefono: '982321324', email: 'jdcruzp11@gmail.com', usuario: 'cliente', fechaRegistro: '2026-01-15' },
};

const PERFIL_VACIO: PerfilCuenta = {
  personaId: 0,
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
};

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

  // Backend: dependencias conservadas para cuando se habilite la API.
  // private readonly toast = inject(MessageService);
  // private readonly clienteService = inject(ClienteService);
private readonly personaService = inject(PersonaService);
private readonly authService = inject(AuthService);
private readonly barberoService = inject(BarberoService);
private readonly usuarioService = inject(UsuarioService);
private readonly notify = inject(NotificationService);

  // El rol viene de la ruta: data: { rol: 'CLIENTE' | 'BARBERO' | 'ADMIN' }
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
  if (this.rol === 'ADMIN') {
    const userId = this.tokenService.getUserId();
    const idUsuario = typeof userId === 'number' ? userId : Number(userId);

    this.cargando.set(true);
    const consulta = Number.isInteger(idUsuario) && idUsuario > 0
      ? this.usuarioService.obtenerPorId(idUsuario)
      : this.usuarioService.buscar(this.nombreUsuarioToken(), 0, 10).pipe(
        map((respuesta) => {
          const usuarios = respuesta.data?.content ?? [];
          const username = this.nombreUsuarioToken().toLowerCase();
          const usuario = usuarios.find((item: any) =>
            String(item.usuario ?? item.username ?? '').toLowerCase() === username
          );
          if (!usuario?.idUsuario) {
            throw new Error('No se encontró el usuario administrador autenticado.');
          }
          return this.usuarioService.obtenerPorId(Number(usuario.idUsuario));
        }),
        switchMap((peticion) => peticion),
      );

    consulta.subscribe({
      next: ({ data }) => {
        const perfil = this.perfilDesdeUsuario(data, Number(data?.idUsuario ?? idUsuario));
        this.perfil.set(perfil);
        this.formPerfil.patchValue({
          nombre: perfil.nombre,
          apellido: perfil.apellido,
          telefono: perfil.telefono,
          email: perfil.email,
        });
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando perfil administrador:', err);
        this.cargando.set(false);
        this.notify.showHttpError(err);
      },
    });
    return;
  }

  if (this.rol === 'CLIENTE') {
    const p = { ...PERFILES_MEMORIA[this.rol] };
    this.perfil.set(p);
    this.formPerfil.patchValue({ nombre: p.nombre, apellido: p.apellido, telefono: p.telefono, email: p.email });
    return;
  }

  this.cargando.set(true);
  this.barberoService.obtenerMiBarberoId().pipe(
    switchMap((r) => this.barberoService.obtenerPorId(r.data)),
    map(({ data }) => ({ ...desdePersona(data.persona), descripcion: data.descripcion || 'Sin descripción disponible' })),
  ).subscribe({
    next: (p) => {
      this.perfil.set(p);
      this.formPerfil.patchValue({ nombre: p.nombre, apellido: p.apellido, telefono: p.telefono, email: p.email });
      this.cargando.set(false);
    },
    error: (err) => {
      console.error('Error cargando perfil barbero:', err);
      this.cargando.set(false);
    },
  });
}

private perfilDesdeUsuario(data: any, idUsuario: number): PerfilCuenta {
  return {
    personaId: Number(data?.personaId ?? data?.persona?.personaId ?? 0),
    usuarioId: Number(data?.idUsuario ?? idUsuario),
    nombre: data?.nombre ?? data?.persona?.nombre ?? '',
    apellido: data?.apellido ?? data?.persona?.apellido ?? '',
    telefono: data?.telefono ?? data?.persona?.telefono ?? '',
    email: data?.email ?? data?.persona?.email ?? '',
    usuario: data?.username ?? data?.usuario ?? data?.user,
    permisos: data?.permisos ?? PERMISOS_ADMIN,
  };
}

private nombreUsuarioToken(): string {
  const token = this.tokenService.getDecodedToken();
  return String(token?.username ?? token?.user ?? token?.sub ?? '').trim();
}
  // ── Acciones ──


  // Backend: guardado original conservado para reactivar con PersonaService.
  // const dto: PersonaUpdateRequest = { nombre: nombre!, apellido: apellido!, telefono: telefono ?? '', email: p.email };
  // const request$: Observable<unknown> = p.personaId
  //   ? this.personaService.actualizarPersona(p.personaId, dto)
  //   : this.personaService.actualizarPersonaPorUsuarioId(p.usuarioId!, dto);
  // request$.subscribe({
  //   next: () => this.perfil.update((actual) => ({ ...actual, ...dto })),
  //   error: () => undefined,
  // });





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

  // Notificaciones desactivadas temporalmente; se conserva el contrato anterior.
  // private notificar(severity: 'success' | 'error', summary: string, detail: string): void {
  //   this.toast.add({ severity, summary, detail, life: 3000 });
  // }

  guardarPerfil(): void {
  if (this.formPerfil.invalid) {
    this.formPerfil.markAllAsTouched();
    return;
  }

  const { nombre, apellido, telefono, email } = this.formPerfil.getRawValue();

  if (this.rol === 'CLIENTE') {
    this.perfil.update((actual) => ({ ...actual, nombre: nombre!, apellido: apellido!, telefono: telefono ?? '' }));
    return;
  }

  const p = this.perfil();
  const dto: PersonaUpdateRequest = {
    nombre: nombre!.trim(),
    apellido: apellido!.trim(),
    telefono: (telefono ?? '').trim(),
    email: (email ?? p.email).trim(),
  };
  const request$ = this.rol === 'ADMIN'
    ? this.personaService.actualizarPersonaPorUsuarioId(p.usuarioId!, dto)
    : p.personaId
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

  if (this.rol === 'CLIENTE') {
    this.formPassword.reset();
    return;
  }

  this.guardandoPassword.set(true);
  this.authService.cambiarPassword(passwordActual!, passwordNueva!).subscribe({
    next: () => {
      this.guardandoPassword.set(false);
      this.formPassword.reset();
      this.notify.showSuccess('La contraseña se actualizó correctamente.');
    },
    error: (err) => {
      console.error(err.error?.message ?? 'La contraseña actual es incorrecta.');
      this.guardandoPassword.set(false);
      this.notify.showHttpError(err);
    },
  });
}

}