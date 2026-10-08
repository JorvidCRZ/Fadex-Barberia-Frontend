import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ImageModule } from 'primeng/image';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { RuletaItemResponse, RuletaItemRequest, TipoPremio } from '@/app/core/models/ruleta/ruleta-item.model';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { environment } from '@/environments/environment.development';
import { TIPO_PREMIO_OPTIONS } from '@/app/core/models/common/select.option.model';
import { ProductoSelectorComponent } from '@/app/shared/components/selector/producto-selector/producto-selector.component';
import { ServicioSelectorComponent } from '@/app/shared/components/selector/servicio-selector/servicio-selector.component';
import { Producto } from '@/app/core/models/catalogos/productos.model';
import { Servicio } from '@/app/core/models/catalogos/servicios.model';
import { DialogHeaderComponent } from '@/app/shared/components/dialog-header/dialog-header.component';
import { DialogModule } from 'primeng/dialog';
import { PremioCardComponent } from '@/app/shared/components/card/premio-card.component';
import { PremioCard } from '@/app/core/models/ruleta/ruleta-grafico.model';
import { ServicioService } from '@/app/core/services/catalogos/servicio.service';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';

@Component({
    standalone: true,
    selector: 'app-ruleta-item-form',
    imports: [ReactiveFormsModule, InputTextModule, SelectModule, CheckboxModule, ButtonModule, MessageModule, InputNumberModule, PremioCardComponent, ImageModule,
        FileUploadModule, ProductoSelectorComponent, DialogHeaderComponent, DialogModule, ServicioSelectorComponent, SafeImageUrlPipe],
    templateUrl: './ruleta-item-form.html',
    styleUrl: './ruleta-item-form.css',
})
export class RuletaItemFormComponent implements OnChanges, OnInit {
    @Output() guardar = new EventEmitter<{ data: RuletaItemRequest, imagen?: File | null }>();
    @Output() cancelarEvento = new EventEmitter();
    @ViewChild('fileUpload') fileUpload!: FileUpload;
    @Input() item: RuletaItemResponse | null = null;
    @Input({ required: true }) ruletaId!: number;
    @Input() resetTrigger: number = 0;

    private cd = inject(ChangeDetectorRef);
    private productoService = inject(ProductoService);
    private servicioService = inject(ServicioService);
    private notify = inject(NotificationService);
    private fb = inject(FormBuilder);

    formSubmitted = false;
    itemForm!: FormGroup;
    environment = environment.apiBaseUrl;
    productoSeleccionado: Producto | null = null;
    servicioSeleccionado: Servicio | null = null;
    mostrarSelectorProducto = false;
    mostrarSelectorServicio = false;
    TipoPremio = TipoPremio;
    imagenActualUrl: string | null = null;
    imagenNuevaPreview: string | null = null;
    imagenNueva: File | null = null;
    imagenEliminada = false;

    readonly tiposPremio = TIPO_PREMIO_OPTIONS;

    campoInvalido = (campo: string) => campoInvalido(this.itemForm, campo, this.formSubmitted);

    ngOnInit(): void {
        this.initForm();
        this.actualizarFormulario();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.itemForm) return;
        if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
            this.limpiarFormulario();
        }
        if (changes['item']) {
            this.actualizarFormulario();
        }
    }

    private initForm(): void {
        this.itemForm = this.fb.group({
            nombre: ['', Validators.required],
            descripcion: [''],
            tipoPremio: [TipoPremio.DESCUENTO, Validators.required],
            valor: [null],
            probabilidad: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
            esPremioMayor: [false],
            stock: [null],
            cantidadProducto: [null],
            ordenDisplay: [null],
            productoId: [null],
            servicioId: [null],
            activo: [true],
        });
    }

    seleccionarProducto(producto: Producto): void {
        this.productoSeleccionado = producto;
        this.itemForm.patchValue({productoId: producto.id,nombre: producto.nombre});
    }

    seleccionarServicio(servicio: Servicio): void {
        this.servicioSeleccionado = servicio;
        this.itemForm.patchValue({ servicioId: servicio.servicioId,nombre: servicio.nombre });
    }

    get tipoSeleccionado(): TipoPremio {
        return this.itemForm?.get('tipoPremio')?.value;
    }

    get muestraValor(): boolean {
        return [TipoPremio.DESCUENTO, TipoPremio.CUPON].includes(this.tipoSeleccionado);
    }

    get muestraProducto(): boolean {
        return this.tipoSeleccionado === TipoPremio.PRODUCTO;
    }

    get muestraServicio(): boolean {
        return this.tipoSeleccionado === TipoPremio.SERVICIO;
    }

    onSeleccionarImagen(event: any): void {
        const file: File = event.files?.[0];
        if (!file) return;
        if (this.imagenNuevaPreview) { URL.revokeObjectURL(this.imagenNuevaPreview); }
        this.imagenNueva = file;
        this.imagenNuevaPreview = URL.createObjectURL(file);
        this.imagenEliminada = false;
    }

    eliminarImagenSeleccionada(): void {
        if (this.imagenNuevaPreview) { URL.revokeObjectURL(this.imagenNuevaPreview); }
        this.imagenNueva = null;
        this.imagenNuevaPreview = null;
        this.imagenActualUrl = null;
        this.imagenEliminada = true;
        this.fileUpload?.clear();
    }

    get muestraSubidaImagen(): boolean {
        return !this.muestraProducto && !this.muestraServicio;
    }

    private resetFormularioBase(): void {
        this.itemForm.reset({
            nombre: '',
            descripcion: '',
            tipoPremio: TipoPremio.DESCUENTO,
            valor: null,
            probabilidad: 10,
            esPremioMayor: false,
            stock: null,
            cantidadProducto: null,
            ordenDisplay: null,
            productoId: null,
            servicioId: null,
            activo: true,
        });
        this.productoSeleccionado = null;
        this.servicioSeleccionado = null;
        this.eliminarImagenSeleccionada();
    }

    private limpiarFormulario(): void {
        this.formSubmitted = false;
        this.resetFormularioBase();
        this.itemForm.markAsPristine();
        this.itemForm.markAsUntouched();
    }

    private actualizarFormulario(): void {
        if (this.item) {
            this.itemForm.patchValue({
                nombre: this.item.nombre,
                descripcion: this.item.descripcion,
                tipoPremio: this.item.tipoPremio,
                valor: this.item.valor ?? null,
                probabilidad: this.item.probabilidad,
                esPremioMayor: this.item.esPremioMayor,
                stock: this.item.stock ?? null,
                cantidadProducto: this.item.cantidadProducto ?? null,
                ordenDisplay: this.item.ordenDisplay ?? null,
                productoId: this.item.productoId ?? null,
                servicioId: this.item.servicioId ?? null,
                activo: this.item.activo,
            });
            this.imagenActualUrl = this.item.imagenUrl ?? null;
            this.imagenNuevaPreview = null;
            this.imagenNueva = null;
            this.imagenEliminada = false;
            this.cargarSeleccionExistente();
        } else {
            this.resetFormularioBase();
        }
        this.itemForm.markAsPristine();
        this.itemForm.markAsUntouched();
        this.cd.detectChanges();
    }

    private cargarSeleccionExistente(): void {
        this.productoSeleccionado = null;
        this.servicioSeleccionado = null;

        if (this.item?.tipoPremio === TipoPremio.PRODUCTO && this.item.productoId) {
            this.productoService.obtenerProductoId(this.item.productoId).subscribe({
                next: (respuesta) => {
                    this.productoSeleccionado = respuesta.data;
                    this.cd.detectChanges();
                },
                error: (error) => { this.notify.showHttpError(error.message); }
            });
        }

        if (this.item?.tipoPremio === TipoPremio.SERVICIO && this.item.servicioId) {
            this.servicioService.obtenerServicioPorId(this.item.servicioId).subscribe({
                next: (respuesta) => {
                    this.servicioSeleccionado = respuesta.data;
                    this.cd.detectChanges();
                },
                error: (error) => { this.notify.showHttpError(error.message); }
            });
        }
    }

    onCancelar(): void {
        this.formSubmitted = false;
        this.limpiarFormulario();
        this.cancelarEvento.emit();
    }

    onGuardar(): void {
        this.formSubmitted = true;
        if (this.itemForm.invalid) { marcarFormulario(this.itemForm); return; }

        const v = this.itemForm.value;
        const data: RuletaItemRequest = {
            ruletaId: this.ruletaId,
            nombre: v.nombre,
            descripcion: v.descripcion,
            tipoPremio: v.tipoPremio,
            valor: this.muestraValor ? v.valor : undefined,
            probabilidad: v.probabilidad,
            esPremioMayor: v.esPremioMayor,
            stock: v.stock ?? undefined,
            ordenDisplay: v.ordenDisplay ?? undefined,
            productoId: this.muestraProducto ? v.productoId : undefined,
            servicioId: this.muestraServicio ? v.servicioId : undefined,
            cantidadProducto: this.muestraProducto ? v.cantidadProducto : undefined,
            activo: v.activo,
        };
        this.guardar.emit({ data, imagen: this.imagenNueva });
    }

    get premioProducto(): PremioCard | null {
        if (!this.productoSeleccionado) return null;
        return {
            titulo: this.productoSeleccionado.nombre, subtitulo: this.productoSeleccionado.nombreCategoria, descripcion: this.productoSeleccionado.descripcion,
            imagen: this.productoSeleccionado.urlsMultimedia[0], precio: this.productoSeleccionado.precio, tipo: TipoPremio.PRODUCTO, badge: 'Producto'
        };
    }

    get premioServicio(): PremioCard | null {
        if (!this.servicioSeleccionado) return null;
        return {
            titulo: this.servicioSeleccionado.nombre, subtitulo: this.servicioSeleccionado.categoriaNombre, descripcion: `${this.servicioSeleccionado.duracion} min`,
            imagen: this.servicioSeleccionado.urlsMultimedia[0], precio: this.servicioSeleccionado.precio, tipo: TipoPremio.SERVICIO, badge: 'Servicio'
        };
    }

    get premioDescuentoCupon(): PremioCard | null {
        if (!this.muestraValor) return null;
        const v = this.itemForm.value;
        return {
            titulo: v.nombre || 'Nuevo premio', subtitulo: this.tipoSeleccionado === TipoPremio.DESCUENTO ? 'Descuento' : 'Cupón', descripcion: v.descripcion,
            imagen: this.imagenNuevaPreview ?? this.imagenActualUrl ?? undefined,
            precio: v.valor ?? undefined, tipo: this.tipoSeleccionado, badge: this.tipoSeleccionado === TipoPremio.DESCUENTO ? 'Descuento' : 'Cupón',
        };
    }

    get premioSeleccionado(): PremioCard | null {
        if (!this.item) return null;
        return {
            titulo: this.item.nombre, subtitulo: this.obtenerSubtitulo(), descripcion: this.item.descripcion, imagen: this.item.imagenUrl,
            precio: this.item.valor ?? undefined, tipo: this.item.tipoPremio, badge: this.item.tipoPremio
        };
    }

    private obtenerSubtitulo(): string {
        switch (this.item?.tipoPremio) {
            case TipoPremio.PRODUCTO: return 'Producto';
            case TipoPremio.SERVICIO: return 'Servicio';
            case TipoPremio.DESCUENTO: return 'Descuento';
            case TipoPremio.CUPON: return 'Cupón';
            default: return '';
        }
    }
}