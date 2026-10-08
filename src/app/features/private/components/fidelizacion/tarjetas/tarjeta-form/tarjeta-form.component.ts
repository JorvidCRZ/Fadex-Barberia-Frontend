import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { map } from 'rxjs';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { TreeNode } from 'primeng/api';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
  standalone: true,
  selector: 'app-tarjeta-form',
  imports: [CommonModule, ReactiveFormsModule, SelectModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './tarjeta-form.html',
})
export class TarjetaFormComponent implements OnInit, OnChanges {
  @Input() resetTrigger = 0;
  @Output() guardar = new EventEmitter<{ clienteId: number; categoriaId: number }>();
  @Output() cancelarEvento = new EventEmitter<void>();
  @Input() categorias: Categoria[] = [];

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private cd = inject(ChangeDetectorRef);

  formSubmitted = false;
  tarjetaForm!: FormGroup;
  clientes: { id: number; nombreCompleto: string }[] = [];
  categoriaTree: TreeNode[] = [];

  campoInvalido = (campo: string) => campoInvalido(this.tarjetaForm, campo, this.formSubmitted);

  ngOnInit(): void {
    console.log('ngOnInit');
    this.construirFormulario();
    this.cargarClientes();
    this.cargarCategoriasEnTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorias']) {
      this.cargarCategoriasEnTree();
    }
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.formSubmitted = false;
      this.tarjetaForm?.reset();
    }
  }

  private construirFormulario(): void {
    this.tarjetaForm = this.fb.group({
      clienteId: [null, Validators.required],
      categoriaId: [null, Validators.required],
    });
  }

  private cargarClientes(): void {
    this.clienteService.listar(0, 1000).pipe(
      map((res: any) => res?.data?.content ?? [])
    ).subscribe((list: any[]) => {
      this.clientes = list.map(c => ({
        id: c.clienteId ?? c.id,
        nombreCompleto: `${c.persona?.nombre ?? ''} ${c.persona?.apellido ?? ''}`.trim(),
      }));
      this.cd.detectChanges();
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

  onGuardar(): void {
    this.formSubmitted = true;
    if (this.tarjetaForm.invalid) { marcarFormulario(this.tarjetaForm); return; }
    const categoriaSeleccionada = this.tarjetaForm.value.categoriaId;
    const categoriaId = categoriaSeleccionada?.key ? Number(categoriaSeleccionada.key) : categoriaSeleccionada?.data ?? categoriaSeleccionada;
    this.guardar.emit({ clienteId: this.tarjetaForm.value.clienteId, categoriaId, });
  }

  onCancelar(): void {
    this.formSubmitted = false;
    this.tarjetaForm.reset();
    this.cancelarEvento.emit();
  }
}