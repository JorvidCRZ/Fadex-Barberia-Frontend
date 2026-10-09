import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { ReclamoResponse } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';
import { formatearTexto } from '@/app/shared/utils/formatear-text.utils.component';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';

@Component({
  selector: 'app-reclamo-detalle',
  imports: [ButtonModule, CommonModule, StatusBadgeComponent, ImageModule, SafeImageUrlPipe],
  templateUrl: './reclamo-detalle.html',
  styleUrl: './reclamo-detalle.scss',
})
export class ReclamoDetalleComponent implements OnInit {
  private router = inject(Router);

  detalleReclamo?: ReclamoResponse;
  cargando = true;
  formatearTexto = formatearTexto;

  ngOnInit() {
    // El reclamo llega desde la lista por el estado de navegación del router.
    this.detalleReclamo = history.state?.reclamo;
    this.cargando = false;
    // Si se recarga la página el estado se pierde: se vuelve a la lista.
    if (!this.detalleReclamo) this.volver();
  }

  volver() {
    this.router.navigate(['/dashboard/admin/operaciones/reclamos']);
  }
}