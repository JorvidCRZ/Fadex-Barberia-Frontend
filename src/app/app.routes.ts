import { Routes } from '@angular/router';
import { InicioComponent } from './features/public/pages/inicio/inicio.component';
import { PublicLayoutComponent } from './features/public/layout/public-layout.component';
import { CarritoComponent } from './features/public/pages/carrito/carrito.component';
import { ReservasComponent } from './features/public/pages/reservas/reservas.component';
import { ReclamosComponent } from './features/public/pages/reclamos/reclamos.component';
import { NosotrosComponent } from './features/public/pages/nosotros/nosotros..component';

export const routes: Routes = [
  {  path: '', component: PublicLayoutComponent, children: [
         { path: 'inicio', component: InicioComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'productos', loadComponent: () => import('./features/public/pages/productos/productos.component').then(m => m.ProductosComponent) },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'reset-password', component: ResetPassword },
      // { path: 'productos/detalle/:id', loadComponent: () => import('./features/public/pages/productos/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent) },
      { path: 'servicios', loadComponent: () => import('./features/public/pages/servicios/servicios.component').then(m => m.ServiciosComponent) },
      { path: 'reclamos', component: ReclamosComponent },
      { path: 'reservas', component: ReservasComponent },
      // { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
      // { path: 'register', component: RegisterComponent },
      // { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], data: { roles: ['cliente'] } },
      { path: 'carrito', component: CarritoComponent },
    ]
    }

  ];
