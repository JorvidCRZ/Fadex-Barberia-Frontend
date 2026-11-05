import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { VentaService } from '@/app/core/services/venta/venta.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';
import { Venta } from '@/app/core/models/ventas/venta.model';
import { ProductoMultimedia, TipoMultimedia } from '@/app/core/models/catalogos/productos.model';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { MonedaPipe } from '@/app/shared/pipes/moneda.pipe';
import { SafeImageUrlPipe } from '@/app/shared/pipes/safe-image-url.pipe';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';

interface ProductoPos {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen: string; // URL opcional; si está vacío se muestra un ícono
}

interface LineaCarrito {
  producto: ProductoPos;
  cantidad: number;
  tipo: 'PRODUCTO' | 'SERVICIO';
}

interface Opcion<T = string> {
  label: string;
  value: T;
}

/** Minúsculas y sin tildes, para que "crema" encuentre "Crema" y "Pomada" */
const normalizar = (t: string): string =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    FormsModule,
    SelectModule,
    TableModule,
    MonedaPipe,
    SafeImageUrlPipe,
    ButtonComponent,
    ModalComponent,
    PageHeaderComponent,
    SearchBarComponent,
  ],
  templateUrl: './pos.html',
})
export class PosComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notify = inject(NotificationService);
  private productoService = inject(ProductoService);
  private clienteService = inject(ClienteService);
  private ventaService = inject(VentaService);
  private barberoService = inject(BarberoService);
  private cdr = inject(ChangeDetectorRef);

  // Datos del backend
  productos: ProductoPos[] = [];
  clientes: Opcion<number>[] = [];

  comprobantes: Opcion[] = [
    { label: 'Boleta', value: 'BOLETA' },
    { label: 'Factura', value: 'FACTURA' },
  ];
  metodos: Opcion[] = [
    { label: 'Efectivo', value: 'EFECTIVO' },
    { label: 'Yape', value: 'YAPE' },
    { label: 'Plin', value: 'PLIN' },
    { label: 'Tarjeta', value: 'TARJETA' },
    { label: 'Transferencia', value: 'TRANSFERENCIA' },
  ];

  // Selecciones (guardan el value, no el label)
  cliente: number | null = null;
  comprobante = 'BOLETA';
  metodo = 'EFECTIVO';
  carrito: LineaCarrito[] = [];

  // Catálogo: búsqueda en vivo y paginación en el cliente
  textoBusqueda = '';
  readonly rowsProductos = 8;
  firstProductos = 0;

  procesando = false;
  mostrarModalPago = false;

  // Cobro de reserva
  reservaIdActiva: number | null = null;
  clienteReservaId: number | null = null;
  nombreClienteReserva = '';
  private barberoIdActual: number | null = null;

  ngOnInit(): void {
    this.cargarReservaSiExiste();
    this.cargarCatalogos();
    this.cargarBarberoActual();
  }

  // ───────── Carga de datos ─────────

  private cargarCatalogos(): void {
    this.productoService.obtenerProductosActivos().subscribe({
      next: (res: any) => {
        const lista: any[] = this.extraerLista(res);
        this.productos = lista.map(p => this.mapearProducto(p));
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando productos para POS:', err);
        this.notify.showError('No se pudieron cargar los productos.');
        this.cdr.detectChanges();
      },
    });

    this.clienteService.listar(0, 1000).subscribe({
      next: (res: any) => {
        const lista: any[] = this.extraerLista(res);
        this.clientes = lista.map(c => ({
          label: this.nombreCliente(c),
          value: c.clienteId ?? c.id,
        }));
        if (this.clienteReservaId !== null) {
          this.cliente = this.clienteReservaId;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando clientes para POS:', err);
        this.notify.showError('No se pudieron cargar los clientes.');
        this.cdr.detectChanges();
      },
    });
  }

  private cargarBarberoActual(): void {
    if (!this.router.url.includes('/dashboard/barbero/')) return;

    this.barberoService.getPerfil().subscribe({
      next: (res) => {
        this.barberoIdActual = res.data?.barberoId ?? null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando barbero actual:', err);
        this.notify.showError('No se pudo identificar al barbero actual.');
        this.cdr.detectChanges();
      },
    });
  }

  private extraerLista(res: any): any[] {
    const datos = res?.data;
    if (Array.isArray(datos)) return datos;
    if (Array.isArray(datos?.content)) return datos.content;
    return [];
  }

  private mapearProducto(p: any): ProductoPos {
    return {
      id: p.id,
      nombre: p.nombre,
      categoria: p.nombreCategoria ?? p.categoria?.nombre ?? p.categoriaNombre ?? '',
      precio: Number(p.precio ?? p.precioVenta ?? 0),
      stock: Number(p.stock ?? 0),
      imagen: this.imagenPrincipal(p),
    };
  }

  /** Primera imagen por ordenDisplay; si no hay `multimedia`, la primera de `urlsMultimedia`. */
  private imagenPrincipal(p: any): string {
    const imagenes: ProductoMultimedia[] = (p.multimedia ?? [])
      .filter((m: ProductoMultimedia) => m.tipo === TipoMultimedia.IMAGEN)
      .sort((a: ProductoMultimedia, b: ProductoMultimedia) => a.ordenDisplay - b.ordenDisplay);

    return imagenes[0]?.url ?? p.urlsMultimedia?.[0] ?? '';
  }

  private nombreCliente(c: any): string {
    const nombrePersona = c.persona
      ? [c.persona.nombre, c.persona.apellido].filter(Boolean).join(' ')
      : [c.nombre ?? c.nombres, c.apellido ?? c.apellidos].filter(Boolean).join(' ');

    return c.nombreCompleto || nombrePersona || `Cliente ${c.clienteId ?? c.id}`;
  }

  private cargarReservaSiExiste(): void {
    const reserva = history.state?.reservaCobrar;
    if (!reserva) return;

    this.reservaIdActiva = reserva.id || reserva.reservaId || reserva.idReserva;
    const clienteId = Number(reserva.clienteId ?? reserva.idCliente);
    if (Number.isInteger(clienteId) && clienteId > 0) {
      this.clienteReservaId = clienteId;
      this.cliente = clienteId;
    }
    this.nombreClienteReserva = reserva.clienteNombre || reserva.nombreCliente || 'Cliente';

    const cantidad = reserva.cantidad || 1;
    const servicioId = reserva.servicioId || 1;

    this.carrito = [{
      tipo: 'SERVICIO',
      cantidad,
      producto: {
        id: servicioId,
        nombre: reserva.servicio || 'Servicio de Barbería',
        categoria: 'Servicio',
        precio: Number(reserva.total) / cantidad,
        stock: cantidad,
        imagen: '',
      },
    }];

    this.notify.showSuccess(`Reserva de ${this.nombreClienteReserva} cargada correctamente.`);
  }

  // ───────── Catálogo: búsqueda y paginación ─────────

  get productosFiltrados(): ProductoPos[] {
    const t = normalizar(this.textoBusqueda);
    return t
      ? this.productos.filter(p =>
        normalizar(p.nombre).includes(t) || normalizar(p.categoria).includes(t))
      : this.productos;
  }

  /** Al buscar (Enter o botón "Buscar"), vuelve a la primera página */
  onBuscar(): void {
    this.firstProductos = 0;
  }

  onPageProductos(event: { first?: number }): void {
    this.firstProductos = event.first ?? 0;
  }

  // ───────── Getters ─────────

  get totalVenta(): number {
    return this.carrito.reduce((acc, l) => acc + l.producto.precio * l.cantidad, 0);
  }
  get subtotal(): number { return this.totalVenta / 1.18; }
  get igv(): number { return this.totalVenta - this.subtotal; }

  // ───────── Carrito ─────────

  private limite(p: ProductoPos): number { return Math.min(p.stock, 10); }

  agregarProducto(p: ProductoPos): void {
    if (p.stock <= 0) {
      this.notify.showWarn(`${p.nombre} no tiene stock disponible.`);
      return;
    }
    const linea = this.carrito.find(l => l.tipo === 'PRODUCTO' && l.producto.id === p.id);
    if (linea) {
      this.cambiarCantidad(linea, linea.cantidad + 1);
    } else {
      this.carrito = [...this.carrito, { producto: p, cantidad: 1, tipo: 'PRODUCTO' }];
      this.notify.showSuccess(`Se agregó ${p.nombre} al carrito.`);
    }
  }

  cambiarCantidad(linea: LineaCarrito, nueva: number): void {
    if (nueva === null || nueva === undefined) return;

    // El servicio de una reserva no se puede modificar ni quitar
    if (this.reservaIdActiva && linea.tipo === 'SERVICIO') {
      this.notify.showWarn(nueva < 1
        ? 'No puedes quitar el servicio base de la reserva.'
        : 'La cantidad del servicio está sujeta a la reserva original.');
      return;
    }

    if (nueva < 1) {
      this.carrito = this.carrito.filter(l => l !== linea);
      return;
    }

    const max = this.limite(linea.producto);
    if (nueva > max) {
      this.notify.showWarn(`Límite alcanzado: máximo ${max} unidades.`);
      linea.cantidad = max;
      return;
    }
    linea.cantidad = nueva;
  }

  // ───────── Cobro ─────────

  procesarCobro(): void {
    if (this.procesando) return;

    if (!this.reservaIdActiva && this.cliente === null) {
      this.notify.showWarn('Seleccione un cliente para continuar.');
      return;
    }
    if (!this.comprobante || !this.metodo) {
      this.notify.showWarn('Por favor, rellene todos los campos obligatorios.');
      return;
    }
    if (this.carrito.length === 0) {
      this.notify.showWarn('Agregue al menos un ítem al carrito.');
      return;
    }

    this.mostrarModalPago = true;
  }

  confirmarYProcesarCobro(): void {
    if (this.procesando) return;

    // En cobro de reserva el servicio ya lo gestiona el backend vía reservaId;
    // solo se envían los productos adicionales.
    const detalles = this.carrito
      .filter(l => !this.reservaIdActiva || l.tipo === 'PRODUCTO')
      .map(l => ({
        productoId: l.tipo === 'PRODUCTO' ? l.producto.id : null,
        servicioId: l.tipo === 'SERVICIO' ? l.producto.id : null,
        cantidad: l.cantidad,
        precioUnitario: l.producto.precio,
      }));

    const esBarbero = this.router.url.includes('/dashboard/barbero/');
    if (esBarbero && this.barberoIdActual === null) {
      this.notify.showWarn('Espera a que se cargue el perfil del barbero.');
      return;
    }

    const request: any = {
      clienteId: this.cliente,
      barberoId: esBarbero ? this.barberoIdActual : null,
      fecha: new Date(),
      tipoComprobante: this.comprobante,
      metodoPago: this.metodo,
      reservaId: this.reservaIdActiva,
      subtotal: this.subtotal,
      igv: this.igv,
      total: this.totalVenta,
      detalles,
    };

    this.procesando = true;
    this.ventaService.crearVenta(request).subscribe({
      next: (respuesta) => {
        this.mostrarModalPago = false;
        this.notify.showSuccess(this.reservaIdActiva
          ? '¡Venta registrada y Reserva completada con éxito!'
          : '¡Venta registrada con éxito!');
        const ventaCreada = respuesta.data;
        this.carrito = [];
        this.reservaIdActiva = null;
        this.clienteReservaId = null;
        this.procesando = false;

        if (ventaCreada?.ventaId) {
          this.descargarComprobanteAutomaticamente(ventaCreada);
        } else {
          this.notify.showError('La venta se registró, pero no se recibió su comprobante.');
          this.regresarAlHistorial();
        }
      },
      error: (err) => {
        console.error('Error procesando cobro:', err);
        this.mostrarModalPago = false;
        this.procesando = false;
        this.notify.showError('Ocurrió un error al procesar la venta.');
      },
    });
  }

  private descargarComprobanteAutomaticamente(venta: Venta): void {
    this.ventaService.descargarComprobantePdf(venta.ventaId).subscribe({
      next: (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = this.nombreArchivoComprobante(venta);
        enlace.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        this.regresarAlHistorial();
      },
      error: (err: unknown) => {
        console.error('Error descargando comprobante después del cobro:', err);
        this.notify.showError('La venta se registró, pero no se pudo descargar el comprobante.');
        this.regresarAlHistorial();
      }
    });
  }

  private nombreArchivoComprobante(venta: Venta): string {
    const tipo = venta.tipoComprobante?.toLowerCase() ?? 'comprobante';
    const numero = venta.serieComprobante && venta.numeroComprobante
      ? `${venta.serieComprobante}-${venta.numeroComprobante}`
      : venta.numeroCorrelativo || String(venta.ventaId);
    return `${tipo}-${numero}.pdf`;
  }

  regresarAlHistorial(): void {
    this.router.navigate(['../ventas'], { relativeTo: this.route });
  }
}