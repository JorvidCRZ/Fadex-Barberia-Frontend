import { Component, Input } from '@angular/core';

export type DialogHeaderMode = 'ver' | 'crear' | 'editar' | 'eliminar' | 'anular';

/** Icono por defecto de cada modo (se usa cuando no se pasa [icono]) */
const ICONO_POR_MODO: Record<DialogHeaderMode, string> = {
  ver: 'pi-eye',
  crear: 'pi-plus',
  editar: 'pi-pencil',
  eliminar: 'pi-trash',
  anular: 'pi-ban',
};

/**
 * Cabecera de diálogos: icono en recuadro de color + título.
 * El color sale del modo (clases .dialog-header-<modo> en styles/dialog-header.scss).
 *
 * Uso:
 *   <app-dialog-header mode="editar" title="Editar cliente" />
 *   <app-dialog-header mode="eliminar" title="Eliminar producto" icono="pi-box" />
 */
@Component({
  standalone: true,
  selector: 'app-dialog-header',
  template: `
    <div [class]="headerClass">
      <span class="dialog-header-icon" aria-hidden="true">
        <i [class]="claseIcono"></i> 
      </span> 
      <span class="dialog-header-title ml-1">{{ title }}</span>
    </div>
  `,
  styleUrls: ['./dialog-header.scss'],
})
export class DialogHeaderComponent {
  @Input() title = '';
  /** 'pi-save', 'pi pi-save' o 'save'. Si no se pasa, se usa el icono del modo */
  @Input() icono = '';
  @Input() mode: DialogHeaderMode = 'crear';

  get claseIcono(): string {
    const nombre = (this.icono ?? '').replace(/^pi\s+/, '').trim() || ICONO_POR_MODO[this.mode] || ICONO_POR_MODO.crear;
    return `pi ${nombre.startsWith('pi-') ? nombre : 'pi-' + nombre}`;
  }

  get headerClass(): string {
    return `dialog-header-base dialog-header-${this.mode in ICONO_POR_MODO ? this.mode : 'crear'}`;
  }

  /** Se mantiene por compatibilidad con código que llamaba al método antiguo */
  getIconClass(): string {
    return `${this.claseIcono} text-xl`;
  }
}