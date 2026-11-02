export interface ServicioHistorialDTO {
  reservaId: number;
  clienteNombre: string;
  clienteApellido: string;
  servicioNombre: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  duracion: number;
  precio: number;
  estado: string;
}