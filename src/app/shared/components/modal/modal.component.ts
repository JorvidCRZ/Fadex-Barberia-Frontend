import { Component, Input, model, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent, ButtonVariant } from '../button/button.component';
import { DialogHeaderComponent, DialogHeaderMode } from '../dialog-header/dialog-header.component';

/**
 * Modal estándar: p-dialog + app-dialog-header (izquierda) + app-button de cierre (derecha).
 *
 * Uso:
 *   <app-modal [(visible)]="mostrar" titulo="Nueva Reserva" mode="crear" icono="pi-calendar-plus" maxWidth="50rem">
 *     ...contenido...
 *   </app-modal>
 *
 * Para botones de pie (Cancelar / Guardar) ponlos dentro del contenido.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DialogModule, DialogHeaderComponent, ButtonComponent],
  template: `
    <p-dialog
      [visible]="visible()"
      (visibleChange)="visible.set($event)"
      (onHide)="cerrado.emit()"
      [modal]="true"
      [closable]="true"
      [draggable]="false"
      [dismissableMask]="dismissableMask"
      styleClass="modal-estandar"
      [style]="{ width: '100vw', maxWidth: maxWidth }"
      [closable]="cerrable" [dismissableMask]="cerrable && dismissableMask"
    >
      <ng-template pTemplate="header">
        <div class="flex w-full items-center justify-between gap-4">
          <app-dialog-header [title]="titulo" [mode]="mode" [icono]="icono" />
          @if (cerrable) {
            <app-button [variant]="varianteCierre" icon="pi-times" tooltip="Cerrar" (clicked)="cerrar()" />
          }
        </div>
      </ng-template>

      <ng-content />
    </p-dialog>
  `,
})
export class ModalComponent {
  /** Soporta [(visible)]="mostrar" */
  visible = model(false);
  /** Se emite cuando el modal termina de cerrarse (X, máscara o Esc) */
  cerrado = output<void>();
  @Input() cerrable = true;
  @Input() titulo = '';
  @Input() mode: DialogHeaderMode = 'crear';
  /** Si no se pasa, se usa el icono del modo */
  @Input() icono = '';
  @Input() maxWidth = '40rem';
  @Input() dismissableMask = true;

  /** Misma regla que ConfirmPopover */
  get varianteCierre(): ButtonVariant {
    return this.mode === 'eliminar' ? 'close-tabla' : 'cierre';
  }

  cerrar(): void {
    this.visible.set(false);
  }
}
