import { Servicio } from '../models/catalogos/servicios.model';

export const SERVICIOS_MOCK: Servicio[] = [
  { servicioId: 1, nombre: 'Corte clásico', precio: 35, categoriaId: 10, categoriaNombre: 'Cortes', duracion: 45, descripcion: 'Corte tradicional con acabado prolijo y asesoría de estilo.', publicado: true, estado: true, urlsMultimedia: ['/assets/servicios/corte-moderno.jpg'] },
  { servicioId: 2, nombre: 'Fade / Degradado', precio: 45, categoriaId: 10, categoriaNombre: 'Cortes', duracion: 60, descripcion: 'Degradado personalizado con líneas limpias y acabado moderno.', publicado: true, estado: true, urlsMultimedia: ['/assets/servicios/fade.jpg'] },
  { servicioId: 3, nombre: 'Arreglo de barba', precio: 30, categoriaId: 11, categoriaNombre: 'Barba', duracion: 30, descripcion: 'Perfilado, recorte y definición de barba según tu rostro.', publicado: true, estado: true, urlsMultimedia: ['/assets/servicios/arreglo-barba.webp'] },
  { servicioId: 4, nombre: 'Corte más barba', precio: 65, categoriaId: 11, categoriaNombre: 'Barba', duracion: 75, descripcion: 'La combinación ideal para renovar completamente tu estilo.', publicado: true, estado: true, urlsMultimedia: ['/assets/cortemasbarba.webp'] },
  { servicioId: 5, nombre: 'Afeitado premium', precio: 40, categoriaId: 11, categoriaNombre: 'Barba', duracion: 40, descripcion: 'Afeitado tradicional con toalla caliente y productos premium.', publicado: true, estado: true, urlsMultimedia: ['/assets/servicios/afeitado.jpg'] },
  { servicioId: 6, nombre: 'Tratamiento capilar', precio: 55, categoriaId: 12, categoriaNombre: 'Tratamientos', duracion: 50, descripcion: 'Tratamiento revitalizante para cabello y cuero cabelludo.', publicado: true, estado: true, urlsMultimedia: ['/assets/tratamientocap.webp'] },
];
