import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { NOSOTROS_BANNERS } from '../../../../core/config/banner.config';

@Component({
  selector: 'app-nosotros',
  imports: [NgOptimizedImage, RouterLink, BannerComponent],
  templateUrl: './nosotros.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NosotrosComponent {
  readonly banners = NOSOTROS_BANNERS;
  
  readonly valores = [
    {icono: 'pi pi-star', titulo: 'Calidad', descripcion: 'Usamos los mejores productos y técnicas para garantizar un resultado impecable en cada servicio.',},
    {icono: 'pi pi-users',titulo: 'Comunidad',descripcion: 'Somos más que una barbería. Somos un punto de encuentro para hombres que valoran su imagen y su tiempo.',},
    { icono: 'pi pi-clock', titulo: 'Puntualidad', descripcion: 'Respetamos tu tiempo. Nuestro sistema de citas garantiza que te atendamos a la hora acordada, sin esperas.',},
    {icono: 'pi pi-lightbulb',titulo: 'Experiencia',descripcion: 'Cada visita es una experiencia completa: ambiente, atención y resultado que superan tus expectativas.',},
  ];

  readonly equipo = [
    {imagen: '/assets/equipo/barbero-1.jpg',nombre: 'Carlos Mendoza',cargo: 'Fundador & Head Barber',descripcion: '12 años de experiencia. Especialista en cortes clásicos y degradados.',},
    {imagen: '/assets/equipo/barbero-2.jpg',nombre: 'Diego Ríos',cargo: 'Senior Barber',descripcion: 'Experto en diseño de barba y perfilado de cejas masculino.',},
    { imagen: '/assets/equipo/barbero-3.jpg', nombre: 'Luis Paredes', cargo: 'Barber', descripcion: 'Especializado en estilos modernos y cortes texturizados.',},
    { imagen: '/assets/equipo/barbero-4.jpg', nombre: 'Andrés Vega', cargo: 'Junior Barber', descripcion: 'Talento joven con formación internacional en técnicas actuales.',},
  ];

  readonly estadisticas = [
    { valor: '10+', etiqueta: 'Años de experiencia' },
    { valor: '5K+', etiqueta: 'Clientes satisfechos' },
    { valor: '4', etiqueta: 'Barberos expertos' },
    { valor: '100%', etiqueta: 'Compromiso contigo' },
  ];
}
