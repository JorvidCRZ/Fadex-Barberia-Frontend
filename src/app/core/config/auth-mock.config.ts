import { LoginRequest, LoginResponse } from '../models/auth/loginResponse.model';

export type MockUserRole = 'cliente' | 'barbero' | 'admin';

export interface MockAuthUser {
  username: string;
  password: string;
  nombre: string;
  rol: MockUserRole;
  permisos: string[];
}

export const MOCK_AUTH_USERS: readonly MockAuthUser[] = [
  {
    username: 'cliente',
    password: 'cliente123',
    nombre: 'Cliente Demo',
    rol: 'cliente',
    permisos: ['VER_CATALOGO', 'CREAR_RESERVA'],
  },
  {
    username: 'barbero',
    password: 'barbero123',
    nombre: 'Barbero Demo',
    rol: 'barbero',
    permisos: [
      'DASHBOARD_READ_BARBERO',
      'CORTE_READ_ASSIGNED',
      'RESERVA_READ_ASSIGNED',
      'VENTA_READ_ASSIGNED',
    ],
  },
  {
    username: 'admin',
    password: 'admin123',
    nombre: 'Administrador Demo',
    rol: 'admin',
    permisos: [
      'DASHBOARD_READ_ADMIN',
      'RESERVA_READ_ALL',
      'RESERVA_CREATE',
      'VENTA_READ_ALL',
      'CLIENTE_READ_ALL',
      'BARBERO_READ_ALL',
      'USUARIO_READ_ALL',
      'CATEGORIA_READ',
      'SERVICIO_READ',
      'PRODUCTO_READ',
      'FIDELIZACION_READ',
      'RULETA_READ',
      'REPORTE_READ_ALL',
      'ESTADISTICA_READ_ALL',
      'CONFIGURACION_READ',
    ],
  },
];

export function findMockAuthUser(credentials: LoginRequest): MockAuthUser | undefined {
  return MOCK_AUTH_USERS.find(
    user => user.username === credentials.username && user.password === credentials.password,
  );
}

export function createMockLoginResponse(user: MockAuthUser): LoginResponse {
  const payload = {
    sub: user.username,
    username: user.username,
    fullName: user.nombre,
    roles: [`ROLE_${user.rol}`],
    permisos: user.permisos,
  };

  return {
    accessToken: createToken(payload),
    refreshToken: createToken({ sub: user.username, type: 'refresh' }),
    tokenType: 'Bearer',
    expiresIn: 3600,
    username: user.username,
    rol: user.rol,
    permisos: user.permisos,
  };
}

function createToken(payload: Record<string, unknown>): string {
  const header = { alg: 'none', typ: 'JWT' };
  return `${encodeBase64Url(header)}.${encodeBase64Url(payload)}.mock-signature`;
}

function encodeBase64Url(value: object): string {
  return btoa(JSON.stringify(value))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}