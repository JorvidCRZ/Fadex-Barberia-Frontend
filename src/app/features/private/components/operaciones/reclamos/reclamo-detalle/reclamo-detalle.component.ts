import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { DateFormatPipe } from '@/app/shared/pipes/dat.pipe';
import { SolesPipe } from '@/app/shared/pipes/moneda.pipe';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { formatearTexto } from '@/app/shared/utils/formatear-text.utils.component';
import { ReclamoService } from '@/app/core/services/operaciones/reclamo.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { ReclamoResponse } from '@/app/core/models/operaciones/reclamos-model/reclamo.model';

@Component({
  selector: 'app-reclamo-detalle',
  standalone: true,
  imports: [
    ImageModule, ButtonComponent, EmptyStateComponent, PageHeaderComponent, StatusBadgeComponent,
    DateFormatPipe, SolesPipe, SafeImageUrlPipe,
  ],
  templateUrl: './reclamo-detalle.html',
})
export class ReclamoDetalleComponent implements OnInit {
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private notify = inject(NotificationService);
  private reclamoService = inject(ReclamoService);

  detalleReclamo?: ReclamoResponse;
  cargando = true;
  formatearTexto = formatearTexto;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.cargando = false; return; }
    this.obtenerDetalleReclamo(id);
  }

  volver(): void {
    this.router.navigate(['/dashboard/admin/operaciones/reclamos']);
  }

  private obtenerDetalleReclamo(id: number): void {
    this.reclamoService.obtenerReclamoPorId(id).subscribe({
      next: (resp) => {
        this.detalleReclamo = resp.data;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        this.cd.detectChanges();
        this.notify.showHttpError(err);
      },
    });
  }
}