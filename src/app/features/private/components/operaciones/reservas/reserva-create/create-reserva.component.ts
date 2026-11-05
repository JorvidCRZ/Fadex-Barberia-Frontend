import { Component, EventEmitter, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Subject, catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, takeUntil } from 'rxjs';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { campoInvalido, marcarFormulario } from '@/app/shared/utils/form-utils.component';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';
import { Barbero } from '@/app/core/models/gestion/barbero/barbero.model';
import { Servicio, ServicioFiltro } from '@/app/core/models/catalogos/servicios.model';
import { ReservaRequest } from '@/app/core/models/reserva/reservaRequest';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { ServicioService } from '@/app/core/services/catalogos/servicio.service';
import { ReservaService } from '@/app/core/services/operaciones/reserva.service';

interface Horario { label: string; value: string; }
interface ReservaPreview { cliente: string; barbero: string; servicio: string; fecha: string; hora: string; }

const HORARIOS: Horario[] = [
  { label: '09:00 AM', value: '09:00' }, { label: '09:30 AM', value: '09:30' },
  { label: '10:00 AM', value: '10:00' }, { label: '10:30 AM', value: '10:30' },
  { label: '11:00 AM', value: '11:00' }, { label: '11:30 AM', value: '11:30' },
  { label: '12:00 PM', value: '12:00' }, { label: '12:30 PM', value: '12:30' },
  { label: '02:00 PM', value: '14:00' }, { label: '02:30 PM', value: '14:30' },
  { label: '03:00 PM', value: '15:00' }, { label: '03:30 PM', value: '15:30' },
  { label: '04:00 PM', value: '16:00' }, { label: '04:30 PM', value: '16:30' },
  { label: '05:00 PM', value: '17:00' }, { label: '05:30 PM', value: '17:30' },
  { label: '06:00 PM', value: '18:00' }, { label: '06:30 PM', value: '18:30' },
];

@Component({
  selector: 'app-create-reserva',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, AutoCompleteModule, SelectModule, DatePickerModule,
    TextareaModule, MessageModule, ModalComponent, ButtonComponent,
  ],
  templateUrl: './create-reserva.html',
})
export class CreateReserva implements OnInit, OnDestroy, OnChanges {
  @Input() resetTrigger = 0;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelarEvento = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private notify = inject(NotificationService);
  private clienteService = inject(ClienteService);
  private barberoService = inject(BarberoService);
  private servicioService = inject(ServicioService);
  private reservaService = inject(ReservaService);

  private destroy$ = new Subject<void>();
  private buscarClienteSubject = new Subject<string>();
  private buscarBarberoSubject = new Subject<string>();
  private buscarServicioSubject = new Subject<string>();

  isLoading = false;
  formSubmitted = false;
  showConfirmDialog = false;
  reservaPreview: ReservaPreview | null = null;
  today = new Date();
  horarios: Horario[] = HORARIOS;

  clientesSugeridos: Cliente[] = [];
  barberosSugeridos: Barbero[] = [];
  serviciosSugeridos: Servicio[] = [];
  clienteSeleccionado: Cliente | null = null;
  barberoSeleccionado: Barbero | null = null;
  servicioSeleccionado: Servicio | null = null;
  buscandoCliente = false;
  buscandoBarbero = false;
  buscandoServicio = false;

  reservaForm = this.fb.group({
    clienteId: this.fb.control<number | null>(null, [Validators.required]),
    barberoId: this.fb.control<number | null>(null, [Validators.required]),
    servicioId: this.fb.control<number | null>(null, [Validators.required]),
    fecha: this.fb.control<Date | null>(null, [Validators.required, this.fechaValida.bind(this)]),
    hora: this.fb.control<string | null>(null, [Validators.required]),
    observacion: this.fb.control<string>('', [Validators.maxLength(500)]),
  });

  campoInvalido = (campo: string) => campoInvalido(this.reservaForm, campo, this.formSubmitted);

  ngOnInit(): void {
    this.configurarBusquedas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetTrigger'] && !changes['resetTrigger'].firstChange) {
      this.limpiarFormulario();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // =====================================================
  // HORARIOS
  // =====================================================

  /** Si la fecha es hoy, oculta las horas que ya pasaron */
  onFechaChange(): void {
    this.reservaForm.get('hora')?.reset();
    const fecha = this.reservaForm.get('fecha')?.value;
    if (!fecha) { this.horarios = HORARIOS; return; }

    const ahora = new Date();
    const f = new Date(fecha);
    const esHoy = f.getFullYear() === ahora.getFullYear()
      && f.getMonth() === ahora.getMonth()
      && f.getDate() === ahora.getDate();
    if (!esHoy) { this.horarios = HORARIOS; return; }

    this.horarios = HORARIOS.filter(h => {
      const [hh, mm] = h.value.split(':').map(Number);
      return hh > ahora.getHours() || (hh === ahora.getHours() && mm > ahora.getMinutes());
    });
  }

  fechaValida(control: AbstractControl): ValidationErrors | null {
    const fecha = control.value;
    if (!fecha) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fecha < hoy ? { fechaInvalida: true } : null;
  }

  // =====================================================
  // AUTOCOMPLETE
  // =====================================================

  private nombreCompleto(p?: { persona?: { nombre?: string; apellido?: string } }): string {
    return `${p?.persona?.nombre ?? ''} ${p?.persona?.apellido ?? ''}`.trim();
  }

  private configurarBusquedas(): void {
    this.buscarClienteSubject.pipe(
      debounceTime(150), distinctUntilChanged(),
      switchMap(texto => {
        this.buscandoCliente = true;
        const request$ = texto.trim()
          ? this.clienteService.buscarPorNombre(texto, 0, 10)
          : this.clienteService.listar(0, 10);
        return request$.pipe(finalize(() => this.buscandoCliente = false), catchError(() => of(null)));
      }),
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.clientesSugeridos = (resp?.data?.content ?? []).map((c: Cliente) => ({
        ...c, nombreCompleto: this.nombreCompleto(c),
      }));
    });

    this.buscarBarberoSubject.pipe(
      debounceTime(150), distinctUntilChanged(),
      switchMap(texto => {
        this.buscandoBarbero = true;
        const request$ = texto.trim()
          ? this.barberoService.buscarPorNombre(texto, 0, 10)
          : this.barberoService.listar(0, 10);
        return request$.pipe(finalize(() => this.buscandoBarbero = false), catchError(() => of(null)));
      }),
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.barberosSugeridos = (resp?.data?.content ?? []).map((b: Barbero) => ({
        ...b, nombreCompleto: this.nombreCompleto(b),
      }));
    });

    this.buscarServicioSubject.pipe(
      debounceTime(150), distinctUntilChanged(),
      switchMap(texto => {
        this.buscandoServicio = true;
        const filtro: Partial<ServicioFiltro> = texto.trim()
          ? { page: 0, size: 10, nombre: texto }
          : { page: 0, size: 10 };
        return this.servicioService.obtenerServiciosConFiltro(filtro).pipe(
          finalize(() => this.buscandoServicio = false), catchError(() => of(null)));
      }),
      takeUntil(this.destroy$)
    ).subscribe(resp => { this.serviciosSugeridos = resp?.data?.content ?? []; });
  }

  buscarCliente(e: AutoCompleteCompleteEvent): void { this.buscarClienteSubject.next(e.query); }
  buscarBarbero(e: AutoCompleteCompleteEvent): void { this.buscarBarberoSubject.next(e.query); }
  buscarServicio(e: AutoCompleteCompleteEvent): void { this.buscarServicioSubject.next(e.query); }

  onSeleccionarCliente(e: AutoCompleteSelectEvent): void {
    this.reservaForm.get('clienteId')?.setValue((e.value as Cliente)?.clienteId ?? null);
  }
  onSeleccionarBarbero(e: AutoCompleteSelectEvent): void {
    this.reservaForm.get('barberoId')?.setValue((e.value as Barbero)?.barberoId ?? null);
  }
  onSeleccionarServicio(e: AutoCompleteSelectEvent): void {
    this.reservaForm.get('servicioId')?.setValue((e.value as Servicio)?.servicioId ?? null);
  }
  onLimpiarCliente(): void { this.reservaForm.get('clienteId')?.setValue(null); }
  onLimpiarBarbero(): void { this.reservaForm.get('barberoId')?.setValue(null); }
  onLimpiarServicio(): void { this.reservaForm.get('servicioId')?.setValue(null); }

  // =====================================================
  // ACCIONES
  // =====================================================

  /** yyyy-MM-dd en hora local (toISOString usa UTC y puede cambiar el día) */
  private aISO(fecha: Date): string {
    const p = (n: number) => String(n).padStart(2, '0');
    return `${fecha.getFullYear()}-${p(fecha.getMonth() + 1)}-${p(fecha.getDate())}`;
  }

  guardarReserva(): void {
    this.formSubmitted = true;
    if (this.reservaForm.invalid) {
      marcarFormulario(this.reservaForm);
      return;
    }
    const v = this.reservaForm.getRawValue();
    this.reservaPreview = {
      cliente: this.nombreCompleto(this.clienteSeleccionado ?? undefined) || '—',
      barbero: this.nombreCompleto(this.barberoSeleccionado ?? undefined) || '—',
      servicio: this.servicioSeleccionado?.nombre || '—',
      fecha: new Date(v.fecha as Date).toLocaleDateString('es-PE', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      hora: HORARIOS.find(h => h.value === v.hora)?.label ?? v.hora ?? '',
    };
    this.showConfirmDialog = true;
  }

  confirmarGuardar(): void {
    if (this.isLoading) return;
    const v = this.reservaForm.getRawValue();
    if (!v.fecha) return;

    this.isLoading = true;
    const request: ReservaRequest = {
      clienteId: v.clienteId!,
      barberoId: v.barberoId!,
      servicioId: v.servicioId!,
      fecha: this.aISO(new Date(v.fecha)),
      horaInicio: v.hora!,
      observacion: v.observacion ?? '',
    };

    this.reservaService.guardarReserva(request)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe({
        next: (resp: any) => {
          this.showConfirmDialog = false;
          this.notify.showSuccess(resp?.message ?? 'La reserva se creó correctamente');
          this.guardar.emit(resp);
        },
        error: (err) => {
          this.showConfirmDialog = false;
          this.notify.showHttpError(err?.error?.message ?? err?.message ?? 'Ocurrió un error al crear la reserva');
        },
      });
  }

  cancelar(): void {
    this.limpiarFormulario();
    this.cancelarEvento.emit();
  }

  private limpiarFormulario(): void {
    this.formSubmitted = false;
    this.reservaForm.reset({
      clienteId: null, barberoId: null, servicioId: null, fecha: null, hora: null, observacion: '',
    });
    this.horarios = HORARIOS;
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