import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';

@Component({
  selector: 'app-confirm-popover',
  standalone: true,
  imports: [ButtonComponent, DialogHeaderComponent],
  template: `
    @if (visible) {
      <div class="fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px]" (click)="onCancel()"></div>

      <div class="fixed inset-x-4 top-1/2 z-[100] mx-auto flex max-w-sm -translate-y-1/2 flex-col gap-4 rounded-2xl border border-brand-gold-hover bg-ui-card p-5 shadow-2xl">
        <div class="flex w-full items-center justify-between px-2">
          <app-dialog-header [icono]="obtenerIcono()" [title]="obtenerTitulo()" [mode]="mode" />
          <app-button
            [variant]="mode === 'eliminar' ? 'close-tabla' : 'cierre'"
            icon="pi-times"
            tooltip="Cerrar"
            (clicked)="onCancel()" />
        </div>

        <span class="mb-4 flex w-full justify-center text-center text-sm text-text-secondary">{{ mensaje }}</span>

        <div class="flex w-full flex-col gap-2 sm:flex-row sm:justify-around">
          <app-button
            [variant]="mode === 'eliminar' ? 'delete' : 'anular'"
            [icon]="mode === 'eliminar' ? 'pi-trash' : 'pi-ban'"
            [label]="confirmText"
            size="sm"
            (clicked)="onConfirm()" />
          <app-button variant="cancel" icon="pi-times" [label]="cancelText" size="sm" (clicked)="onCancel()" />
        </div>
      </div>
    }
  `,
})
export class ConfirmPopoverComponent {
  @Input() visible = false;
  @Input() mensaje = '';
  @Input() confirmText = 'Eliminar';
  @Input() cancelText = 'Cancelar';
  @Input() titulo = '';
  /** Si no se pasa: 'pi-trash' en modo eliminar, 'pi-ban' en modo anular */
  @Input() icono = '';
  @Input() mode: 'eliminar' | 'anular' = 'eliminar';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  /** Sin uso dentro del componente; se deja por compatibilidad con los padres que ya lo enlazan */
  @Output() anular = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  obtenerIcono(): string {
    return this.icono?.trim() || (this.mode === 'anular' ? 'pi-ban' : 'pi-trash');
  }

  obtenerTitulo(): string {
    return this.titulo || (this.mode === 'anular' ? 'Anular' : 'Eliminar');
  }
}