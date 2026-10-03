import { Banner } from '../models/layout/banner.model';

export const HOME_BANNERS: Banner[] = [
  {id: 1,orden: 1,titulo: 'Cortes modernos',subtitulo: 'Estilo y precisión en cada detalle',activo: true, tituloBoton: 'Reservar cita',
    urlImagen: '/assets/homepage.jpg',urlDestino: '/reservas',seccion: 'HOME_TOP',fechaInicio: null,fechaFin: null,},
  {id: 2,orden: 2,titulo: 'Barbería clásica',subtitulo: 'La experiencia Fadex para tu mejor versión',activo: true, tituloBoton: 'Reservar cita',
    urlImagen: '/assets/homepage.webp', urlDestino: '/reservas', seccion: 'HOME_TOP', fechaInicio: null, fechaFin: null,},
  { id: 3, orden: 3, titulo: 'Cuidado de barba', subtitulo: 'Detalles que definen tu estilo', activo: true, tituloBoton: 'Reservar cita',
    urlImagen: '/assets/cortebarba.jpg',urlDestino: '/reservas',seccion: 'HOME_TOP',fechaInicio: null,fechaFin: null,},
  {id: 4, orden: 4, titulo: 'Tiendda online', subtitulo: 'Productos de calidad para tu cuidado personal', activo: true, tituloBoton: 'Ir a la tienda',
    urlImagen: '/assets/banner-tienda.webp', urlDestino: '/productos', seccion: 'HOME_TOP', fechaInicio: null, fechaFin: null,},
];
