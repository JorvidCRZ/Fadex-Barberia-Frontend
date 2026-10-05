import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ProductoNavigable } from '../../models/catalogos/navigation.model';
import { CategoriaPublica } from '../../models/catalogos/navigation.model';

@Injectable({
    providedIn: 'root'
})

export class NavigationService {
    private readonly router = inject(Router);

    buildProducto(producto: ProductoNavigable): (string | number)[] {
        return ['/productos'];
    }

    navegarProducto(producto: ProductoNavigable): Promise<boolean> {
        return this.router.navigate(['/productos'], {
            queryParams: { productoId: producto.id },
        });
    }

    buildCategoria(_categoria: CategoriaPublica): (string | number)[] {
        return ['/productos'];
    }

    buildMenu(menu: MenuItem): (string | number)[] {
        if (Array.isArray(menu.routerLink)) {
            return menu.routerLink as (string | number)[];
        }

        if (typeof menu.routerLink === 'string' && menu.routerLink.length > 0) {
            return menu.routerLink.split('/').filter(Boolean);
        }

        return ['/productos'];
    }
}