import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProductoService } from '@/app/core/services/catalogos/producto.service';
import { ClienteService } from '@/app/core/services/gestion/cliente.service';
import { VentaService } from '@/app/core/services/venta/venta.service';
import { CarritoLocalService, ItemCarrito } from '@/app/core/services/venta/carrito-local.service';
import { NotificationService } from '@/app/core/services/common/notification.service';
import { TokenService } from '@/app/core/services/auth/token.service';
import { Producto } from '@/app/core/models/catalogos/productos.model';
import { Cliente } from '@/app/core/models/gestion/cliente/cliente.model';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    CardModule, ButtonModule, SelectModule, InputNumberModule, InputTextModule,
    DialogModule
  ],
  templateUrl: './pos.html',
  styleUrls: ['./pos.css']
})
export class PosComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private clienteService = inject(ClienteService);
  private ventaService = inject(VentaService);
  private carritoService = inject(CarritoLocalService);
  private notify = inject(NotificationService);
  private tokenService = inject(TokenService);

  productos: Producto[] = [];
  clientes: Cliente[] = [];
  itemsCarrito: ItemCarrito[] = [];
  totalVenta: number = 0;
  private subs: Subscription = new Subscription();
  ventaForm: FormGroup;
  tiposComprobante = [
    { label: 'Boleta', value: 'BOLETA' },
    { label: 'Factura', value: 'FACTURA' }
  ];

  metodosPago = [
    { label: 'Efectivo', value: 'EFECTIVO' },
    { label: 'Yape', value: 'YAPE' },
    { label: 'Plin', value: 'PLIN' },
    { label: 'Tarjeta', value: 'TARJETA' },
    { label: 'Transferencia', value: 'TRANSFERENCIA' }
  ];

  textoBusquedaProducto = '';
  mostrarModalPago = false;
  reservaIdActiva: number | null = null;
  nombreClienteReserva: string = '';

  constructor() {
    this.ventaForm = this.fb.group({
      clienteId: [null], 
      tipoComprobante: ['BOLETA', Validators.required],
      metodoPago: ['EFECTIVO', Validators.required]
    });
  }

  ngOnInit(): void {
    const state = history.state;
    if (state && state.reservaCobrar) {
      const reserva = state.reservaCobrar;
      
      this.reservaIdActiva = reserva.id || reserva.reservaId || reserva.idReserva;
      this.nombreClienteReserva = reserva.clienteNombre || reserva.nombreCliente || 'Cliente';

      this.ventaForm.get('clienteId')?.disable();

      const cantidadReserva = reserva.cantidad || 1;
      this.carritoService.agregarServicio({
        servicioId: reserva.servicioId || 1,
        nombre: reserva.servicio || 'Servicio de Barbería',
        precio: Number(reserva.total) / cantidadReserva,
        duracion: 0
      } as any);

      setTimeout(() => {
        this.carritoService.actualizarCantidad(reserva.servicioId || 1, 'SERVICIO', cantidadReserva);
      }, 50);

      this.notify.showSuccess(`Reserva de ${this.nombreClienteReserva} cargada correctamente.`);
    }

    this.subs.add(this.carritoService.items$.subscribe(items => this.itemsCarrito = items));
    this.subs.add(this.carritoService.total$.subscribe(total => this.totalVenta = total));

    this.cargarCatalogos();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.carritoService.limpiarCarrito();
  }

  cargarCatalogos() {
    this.productoService.obtenerProductosActivos().subscribe({
      next: (res: any) => this.productos = res.data.content || res.data || [],
      error: () => this.notify.showError('Error al cargar productos')
    });

    this.clienteService.listar(0, 1000).subscribe({
      next: (res: any) => this.clientes = res.data.content || res.data || [],
      error: () => this.notify.showError('Error al cargar clientes')
    });
  }

  agregarProducto(prod: Producto) {
    try {
      const limite = prod.stock < 10 ? prod.stock : 10;
      const itemActual = this.itemsCarrito.find(i => i.idItem === prod.id && i.tipo === 'PRODUCTO');
      if (itemActual && itemActual.cantidad >= limite) {
        this.notify.showWarn(`Límite corporativo alcanzado: Máximo ${limite} unidades.`);
        return;
      }
      this.carritoService.agregarProducto(prod);
      this.notify.showSuccess(`Se agregó ${prod.nombre} al carrito.`);
    } catch (e: any) { this.notify.showWarn(e.message); }
  }

  removerItem(item: ItemCarrito) {
    if (this.reservaIdActiva && item.tipo === 'SERVICIO') {
      this.notify.showWarn('No puedes quitar el servicio base de la reserva.');
      return;
    }
    this.carritoService.removerItem(item.idItem, item.tipo);
  }

  actualizarCant(item: ItemCarrito, nuevaCantidad: number) {
    if (nuevaCantidad === null || nuevaCantidad === undefined) return;
    if (nuevaCantidad < 1) {
      this.removerItem(item);
      return;
    }
    if (this.reservaIdActiva && item.tipo === 'SERVICIO') {
      this.notify.showWarn('La cantidad del servicio está sujeta a la reserva original.');
      return;
    }

    const limite = item.stockDisponible! < 10 ? item.stockDisponible! : 10;
    if (nuevaCantidad > limite) {
      this.notify.showWarn(`Límite corporativo alcanzado: Máximo ${limite} unidades.`);
      this.carritoService.actualizarCantidad(item.idItem, item.tipo, limite);
      return;
    }
    try {
      this.carritoService.actualizarCantidad(item.idItem, item.tipo, nuevaCantidad);
    } catch (e: any) {
      this.notify.showWarn(e.message);
      if (item.stockDisponible) this.carritoService.actualizarCantidad(item.idItem, item.tipo, limite);
    }
  }

  get subtotalGeneral() { return this.totalVenta / 1.18; }
  get igv() { return this.totalVenta - this.subtotalGeneral; }

  regresarAlHistorial() {
    this.router.navigate(['../ventas'], { relativeTo: this.route });
  }

  abrirModalPago() {
    const formValues = this.ventaForm.getRawValue();
    if (!this.reservaIdActiva && (formValues.clienteId === null || formValues.clienteId === undefined)) {
      this.notify.showWarn('Seleccione un cliente para continuar.');
      return;
    }

    if (this.ventaForm.get('tipoComprobante')?.invalid || this.ventaForm.get('metodoPago')?.invalid) {
      this.notify.showWarn('Por favor, rellene todos los campos obligatorios.');
      return;
    }

    if (this.itemsCarrito.length === 0) {
      this.notify.showWarn('Agregue al menos un ítem al carrito.');
      return;
    }

    this.mostrarModalPago = true;
  }

  confirmarYProcesarCobro() {
    const detallesRequest = this.itemsCarrito
      .filter(item => !this.reservaIdActiva || item.tipo === 'PRODUCTO') 
      .map(item => ({
        productoId: item.tipo === 'PRODUCTO' ? item.idItem : null,
        servicioId: item.tipo === 'SERVICIO' ? item.idItem : null,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario
      }));

    const userId = Number(this.tokenService.getUserId());
    const idUsuarioActivo = isNaN(userId) ? null : userId;
    const formValues = this.ventaForm.getRawValue();

    const request: any = {
      clienteId: this.reservaIdActiva ? null : formValues.clienteId,
      barberoId: idUsuarioActivo,
      fecha: new Date(),
      tipoComprobante: formValues.tipoComprobante,
      metodoPago: formValues.metodoPago,
      reservaId: this.reservaIdActiva,
      detalles: detallesRequest
    };

    this.ventaService.crearVenta(request).subscribe({
      next: () => {
        this.mostrarModalPago = false;
        
        if (this.reservaIdActiva) {
          this.notify.showSuccess('¡Venta registrada y Reserva completada con éxito!');
        } else {
          this.notify.showSuccess('¡Venta registrada con éxito!');
        }

        this.carritoService.limpiarCarrito();
        this.ventaForm.enable();
        this.ventaForm.reset({ tipoComprobante: 'BOLETA', metodoPago: 'EFECTIVO' });
        this.reservaIdActiva = null;
        this.regresarAlHistorial();
      },
      error: () => this.notify.showError('Ocurrió un error al procesar la venta.')
    });
  }

  get productosFiltrados() {
    if (!this.textoBusquedaProducto) return this.productos;
    return this.productos.filter(p => p.nombre.toLowerCase().includes(this.textoBusquedaProducto.toLowerCase()));
  }
}