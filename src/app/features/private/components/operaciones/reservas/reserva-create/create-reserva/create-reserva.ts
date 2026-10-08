import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, finalize, debounceTime, distinctUntilChanged, switchMap, takeUntil, of, catchError } from 'rxjs';
import { AutoCompleteModule, AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { Barbero } from '@/app/core/models/gestion/barbero/barbero.model';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { Servicio, ServicioFiltro } from '@/app/core/models/catalogos/servicios.model';
import { ServicioService } from '@/app/core/services/catalogos/servicio.service';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';
import { ReservaRequest } from '@/app/core/models/reserva/reservaRequest';

@Component({
  selector: 'app-create-reserva',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, SelectModule, DatePickerModule, ButtonModule, ToastModule, DialogModule
  ],
  providers: [MessageService],
  templateUrl: './create-reserva.html',
  styleUrl: './create-reserva.css'
})
export class CreateReserva implements OnInit, OnDestroy, OnChanges {

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private barberoService = inject(BarberoService);
  private servicioService = inject(ServicioService);
  private reservaService = inject(ReservaService);
  private messageService = inject(MessageService);

  private destroy$ = new Subject<void>();
  private buscarClienteSubject = new Subject<string>();
  private buscarBarberoSubject = new Subject<string>();
  private buscarServicioSubject = new Subject<string>();

  @Input() resetTrigger = 0;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelarEvento = new EventEmitter<void>();

  isLoading = false;
  showConfirmDialog = false;
  reservaPreview: any = null;
  today = new Date();

  clientesSugeridos: Cliente[] = [];
  barberosSugeridos: Barbero[] = [];
  serviciosSugeridos: Servicio[] = [];

  clienteSeleccionado: Cliente | null = null;
  barberoSeleccionado: Barbero | null = null;
  servicioSeleccionado: Servicio | null = null;

  buscandoCliente = false;
  buscandoBarbero = false;
  buscandoServicio = false;

  get horarios() {
    const todosLosHorarios = [
      { label: '09:00 AM', value: '09:00' },
      { label: '09:30 AM', value: '09:30' },
      { label: '10:00 AM', value: '10:00' },
      { label: '10:30 AM', value: '10:30' },
      { label: '11:00 AM', value: '11:00' },
      { label: '11:30 AM', value: '11:30' },
      { label: '12:00 PM', value: '12:00' },
      { label: '12:30 PM', value: '12:30' },
      { label: '02:00 PM', value: '14:00' },
      { label: '02:30 PM', value: '14:30' },
      { label: '03:00 PM', value: '15:00' },
      { label: '03:30 PM', value: '15:30' },
      { label: '04:00 PM', value: '16:00' },
      { label: '04:30 PM', value: '16:30' },
      { label: '05:00 PM', value: '17:00' },
      { label: '05:30 PM', value: '17:30' },
      { label: '06:00 PM', value: '18:00' },
      { label: '06:30 PM', value: '18:30' },
    ];

    const fechaSeleccionada = this.reservaForm?.get('fecha')?.value;
    if (!fechaSeleccionada) return todosLosHorarios;

    const hoy = new Date();
    const fechaForm = new Date(fechaSeleccionada as Date);

    const esHoy =
      fechaForm.getFullYear() === hoy.getFullYear() &&
      fechaForm.getMonth() === hoy.getMonth() &&
      fechaForm.getDate() === hoy.getDate();

    if (!esHoy) return todosLosHorarios;

    const horaActual = hoy.getHours();
    const minActual = hoy.getMinutes();

    return todosLosHorarios.filter(h => {
      const [hh, mm] = h.value.split(':').map(Number);
      if (hh < horaActual) return false;
      if (hh === horaActual && mm <= minActual) return false;
      return true;
    });
  }

  onFechaChange(): void {
    this.reservaForm.get('hora')?.reset();
  }

  reservaForm = this.fb.group({
    clienteId: this.fb.control<number | null>(null, [Validators.required]),
    barberoId: this.fb.control<number | null>(null, [Validators.required]),
    servicioId: this.fb.control<number | null>(null, [Validators.required]),
    fecha: this.fb.control<Date | null>(null, [Validators.required, this.fechaValida.bind(this)]),
    hora: this.fb.control<string | null>(null, [Validators.required]),
    observacion: this.fb.control<string>('', [Validators.maxLength(500)])
  });

  ngOnInit(): void {
    this.configurarBusquedas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.reservaForm.reset({
        clienteId: null,
        barberoId: null,
        servicioId: null,
        fecha: null,
        hora: null,
        observacion: ''
      });
      this.clienteSeleccionado = null;
      this.barberoSeleccionado = null;
      this.servicioSeleccionado = null;
      this.clientesSugeridos = [];
      this.barberosSugeridos = [];
      this.serviciosSugeridos = [];
      this.reservaPreview = null;
      this.showConfirmDialog = false;
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private configurarBusquedas(): void {
    this.buscarClienteSubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap(texto => {
        this.buscandoCliente = true;
        return this.clienteService.buscarPorNombre(texto, 0, 10).pipe(
          catchError(() => of(null))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.buscandoCliente = false;
      this.clientesSugeridos = (response?.data?.content ?? []).map((cliente: Cliente) => ({
        ...cliente,
        nombreCompleto: `${cliente.persona?.nombre ?? ''} ${cliente.persona?.apellido ?? ''}`.trim()
      }));
    });

    this.buscarBarberoSubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap(texto => {
        this.buscandoBarbero = true;
        return this.barberoService.buscarPorNombre(texto, 0, 10).pipe(
          catchError(() => of(null))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.buscandoBarbero = false;
      this.barberosSugeridos = (response?.data?.content ?? []).map((barbero: Barbero) => ({
        ...barbero,
        nombreCompleto: `${barbero.persona?.nombre ?? ''} ${barbero.persona?.apellido ?? ''}`.trim()
      }));
    });

    this.buscarServicioSubject.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      switchMap(texto => {
        this.buscandoServicio = true;
        const filtro: Partial<ServicioFiltro> = { page: 0, size: 10, nombre: texto };
        return this.servicioService.obtenerServiciosConFiltro(filtro).pipe(
          catchError(() => of(null))
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.buscandoServicio = false;
      this.serviciosSugeridos = response?.data?.content ?? [];
    });
  }

  buscarCliente(event: AutoCompleteCompleteEvent): void {
    this.buscarClienteSubject.next(event.query);
  }

  buscarBarbero(event: AutoCompleteCompleteEvent): void {
    this.buscarBarberoSubject.next(event.query);
  }

  buscarServicio(event: AutoCompleteCompleteEvent): void {
    this.buscarServicioSubject.next(event.query);
  }

  // ---- Handlers al seleccionar un item del autocomplete ----
  onSeleccionarCliente(event: AutoCompleteSelectEvent): void {
    const cliente = event.value as Cliente;
    this.reservaForm.get('clienteId')?.setValue(cliente?.clienteId ?? null);
  }

  onSeleccionarBarbero(event: AutoCompleteSelectEvent): void {
    const barbero = event.value as Barbero;
    this.reservaForm.get('barberoId')?.setValue(barbero?.barberoId ?? null);
  }

  onSeleccionarServicio(event: AutoCompleteSelectEvent): void {
    const servicio = event.value as Servicio;
    this.reservaForm.get('servicioId')?.setValue(servicio?.servicioId ?? null);
  }

  onLimpiarCliente(): void {
    this.reservaForm.get('clienteId')?.setValue(null);
  }

  onLimpiarBarbero(): void {
    this.reservaForm.get('barberoId')?.setValue(null);
  }

  onLimpiarServicio(): void {
    this.reservaForm.get('servicioId')?.setValue(null);
  }

  fechaValida(control: AbstractControl): ValidationErrors | null {
    const fecha = control.value;
    if (!fecha) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha < hoy) {
      return { fechaInvalida: true };
    }

    return null;
  }

  guardarReserva(): void {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor completa todos los campos requeridos'
      });
      return;
    }

    const reserva = this.reservaForm.getRawValue();

    this.reservaPreview = {
      ...reserva,
      fechaFormateada: reserva.fecha ? new Date(reserva.fecha).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : ''
    };

    this.showConfirmDialog = true;
  }

  confirmarGuardar(): void {
    this.showConfirmDialog = false;
    this.isLoading = true;

    const form = this.reservaForm.getRawValue();

    if (!form.fecha) {
      this.isLoading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Fecha inválida',
        detail: 'La fecha es requerida'
      });
      return;
    }

    const fecha = new Date(form.fecha as string | Date);

    const reservaRequest: ReservaRequest = {
      clienteId: form.clienteId!,
      barberoId: form.barberoId!,
      servicioId: form.servicioId!,
      fecha: fecha.toISOString().split('T')[0],
      horaInicio: form.hora!,
      observacion: form.observacion ?? ''
    };

    this.reservaService.guardarReserva(reservaRequest)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: '¡Reserva creada!',
            detail: 'La reserva se creó correctamente.',
            life: 3000
          });

          this.guardar.emit(response);
        },

        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error del servidor',
            detail:
              error?.error?.message ??
              'Ocurrió un error al crear la reserva.',
            life: 4000
          });
        }
      });
  }

  getClienteNombre(): string {
    return this.clienteSeleccionado?.persona?.nombre + ' ' + this.clienteSeleccionado?.persona?.apellido || 'Cargando...';
  }

  getBarberoNombre(): string {
    return this.barberoSeleccionado?.persona?.nombre + ' ' + this.barberoSeleccionado?.persona?.apellido || 'Cargando...';
  }

  getServicioNombre(): string {
    return this.servicioSeleccionado?.nombre || 'Cargando...';
  }

  cancelar(): void {
    this.cancelarEvento.emit();
  }

  get clienteInvalido(): boolean {
    const control = this.reservaForm.get('clienteId');
    return !!control?.invalid && control.touched;
  }

  get barberoInvalido(): boolean {
    const control = this.reservaForm.get('barberoId');
    return !!control?.invalid && control.touched;
  }

  get servicioInvalido(): boolean {
    const control = this.reservaForm.get('servicioId');
    return !!control?.invalid && control.touched;
  }

  get fechaInvalida(): boolean {
    const control = this.reservaForm.get('fecha');
    return !!control?.invalid && control.touched;
  }

  get horaInvalida(): boolean {
    const control = this.reservaForm.get('hora');
    return !!control?.invalid && control.touched;
  }
}