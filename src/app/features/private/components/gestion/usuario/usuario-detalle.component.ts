import { Component, DestroyRef, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { finalize } from 'rxjs';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { aPerfilUsuario, claseRol, iniciales, UsuarioPerfil } from './usuario.utils.component';

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [ModalComponent, ButtonComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './usuario-detalle.html',
})
export class UsuarioDetalleComponent {
  private readonly usuarioService = inject(UsuarioService);

  visible = model(false);
  usuarioId = input<number | null>(null);
  /** Cuando cambia, el modal vuelve a cargar los datos (útil tras editar, asignar PIN o generar QR) */
  refresco = input(0);

  editar = output<void>();
  pin = output<void>();
  /** Emite true si ya hay un QR (hay que regenerarlo) y false si es el primero */
  qr = output<boolean>();

  cargando = signal(false);
  error = signal('');
  usuario = signal<UsuarioPerfil | null>(null);
  qrUrl = signal<string | null>(null);

  readonly iniciales = iniciales;
  readonly claseRol = claseRol;

  private qrObjectUrl: string | null = null;

  get nombreCompleto(): string {
    const u = this.usuario();
    return [u?.nombre, u?.apellido].filter(Boolean).join(' ').trim();
  }

  constructor() {
    effect(() => {
      const abierto = this.visible();
      const id = this.usuarioId();
      this.refresco(); // dependencia: al cambiar, se recarga

      untracked(() => {
        if (abierto && id) this.cargar(id);
        else if (!abierto) this.liberarQr();
      });
    });

    inject(DestroyRef).onDestroy(() => this.liberarQr());
  }

  private cargar(id: number): void {
    this.cargando.set(true);
    this.error.set('');

    this.usuarioService
      .obtenerPorId(id)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (res) => {
          const perfil = aPerfilUsuario(res?.data, id);
          this.usuario.set(perfil);
          if (perfil.tieneQr) this.cargarQr(id);
          else this.liberarQr();
        },
        error: () => this.error.set('No se pudo cargar el usuario.'),
      });
  }

  private cargarQr(id: number): void {
    this.usuarioService.generateQr(id).subscribe({
      next: (blob) => {
        this.liberarQr();
        this.qrObjectUrl = URL.createObjectURL(blob);
        this.qrUrl.set(this.qrObjectUrl);
      },
      error: () => this.qrUrl.set(null),
    });
  }

  private liberarQr(): void {
    if (this.qrObjectUrl) {
      URL.revokeObjectURL(this.qrObjectUrl);
      this.qrObjectUrl = null;
    }
    this.qrUrl.set(null);
  }
}