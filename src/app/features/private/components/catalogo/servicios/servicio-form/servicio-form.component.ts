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
import { Servicio, ServicioRequest } from '@/app/core/models/catalogos/servicios.model';
import { Categoria } from '@/app/core/models/catalogos/categorias.model';
import { ImagenProductoUI } from '@/app/core/models/common/imagen.model';
import { ImageUploadService } from '@/app/core/services/common/imageUpload.service';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, TextareaModule, CheckboxModule, TreeSelectModule,
    InputNumberModule, MessageModule, ImageModule, FileUploadModule, ButtonComponent, SafeImageUrlPipe
  ],
  templateUrl: './servicio-form.html'
})
export class ServicioFormComponent implements OnChanges, OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @Output() guardar = new EventEmitter<{ data: ServicioRequest, imagenes?: File[] | null }>();
  @Output() cancelarEvento = new EventEmitter<void>();
  @Input() servicio: Servicio | null = null;
  @Input() categorias: Categoria[] = [];
  @Input() guardando = false;
  @Input() resetTrigger = 0;

  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private fb: FormBuilder = inject(FormBuilder);
  private imageService = inject(ImageUploadService);

  formSubmitted = false;
  servicioForm!: FormGroup;
  categoriaTree: TreeNode[] = [];
  imagenes: ImagenProductoUI[] = [];
  imagenesEliminadas: string[] = [];

  campoInvalido = (campo: string) => campoInvalido(this.servicioForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.initForm();
    this.cargarCategoriasEnTree();
    if (this.servicio) { this.actualizarFormulario(); }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.servicioForm) return;
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
    if (changes['categorias']) {
      this.cargarCategoriasEnTree();
      if (this.servicio) { this.seleccionarCategoriaDelServicio(); }
    }
    if (changes['servicio']) {
      this.actualizarFormulario();
    }
  }

  private initForm(): void {
    this.servicioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      duracion: [0, [Validators.required, Validators.min(1)]],
      idCategoria: [null, Validators.required],
      estado: [false],
      publicado: [false],
    });
  }

  private actualizarFormulario(): void {
    this.formSubmitted = false;
    this.limpiarEstadoImagen();
    if (this.servicio) {
      this.servicioForm.patchValue({
        nombre: this.servicio.nombre,
        descripcion: this.servicio.descripcion,
        precio: this.servicio.precio,
        duracion: this.servicio.duracion,
        estado: this.servicio.estado,
        publicado: this.servicio.publicado,
        idCategoria: null,
      });
      this.seleccionarCategoriaDelServicio();
      if (this.servicio.urlsMultimedia?.length) {
        this.cargarImagenExistente(this.servicio.urlsMultimedia);
      }
    } else {
      this.resetFormularioBase();
    }
    this.servicioForm.markAsPristine();
    this.servicioForm.markAsUntouched();
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
  private seleccionarCategoriaDelServicio(): void {
    const id = this.servicio?.categoriaId;
    if (!id || !this.categoriaTree.length) return;
    const nodo = this.findTreeNodeById(this.categoriaTree, id);
    this.servicioForm.patchValue({ idCategoria: nodo ?? null });
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
    if (img.tipo === 'existente' && img.urlOriginal) { this.imagenesEliminadas.push(img.urlOriginal); }
    this.imagenes.splice(index, 1);
  }

  private limpiarEstadoImagen(): void {
    this.imagenes.forEach(img => { if (img.preview) { URL.revokeObjectURL(img.preview); } });
    this.imagenes = [];
    this.imagenesEliminadas = [];
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
    if (this.servicioForm.invalid) {
      marcarFormulario(this.servicioForm);
      return;
    }
    const archivos: File[] = this.imagenes.filter(img => img.file).map(img => img.file as File);
    const valores = this.servicioForm.value;
    const data: ServicioRequest = {
      nombre: valores.nombre,
      descripcion: valores.descripcion,
      precio: valores.precio,
      duracion: valores.duracion,
      categoriaId: Number(valores.idCategoria?.key),
      estado: valores.estado,
      publicado: valores.publicado,
    };
    this.guardar.emit({ data, imagenes: archivos.length ? archivos : undefined });
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.resetFormularioBase();
    this.servicioForm.markAsPristine();
    this.servicioForm.markAsUntouched();
  }

  private resetFormularioBase(): void {
    this.servicioForm.reset({
      nombre: '',
      descripcion: '',
      precio: 0,
      duracion: 0,
      idCategoria: null,
      estado: false,
      publicado: false,
    });
    this.limpiarEstadoImagen();
  }
}