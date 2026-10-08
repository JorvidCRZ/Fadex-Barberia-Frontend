import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { NosotrosComponent } from './features/public/pages/nosotros/nosotros..component';
import { ReservasComponent } from './features/public/pages/reservas/reservas.component';
import { ReclamosComponent } from './features/public/pages/reclamos/reclamos.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { PublicLayoutComponent } from './features/public/layout/public-layout.component';
import { InicioComponent } from './features/public/pages/inicio/inicio.component';
import { CarritoComponent } from './features/public/pages/carrito/carrito.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { PagoComponent } from './features/auth/pago/pago.component';
import { DashboardBarberoComponent } from './features/private/layout/dashboard-barbero.component';
import { DashboardClienteComponent } from './features/private/layout/dashboard-cliente.component';
import { DashboardAdministrativoComponent } from './features/private/layout/dashboard-administrativo.component';
//mport { BarberoLayoutComponent } from './features/private/layout/dashboard-barbero.component';
//import { DashboardAdministrativoComponent } from './features/private/dashboard/dashboard-administrativo/dashboard-administrativo.component';
import { RegistrarClient } from './features/private/components/gestion/clientes/registrar-client/registrar-client';
import { RegistrarBarbero } from './features/private/components/gestion/barberos/registrar-barbero/registrar-barbero';
import { PerfilClient } from './features/private/components/gestion/clientes/perfil-client/perfil-client';
import { PerfilBarbero } from './features/private/components/gestion/barberos/perfil-barbero/perfil-barbero';
import { Usuario } from './features/private/components/gestion/usuario/usuario';
import { PerfilUsuario } from './features/private/components/gestion/usuario/perfil-usuario/perfil-usuario';
import { CheckoutComponent } from './features/auth/checkout/checkout.component';
import { PerfilDashboardBarbero } from './features/private/components/perfil-dashboard-barbero/perfil-dashboard-barbero';

export const routes: Routes = [
   {
     path: 'dashboard/admin', component: DashboardAdministrativoComponent,
    canActivate: [authGuard], data: { roles: ['admin'] },
    children: [
       { path: '', redirectTo: 'resumen', pathMatch: 'full' },
        { path: 'resumen', loadComponent: () => import('./features/private/components/resumen/resumen').then(m => m.Resumen) },
       {
         path: 'catalogo', children: [
           { path: 'categorias', loadComponent: () => import('./features/private/components/catalogo/categorias/categorias.component').then(m => m.CategoriasComponent) },
           { path: 'productos', loadComponent: () => import('./features/private/components/catalogo/productos/productos.component').then(m => m.ProductosComponent) },
           { path: 'productos/detalle/:id', loadComponent: () => import('./features/private/components/catalogo/productos/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent) },
           { path: 'servicios', loadComponent: () => import('./features/private/components/catalogo/servicios/servicios.component').then(m => m.ServiciosComponent) },
         ]
       },
       {
         path: 'operaciones', children: [
           { path: 'pos', loadComponent: () => import('./features/private/components/operaciones/ventas/pos/pos.component').then(m => m.PosComponent) },
           { path: 'ventas', loadComponent: () => import('./features/private/components/operaciones/ventas/ventas.component').then(m => m.VentasComponent) },
           { path: 'reservas', loadComponent: () => import('./features/private/components/operaciones/reservas/reserva-list/reserva-list').then(m => m.ReservaList) },
           { path: 'reservas/nueva', loadComponent: () => import('./features/private/components/operaciones/reservas/reserva-create/create-reserva/create-reserva').then(m => m.CreateReserva) },
           { path: 'reservas/calendario', loadComponent: () => import('./features/private/components/operaciones/reservas/reserva-calendar/reserva-calendar').then(m => m.CalendarReservas) },
           { path: 'pagos', loadComponent: () => import('./features/private/components/operaciones/pagos/pagos.component').then(m => m.PagosComponent) },
           { path: 'reclamos', loadComponent: () => import('./features/private/components/operaciones/reclamos/reclamos.component').then(m => m.ReclamosComponent) },
           { path: 'reclamos/:id', loadComponent: () => import('./features/private/components/operaciones/reclamos/reclamo-detalle/reclamo-detalle.component').then(m => m.ReclamoDetalleComponent) }
         ]
       },
       {
         path: 'sueldos',
         children: [
           { path: '', loadComponent: () => import('./features/private/components/sueldos/sueldos').then(m => m.Sueldos) },
           { path: ':id', loadComponent: () => import('./features/private/components/sueldos/mi-sueldo-analisis/mi-sueldo-analisis').then(m => m.MiSueldoAnalisis) }
         ]
       },
       {
         path: 'gestion', children: [
           { path: 'clientes', loadComponent: () => import('./features/private/components/gestion/clientes/clientes').then(m => m.Clientes) },
           { path: 'clientes/register-cliente', component: RegistrarClient },
           { path: 'clientes/:id', component: PerfilClient },
           { path: 'barberos', loadComponent: () => import('./features/private/components/gestion/barberos/barberos').then(m => m.Barberos) },
           { path: 'barberos/registrar-barbero', component: RegistrarBarbero },
           { path: 'barberos/:id', component: PerfilBarbero },
           { path: 'usuarios', component: Usuario },
           { path: 'usuarios/:id', component: PerfilUsuario },
        ]
       },
       {
         path: 'fidelizacion', children: [
           { path: 'seguimiento', loadComponent: () => import('./features/private/components/fidelizacion/seguimiento/seguimiento.component').then(m => m.SeguimientoComponent) },
           { path: 'reglas', loadComponent: () => import('./features/private/components/fidelizacion/fidelizacion.component').then(m => m.FidelizacionAdminComponent) },
           { path: 'ruletas', loadComponent: () => import('./features/private/components/ruleta/ruletas-admin/ruletas-admin.component').then(m => m.RuletasAdminComponent) }
         ]
       },
       {
         path: 'analisis', children: [
           { path: 'metricas', loadComponent: () => import('./features/private/components/analisis/metricas/metricas').then(m => m.MetricasComponent) },
           { path: 'reportes', loadComponent: () => import('./features/private/components/analisis/reportes/reportes').then(m => m.ReportesComponent) },
           { path: 'predicciones', loadComponent: () => import('./features/private/components/analisis/predicciones/predicciones').then(m => m.Predicciones) },
           { path: '', redirectTo: 'metricas', pathMatch: 'full' },
         ]
       },
       {
         path: 'sistema', children: [
           { path: 'perfil', loadComponent: () => import('./features/private/pages/perfil/perfil.component').then(m => m.PerfilComponent) },
           { path: 'configuracion', loadComponent: () => import('./features/private/components/sistema/configuracion').then(m => m.Configuracion) },
         ]
       },
         { path: '**', loadComponent: () => import('./shared/components/error404/error404.component').then(m => m.Error404Component) },
    ]
  },
  {
    path: 'dashboard/barbero', component: DashboardBarberoComponent,
    canActivate: [authGuard], data: { roles: ['barbero'] },
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
       { path: 'resumen', loadComponent: () => import('./features/private/components/resumen/resumen-barbero').then(m => m.ResumenBarbero) },
       { path: 'reservas', loadComponent: () => import('./features/private/components/reserva/reserva').then(m => m.ReservaComponent) },
       { path: 'cortes', loadComponent: () => import('./features/private/components/cortes/cortes').then(m => m.CortesComponent) },
       {
         path: 'operaciones', children: [
           { path: 'pos', loadComponent: () => import('./features/private/components/operaciones/ventas/pos/pos.component').then(m => m.PosComponent) }, 
           { path: 'ventas', loadComponent: () => import('./features/private/components/operaciones/ventas/ventas.component').then(m => m.VentasComponent) },
          { path: 'reservas', loadComponent: () => import('./features/private/components/operaciones/reservas/reserva-list/reserva-list').then(m => m.ReservaList) },
          { path: 'pagos', loadComponent: () => import('./features/private/components/operaciones/pagos/pagos.component').then(m => m.PagosComponent) },
         ]
       },

       {
         path: 'gestion', children: [
           { path: 'clientes', loadComponent: () => import('./features/private/components/gestion/clientes/clientes').then(m => m.Clientes) },
          { path: 'clientes/registrar-client', component: RegistrarClient },
           { path: 'clientes/:id', component: PerfilClient },
           { path: 'barberos', loadComponent: () => import('./features/private/components/gestion/barberos/barberos').then(m => m.Barberos) },
         ]
       },
      { path: 'perfil', component: PerfilDashboardBarbero },
      { path: '**', loadComponent: () => import('./shared/components/error404/error404.component').then(m => m.Error404Component) }
     ]
   },

  {
    path: '', component: PublicLayoutComponent, children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'terminos-condiciones', loadComponent: () => import('./features/public/pages/terminos-condiciones/terminos-condiciones.component').then(m => m.TerminosCondicionesComponent) },
      { path: 'politica-privacidad', loadComponent: () => import('./features/public/pages/politica-privacidad/politica-privacidad.component').then(m => m.PoliticaPrivacidadComponent) },
      { path: 'preguntas-frecuentes', loadComponent: () => import('./features/public/pages/preguntas-frecuentes/preguntas-frecuentes.component').then(m => m.PreguntasFrecuentesComponent) },
      { path: 'productos', loadComponent: () => import('./features/public/pages/productos/productos.component').then(m => m.ProductComponent) },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'servicios', loadComponent: () => import('./features/public/pages/servicios/servicios.component').then(m => m.ServiciosComponent) },
      { path: 'reclamos', component: ReclamosComponent },
      { path: 'reservas', component: ReservasComponent },
      { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], data: { roles: ['cliente'] } },
      { path: 'pago', component: PagoComponent, canActivate: [authGuard], data: { roles: ['cliente'] } },
      { path: 'carrito', component: CarritoComponent },
      {
        path: 'mi-cuenta', component: DashboardClienteComponent,
        canActivate: [authGuard], data: { roles: ['cliente'] },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./features/private/pages/resumen/resumen.component').then(m => m.ResumenComponent) },
          { path: 'reservar/agendar', loadComponent: () => import('./features/private/pages/reservar/reservar.component').then(m => m.ReservarComponent), canActivate: [authGuard] },
          { path: 'reservas/mis-reservas', loadComponent: () => import('./features/private/pages/mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent) },
          { path: 'ia/analisis-facial', loadComponent: () => import('./features/private/pages/reconocimiento-facial/reconocimiento-facial.component').then(m => m.ReconocimientoFacialComponent) },
          { path: 'historial', loadComponent: () => import('./features/private/pages/historial/historial.component').then(m => m.ClienteHistorialComponent) },

          {
            path: 'fidelizacion', children: [
              { path: '', loadComponent: () => import('./features/private/pages/fidelizacion/fidelizacion.component').then(m => m.FidelizacionComponent) }
            ]
          },

          { path: 'perfil', loadComponent: () => import('./features/private/pages/perfil/perfil.component').then(m => m.PerfilComponent) },
          { path: 'checkout/:reservaId', component: CheckoutComponent },
          { path: '**', loadComponent: () => import('./shared/components/error404/error404.component').then(m => m.Error404Component) }
        ]
      },
       { path: '**', component: Error404Component }
    ]
  },

  { path: '**', component: Error404Component },
];
