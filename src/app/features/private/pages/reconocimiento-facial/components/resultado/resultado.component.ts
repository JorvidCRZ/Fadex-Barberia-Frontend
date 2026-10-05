import { CommonModule, KeyValuePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CorteCardComponent } from '../corte-card/corte-card.component';
import { CorteModalComponent } from '../corte-modal/corte-modal.component';
import { AnalisisResponse, CorteRecomendado } from '../../../../../../core/models/reconocimiento-facial/Ia.model';
import { ServicioService } from '../../../../../../core/services/catalogos/servicio.service';
import { IaService } from '../../../../../../core/services/reconocimiento-facial/reconocimiento-facial.service';
import { Servicio } from '../../../../../../core/models/catalogos/servicios.model';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, KeyValuePipe, CorteCardComponent, CorteModalComponent],
  templateUrl: './resultado.html',
  styleUrl: './resultado.scss',
})
export class ResultadoComponent implements AfterViewInit, OnInit {
  @Input()
  fotoPreview = '';

  @Input() clienteId: number = 0;

  @ViewChild('overlayCanvas')
  overlayCanvas!: ElementRef<HTMLCanvasElement>;

  @Input({ required: true })
  resultado!: AnalisisResponse;

  @ViewChild('graficoCanvas')
  graficoCanvas!: ElementRef<HTMLCanvasElement>;

  // ── Paginación de cortes recomendados ──────────────────────

  cortesPagina: CorteRecomendado[] = [];

  paginaActual = 1;

  porPagina = 10;

  totalCortes = 0;

  totalPaginas = 1;

  cargandoCortes = false;

  // ── Mapa nombre-servicio para resolver la imagen cuando el corte no trae imagen_url ──
  private mapaServiciosPorNombre = new Map<string, Servicio>();

  constructor(
    private iaService: IaService,
    private servicioService: ServicioService,
  ) {}

  ngOnInit(): void {
    // La página 1 ya viene incluida en la respuesta de /analizar,
    // así que la usamos directo sin volver a pegarle al backend.

    this.cortesPagina = this.resultado.cortes_recomendados ?? [];

    this.totalCortes = this.resultado.total_cortes ?? this.cortesPagina.length;

    this.porPagina = this.resultado.por_pagina ?? 10;

    this.totalPaginas = Math.max(1, Math.ceil(this.totalCortes / this.porPagina));

    this.cargarCatalogoServicios();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dibujarGraficoRostro();
    });
  }

  private cargarCatalogoServicios(): void {
    this.servicioService.obtenerServicioPublicos({ size: 1000 }).subscribe({
      next: (resp) => {
        const servicios = resp.data.content ?? [];
        this.mapaServiciosPorNombre = new Map(
          servicios.map((s) => [this.normalizarNombre(s.nombre), s]),
        );
        this.resolverImagenesCortes(this.cortesPagina);
      },
      error: () => {
        // Si falla, los cortes se quedan sin imagen (fallback del <img>)
      },
    });
  }

  private normalizarNombre(nombre: string | undefined | null): string {
    return (nombre ?? '').trim().toLowerCase();
  }

  private resolverImagenesCortes(cortes: CorteRecomendado[]): void {
    cortes.forEach((corte) => {
      if (!corte.imagen_url) {
        const servicio = this.mapaServiciosPorNombre.get(this.normalizarNombre(corte.nombre));
        if (servicio?.urlsMultimedia?.length) {
          corte.imagen_url = servicio.urlsMultimedia[0];
        }
      }
    });
  }

  irAPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas || pagina === this.paginaActual) {
      return;
    }

    // La página 1 ya la tenemos en memoria desde el análisis inicial
    if (pagina === 1 && this.resultado.cortes_recomendados) {
      this.paginaActual = 1;
      this.cortesPagina = this.resultado.cortes_recomendados;
      this.resolverImagenesCortes(this.cortesPagina);
      return;
    }

    this.cargandoCortes = true;

    this.iaService.obtenerCortesRecomendados(this.clienteId, pagina, this.porPagina).subscribe({
      next: (res) => {
        this.cortesPagina = res.cortes_recomendados;
        this.resolverImagenesCortes(this.cortesPagina);
        this.totalCortes = res.total_cortes;
        this.totalPaginas = res.total_paginas;
        this.paginaActual = res.pagina;
        this.cargandoCortes = false;
      },
      error: () => {
        this.cargandoCortes = false;
      },
    });
  }

  paginaAnterior(): void {
    this.irAPagina(this.paginaActual - 1);
  }

  paginaSiguiente(): void {
    this.irAPagina(this.paginaActual + 1);
  }

  private dibujarGraficoRostro(): void {
    if (!this.resultado?.puntos_grafico) return;

    const canvas = this.graficoCanvas.nativeElement;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const width = 700;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const puntos = this.resultado.puntos_grafico;
    const contorno = this.resultado.contorno_grafico ?? [];

    const padding = 30;

    const transformar = (p: { x: number; y: number }) => ({
      x: padding + p.x * (width - padding * 2),
      y: padding + p.y * (height - padding * 2),
    });

    const vertices = contorno
      .map((nombre) => puntos[nombre])
      .filter(Boolean)
      .map(transformar);

    if (vertices.length > 1) {
      ctx.beginPath();

      ctx.moveTo(vertices[0].x, vertices[0].y);

      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }

      ctx.strokeStyle = '#c8a255';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    Object.entries(puntos).forEach(([nombre, punto]) => {
      const p = transformar(punto);

      ctx.beginPath();

      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);

      ctx.fillStyle = '#c8a255';
      ctx.fill();

      ctx.font = '12px Arial';

      ctx.fillStyle = '#ffffff';

      ctx.fillText(nombre, p.x + 10, p.y - 10);
    });
  }

  corteSeleccionado: any = null;

  abrirModal(corte: any) {
    this.corteSeleccionado = corte;
  }

  cerrarModal() {
    this.corteSeleccionado = null;
  }
}
