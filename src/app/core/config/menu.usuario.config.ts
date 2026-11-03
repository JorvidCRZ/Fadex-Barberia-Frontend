export type RolUsuario = 'admin' | 'barbero' | 'cliente';

export interface UserMenuEntry {
  label: string;
  icon: string;
  /** Ruta relativa a la raíz del rol (TokenService.getHomeByRole()). */
  route: string[];
  permission?: string;
}

export const ROL_LABEL: Record<RolUsuario, string> = {
  admin: 'Administrador',
  barbero: 'Barbero',
  cliente: 'Cliente',
};

// Entradas del minimenú de usuario. "Cerrar sesión" se agrega en el componente.
export const USER_MENU: Record<RolUsuario, UserMenuEntry[]> = {
  admin: [
    { label: 'Mi perfil', icon: 'pi pi-user', route: ['sistema', 'perfil'] },
  ],
  barbero: [
    { label: 'Mi perfil', icon: 'pi pi-user', route: ['perfil'] },
  ],
  cliente: [
    { label: 'Mi perfil', icon: 'pi pi-user', route: ['perfil'] },
  ],
};