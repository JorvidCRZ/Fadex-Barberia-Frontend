import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule, AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TokenService } from '../../../../core/services/auth/token.service';
import { Barbero } from '../../../../core/models/gestion/barbero/barbero.model';
import { ReservaRequest } from '../../../../core/models/reserva/reservaRequest';
import { BarberoService } from '../../../../core/services/gestion/barbero.service';
import { ServicioService } from '../../../../core/services/catalogos/servicio.service';
import { ReservaService } from '../../../../core/services/operaciones/reserva.service';
import { Servicio, ServicioFiltro } from '../../../../core/models/catalogos/servicios.model';
import {FormBuilder,ReactiveFormsModule,Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { map, Observable, of, Subject, takeUntil, debounceTime, switchMap, catchError, finalize } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sacar-cita',
  standalone: true,
  imports: [CommonModule,AsyncPipe,DatePipe,ReactiveFormsModule,SelectModule,IftaLabelModule,ButtonModule,
    ToastModule,CardModule,DividerModule,DatePickerModule,BadgeModule,ChipModule],
  providers: [MessageService],
  templateUrl: './reservar.html',
})
export class ReservarComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private barberoService = inject(BarberoService);
  private servicioService = inject(ServicioService);
  private reservaService = inject(ReservaService);
  private tokenService = inject(TokenService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  barberos$!: Observable<Barbero[]>;
  servicios$!: Observable<Servicio[]>;

  isLoading = false;
  checkingDisponibility = false;
  showConfirmDialog = false;
  reservaPreview: any = null;
  today = new Date();

  barberosCache: any[] = [];
  serviciosCache: Servicio[] = [];
  servicioFiltro: ServicioFiltro = { page: 0, size: 1000 };

  minDateCita: Date = this.calcularFechaMinima();
  maxDateCita: Date = this.calcularFechaMaxima();

  horariosDisponibles: { label: string; value: string }[] = [];

  private readonly TODOS_LOS_HORARIOS: { label: string; value: string }[] = [
    { label: '09:00 AM', value: '09:00' },
    { label: '09:30 AM', value: '09:30' },
    { label: '10:00 AM', value: '10:00' },
    { label: '10:30 AM', value: '10:30' },
    { label: '11:00 AM', value: '11:00' },
    { label: '11:30 AM', value: '11:30' },
    { label: '12:00 PM', value: '12:00' },
    { label: '12:30 PM', value: '12:30' },
    { label: '01:00 PM', value: '13:00' },
    { label: '01:30 PM', value: '13:30' },
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

  clienteActual: any = {
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  citaForm = this.fb.group({
    barberoId: [null, [Validators.required]],
    servicioId: [null, [Validators.required]],
    fecha: [null as Date | null, [Validators.required, this.fechaValida.bind(this)]],
    hora: [null as string | null, [Validators.required]],
    notas: ['', [Validators.maxLength(300)]],
    aceptaTerminos: [false, [Validators.requiredTrue]]
  });



  ngOnInit(): void {
    this.cargarClienteDesdeToken();
    this.cargarDatos();
    this.horariosDisponibles = this.calcularHorarios();
    this.generarDiasChips();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  private calcularFechaMinima(): Date {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return hoy;
  }

  private calcularFechaMaxima(): Date {
    const max = new Date();
    max.setMonth(max.getMonth() + 3);
    max.setHours(0, 0, 0, 0);
    return max;
  }

  getFechaMinimaInput(): string {
    return this.minDateCita.toISOString().split('T')[0];
  }

  getFechaMaximaInput(): string {
    return this.maxDateCita.toISOString().split('T')[0];
  }

  getFechaMinima(): Date {
    return this.minDateCita;
  }

  getFechaFormateada(): string {
    const fecha = this.citaForm.get('fecha')?.value;
    if (!fecha) return '';
    return (fecha as Date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  fechaValida(control: AbstractControl): ValidationErrors | null {
    const fecha = control.value as Date;

    if (!fecha) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaComparar = new Date(fecha);
    fechaComparar.setHours(0, 0, 0, 0);

    if (fechaComparar < hoy) {
      return { fechaInvalida: true };
    }

    if (fechaComparar.getDay() === 0) {
      return { domingo: true };
    }

    return null;
  }

  

  onFechaChange(): void {
    this.citaForm.get('hora')?.reset();
    this.horariosDisponibles = this.calcularHorarios();
  }

  private calcularHorarios(): { label: string; value: string }[] {
    const fechaSeleccionada:any = this.citaForm.get('fecha')?.value;
    if (!fechaSeleccionada) return this.TODOS_LOS_HORARIOS;

    const hoy = new Date();

 
    const fechaForm = fechaSeleccionada instanceof Date
      ? new Date(fechaSeleccionada)
      : new Date((fechaSeleccionada as string) + 'T00:00:00');

    const esHoy =
      fechaForm.getFullYear() === hoy.getFullYear() &&
      fechaForm.getMonth() === hoy.getMonth() &&
      fechaForm.getDate() === hoy.getDate();

    if (!esHoy) return this.TODOS_LOS_HORARIOS;

    const horaActual = hoy.getHours();
    const minActual = hoy.getMinutes();

    return this.TODOS_LOS_HORARIOS.filter(h => {
      const [hh, mm] = h.value.split(':').map(Number);
      if (hh < horaActual) return false;
      if (hh === horaActual && mm <= minActual) return false;
      return true;
    });
  }



  private cargarClienteDesdeToken(): void {
    const decodedToken = this.tokenService.getDecodedToken();
    const userId = this.tokenService.getUserId();
    const userDisplayName = this.tokenService.getUserDisplayName();

    if (!userId || !this.tokenService.isLogged()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Sesión no válida',
        detail: 'Por favor inicia sesión nuevamente'
      });
      this.router.navigate(['/login']);
      return;
    }

    const nombreCompleto = userDisplayName || decodedToken?.nombreCompleto || decodedToken?.fullName || '';
    const nombreParts = nombreCompleto.split(' ');

    this.clienteActual = {
      id: userId,
      nombre: nombreParts[0] || decodedToken?.nombre || decodedToken?.given_name || 'Cliente',
      apellido: nombreParts.slice(1).join(' ') || decodedToken?.apellido || decodedToken?.family_name || '',
      email: decodedToken?.email || decodedToken?.sub || '',
      telefono: decodedToken?.telefono || decodedToken?.phone || '',
      username: decodedToken?.username || decodedToken?.sub || ''
    };
  }

  private cargarDatos(): void {
    if (environment.useMockData) {
      const mockBarberos = [
        { barberoId: 1, persona: { nombre: 'Carlos', apellido: 'Ramírez' }, especialidad: 'Corte clásico' },
        { barberoId: 2, persona: { nombre: 'Miguel', apellido: 'Torres' }, especialidad: 'Barba y perfilado' },
        { barberoId: 3, persona: { nombre: 'Diego', apellido: 'Santos' }, especialidad: 'Fade moderno' },
      ].map((barbero: any) => ({
        ...barbero,
        id: barbero.barberoId,
        nombreCompleto: `${barbero.persona?.nombre ?? ''} ${barbero.persona?.apellido ?? ''}`.trim(),
      }));

      this.barberosCache = mockBarberos;
      this.barberos$ = of(mockBarberos);

      this.serviciosCache = [
        {
          servicioId: 1,
          nombre: 'Corte clásico',
          duracion: 30,
          precio: 35,
          categoriaId: 1,
          categoriaNombre: 'Cortes',
          publicado: true,
          estado: true,
          urlsMultimedia: []
        },
        {
          servicioId: 2,
          nombre: 'Arreglo de barba',
          duracion: 25,
          precio: 30,
          categoriaId: 1,
          categoriaNombre: 'Barba',
          publicado: true,
          estado: true,
          urlsMultimedia: []
        },
        {
          servicioId: 3,
          nombre: 'Fade moderno',
          duracion: 45,
          precio: 50,
          categoriaId: 1,
          categoriaNombre: 'Cortes',
          publicado: true,
          estado: true,
          urlsMultimedia: []
        },
      ];
      this.servicios$ = of(this.serviciosCache);
      return;
    }

    this.barberos$ = this.barberoService.listar(0, 1000).pipe(
      map(response => {
        if (response?.data?.content) {
          this.barberosCache = response.data.content.map((barbero: Barbero) => ({
            ...barbero,
            id: barbero.barberoId || barbero.barberoId,
            nombreCompleto: `${barbero.persona?.nombre ?? ''} ${barbero.persona?.apellido ?? ''}`.trim()
          }));
          return this.barberosCache;
        }
        return [];
      })
    );

    this.servicios$ = this.servicioService.obtenerServicioPublicos({ size: 1000, page: 0 }).pipe(
      map(response => {
        if (response?.data?.content) {
          this.serviciosCache = response.data.content;
          return this.serviciosCache;
        }
        return [];
      }),
      catchError((error) => {
        console.error('Error cargando servicios:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los servicios'
        });
        return of([]);
      })
    );
  }


  guardarCita(): void {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor completa todos los campos requeridos y acepta los términos'
      });
      return;
    }

    const reserva = this.citaForm.getRawValue();

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

    const form = this.citaForm.getRawValue();

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
      clienteId: Number(this.clienteActual.id),
      barberoId: form.barberoId!,
      servicioId: form.servicioId!,
      fecha: fecha.toISOString().split('T')[0],
      horaInicio: form.hora!,
      observacion: form.notas ?? ''
    };

    console.log('Payload enviado:', reservaRequest);

    this.reservaService.guardarReserva(reservaRequest)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta crear reserva:', response);

          this.messageService.add({
            severity: 'success',
            summary: '¡Cita agendada!',
            detail: 'Tu cita ha sido agendada exitosamente',
            life: 3000
          });

          setTimeout(() => {
            this.router.navigate(['/mi-cuenta/reservas/mis-reservas']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error al guardar reserva:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error del servidor',
            detail: error?.error?.message ?? 'Ocurrió un error al agendar la cita.',
            life: 4000
          });
        }
      });
  }
  diasChips: { fecha: Date; etiqueta: string }[] = [];

private generarDiasChips(cantidad = 7): void {
  const nombres = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const inicio = new Date(this.minDateCita);
  this.diasChips = [];
  for (let i = 0; i < cantidad; i++) {
    const d = new Date(inicio);
    d.setDate(inicio.getDate() + i);
    if (this.maxDateCita && d > this.maxDateCita) break;
    this.diasChips.push({ fecha: d, etiqueta: nombres[d.getDay()] });
  }
}

seleccionarDia(fecha: Date): void {
  this.citaForm.patchValue({ fecha });
  this.citaForm.get('fecha')?.markAsTouched();
  this.onFechaChange();
}

esDiaActivo(d: Date): boolean {
  const v = this.citaForm.get('fecha')?.value;
  return !!v && new Date(v).toDateString() === d.toDateString();
}

  seleccionarHora(hora: string | null): void {
    this.citaForm.patchValue({ hora });
    this.citaForm.get('hora')?.markAsTouched();
  }

  esHoraActiva(hora: string): boolean {
    return (this.citaForm.get('hora')?.value ?? null) === hora;
  }

  getBarberoNombre(): string {
    const barberoId = this.citaForm.get('barberoId')?.value;
    const barbero = this.barberosCache.find(b => (b.barberoId === barberoId || b.id === barberoId));
    return barbero?.nombreCompleto || 'Cargando...';
  }

  getServicioNombre(): string {
    const servicioId = this.citaForm.get('servicioId')?.value;
    if (servicioId == null) return 'Cargando...';
    const servicio = this.serviciosCache.find(s => (s.servicioId === servicioId || s.servicioId === servicioId));
    return servicio?.nombre || 'Cargando...';
  }

  getServicioPrecio(): number {
    const servicioId = this.citaForm.get('servicioId')?.value;
    if (servicioId == null) return 0;
    const servicio = this.serviciosCache.find(s => (s.servicioId === servicioId || s.servicioId === servicioId));
    return servicio?.precio || 0;
  }

  getServicioDuracion(): number {
    const servicioId = this.citaForm.get('servicioId')?.value;
    if (servicioId == null) return 30;
    const servicio = this.serviciosCache.find(s => (s.servicioId === servicioId || s.servicioId === servicioId));
    return servicio?.duracion || 30;
  }

cancelar(): void {
  this.router.navigate(['/mi-cuenta/reservas/mis-reservas']);
}

  get barberoInvalido(): boolean {
    const control = this.citaForm.get('barberoId');
    return !!control?.invalid && control.touched;
  }

  get servicioInvalido(): boolean {
    const control = this.citaForm.get('servicioId');
    return !!control?.invalid && control.touched;
  }

  get fechaInvalida(): boolean {
    const control = this.citaForm.get('fecha');
    return !!control?.invalid && control.touched;
  }

  get horaInvalida(): boolean {
    const control = this.citaForm.get('hora');
    return !!control?.invalid && control.touched;
  }

  get terminosInvalido(): boolean {
    const control = this.citaForm.get('aceptaTerminos');
    return !!control?.invalid && control.touched;
  }

  get fechaErrorMensaje(): string {
    const control = this.citaForm.get('fecha');
    if (control?.errors?.['fechaInvalida']) return 'La fecha no puede ser anterior a hoy';
    return 'La fecha es requerida';
  }

  getNombreCompletoCliente(): string {
    return `${this.clienteActual.nombre} ${this.clienteActual.apellido}`.trim() || this.clienteActual.username || 'Cliente';
  }
}
