import { Routes } from '@angular/router';
import { InicioComponent } from './features/public/pages/inicio/inicio.component';
import { PublicLayoutComponent } from './features/public/layout/public-layout.component';

export const routes: Routes = [
  {  path: '', component: PublicLayoutComponent, children: [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent }
  ]}
  ];
