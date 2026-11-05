export const PUBLIC_PAGES = [
  { label: 'Inicio', path: '/inicio' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Tienda', path: '/productos' },
  // { label: 'Reclamos', path: '/reclamos' },
  // { label: 'Reservas', path: '/reservas' }
];

export const PUBLIC_AUTH_ENDPOINTS = [
  '/auth/login',
  '/auth/refresh',
  '/auth/google',
  '/auth/qr-login',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verificar-token',
];

export const ROL_ID = {
  ADMIN: 1,
  BARBERO: 2,
} as const;

export const ROL_NAME = {
  ADMIN: 'ROLE_admin',
  BARBERO: 'ROLE_barbero',
  CLIENTE: 'ROLE_cliente',
} as const;
