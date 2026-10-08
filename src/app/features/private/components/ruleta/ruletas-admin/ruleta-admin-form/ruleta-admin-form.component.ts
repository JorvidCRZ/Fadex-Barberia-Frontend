import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RuletaResponse, RuletaRequest, TipoRuleta } from '@/app/core/models/ruleta/ruleta.model';
import { TIPO_RULETA_OPTIONS } from '@/app/core/models/common/select.option.model';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';

@Component({
  selector: 'app-ruleta-admin-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, CheckboxModule, ButtonModule, MessageModule, InputNumberModule],
  templateUrl: './ruleta-admin-form.html',
  styleUrl: './ruleta-admin-form.css',
})
export class RuletaAdminFormComponent implements OnChanges, OnInit {
  @Output() guardar = new EventEmitter<RuletaRequest>();
  @Output() cancelarEvento = new EventEmitter();
  @Input() ruleta: RuletaResponse | null = null;
  @Input() resetTrigger: number = 0;

  private fb = inject(FormBuilder);

  formSubmitted = false;
  ruletaForm!: FormGroup;
  readonly tiposRuleta = TIPO_RULETA_OPTIONS;

  campoInvalido = (campo: string) => campoInvalido(this.ruletaForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.initForm();
    this.actualizarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ruletaForm) return;
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
    if (changes['ruleta']) {
      this.actualizarFormulario();
    }
  }

  private initForm(): void {
    this.ruletaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      tipo: [TipoRuleta.GENERAL, Validators.required],
      activa: [true],
      incrementoPorGiro: [0.02, [Validators.required, Validators.min(0)]],
    });
  }

  private resetFormularioBase(): void {
    this.ruletaForm.reset({
      nombre: '',
      descripcion: '',
      tipo: TipoRuleta.GENERAL,
      activa: true,
      incrementoPorGiro: 0.02,
    });
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.resetFormularioBase();
    this.ruletaForm.markAsPristine();
    this.ruletaForm.markAsUntouched();
  }

  private actualizarFormulario(): void {
    if (this.ruleta) {
      this.ruletaForm.patchValue({
        nombre: this.ruleta.nombre,
        descripcion: this.ruleta.descripcion,
        tipo: this.ruleta.tipo,
        activa: this.ruleta.activa,
        incrementoPorGiro: this.ruleta.incrementoPorGiro,
      });
    } else {
      this.resetFormularioBase();
    }
    this.ruletaForm.markAsPristine();
    this.ruletaForm.markAsUntouched();
  }

  onCancelar(): void {
    this.formSubmitted = false;
    this.limpiarFormulario();
    this.cancelarEvento.emit();
  }

  onGuardar(): void {
    this.formSubmitted = true;
    if (this.ruletaForm.invalid) { marcarFormulario(this.ruletaForm); return; }
    this.guardar.emit(this.ruletaForm.value as RuletaRequest);
  }
}