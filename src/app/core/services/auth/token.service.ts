import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { ROL_NAME } from '../../config/sites.config'; // ajusta la ruta

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  readonly isAuthenticated = signal(!!this.getAccessToken());
  private permisosSubject = new BehaviorSubject<string[]>(this.getPermisos());
  permisos$ = this.permisosSubject.asObservable();

  constructor() {
    // Sincroniza el estado cuando otra pestaña inicia o cierra sesión
    window.addEventListener('storage', (e) => {
      if (e.key === this.ACCESS_TOKEN) {
        this.isAuthenticated.set(!!e.newValue);
        this.permisosSubject.next(this.getPermisos());
      }
    });
  }

  saveAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token);
    this.isAuthenticated.set(true);
    this.permisosSubject.next(this.getPermisos());
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  clearTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.isAuthenticated.set(false);
    this.permisosSubject.next([]);
  }

  isLogged(): boolean {
    const decoded = this.getDecodedToken();
    if (!decoded) return false;

    // Si el token trae exp y ya venció, solo es válido si hay refresh token para renovarlo
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return !!this.getRefreshToken();
    }
    return true;
  }

  getDecodedToken(): any | null {
    try {
      const token = this.getAccessToken();
      if (!token || token.split('.').length !== 3) {
        return null;
      }
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  /**
   * Devuelve el id del usuario/cliente contenido en el payload del JWT.
   * Busca varias claves comunes: `clienteId`, `userId`, `id`, `sub`.
   */
  getUserId(): number | string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return decoded.clienteId ?? decoded.userId ?? decoded.id ?? decoded.sub ?? null;
  }

  getRoles(): string[] {
    const roles = this.getDecodedToken()?.roles;
    return Array.isArray(roles) ? roles : roles ? [roles] : [];
  }

  getPermisos(): string[] {
    const permisos = this.getDecodedToken()?.permisos;
    return Array.isArray(permisos) ? permisos : [];
  }

  getUserDisplayName(): string {
    const decoded = this.getDecodedToken();
    if (!decoded) return '';
    return decoded.fullName || decoded.nombreCompleto || decoded.name || decoded.sub || '';
  }

  getHomeByRole(): string {
    const roles = this.getRoles();

    if (roles.includes(ROL_NAME.ADMIN)) return '/dashboard/admin';
    if (roles.includes(ROL_NAME.BARBERO)) return '/dashboard/barbero';
    if (roles.includes(ROL_NAME.CLIENTE)) return '/mi-cuenta';

    return '/login';
  }

  getPrimaryRole(): string {
    const roles = this.getRoles();

    if (roles.includes(ROL_NAME.ADMIN)) return 'admin';
    if (roles.includes(ROL_NAME.BARBERO)) return 'barbero';
    if (roles.includes(ROL_NAME.CLIENTE)) return 'cliente';

    return '';
  }
}