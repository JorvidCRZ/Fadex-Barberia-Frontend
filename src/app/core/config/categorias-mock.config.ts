import { Categoria, CategoriaTipo } from '../models/catalogos/categorias.model';

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: 1, nombre: 'Cuidado capilar', descripcion: 'Productos para el cuidado del cabello.', estado: true, padreId: null, padreNombre: null, tipo: CategoriaTipo.PRODUCTO },
  { id: 2, nombre: 'Barba y afeitado', descripcion: 'Productos para barba y afeitado.', estado: true, padreId: null, padreNombre: null, tipo: CategoriaTipo.PRODUCTO },
  { id: 3, nombre: 'Accesorios', descripcion: 'Accesorios para el cuidado personal.', estado: true, padreId: null, padreNombre: null, tipo: CategoriaTipo.PRODUCTO },
  { id: 10, nombre: 'Cortes', descripcion: 'Cortes clásicos y modernos.', estado: true, padreId: null, padreNombre: null, tipo: CategoriaTipo.SERVICIO },
  { id: 11, nombre: 'Barba', descripcion: 'Diseño y cuidado de barba.', estado: true, padreId: null, padreNombre: null, tipo: CategoriaTipo.SERVICIO },
  { id: 12, nombre: 'Tratamientos', descripcion: 'Tratamientos para cabello y cuero cabelludo.', estado: true, padreId: null, padreNombre: null, tipo: CategoriaTipo.SERVICIO },
];
