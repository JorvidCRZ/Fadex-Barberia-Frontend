import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ReclamoService } from '@/app/core/services/operaciones/reclamo.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
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
  private route = inject(ActivatedRoute);
  private reclamoService = inject(ReclamoService);
  private notify = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  detalleReclamo?: ReclamoResponse;
  cargando = true;
  formatearTexto = formatearTexto;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.notify.showError('El identificador del reclamo no es válido.');
      this.volver();
      return;
    }

    this.reclamoService.obtenerReclamoPorId(id).subscribe({
      next: (resp) => {
        this.detalleReclamo = resp.data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.notify.showHttpError(err);
        this.cdr.detectChanges();
      },
    });
  }

  volver() {
    this.router.navigate(['/dashboard/admin/operaciones/reclamos']);
  }
}