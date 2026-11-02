import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { VentaService } from '@/app/core/services/venta/venta.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { BarberoService } from '@/app/core/services/gestion/barbero.service';

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

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, DialogModule],
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
  textoBusqueda = '';
  carrito: LineaCarrito[] = [];

  procesando = false;
  mostrarModalPago = false;

  // Cobro de reserva
  reservaIdActiva: number | null = null;
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

  // Ajusta los nombres de campo según tu modelo Producto / Cliente
  private mapearProducto(p: any): ProductoPos {
    return {
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria?.nombre ?? p.categoriaNombre ?? p.categoria ?? '',
      precio: Number(p.precio ?? p.precioVenta ?? 0),
      stock: Number(p.stock ?? 0),
      imagen: p.imagen ?? p.imagenUrl ?? '',
    };
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

  // ───────── Getters ─────────

  get productosFiltrados(): ProductoPos[] {
    const t = this.textoBusqueda.trim().toLowerCase();
    return t
      ? this.productos.filter(p =>
          p.nombre.toLowerCase().includes(t) || p.categoria.toLowerCase().includes(t))
      : this.productos;
  }

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
      clienteId: this.reservaIdActiva ? null : this.cliente,
      barberoId: esBarbero ? this.barberoIdActual : null,
      fecha: new Date(),
      tipoComprobante: this.comprobante,
      metodoPago: this.metodo,
      reservaId: this.reservaIdActiva,
      detalles,
    };

    this.procesando = true;
    this.ventaService.crearVenta(request).subscribe({
      next: () => {
        this.mostrarModalPago = false;
        this.notify.showSuccess(this.reservaIdActiva
          ? '¡Venta registrada y Reserva completada con éxito!'
          : '¡Venta registrada con éxito!');
        this.carrito = [];
        this.reservaIdActiva = null;
        this.procesando = false;
        this.regresarAlHistorial();
      },
      error: () => {
        this.mostrarModalPago = false;
        this.procesando = false;
        this.notify.showError('Ocurrió un error al procesar la venta.');
      },
    });
  }

  regresarAlHistorial(): void {
    this.router.navigate(['../ventas'], { relativeTo: this.route });
  }
}