import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { formatearTexto } from '@/app/shared/utils/formatear-text.utils.component';
import { ReclamoResponse, ReclamoSolucionRequest } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';
import { ESTADO_RECLAMO_OPTIONS, SOLUCION_RECLAMO_OPTIONS } from '@/app/core/models/common/select.option.model';

@Component({
  selector: 'app-reclamo-actualizar',
  standalone: true,
  imports: [
    ReactiveFormsModule, SelectModule, TextareaModule, MessageModule, InputNumberModule,
    ButtonComponent, StatusBadgeComponent, SolesPipe,
  ],
  templateUrl: './reclamo-actualizar.html',
})
export class ReclamoActualizarComponent implements OnInit, OnChanges {
  @Output() guardar = new EventEmitter<ReclamoSolucionRequest>();
  @Output() cancelarEvento = new EventEmitter<void>();
  @Input() reclamo: ReclamoResponse | null = null;
  @Input() guardando = false;

  private fb = inject(FormBuilder);

  formSubmitted = false;
  actualizarForm!: FormGroup;
  formatearTexto = formatearTexto;

  readonly estadoOpts = ESTADO_RECLAMO_OPTIONS;
  readonly solucionOpts = SOLUCION_RECLAMO_OPTIONS;

  campoInvalido = (campo: string) => campoInvalido(this.actualizarForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.initForm();
    this.cargarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reclamo'] && this.actualizarForm) {
      this.cargarDatos();
    }
  }

  private initForm(): void {
    this.actualizarForm = this.fb.group({
      estadoReclamo: [null, Validators.required],
      solucionReclamo: [null],
      notasInternas: [''],
      montoCompensado: [null, Validators.min(0)],
      detalleSolucion: [''],
    });
  }

  private cargarDatos(): void {
    if (!this.reclamo) return;
    this.actualizarForm.patchValue({
      estadoReclamo: this.reclamo.estadoReclamo ?? null,
      solucionReclamo: this.reclamo.solucionReclamo ?? null,
      notasInternas: this.reclamo.notasInternas ?? '',
      montoCompensado: this.reclamo.montoCompensado ?? null,
      detalleSolucion: this.reclamo.detalleSolucion ?? '',
    });
    this.actualizarForm.markAsPristine();
    this.actualizarForm.markAsUntouched();
    this.formSubmitted = false;
  }

  onGuardar(): void {
    this.formSubmitted = true;
    if (this.actualizarForm.invalid) { marcarFormulario(this.actualizarForm); return; }

    const v = this.actualizarForm.value;
    this.guardar.emit({
      estadoReclamo: v.estadoReclamo,
      solucionReclamo: v.solucionReclamo ?? undefined,
      notasInternas: v.notasInternas || undefined,
      montoCompensado: v.montoCompensado ?? undefined,
      detalleSolucion: v.detalleSolucion || undefined,
    });
  }

  onCancelar(): void {
    this.cargarDatos();
    this.cancelarEvento.emit();
  }
}