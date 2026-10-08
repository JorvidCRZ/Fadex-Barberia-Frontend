import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderPerfilClient } from './components/header-perfil-client/header-perfil-client';
import { InformacionBasica } from './components/informacion-basica/informacion-basica';
import { ResumenPerfilClient } from './components/resumen-perfil-client/resumen-perfil-client';
import { CredencialesPerfilClient } from './components/credenciales-perfil-client/credenciales-perfil-client';
import { ActividadClient } from './components/actividad-client/actividad-client';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';

@Component({
  selector: 'app-perfil-client',
  standalone: true,
  imports: [
    CommonModule,
    InformacionBasica,
    CredencialesPerfilClient,
    ActividadClient,
    ResumenPerfilClient
],
  templateUrl: './perfil-client.html',
  styleUrl: './perfil-client.css',
})
export class PerfilClient {
  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);

  cliente: Cliente | null = null;
  cargando = true;
  errorCarga = '';

  clienteNombre = 'Cliente';
  clienteIniciales = 'CL';
  headerComponent = HeaderPerfilClient;
  headerInputs = {
    clienteNombre: this.clienteNombre,
    clienteIniciales: this.clienteIniciales,
    clienteDescripcion: 'Perfil del cliente',
  };
  resumenComponent = ResumenPerfilClient;
  resumenInputs = {
    clienteId: 0,
    clienteNombre: this.clienteNombre,
  };
  nombre = 'Cliente';
  apellido = '';
  telefono = '';
  email = '';
  registro = '';
  usuario = '';
  contrasena = '';
  idUsuario = 0;
  clienteIdActual = 0;

  readonly clientesMemoria: Cliente[] = [
    { clienteId: 1, fechaRegistro: '2026-09-01', persona: { personaId: 1, nombre: 'Valeria', apellido: 'Quispe', telefono: '987 245 613', email: 'valeria.quispe@gmail.com', usuario: { idUsuario: 1, user: 'valeria.q', qrToken: '', password: 'valeria1234' } } },
    { clienteId: 2, fechaRegistro: '2026-09-03', persona: { personaId: 2, nombre: 'Diego', apellido: 'Salazar', telefono: '946 318 722', email: 'diego.salazar@gmail.com', usuario: { idUsuario: 2, user: 'diego.s', qrToken: '', password: 'diego1234' } } },
    { clienteId: 3, fechaRegistro: '2026-09-05', persona: { personaId: 3, nombre: 'Mateo', apellido: 'Huamán', telefono: '912 804 371', email: 'mateo.h@outlook.com', usuario: { idUsuario: 3, user: 'mateo.h', qrToken: '', password: 'mateo1234' } } },
    { clienteId: 4, fechaRegistro: '2026-09-09', persona: { personaId: 4, nombre: 'Luciana', apellido: 'Paredes', telefono: '975 116 408', email: 'luciana.paredes@gmail.com', usuario: { idUsuario: 4, user: 'luciana.p', qrToken: '', password: 'luciana1234' } } },
    { clienteId: 5, fechaRegistro: '2026-09-12', persona: { personaId: 5, nombre: 'Sebastián', apellido: 'Flores', telefono: '930 667 219', email: 'sebastian.flores@gmail.com', usuario: { idUsuario: 5, user: 'sebastian.f', qrToken: '', password: 'sebastian1234' } } },
    { clienteId: 6, fechaRegistro: '2026-09-18', persona: { personaId: 6, nombre: 'Camila', apellido: 'Rojas', telefono: '994 251 803', email: 'camila.rojas@gmail.com', usuario: { idUsuario: 6, user: 'camila.r', qrToken: '', password: 'camila1234' } } },
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isFinite(id) || id <= 0) {
      this.errorCarga = 'ID de cliente inválido';
      this.cargando = false;
      return;
    }

    this.cargarCliente(id);
  }

  public cargarCliente(id: number): void {
    /*
    this.clienteService.obtenerPorId(id).subscribe({
      next: (response) => {
        this.cliente = response.data;
          this.clienteIdActual = response.data.clienteId;
        this.actualizarVista();
        this.cargando = false;
      },
      error: () => {
        this.errorCarga = 'No se pudo cargar el cliente';
        this.cargando = false;
      }
    });
    */
    const cliente = this.clientesMemoria.find((item) => item.clienteId === id);
    if (!cliente) {
      this.errorCarga = 'No se pudo cargar el cliente';
      this.cargando = false;
      return;
    }

    this.cliente = cliente;
    this.clienteIdActual = cliente.clienteId;
    this.actualizarVista();
    this.cargando = false;
  }

  private actualizarVista(): void {
    const cliente = this.cliente;

    if (!cliente) {
      return;
    }

    const nombre = cliente.persona?.nombre ?? 'Cliente';
    const apellido = cliente.persona?.apellido ?? '';

    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = cliente.persona?.telefono ?? '';
    this.email = cliente.persona?.email ?? '';
    this.registro = cliente.fechaRegistro ?? '';
    this.usuario = cliente.persona?.usuario?.user ?? '';
    this.contrasena = this.maskPassword(cliente.persona?.usuario?.password ?? '');
    this.idUsuario = cliente.persona?.usuario?.idUsuario ?? 0;
    this.clienteNombre = apellido ? `${nombre} ${apellido}` : nombre;
    this.clienteIniciales = this.getInitials(this.clienteNombre);

    this.headerInputs = {
      clienteNombre: this.clienteNombre,
      clienteIniciales: this.clienteIniciales,
      clienteDescripcion: 'Perfil del cliente',
    };

    this.resumenInputs = {
      clienteId: cliente.clienteId,
      clienteNombre: this.clienteNombre,
    };
  }

  private getInitials(name: string): string {
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 0) return 'CL';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  private maskPassword(password: string): string {
    if (!password) {
      return 'No disponible';
    }

    if (password.length <= 4) {
      return password;
    }

    const maskedLength = Math.min(Math.max(password.length - 4, 8), 16);
    const suffix = password.slice(-4);
    return `${'•'.repeat(maskedLength)}${suffix}`;
  }

  onPasswordReset(): void {
    if (!this.clienteIdActual) {
      return;
    }

    this.cargarCliente(this.clienteIdActual);
  }

  onUsernameUpdate(): void {
    if (!this.clienteIdActual) {
      return;
    }

    this.cargarCliente(this.clienteIdActual);
  }

}
