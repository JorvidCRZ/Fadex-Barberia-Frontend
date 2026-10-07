import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, map, of, switchMap } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Persona } from '../../../../core/models/gestion/persona/persona.model';
import { PersonaUpdateRequest } from '../../../../core/models/gestion/persona/persona-update.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ClienteService } from '../../../../core/services/gestion/cliente.service';
import { BarberoService } from '../../../../core/services/gestion/barbero.service';
import { PersonaService } from '../../../../core/services/gestion/persona.service';

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

// ─── Componente ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ToastModule],
  providers: [MessageService],
  templateUrl: './perfil.html',
})
export class PerfilComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(MessageService);
  private readonly personaService = inject(PersonaService);
  private readonly authService = inject(AuthService);
  private readonly clienteService = inject(ClienteService);
  private readonly barberoService = inject(BarberoService);

  // El rol viene de la ruta: data: { rol: 'CLIENTE' | 'BARBERO' | 'ADMIN' }
  readonly rol = inject(ActivatedRoute).snapshot.data['rol'] as RolPerfil;
  readonly rolLabel = ROL_LABEL[this.rol];

  // ── Estado ──
  perfil = signal<PerfilCuenta>({ personaId: 0, nombre: '', apellido: '', telefono: '', email: '' });
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

    this.obtenerPerfil().subscribe({
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
      error: () => {
        this.cargando.set(false);
        this.notificar('error', 'Error', 'No se pudo cargar el perfil.');
      },
    });
  }

  // Lo único que cambia según el rol es de dónde salen los datos
  private obtenerPerfil(): Observable<PerfilCuenta> {
    switch (this.rol) {
      case 'CLIENTE':
        return this.clienteService.obtenerPerfilPropio().pipe(
          map(({ data }) => ({ ...desdePersona(data.persona), fechaRegistro: data.fechaRegistro })),
        );

      case 'BARBERO':
        return this.barberoService.obtenerMiBarberoId().pipe(
          switchMap((r) => this.barberoService.obtenerPorId(r.data)),
          map(({ data }) => ({
            ...desdePersona(data.persona),
            descripcion: data.descripcion || 'Sin descripción disponible',
          })),
        );

      case 'ADMIN':
        // Mock hasta que exista el endpoint real
        return of({
          personaId: 1,
          usuarioId: 1,
          nombre: 'Admin',
          apellido: 'Sistema',
          telefono: '900000000',
          email: 'admin@gmail.com',
          usuario: 'admin1',
          permisos: PERMISOS_ADMIN,
        });
    }
  }

  // ── Acciones ──
  guardarPerfil(): void {
    if (this.formPerfil.invalid) {
      this.formPerfil.markAllAsTouched();
      return;
    }

    const p = this.perfil();
    if (!p.personaId && !p.usuarioId) {
      this.notificar('error', 'Error', 'No se pudo identificar tu perfil.');
      return;
    }

    this.guardandoPerfil.set(true);

    const { nombre, apellido, telefono } = this.formPerfil.getRawValue();
    const dto: PersonaUpdateRequest = {
      nombre: nombre!,
      apellido: apellido!,
      telefono: telefono ?? '',
      email: p.email,
    };

    const request$: Observable<unknown> = p.personaId
      ? this.personaService.actualizarPersona(p.personaId, dto)
      : this.personaService.actualizarPersonaPorUsuarioId(p.usuarioId!, dto);

    request$.subscribe({
      next: () => {
        this.guardandoPerfil.set(false);
        this.perfil.update((actual) => ({ ...actual, ...dto }));
        this.notificar('success', 'Perfil actualizado', 'Los datos se guardaron correctamente.');
      },
      error: () => {
        this.guardandoPerfil.set(false);
        this.notificar('error', 'Error', 'No se pudo guardar el perfil.');
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

    this.authService.cambiarPassword(passwordActual!, passwordNueva!).subscribe({
      next: () => {
        this.guardandoPassword.set(false);
        this.formPassword.reset();
        this.notificar('success', 'Contraseña actualizada', 'Tu contraseña fue cambiada exitosamente.');
      },
      error: (err) => {
        this.guardandoPassword.set(false);
        this.notificar('error', 'Error', err.error?.message ?? 'La contraseña actual es incorrecta.');
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

  private notificar(severity: 'success' | 'error', summary: string, detail: string): void {
    this.toast.add({ severity, summary, detail, life: 3000 });
  }

}