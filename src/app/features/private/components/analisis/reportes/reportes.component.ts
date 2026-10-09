import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Periodo = 'semana' | 'anterior' | 'mes';
type TipoReporte = 'ventas' | 'servicios' | 'clientes' | 'inventario';

interface ReporteItem {
  icon: string; // clase PrimeIcons (servicios usa SVG propio en el HTML)
  titulo: string;
  descripcion: string;
  tipo: TipoReporte;
}

interface KpiResumen {
  label: string;
  value: string;
  delta: string;
  icon: string;
}

interface DatosReporte {
  cabeceras: string[];
  filas: (string | number)[][];
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss'
})
export class ReportesComponent implements OnDestroy {
  periodos: { value: Periodo; label: string }[] = [
    { value: 'semana', label: 'Esta semana' },
    { value: 'anterior', label: 'Semana anterior' },
    { value: 'mes', label: 'Este mes' }
  ];

  periodo: Periodo = 'semana';

  exportando = '';
  error = '';

  private timer?: ReturnType<typeof setTimeout>;

  reportes: ReporteItem[] = [
    { icon: 'pi-receipt', titulo: 'Ventas por periodo', descripcion: 'Detalle de ventas, métodos de pago e IGV.', tipo: 'ventas' },
    { icon: 'pi-sparkles', titulo: 'Servicios realizados', descripcion: 'Servicios, barberos y horas de mayor demanda.', tipo: 'servicios' },
    { icon: 'pi-users', titulo: 'Clientes y fidelización', descripcion: 'Altas, recurrencia, puntos y recompensas.', tipo: 'clientes' },
    { icon: 'pi-box', titulo: 'Inventario', descripcion: 'Stock, productos con rotación y alertas.', tipo: 'inventario' }
  ];

  // ───────────── DATOS EN MEMORIA ─────────────
  private readonly resumenPorPeriodo: Record<Periodo, KpiResumen[]> = {
    semana: [
      { label: 'Ventas', value: 'S/ 4,286', delta: '+8.6% vs. semana anterior', icon: 'pi-dollar' },
      { label: 'Servicios', value: '82', delta: '+6 servicios', icon: '' },
      { label: 'Nuevos clientes', value: '14', delta: '+3 clientes', icon: 'pi-user-plus' },
      { label: 'Ticket promedio', value: 'S/ 52.27', delta: '+2.1%', icon: 'pi-chart-line' }
    ],
    anterior: [
      { label: 'Ventas', value: 'S/ 3,946', delta: '+4.2% vs. semana anterior', icon: 'pi-dollar' },
      { label: 'Servicios', value: '76', delta: '+2 servicios', icon: '' },
      { label: 'Nuevos clientes', value: '11', delta: '+1 clientes', icon: 'pi-user-plus' },
      { label: 'Ticket promedio', value: 'S/ 51.92', delta: '+1.3%', icon: 'pi-chart-line' }
    ],
    mes: [
      { label: 'Ventas', value: 'S/ 18,460', delta: '+9.8% vs. mes anterior', icon: 'pi-dollar' },
      { label: 'Servicios', value: '352', delta: '+21 servicios', icon: '' },
      { label: 'Nuevos clientes', value: '58', delta: '+9 clientes', icon: 'pi-user-plus' },
      { label: 'Ticket promedio', value: 'S/ 52.44', delta: '+2.6%', icon: 'pi-chart-line' }
    ]
  };

  private readonly datosReportes: Record<TipoReporte, DatosReporte> = {
    ventas: {
      cabeceras: ['Fecha', 'Cliente', 'Servicio', 'Método de pago', 'Subtotal', 'IGV', 'Total'],
      filas: [
        ['2026-10-01', 'Carlos Pérez', 'Corte + barba', 'Yape', 50.85, 9.15, 60.0],
        ['2026-10-02', 'Luis Ramírez', 'Corte clásico', 'Efectivo', 29.66, 5.34, 35.0],
        ['2026-10-03', 'Miguel Torres', 'Perfilado de barba', 'Tarjeta', 21.19, 3.81, 25.0],
        ['2026-10-04', 'Jorge Salazar', 'Corte + cejas', 'Plin', 38.14, 6.86, 45.0],
        ['2026-10-05', 'Diego Vargas', 'Corte premium', 'Yape', 63.56, 11.44, 75.0]
      ]
    },
    servicios: {
      cabeceras: ['Servicio', 'Barbero', 'Cantidad', 'Hora de mayor demanda'],
      filas: [
        ['Corte clásico', 'Renzo Castillo', 28, '18:00'],
        ['Corte + barba', 'Álvaro Mendoza', 24, '17:00'],
        ['Perfilado de barba', 'José Luis Ramos', 17, '19:00'],
        ['Corte premium', 'Bruno Espinoza', 13, '16:00']
      ]
    },
    clientes: {
      cabeceras: ['Cliente', 'Alta', 'Visitas', 'Puntos', 'Recompensa'],
      filas: [
        ['Carlos Pérez', '2026-09-12', 6, 180, 'Corte gratis'],
        ['Luis Ramírez', '2026-09-20', 4, 120, '—'],
        ['Miguel Torres', '2026-10-01', 1, 30, '—'],
        ['Jorge Salazar', '2026-10-03', 2, 60, '—']
      ]
    },
    inventario: {
      cabeceras: ['Producto', 'Stock', 'Rotación', 'Alerta'],
      filas: [
        ['Pomada mate', 14, 'Alta', 'OK'],
        ['Aceite para barba', 4, 'Media', 'Stock bajo'],
        ['Shampoo mentolado', 22, 'Media', 'OK'],
        ['Cera modeladora', 3, 'Alta', 'Stock bajo']
      ]
    }
  };

  get resumen(): KpiResumen[] {
    return this.resumenPorPeriodo[this.periodo];
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  onPeriodoChange(valor: Periodo): void {
    this.periodo = valor;
  }

  // ───────────── EXPORTACIÓN LOCAL ─────────────
  exportarPDF(tipo: TipoReporte): void {
    this.iniciarExportacion(`${tipo}-pdf`, () => {
      const d = this.datosReportes[tipo];
      const titulo = this.reportes.find(r => r.tipo === tipo)?.titulo ?? tipo;

      const thead = d.cabeceras.map(c => `<th>${c}</th>`).join('');
      const tbody = d.filas
        .map(f => `<tr>${f.map(c => `<td>${c}</td>`).join('')}</tr>`)
        .join('');

      const win = window.open('', '_blank', 'width=900,height=700');
      if (!win) {
        this.error = 'El navegador bloqueó la ventana. Permite las ventanas emergentes.';
        return;
      }

      win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${titulo}</title>
        <style>
          body{font-family:Arial,sans-serif;padding:24px;color:#111}
          h1{font-size:20px;margin:0 0 4px}
          p{margin:0 0 16px;color:#666;font-size:12px}
          table{width:100%;border-collapse:collapse;font-size:12px}
          th{background:#d4af37;color:#111;text-align:left;padding:8px}
          td{padding:8px;border-bottom:1px solid #ddd}
        </style></head><body>
        <h1>${titulo}</h1>
        <p>${this.periodos.find(p => p.value === this.periodo)?.label}</p>
        <table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
        <script>window.onload=function(){window.print()}<\/script>
        </body></html>`);
      win.document.close();
    });
  }

  exportarExcel(tipo: TipoReporte): void {
    this.iniciarExportacion(`${tipo}-excel`, () => {
      const d = this.datosReportes[tipo];
      const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
      const csv = [d.cabeceras, ...d.filas].map(f => f.map(esc).join(';')).join('\r\n');

      // BOM para que Excel respete tildes y ñ
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tipo}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  private iniciarExportacion(clave: string, accion: () => void): void {
    this.error = '';
    this.exportando = clave;

    this.timer = setTimeout(() => {
      try {
        accion();
      } catch {
        this.error = 'No se pudo generar el reporte.';
      }
      this.exportando = '';
    }, 600);
  }
}