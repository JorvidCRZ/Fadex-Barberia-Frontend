import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Producto, ProductoRequest } from '@/app/core/models/catalogos/productos.model';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';
import { ImagenProductoUI } from '@/app/core/models/common/imagen.model';
import { ImageUploadService } from '@/app/core/services/common/imageUpload.service';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, TextareaModule, CheckboxModule, TreeSelectModule,
    InputNumberModule, MessageModule, ImageModule, FileUploadModule, ButtonComponent, SafeImageUrlPipe
  ],
  templateUrl: './producto-form.html'
})
export class ProductoFormComponent implements OnChanges, OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @Output() guardar = new EventEmitter<{ data: ProductoRequest, imagenes?: File[] | null }>();
  @Output() cancelarEvento = new EventEmitter<void>();
  @Input() producto: Producto | null = null;
  @Input() categorias: Categoria[] = [];
  @Input() guardando = false;
  @Input() resetTrigger = 0;

  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private fb: FormBuilder = inject(FormBuilder);
  private imageService = inject(ImageUploadService);

  formSubmitted = false;
  productoForm!: FormGroup;
  categoriaTree: TreeNode[] = [];
  imagenes: ImagenProductoUI[] = [];
  imagenesEliminada: string[] = [];

  campoInvalido = (campo: string) => campoInvalido(this.productoForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.initForm();
    this.cargarCategoriasEnTree();
    if (this.producto) { this.actualizarFormulario(); }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.productoForm) return;
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
    if (changes['categorias']) {
      this.cargarCategoriasEnTree();
      if (this.producto) { this.seleccionarCategoriaDelProducto(); }
    }
    if (changes['producto']) {
      this.actualizarFormulario();
    }
  }

  private initForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      idCategoria: [null, Validators.required],
      publicado: [false],
      estado: [false],
    });
  }

  private actualizarFormulario(): void {
    this.formSubmitted = false;
    this.limpiarEstadoImagen();
    if (this.producto) {
      this.productoForm.patchValue({
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        stock: this.producto.stock,
        publicado: this.producto.publicado,
        estado: this.producto.estado,
        idCategoria: null,
      });
      this.seleccionarCategoriaDelProducto();
      if (this.producto.urlsMultimedia?.length) {
        this.cargarImagenExistente(this.producto.urlsMultimedia);
      }
    } else {
      this.resetFormularioBase();
    }
    this.productoForm.markAsPristine();
    this.productoForm.markAsUntouched();
  }

  // =====================================================
  // CATEGORÍA (TreeSelect)
  // =====================================================

  private construirTree(categorias: Categoria[]): TreeNode[] {
    if (!Array.isArray(categorias)) return [];
    return categorias.map(categoria => ({
      label: categoria.nombre,
      key: String(categoria.id),
      data: categoria.id,
      children: categoria.subcategorias?.length ? this.construirTree(categoria.subcategorias) : [],
    }));
  }

  private cargarCategoriasEnTree(): void {
    this.categoriaTree = this.construirTree(this.categorias);
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

  /** El TreeSelect trabaja con el nodo completo, no con el id */
  private seleccionarCategoriaDelProducto(): void {
    const id = this.producto?.idCategoria;
    if (!id || !this.categoriaTree.length) return;
    const nodo = this.findTreeNodeById(this.categoriaTree, id);
    this.productoForm.patchValue({ idCategoria: nodo ?? null });
    this.cd.detectChanges();
  }

  // =====================================================
  // IMÁGENES
  // =====================================================

  private cargarImagenExistente(urls: string[]): void {
    const requests = urls.map(url => this.imageService.obtenerImagenProtegida(url));
    forkJoin(requests).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(blobs => {
      this.imagenes = [];
      blobs.forEach((blob, index) => {
        if (!blob) return;
        const file = new File([blob], `imagen-${index}.jpg`, { type: blob.type });
        this.imagenes.push({
          file,
          preview: URL.createObjectURL(file),
          nombre: 'Imagen actual',
          peso: this.imageService.obtenerReadableSize(file),
          tipo: 'existente',
          urlOriginal: urls[index],
        });
      });
      this.cd.detectChanges();
    });
  }

  onSeleccionarArchivo(event: any): void {
    const files: File[] = Array.from(event.files);
    const validas = this.imageService.imagenesValidas(files);
    validas.forEach(file => {
      this.imagenes.push({
        file,
        preview: URL.createObjectURL(file),
        nombre: file.name,
        peso: this.imageService.obtenerReadableSize(file),
        tipo: 'nueva',
      });
    });
    // Evita que el componente acumule los archivos ya procesados
    this.fileUpload?.clear();
  }

  eliminarImagen(index: number): void {
    const img = this.imagenes[index];
    if (img.preview) { URL.revokeObjectURL(img.preview); }
    if (img.tipo === 'existente' && img.urlOriginal) { this.imagenesEliminada.push(img.urlOriginal); }
    this.imagenes.splice(index, 1);
  }

  private limpiarEstadoImagen(): void {
    this.imagenes.forEach(img => { if (img.preview) { URL.revokeObjectURL(img.preview); } });
    this.imagenes = [];
    this.imagenesEliminada = [];
    this.fileUpload?.clear();
  }

  // =====================================================
  // ACCIONES
  // =====================================================

  onCancelar(): void {
    this.limpiarFormulario();
    this.cancelarEvento.emit();
  }

  onGuardar(): void {
    this.formSubmitted = true;
    if (this.productoForm.invalid) {
      marcarFormulario(this.productoForm);
      return;
    }
    const archivos: File[] = this.imagenes.filter(img => img.file).map(img => img.file as File);
    const valores = this.productoForm.value;
    const data: ProductoRequest = {
      nombre: valores.nombre,
      descripcion: valores.descripcion,
      precio: valores.precio,
      stock: valores.stock,
      publicado: valores.publicado,
      estado: valores.estado,
      idCategoria: Number(valores.idCategoria.key),
    };
    this.guardar.emit({ data, imagenes: archivos.length ? archivos : undefined });
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.resetFormularioBase();
    this.productoForm.markAsPristine();
    this.productoForm.markAsUntouched();
  }

  private resetFormularioBase(): void {
    this.productoForm.reset({
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      publicado: false,
      estado: false,
      idCategoria: null,
    });
    this.limpiarEstadoImagen();
  }
}