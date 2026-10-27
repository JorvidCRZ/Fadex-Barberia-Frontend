import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../../../environments/environment';
import { RefreshRequest } from '../../models/auth/refreshRequest.model';
import { LoginRequest, LoginResponse } from '../../models/auth/loginResponse.model';
import { ApiResponse } from '../../models/common/index.model';
import { ClienteRegister } from '../../models/auth/usuario/cliente-register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = environment.apiUrl + '/auth';
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private saveSession() {
    return tap((data: LoginResponse) => {
      this.tokenService.saveRefreshToken(data.refreshToken);
      this.tokenService.saveAccessToken(data.accessToken);
    });
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API}/login`, data).pipe(map((res) => res.data),this.saveSession(),);
  }

  loginWithGoogle(idToken: string): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API}/google`, { idToken }).pipe(map((res) => res.data),this.saveSession(),);
  }

  loginWithQr(qrToken: string, pin: string): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API}/qr-login`, { qrToken, pin }).pipe(map((res) => res.data),this.saveSession(),);
  }

  refreshToken(): Observable<ApiResponse<LoginResponse>> {
    const body: RefreshRequest = { refreshToken: this.tokenService.getRefreshToken()! };
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API}/refresh`, body);
  }

  logout() {
    this.tokenService.clearTokens();
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.API}/forgot-password`, { email });
  }

  resetPassword(token: string, nuevaPassword: string): Observable<void> {
    return this.http.post<void>(`${this.API}/reset-password`, { token, nuevaPassword });
  }

  cambiarPassword(passwordActual: string, passwordNueva: string): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.API}/change-password`, { passwordActual, passwordNueva, });
  }

  register(data: ClienteRegister): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.API}/usuarios/cliente`, data);
  }

  verificarTokenReset(token: string): Observable<void> {
    return this.http.get<void>(`${this.API}/verificar-token?token=${token}`);
  }
}
