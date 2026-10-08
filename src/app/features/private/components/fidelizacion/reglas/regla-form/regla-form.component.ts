import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FidelizacionReglaResponse, FidelizacionReglaRequest, TipoAlcanceFidelizacion } from '@/app/core/models/fidelizacion/regla.model';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { ProductoSelectorComponent } from '@/app/shared/components/selector/producto-selector/producto-selector.component';
import { ServicioSelectorComponent } from '@/app/shared/components/selector/servicio-selector/servicio-selector.component';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { ServicioService } from '@/app/core/services/catalogos/servicio.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { Producto } from '@/app/core/models/catalogos/productos.model';
import { Servicio } from '@/app/core/models/catalogos/servicios.model';

@Component({
  standalone: true,
  selector: 'app-regla-form',
  imports: [
    ReactiveFormsModule, SelectModule, CheckboxModule, TreeSelectModule, ButtonModule, MessageModule, InputNumberModule,
    DialogModule, ProductoSelectorComponent, ServicioSelectorComponent, DialogHeaderComponent
  ],
  templateUrl: './regla-form.html',
  styleUrl: './regla-form.css',
})

export class ReglaFormComponent implements OnChanges, OnInit {
  @Output() guardar = new EventEmitter<FidelizacionReglaRequest>();
  @Output() cancelarEvento = new EventEmitter();
  @Input() regla: FidelizacionReglaResponse | null = null;
  @Input() categorias: Categoria[] = [];
  @Input() resetTrigger: number = 0;

  private cd = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private servicioService = inject(ServicioService);
  private notify = inject(NotificationService);

  formSubmitted = false;
  reglaForm!: FormGroup;
  categoriaTree: TreeNode[] = [];

  mostrarSelectorServicio = false;
  mostrarSelectorProducto = false;
  productoSeleccionado: Producto | null = null;
  servicioSeleccionado: Servicio | null = null;

  readonly tiposAlcance = [
    { label: 'Categoría completa', value: TipoAlcanceFidelizacion.CATEGORIA },
    { label: 'Servicio específico', value: TipoAlcanceFidelizacion.SERVICIO },
    { label: 'Producto específico', value: TipoAlcanceFidelizacion.PRODUCTO },
    { label: 'Combo (servicio + producto)', value: TipoAlcanceFidelizacion.COMBO },
  ];

  campoInvalido = (campo: string) => campoInvalido(this.reglaForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.initForm();
    this.cargarCategoriasEnTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.reglaForm) return;
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
    if (changes['categorias']) {
      this.cargarCategoriasEnTree();
    }
    if (changes['regla']) {
      this.actualizarFormulario();
    }
  }

  private initForm(): void {
    this.reglaForm = this.fb.group({
      categoriaId: [null, Validators.required],
      tipoAlcance: [TipoAlcanceFidelizacion.CATEGORIA, Validators.required],
      servicioId: [null],
      productoId: [null],
      puntos: [1, [Validators.required, Validators.min(1)]],
      activo: [true],
    });
  }

  get tipoSeleccionado(): TipoAlcanceFidelizacion {
    return this.reglaForm?.get('tipoAlcance')?.value;
  }
  
  get muestraServicio(): boolean {
    return [TipoAlcanceFidelizacion.SERVICIO, TipoAlcanceFidelizacion.COMBO].includes(this.tipoSeleccionado);
  }

  get muestraProducto(): boolean {
    return [TipoAlcanceFidelizacion.PRODUCTO, TipoAlcanceFidelizacion.COMBO].includes(this.tipoSeleccionado);
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

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.reglaForm.patchValue({ productoId: producto.id });
    this.reglaForm.get('productoId')?.setErrors(null);
    this.mostrarSelectorProducto = false;
  }

  seleccionarServicio(servicio: Servicio): void {
    this.servicioSeleccionado = servicio;
    this.reglaForm.patchValue({ servicioId: servicio.servicioId });
    this.reglaForm.get('servicioId')?.setErrors(null);
    this.mostrarSelectorServicio = false;
  }

  private cargarSeleccionExistente(): void {
    if (this.regla?.productoId) {

      this.productoService.obtenerProductoId(this.regla.productoId)
        .subscribe({
          next: resp => {
            this.productoSeleccionado = resp.data;
            this.cd.detectChanges();
          },
          error: err => this.notify.showHttpError(err.message)
        });

    }

    if (this.regla?.servicioId) {
      this.servicioService.obtenerServicioPorId(this.regla.servicioId)
        .subscribe({
          next: resp => {
            this.servicioSeleccionado = resp.data;
            this.cd.detectChanges();
          },
          error: err => this.notify.showHttpError(err.message)
        });
    }
    this.productoSeleccionado = null;
    this.servicioSeleccionado = null;
    if (this.regla?.tipoAlcance === TipoAlcanceFidelizacion.PRODUCTO && this.regla.productoId) {
      this.productoService.obtenerProductoId(this.regla.productoId).subscribe({
        next: (resp) => {
          this.productoSeleccionado = resp.data;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.notify.showHttpError(err.message);
        }
      });
    }
    if (this.regla?.tipoAlcance === TipoAlcanceFidelizacion.SERVICIO && this.regla.servicioId) {
      this.servicioService.obtenerServicioPorId(this.regla.servicioId).subscribe({
        next: (resp) => {
          this.servicioSeleccionado = resp.data;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.notify.showHttpError(err.message);
        }
      });
    }
  }

  private resetFormularioBase(): void {
    this.reglaForm.reset({
      categoriaId: null,
      tipoAlcance: TipoAlcanceFidelizacion.CATEGORIA,
      servicioId: null,
      productoId: null,
      puntos: 1,
      activo: true,
    });
    this.productoSeleccionado = null;
    this.servicioSeleccionado = null;
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.resetFormularioBase();
    this.reglaForm.markAsPristine();
    this.reglaForm.markAsUntouched();
  }

  private actualizarFormulario(): void {
    if (this.regla) {
      this.reglaForm.patchValue({
        tipoAlcance: this.regla.tipoAlcance,
        servicioId: this.regla.servicioId ?? null,
        productoId: this.regla.productoId ?? null,
        puntos: this.regla.puntos,
        activo: this.regla.activo,
        categoriaId: null,
      });
      this.cargarSeleccionExistente();
      if (this.regla.categoriaId) {
        setTimeout(() => {
          if (this.categoriaTree.length && this.regla?.categoriaId) {
            const match = this.findTreeNodeById(this.categoriaTree, this.regla.categoriaId);
            this.reglaForm.patchValue({ categoriaId: match || null });
            this.cd.detectChanges();
          }
        });
      }
    } else {
      this.resetFormularioBase();
    }
    this.reglaForm.markAsPristine();
    this.reglaForm.markAsUntouched();
  }

  onCancelar(): void {
    this.formSubmitted = false;
    this.limpiarFormulario();
    this.cancelarEvento.emit();
  }

  onGuardar(): void {
    this.formSubmitted = true;
    if (this.reglaForm.invalid) { marcarFormulario(this.reglaForm); return; }

    if (this.muestraServicio && !this.reglaForm.value.servicioId) {
      this.reglaForm.get('servicioId')?.setErrors({ required: true });
      return;
    }
    if (this.muestraProducto && !this.reglaForm.value.productoId) {
      this.reglaForm.get('productoId')?.setErrors({ required: true });
      return;
    }

    const categoriaSeleccionada = this.reglaForm.value.categoriaId;
    const data: FidelizacionReglaRequest = {
      categoriaId: Number(categoriaSeleccionada.key),
      tipoAlcance: this.reglaForm.value.tipoAlcance,
      servicioId: this.muestraServicio ? this.reglaForm.value.servicioId : null,
      productoId: this.muestraProducto ? this.reglaForm.value.productoId : null,
      puntos: this.reglaForm.value.puntos,
      activo: this.reglaForm.value.activo,
    };
    this.guardar.emit(data);
  }
}