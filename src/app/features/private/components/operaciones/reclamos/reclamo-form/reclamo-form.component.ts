import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { ImageModule } from 'primeng/image';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { ImageUploadService } from '@/app/core/services/common/imageUpload.service';
import { ImagenProductoUI } from '@/app/core/models/common/imagen.model';
import { ReclamoRequest } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';
import {
  CAUSA_RECLAMO_OPTIONS, TIPO_DOCUMENTO_OPTIONS, TIPO_PROBLEMA_OPTIONS, TIPO_RECLAMACION_OPTIONS,
} from '@/app/core/models/common/select.option.model';

@Component({
  selector: 'app-reclamo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, InputTextModule, SelectModule, TextareaModule, MessageModule, ImageModule,
    FileUploadModule, InputNumberModule, DatePickerModule, ButtonComponent,
  ],
  templateUrl: './reclamo-form.html',
})
export class ReclamoFormComponent implements OnInit, OnChanges {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @Output() guardar = new EventEmitter<{ request: ReclamoRequest; archivos?: File[] }>();
  @Output() cancelarEvento = new EventEmitter<void>();
  @Input() guardando = false;
  @Input() resetTrigger = 0;

  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private imageService = inject(ImageUploadService);

  formSubmitted = false;
  reclamoForm!: FormGroup;
  imagenes: ImagenProductoUI[] = [];
  today = new Date();

  readonly tipoReclamacionOpts = TIPO_RECLAMACION_OPTIONS;
  readonly tipoProblemaOpts = TIPO_PROBLEMA_OPTIONS;
  readonly causaReclamoOpts = CAUSA_RECLAMO_OPTIONS;
  readonly tipoDocumentoOpts = TIPO_DOCUMENTO_OPTIONS;

  campoInvalido = (campo: string) => campoInvalido(this.reclamoForm, campo, this.formSubmitted);

  get maxLengthDocumento(): number {
    switch (this.reclamoForm?.get('tipoDocumentoCliente')?.value) {
      case 'DNI': return 8;
      case 'CE': return 9;
      default: return 12;
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.configurarValidacionDocumento();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.reclamoForm) return;
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
  }

  private initForm(): void {
    this.reclamoForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      correoCliente: ['', Validators.email],
      telefonoCliente: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      tipoDocumentoCliente: ['DNI', Validators.required],
      numeroDocumentoCliente: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      tipoReclamacion: [null, Validators.required],
      tipoProblema: [null, Validators.required],
      causaReclamo: [null],
      descripcion: ['', Validators.required],
      montoReclamado: [null, Validators.min(0)],
      fechaOcurrencia: [null],
      notasInternas: [''],
    });
  }

  /** El número de documento cambia de formato según el tipo elegido */
  private configurarValidacionDocumento(): void {
    const tipo = this.reclamoForm.get('tipoDocumentoCliente');
    const numero = this.reclamoForm.get('numeroDocumentoCliente');

    tipo?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(valor => {
      numero?.setValue('');
      switch (valor) {
        case 'DNI': numero?.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]); break;
        case 'CE': numero?.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]); break;
        case 'PASAPORTE': numero?.setValidators([Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,12}$/)]); break;
        default: numero?.setValidators([Validators.required]);
      }
      numero?.updateValueAndValidity();
    });
  }

  // =====================================================
  // IMÁGENES
  // =====================================================

  onSeleccionarArchivo(event: any): void {
    const files: File[] = Array.from(event.files);
    this.imageService.imagenesValidas(files).forEach(file => {
      this.imagenes.push({
        file,
        preview: URL.createObjectURL(file),
        nombre: file.name,
        peso: this.imageService.obtenerReadableSize(file),
        tipo: 'nueva',
      });
    });
    this.fileUpload?.clear();
  }

  eliminarImagen(index: number): void {
    const img = this.imagenes[index];
    if (img.preview) URL.revokeObjectURL(img.preview);
    this.imagenes.splice(index, 1);
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
    if (this.reclamoForm.invalid) { marcarFormulario(this.reclamoForm); return; }

    const v = this.reclamoForm.value;
    const request: ReclamoRequest = {
      nombreCliente: v.nombreCliente,
      correoCliente: v.correoCliente || undefined,
      telefonoCliente: v.telefonoCliente || undefined,
      tipoDocumentoCliente: v.tipoDocumentoCliente ?? undefined,
      numeroDocumentoCliente: v.numeroDocumentoCliente || undefined,
      tipoReclamacion: v.tipoReclamacion,
      tipoProblema: v.tipoProblema,
      causaReclamo: v.causaReclamo ?? undefined,
      descripcion: v.descripcion,
      montoReclamado: v.montoReclamado ?? undefined,
      fechaOcurrencia: v.fechaOcurrencia ? this.toLocalDateTime(v.fechaOcurrencia as Date) : undefined,
      notasInternas: v.notasInternas || undefined,
    };

    const archivos = this.imagenes.map(i => i.file as File);
    // El formulario se limpia solo cuando el padre confirma que se guardó (resetTrigger)
    this.guardar.emit({ request, archivos: archivos.length ? archivos : undefined });
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.imagenes.forEach(img => { if (img.preview) URL.revokeObjectURL(img.preview); });
    this.imagenes = [];
    this.fileUpload?.clear();
    this.reclamoForm.reset({ nombreCliente: '', correoCliente: '', telefonoCliente: '', tipoDocumentoCliente: 'DNI', descripcion: '', notasInternas: '' });
    this.reclamoForm.markAsPristine();
    this.reclamoForm.markAsUntouched();
    this.cd.detectChanges();
  }

  private toLocalDateTime(date: Date): string {
    const p = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T00:00:00`;
  }
}