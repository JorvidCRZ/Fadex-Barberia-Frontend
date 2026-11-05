import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/auth/token.service';
import { AuthService } from '../services/auth/auth.service';
import { PUBLIC_AUTH_ENDPOINTS } from '../config/sites.config';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  const isAuthEndpoint = PUBLIC_AUTH_ENDPOINTS.some(url => req.url.includes(url));

  let authReq = req;
  if (!isAuthEndpoint) {
    const token = tokenService.getAccessToken();
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      if (!tokenService.getRefreshToken()) {
        tokenService.clearTokens();
        return throwError(() => error);
      }

      return authService.refreshToken().pipe(
        switchMap(response => {
          const { accessToken, refreshToken } = response.data;

          if (refreshToken) {
            tokenService.saveRefreshToken(refreshToken);
          }
          tokenService.saveAccessToken(accessToken);

          return next(
            req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
          );
        }),
        catchError(refreshError => {
          tokenService.clearTokens();
          return throwError(() => refreshError);
        })
      );
    })
  );
};