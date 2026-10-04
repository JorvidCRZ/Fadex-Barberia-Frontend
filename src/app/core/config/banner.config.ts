import { Banner } from '../models/layout/banner.model';

export const HOME_BANNERS: Banner[] = [
  {id: 1,orden: 1,titulo: 'Cortes modernos',subtitulo: 'Estilo y precisión en cada detalle',activo: true, tituloBoton: 'Ver servicios',
    urlImagen: '/assets/homepage.jpg',urlDestino: '/servicios',seccion: 'HOME_TOP',fechaInicio: null,fechaFin: null,},
  {id: 2,orden: 2,titulo: 'Nuestro local', subtitulo: 'Un espacio diseñado para tu comodidad y estilo', activo: true, tituloBoton: 'Conócenos',
    urlImagen: '/assets/banner-local.webp', urlDestino: '/nosotros', seccion: 'HOME_TOP', fechaInicio: null, fechaFin: null,},
  { id: 3, orden: 3, titulo: 'Cuidado de barba', subtitulo: 'Detalles que definen tu estilo', activo: true, tituloBoton: 'Reservar cita',
    urlImagen: '/assets/cortebarba.jpg',urlDestino: '/reservas',seccion: 'HOME_TOP',fechaInicio: null,fechaFin: null,},
  {id: 4, orden: 4, titulo: 'Tiendda online', subtitulo: 'Productos de calidad para tu cuidado personal', activo: true, tituloBoton: 'Ir a la tienda',
    urlImagen: '/assets/banner-mostrador.webp', urlDestino: '/productos', seccion: 'HOME_TOP', fechaInicio: null, fechaFin: null,},
  {id: 5, orden: 5, titulo: 'Nuestro local', subtitulo: 'Un espacio diseñado para tu comodidad y estilo', activo: true,
    urlImagen: '/assets/banner-local.webp', seccion: 'NOSOTROS_TOP', fechaInicio: null, fechaFin: null,},

      // titulo: 'Barbería clásica',subtitulo: 'La experiencia Fadex para tu mejor versión',activo: true, tituloBoton: 'Reservar cita',
    // urlImagen: '/assets/homepage.webp', urlDestino: '/reservas', seccion: 'HOME_TOP', fechaInicio: null, fechaFin: null,},
];

export const NOSOTROS_BANNERS = HOME_BANNERS.filter(
  (banner) => banner.seccion === 'NOSOTROS_TOP'
);
