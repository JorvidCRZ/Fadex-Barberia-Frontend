import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@/environments/environment';

export interface ClienteRiesgo {
  nombreCliente: string;
  razon: string;
  nivelRiesgo: 'alto' | 'medio' | 'bajo';
  diasSinVisita: number;
  totalVisitas: number;
}

export interface AnalisisIA {
  resumen: string;
  clientesEnRiesgo: ClienteRiesgo[];
}

@Injectable({ providedIn: 'root' })
export class AnalisisService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/analisis`;

  getPredicciones(): Observable<AnalisisIA> {
    return this.http.get<string>(
      `${this.apiUrl}/clientes-en-riesgo`,
      { responseType: 'text' as 'json' }
    ).pipe(
      map((raw: any) => {
        const jsonStr = raw.match(/\{[\s\S]*\}/)?.[0] || raw;
        return JSON.parse(jsonStr) as AnalisisIA;
      })
    );
  }
}