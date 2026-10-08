import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfiguracionResponse, ConfiguracionRequest } from '@/app/core/models/ruleta/ruleta-configuracion.model';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { RuletaResponse } from '@/app/core/models/ruleta/ruleta.model';

@Component({
  selector: 'app-configuracion-form',
  imports: [ReactiveFormsModule, SelectModule, CheckboxModule, TreeSelectModule, ButtonModule, MessageModule, InputNumberModule],
  templateUrl: './configuracion-form.html',
  styleUrl: './configuracion-form.css',
})
export class ConfiguracionFormComponent implements OnChanges, OnInit {
  @Output() guardar = new EventEmitter<ConfiguracionRequest>();
  @Output() cancelarEvento = new EventEmitter();
  @Input() configuracion: ConfiguracionResponse | null = null;
  @Input() categorias: Categoria[] = [];
  @Input() ruletas: RuletaResponse[] = [];
  @Input() resetTrigger: number = 0;

  private cd = inject(ChangeDetectorRef);
  private fb: FormBuilder = inject(FormBuilder);

  formSubmitted = false;
  configuracionForm!: FormGroup;
  categoriaTree: TreeNode[] = [];

  campoInvalido = (campo: string) => campoInvalido(this.configuracionForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.initForm();
    this.cargarCategoriasEnTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.configuracionForm) return;
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
    if (changes['categorias']) {
      this.cargarCategoriasEnTree();
    }
    if (changes['configuracion']) {
      this.actualizarFormulario();
    }
  }

  private initForm(): void {
    this.configuracionForm = this.fb.group({
      categoriaId: [null, Validators.required],
      meta: [1, [Validators.required, Validators.min(1)]],
      girosPorMeta: [1, [Validators.required, Validators.min(1)]],
      activa: [true],
      mostrarSiempre: [false],
      crearTarjetaAutomatica: [true],
      ruletaId: [null],
    });
  }

  private construirTree(categorias: Categoria[]): TreeNode[] {
    if (!Array.isArray(categorias)) { return []; }
    return categorias.map(categoria => ({
      label: categoria.nombre, key: String(categoria.id), data: categoria.id,
      children: categoria.subcategorias?.length ? this.construirTree(categoria.subcategorias) : []
    }));
  }

  cargarCategoriasEnTree(): void {
    this.categoriaTree = Array.isArray(this.categorias) ? this.construirTree(this.categorias) : [];
    this.cd.detectChanges();
  }

  private findTreeNodeById(nodes: TreeNode[], id: number): TreeNode | null {
    for (const node of nodes) {
      if (Number(node.key) === id) return node;
      if (node.children?.length) {
        const found = this.findTreeNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  private resetFormularioBase(): void {
    this.configuracionForm.reset({
      categoriaId: null,
      meta: 1,
      girosPorMeta: 1,
      activa: true,
      mostrarSiempre: false,
      crearTarjetaAutomatica: true,
      ruletaId: null,
    });
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.resetFormularioBase();
    this.configuracionForm.markAsPristine();
    this.configuracionForm.markAsUntouched();
  }

  private actualizarFormulario(): void {
    if (this.configuracion) {
      this.configuracionForm.patchValue({
        meta: this.configuracion.meta,
        girosPorMeta: this.configuracion.girosPorMeta,
        activa: this.configuracion.activa,
        mostrarSiempre: this.configuracion.mostrarSiempre,
        crearTarjetaAutomatica: this.configuracion.crearTarjetaAutomatica,
        ruletaId: this.configuracion.ruletaId ?? null,
        categoriaId: null,
      });
      // La categoría no se puede cambiar al editar (es única por categoría en el backend).
      this.configuracionForm.get('categoriaId')?.disable();
      if (this.configuracion.categoriaId) {
        setTimeout(() => {
          if (this.categoriaTree.length && this.configuracion?.categoriaId) {
            const match = this.findTreeNodeById(this.categoriaTree, this.configuracion.categoriaId);
            this.configuracionForm.patchValue({ categoriaId: match || null });
            this.cd.detectChanges();
          }
        });
      }
    } else {
      this.configuracionForm.get('categoriaId')?.enable();
      this.resetFormularioBase();
    }
    this.configuracionForm.markAsPristine();
    this.configuracionForm.markAsUntouched();
  }

  onCancelar(): void {
    this.formSubmitted = false;
    this.limpiarFormulario();
    this.cancelarEvento.emit();
  }

  onGuardar(): void {
    this.formSubmitted = true;
    if (this.configuracionForm.invalid) { marcarFormulario(this.configuracionForm); return; }
    const raw = this.configuracionForm.getRawValue();
    const categoriaId = this.configuracion? this.configuracion.categoriaId : Number(raw.categoriaId.key);
    const data: ConfiguracionRequest = {
      categoriaId,
      activa: raw.activa,
      meta: raw.meta,
      girosPorMeta: raw.girosPorMeta,
      mostrarSiempre: raw.mostrarSiempre,
      crearTarjetaAutomatica: raw.crearTarjetaAutomatica,
      ruletaId: raw.ruletaId ?? null,
    };
    this.guardar.emit(data);
  }
}