import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { PagoResponse } from '../../../../../../core/models/pagos/pago.model';

@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectModule, InputNumberModule],
  templateUrl: './pago-form.component.html'
})
export class PagoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Output() onGuardar = new EventEmitter<PagoResponse>();
  @Output() onCerrar = new EventEmitter<void>();

  pagoForm!: FormGroup;

  // Opciones en memoria
  clientes = ['Diego Salazar', 'Valeria Quispe', 'Mateo Huamán', 'Camila Rojas', 'Sebastián Flores', 'Lucía Paredes'];
  barberos = ['Renzo Castillo', 'Álvaro Mendoza', 'José Luis Ramos'];
  metodos = ['Efectivo', 'Yape', 'Plin', 'Visa', 'Transferencia'];

  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      cliente: [null, Validators.required],
      barbero: [null, Validators.required],
      metodo: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  registrarPago(): void {
    if (this.pagoForm.invalid) { this.pagoForm.markAllAsTouched(); return; }
    const v = this.pagoForm.getRawValue();

    // El id y la fecha los asigna la pantalla de pagos.
    const nuevo = {
      id: 0,
      clienteNombre: v.cliente,
      barberoNombre: v.barbero,
      metodo: v.metodo,
      tipo: 'Servicio',
      monto: v.monto,
      fecha: new Date().toISOString(),
    } as unknown as PagoResponse;

    this.onGuardar.emit(nuevo);
  }

  cancelar(): void { this.onCerrar.emit(); }
}