import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'safeImageUrl',
  standalone: true,
  pure: false,
})
export class SafeImageUrlPipe implements PipeTransform {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  transform(url: string | null | undefined): string | undefined {
    if (!url || url === 'null' || url === 'undefined' || url.trim() === '') {
      return undefined;
    }

    const normalizedUrl = url.trim();

    if (/^(https?:|data:|blob:)/i.test(normalizedUrl)) {
      return normalizedUrl;
    }

    if (normalizedUrl.startsWith('/assets/') || normalizedUrl.startsWith('assets/')) {
      return normalizedUrl.startsWith('/') ? normalizedUrl : `/${normalizedUrl}`;
    }

    const base = this.apiBaseUrl.replace(/\/$/, '');
    const cleanUrl = normalizedUrl.replace(/^\/+/, '');

    if (cleanUrl.startsWith('uploads/')) {
      return `${base}/${cleanUrl}`;
    }

    if (cleanUrl.startsWith('uploads')) {
      return `${base}/${cleanUrl}`;
    }

    return `${base}/uploads/${cleanUrl}`;
  }
}

@Pipe({
  name: 'safeMultimediaUrl',
  standalone: true,
  pure: false,
})
export class SafeMultimediaUrlPipe extends SafeImageUrlPipe {}
