import { MetricasFiltro } from "../models/analisis/metrica.model";
import { EstadoReserva, MetodoPago, ReporteFiltro } from "../models/analisis/reporte.model";
import { CategoriaFiltro } from "../models/catalogos/categorias.model";
import { ProductoFiltro } from "../models/catalogos/productos.model";
import { ServicioFiltro } from "../models/catalogos/servicios.model";
import { FilterField } from "../models/common/filtro.model";
import { BOOLEAN_FILTERS, CATEGORIA_OPTIONS, CAUSA_RECLAMO_OPTIONS, ESTADO_RECLAMO_OPTIONS, ESTADO_RECOMPENSA_OPTIONS, ESTADO_RESERVA_OPTIONS, METODO_PAGO_OPTIONS, ORIGEN_MOVIMIENTO_OPTIONS, TIPO_ALCANCE_FIDELIZACION_OPTIONS, TIPO_PREMIO_OPTIONS, TIPO_PROBLEMA_OPTIONS, TIPO_RECLAMACION_OPTIONS, TIPO_RESERVA_OPTIONS, TIPO_RULETA_OPTIONS } from "../models/common/select.option.model";
import { ConfiguracionFiltro } from "../models/ruleta/ruleta-configuracion.model";
import { FidelizacionReglaFiltro } from "../models/fidelizacion/regla.model";
import { ReclamoFiltro } from "../models/operaciones/reclamos-model/reclamo.filtro.model";
import { RuletaFiltro } from "../models/ruleta/ruleta.model";
import { VentaFiltro } from "../models/ventas/venta.model";
import { FidelizacionTarjetaFiltro } from "../models/fidelizacion/tarjeta.model";
import { RuletaItemFiltro } from "../models/ruleta/ruleta-item.model";
import { MovimientoFiltro } from "../models/fidelizacion/movimiento.model";
import { GiroFiltro } from "../models/ruleta/giro.model";
import { RecompensaFiltro } from "../models/ruleta/recompensa.model";
import { HistorialClienteFiltro } from "../models/operaciones/historial-cliente.model";
import { HistorialBarberFiltro } from "../models/operaciones/historial-barbero.model";
import { ReservaFiltro } from "../models/operaciones/Reserva.model";


export const FILTROS_CATEGORIA: FilterField<CategoriaFiltro>[] = [
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar categoría' },
    { key: 'tipo', label: 'Tipo', type: 'select', options: CATEGORIA_OPTIONS, placeholder: 'Seleccione tipo' },
    { key: 'padreId', label: 'Categoría padre', type: 'select', placeholder: 'Seleccione categoría' },
    { key: 'estado', label: 'Estado', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
];

export const FILTROS_PRODUCTO: FilterField<ProductoFiltro>[] = [
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar producto' },
    { key: 'idCategoria', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    { key: 'precioMin', label: 'Precio mínimo', type: 'number', placeholder: 'S/ 0', currency: true },
    { key: 'precioMax', label: 'Precio máximo', type: 'number', placeholder: 'S/ 1000', currency: true },
    { key: 'publicado', label: 'Publicación', type: 'select', options: BOOLEAN_FILTERS.publicado, placeholder: 'Seleccione estado' },
    { key: 'estado', label: 'Estado', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
];

export const FILTROS_SERVICIO: FilterField<ServicioFiltro>[] = [
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar servicio' },
    { key: 'categoriaId', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    { key: 'precioMin', label: 'Precio mínimo', type: 'number', placeholder: 'S/ 0', currency: true },
    { key: 'precioMax', label: 'Precio máximo', type: 'number', placeholder: 'S/ 1000' },
    { key: 'publicado', label: 'Publicación', type: 'select', options: BOOLEAN_FILTERS.publicado, placeholder: 'Seleccione estado' },
    { key: 'estado', label: 'Estado', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
];

export const FILTROS_PRODUCTO_PUBLICO: FilterField<ProductoFiltro>[] = [
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar producto' },
    { key: 'idCategoria', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    { key: 'precioMin', label: 'Precio mínimo', type: 'number', placeholder: 'S/ 0', currency: true },
    { key: 'precioMax', label: 'Precio máximo', type: 'number', placeholder: 'S/ 1000', currency: true },
];

export const FILTROS_SERVICIO_PUBLICO: FilterField<ServicioFiltro>[] = [
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar servicio' },
    { key: 'categoriaId', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    { key: 'precioMin', label: 'Precio mínimo', type: 'number', placeholder: 'S/ 0', currency: true },
    { key: 'precioMax', label: 'Precio máximo', type: 'number', placeholder: 'S/ 1000' },
];

export const FILTROS_RECLAMO: FilterField<ReclamoFiltro>[] = [
    { key: 'numeroReclamo', label: 'Número de reclamo', type: 'text', placeholder: 'Buscar por número' },
    // aca se tiene que hacer un filtro de texto que busque en el nombre del cliente , con autocompletado
    //{ key: 'nombreCliente', label: 'Nombre del cliente', type: 'text', placeholder: 'Buscar por nombre' },
    { key: 'estado', label: 'Estado del reclamo', type: 'select', options: ESTADO_RECLAMO_OPTIONS, placeholder: 'Seleccione estado' },
    { key: 'tipoProblema', label: 'Tipo de problema', type: 'select', options: TIPO_PROBLEMA_OPTIONS, placeholder: 'Seleccione tipo' },
    { key: 'tipoReclamacion', label: 'Tipo de reclamación', type: 'select', options: TIPO_RECLAMACION_OPTIONS, placeholder: 'Seleccione tipo' },
    { key: 'causaReclamo', label: 'Causa del reclamo', type: 'select', options: CAUSA_RECLAMO_OPTIONS, placeholder: 'Seleccione causa' },
    { key: 'esPublico', label: '¿Es público?', type: 'select', options: BOOLEAN_FILTERS.publico, placeholder: 'Seleccione opción' },
    //{ key: 'numeroDocumentoCliente', label: 'Número de documento del cliente', type: 'text', placeholder: 'Buscar por número de documento' },
    //{ key: 'idResponsable', label: 'ID del responsable', type: 'number', placeholder: 'Buscar por ID' },
    { key: 'fechaInicio', label: 'Fecha de inicio', type: 'date', placeholder: 'Desde' },
    { key: 'fechaFin', label: 'Fecha de fin', type: 'date', placeholder: 'Hasta', endOfDay: true },
]

export const FILTROS_REPORTE: FilterField<ReporteFiltro>[] = [
    { key: 'desde', label: 'Desde', type: 'date', placeholder: 'Fecha inicio' },
    { key: 'hasta', label: 'Hasta', type: 'date', placeholder: 'Fecha fin' },
    { key: 'barberoId', label: 'Barbero', type: 'select', placeholder: 'Seleccione barbero', options: [] },
    { key: 'servicioId', label: 'Servicio', type: 'select', placeholder: 'Seleccione servicio', options: [] },
    { key: 'estado', label: 'Estado', type: 'select', placeholder: 'Seleccione estado', options: ESTADO_RESERVA_OPTIONS },
    { key: 'metodoPago', label: 'Método de pago', type: 'select', placeholder: 'Seleccione método', options: METODO_PAGO_OPTIONS },
];
export const FILTROS_METRICAS: FilterField<MetricasFiltro>[] = [
    { key: 'fechaInicio', label: 'Desde', type: 'date', placeholder: 'Fecha inicio' },
    { key: 'fechaFin', label: 'Hasta', type: 'date', placeholder: 'Fecha fin', endOfDay: true }
];

export const FILTROS_VENTA: FilterField<VentaFiltro>[] = [
    { key: 'numeroCorrelativo', label: 'N° de Venta', type: 'text', placeholder: 'Ej. VEN-062026-0001' },
    { key: 'cliente', label: 'Nombre del Cliente', type: 'text', placeholder: 'Buscar por nombre' },
    { key: 'tipoComprobante', label: 'Tipo de Comprobante', type: 'select', options: [{ label: 'Boleta', value: 'BOLETA' }, { label: 'Factura', value: 'FACTURA' }], placeholder: 'Todos' },
    { key: 'fechaInicio', label: 'Fecha de inicio', type: 'date', placeholder: 'Desde' },
    { key: 'fechaFin', label: 'Fecha de fin', type: 'date', placeholder: 'Hasta', endOfDay: true }
];

export const FILTROS_CONFIGURACION: FilterField<ConfiguracionFiltro>[] = [
    { key: 'activa', label: 'Activa', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
    { key: 'categoriaId', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    // { key: 'ruletaId', label: 'Ruleta', type: 'select', placeholder: 'Seleccione ruleta', options: [] },
    { key: 'categoriaNombre', label: 'Nombre de categoría', type: 'text', placeholder: 'Buscar por nombre de categoría' },
    { key: 'ruletaNombre', label: 'Nombre de ruleta', type: 'text', placeholder: 'Buscar por nombre de ruleta' },
    { key: 'metaDesde', label: 'Meta desde', type: 'date', placeholder: 'Desde' },
    { key: 'metaHasta', label: 'Meta hasta', type: 'date', placeholder: 'Hasta', endOfDay: true },
]

export const FILTROS_RULETA: FilterField<RuletaFiltro>[] = [
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar ruleta' },
    { key: 'tipo', label: 'Tipo', type: 'select', options: TIPO_RULETA_OPTIONS, placeholder: 'Seleccione tipo' },
    { key: 'activa', label: 'Activa', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
];

export const FILTROS_ITEM: FilterField<RuletaItemFiltro>[] = [
    // { key: 'ruletaId', label: 'Ruleta', type: 'select', placeholder: 'Seleccione ruleta', options: [] },
    { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar item' },
    { key: 'tipoPremio', label: 'Tipo de premio', type: 'select', options: TIPO_PREMIO_OPTIONS, placeholder: 'Seleccione tipo' },
    { key: 'activo', label: 'Activo', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
]

export const FILTROS_REGLA: FilterField<FidelizacionReglaFiltro>[] = [
    { key: 'categoriaId', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    { key: 'tipoAlcance', label: 'Tipo de alcance', type: 'select', options: TIPO_ALCANCE_FIDELIZACION_OPTIONS, placeholder: 'Seleccione tipo de alcance' },
    { key: 'activo', label: 'Activo', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
];

export const FILTROS_TARJETA: FilterField<FidelizacionTarjetaFiltro>[] = [
    { key: 'clienteId', label: 'Cliente', type: 'select', placeholder: 'Seleccione cliente', options: [] },
    // { key: 'categoriaId', label: 'Categoría', type: 'treeselect', placeholder: 'Seleccione categoría', treeSelectionMode: 'single' },
    { key: 'activo', label: 'Activo', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
    { key: 'cicloActivo', label: 'Ciclo activo', type: 'select', options: BOOLEAN_FILTERS.activo, placeholder: 'Seleccione estado' },
];

export const FILTROS_MOVIMIENTO: FilterField<MovimientoFiltro>[] = [
    { key: 'clienteId', label: 'Cliente', type: 'select', placeholder: 'Seleccione cliente', options: [] },
    { key: 'tarjetaId', label: 'Tarjeta', type: 'select', placeholder: 'Seleccione tarjeta', options: [] },
    { key: 'origen', label: 'Origen', type: 'select', options: ORIGEN_MOVIMIENTO_OPTIONS, placeholder: 'Seleccione origen' },
    { key: 'fechaInicio', label: 'Fecha de inicio', type: 'date', placeholder: 'Desde' },
    { key: 'fechaFin', label: 'Fecha de fin', type: 'date', placeholder: 'Hasta', endOfDay: true }
]

export const FILTROS_GIRO: FilterField<GiroFiltro>[] = [
    { key: 'clienteId', label: 'Cliente', type: 'select', placeholder: 'Seleccione cliente', options: [] },
    { key: 'tarjetaId', label: 'Tarjeta', type: 'select', placeholder: 'Seleccione tarjeta', options: [] },
    { key: 'ruletaId', label: 'Ruleta', type: 'select', placeholder: 'Seleccione ruleta', options: [] },
    { key: 'fechaInicio', label: 'Fecha de inicio', type: 'date', placeholder: 'Desde' },
    { key: 'fechaFin', label: 'Fecha de fin', type: 'date', placeholder: 'Hasta', endOfDay: true }
]

export const FILTROS_RECOMPENSA: FilterField<RecompensaFiltro>[] = [
    { key: 'clienteId', label: 'Cliente', type: 'select', placeholder: 'Seleccione cliente', options: [] },
    { key: 'estado', label: 'Estado Recompensa', type: 'select', options: ESTADO_RECOMPENSA_OPTIONS, placeholder: 'Seleccione estado' },
    { key: 'itemId', label: 'Item', type: 'select', placeholder: 'Seleccione item', options: [] },
]
export const FILTROS_HISTORIAL: FilterField<HistorialClienteFiltro>[] = [
    { key: 'estado', label: 'Estado', type: 'select', placeholder: 'Seleccione estado', options: ESTADO_RESERVA_OPTIONS },
    { key: 'desde', label: 'Desde', type: 'date', placeholder: 'Fecha inicio' },
    { key: 'hasta', label: 'Hasta', type: 'date', placeholder: 'Fecha fin', endOfDay: true }
];
export const FILTROS_HISTORIAL_BARBERO: FilterField<HistorialBarberFiltro>[] = [
    { key: 'clienteNombre', label: 'Cliente', type: 'text', placeholder: 'Buscar por nombre del cliente' },
    { key: 'desde', label: 'Desde', type: 'date', placeholder: 'Fecha inicio' },
    { key: 'hasta', label: 'Hasta', type: 'date', placeholder: 'Fecha fin', endOfDay: true }
];

export const FILTROS_RESERVA: FilterField<ReservaFiltro>[] = [
    { key: 'clienteNombre', label: 'Cliente', type: 'text', placeholder: 'Buscar por nombre del cliente' },
    { key: 'barberoNombre', label: 'Barbero', type: 'text', placeholder: 'Buscar por nombre del barbero' },
    // { key: 'servicioId', label: 'Servicio', type: 'select', placeholder: 'Seleccione servicio', options: [] },
    { key: 'estadoReserva', label: 'Estado de la reserva', type: 'select', placeholder: 'Seleccione estado', options: ESTADO_RESERVA_OPTIONS },
    { key: 'tipoReserva', label: 'Tipo de reserva', type: 'select', placeholder: 'Seleccione tipo', options: TIPO_RESERVA_OPTIONS },
    { key: 'fecha', label: 'Fecha de inicio', type: 'date', placeholder: 'Desde' },
    { key: 'fechaHasta', label: 'Fecha de fin', type: 'date', placeholder: 'Hasta', endOfDay: true }
];