import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { MovimientoRequest, Origen } from '@/app/core/models/fidelizacion/movimiento.model';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';

@Component({
    selector: 'app-movimiento-form',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule, MessageModule],
    templateUrl: './movimiento-form.html',
})
export class MovimientoFormComponent {
    @Output() guardar = new EventEmitter<MovimientoRequest>();
    @Output() cancelarEvento = new EventEmitter();

    private fb = inject(FormBuilder);
    formSubmitted = false;

    ajusteForm: FormGroup = this.fb.group({
        clienteId: [null, Validators.required],
        tarjetaId: [null, Validators.required],
        puntos: [0, [Validators.required]],
        descripcion: ['', Validators.required],
    });

    campoInvalido = (campo: string) => campoInvalido(this.ajusteForm, campo, this.formSubmitted);

    onGuardar(): void {
        this.formSubmitted = true;
        if (this.ajusteForm.invalid) { marcarFormulario(this.ajusteForm); return; }

        const v = this.ajusteForm.value;
        const data: MovimientoRequest = {
            clienteId: v.clienteId,
            tarjetaId: v.tarjetaId,
            origen: Origen.AJUSTE,
            idOrigen: 0,
            puntos: v.puntos,
            descripcion: v.descripcion,
        };
        this.guardar.emit(data);
    }

    onCancelar(): void {
        this.formSubmitted = false;
        this.ajusteForm.reset({ clienteId: null, tarjetaId: null, puntos: 0, descripcion: '' });
        this.cancelarEvento.emit();
    }
}