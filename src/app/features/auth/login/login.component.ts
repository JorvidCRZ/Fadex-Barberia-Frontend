import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TokenService } from '../../../core/services/auth/token.service';
import { campoInvalido } from '../../../shared/utils/form-utils.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { NotificationService } from '../../../core/services/common/notification.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component, inject, signal, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

export interface GoogleCredentialResponse {
  credential: string;
  clientId: string;
  select_by: string;
}

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, LogoComponent, 
    PasswordModule, MessageModule, RouterModule, CommonModule, ButtonComponent
  ],
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('videoElement')
  videoElement!: ElementRef<HTMLVideoElement>;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private notify = inject(NotificationService);

  // ── Login normal ──────────────────────────────
  formularioLogin!: FormGroup;
  loading = signal(false);
  formSubmitted = false;
  campoInvalido = (campo: string) => campoInvalido(this.formularioLogin, campo, this.formSubmitted);

  // ── QR ───────────────────────────────────────
  qrScanned = signal(false);
  scannerEnabled = signal(false);
  loadingQr = signal(false);
  pin = signal('');
  pinError = signal('');
  private qrToken = '';
  private stream: MediaStream | null = null;

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.initGoogleSignIn();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  initForm() {
    this.formularioLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[^@]+$/)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      remember: [false]
    });
  }

  // ── Login normal ──────────────────────────────
  login() {
    this.formSubmitted = true;
    if (this.formularioLogin.invalid) {
      this.notify.showError('Completa correctamente el formulario');
      return;
    }

    const { username, password } = this.formularioLogin.value;

    this.loading.set(true);
    this.authService.login({ username, password })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Bienvenido al sistema');
          this.redirectUser();
        },
        error: (err) => {
          this.notify.showHttpError(err, 'Error de autenticación');
        }
      });
  }

  // ── Google ────────────────────────────────────
  initGoogleSignIn() {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => this.renderGoogleButton();
      document.head.appendChild(script);
    } else {
      this.renderGoogleButton();
    }
  }

  renderGoogleButton() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleGoogleCredentialResponse.bind(this)
    });
    const googleBtnContainer = document.getElementById('google-button');
    if (googleBtnContainer) {
      google.accounts.id.renderButton(
        googleBtnContainer,
        { theme: 'filled_black', size: 'large', shape: 'rectangular', width: 400 }
      );
    }
  }

  handleGoogleCredentialResponse(response: GoogleCredentialResponse) {
    this.loading.set(true);
    this.authService.loginWithGoogle(response.credential)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Bienvenido al sistema con Google');
          this.redirectUser();
        },
        error: (err) => {
          this.notify.showHttpError(err, 'Error de autenticación con Google');
        }
      });
  }

  // ── QR Scanner ────────────────────────────────
  async activarEscaner() {
    this.cancelarQr();
    this.scannerEnabled.set(true);

    // Espera a que Angular pinte el <video> dentro del @if
    setTimeout(async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const device = devices.find(d => d.kind === 'videoinput');

        if (!device) {
          this.notify.showError('No se encontró ninguna cámara');
          this.scannerEnabled.set(false);
          return;
        }

        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: device.deviceId }
        });

        this.videoElement.nativeElement.srcObject = this.stream;
        await this.videoElement.nativeElement.play();

        this.scanQrFromVideo();
      } catch (err) {
        console.error(err);
        this.scannerEnabled.set(false);
        this.notify.showError('No se pudo iniciar la cámara. Usa HTTPS o revisa permisos.');
      }
    }, 300);
  }

  private async scanQrFromVideo() {
    const { BrowserMultiFormatReader } = await import('@zxing/browser');
    const reader = new BrowserMultiFormatReader();

    const tick = () => {
      if (!this.scannerEnabled() || this.qrScanned()) return;

      try {
        const canvas = this.getCanvasFromVideo();
        if (canvas) {
          const result = reader.decodeFromCanvas(canvas);
          if (result) {
            this.onQrScanned(result.getText());
            return;
          }
        }
      } catch (_) { /* no se encontró QR en este frame */ }

      setTimeout(tick, 200);
    };

    tick();
  }

  private getCanvasFromVideo(): HTMLCanvasElement | null {
    const video = this.videoElement?.nativeElement;
    if (!video || !video.videoWidth) return null;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);
    return canvas;
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.scannerEnabled.set(false);
  }

  onQrScanned(result: string) {
    if (!result || this.qrScanned()) return;
    this.qrToken = result;
    this.qrScanned.set(true);
    this.stopCamera();
  }

  loginConQr() {
    if (!this.pin() || this.pin().length < 4) {
      this.pinError.set('Ingresa tu PIN de 4 a 6 dígitos');
      return;
    }

    this.loadingQr.set(true);
    this.pinError.set('');
    this.authService.loginWithQr(this.qrToken, this.pin())
      .pipe(finalize(() => this.loadingQr.set(false)))
      .subscribe({
        next: () => {
          this.notify.showSuccess('Bienvenido al sistema');
          this.redirectUser();
        },
        error: (err) => {
          this.pinError.set(err?.error?.message || 'QR o PIN incorrecto');
          this.pin.set('');
          this.qrScanned.set(false);
          this.qrToken = '';
        }
      });
  }

  cancelarQr() {
    this.stopCamera();
    this.qrScanned.set(false);
    this.qrToken = '';
    this.pin.set('');
    this.pinError.set('');
  }

  private redirectUser() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    const home = this.tokenService.getHomeByRole();
    this.router.navigateByUrl(returnUrl || home, { replaceUrl: true });
  }
}