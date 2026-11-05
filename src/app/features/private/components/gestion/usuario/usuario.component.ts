import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { FiltrosComponent } from '@/app/shared/components/filtros/filtros.component';
import { PageHeaderComponent } from '@/app/shared/components/page-header/page-header.component';
import { PaginatorComponent } from '@/app/shared/components/paginator/paginator.component';
import { SearchBarComponent } from '@/app/shared/components/search-bar/search-bar.component';
import { StatsComponent } from '@/app/shared/components/stats/stats.component';
import { StatusBadgeComponent } from '@/app/shared/components/status-badge/status-badge.component';
import { FilterField } from '@/app/core/models/common/filtro.model';
import { StatsCard } from '@/app/core/models/common/card.model';
import { UsuarioService } from '@/app/core/services/auth/usuario.service';
import { FiltroConsulta, UsuarioFila, aFilaUsuario, aFiltroConsulta, claseRol, hayFiltroConsulta, iniciales,} from './usuario.utils.component';
import { UsuarioRegistrarComponent } from './usuario-registrar.component';
import { UsuarioDetalleComponent } from './usuario-detalle.component';
import { UsuarioEditarComponent } from './usuario-editar.component';
import { UsuarioPinComponent } from './usuario-pin.component';
import { UsuarioQrComponent } from './usuario-qr.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    TableModule, TooltipModule, PageHeaderComponent, ButtonComponent, SearchBarComponent, StatsComponent,
    FiltrosComponent, EmptyStateComponent, PaginatorComponent, StatusBadgeComponent, UsuarioRegistrarComponent,
    UsuarioDetalleComponent, UsuarioEditarComponent, UsuarioPinComponent, UsuarioQrComponent,
  ],
  templateUrl: './usuario.html',
})
export class UsuarioComponent implements OnInit {
  private readonly cd = inject(ChangeDetectorRef);
  private readonly usuarioService = inject(UsuarioService);

  // Lista
  usuarios: UsuarioFila[] = [];
  stats: StatsCard[] = [];
  totalElements = 0;
  currentPage = 0;
  first = 0;
  rows = 10;
  cargando = true;
  errorCarga = '';
  searchTerm = '';
  isSearchMode = false;
  private filtrosConsulta: FiltroConsulta = {};

  // Modales: todos trabajan sobre el mismo usuario (usuarioId)
  usuarioId: number | null = null;
  registroVisible = false;
  verVisible = false;
  editarVisible = false;
  pinVisible = false;
  qrVisible = false;
  qrRegenerar = false;
  qrActual: string | null = null;
  /** Se incrementa cuando otro modal cambia datos del usuario, para que "ver" los vuelva a cargar */
  refrescoVer = 0;

  readonly iniciales = iniciales;
  readonly claseRol = claseRol;

  readonly filtroFields: FilterField[] = [
    {
      key: 'rol', label: 'Rol', type: 'select', placeholder: 'Todos',
      options: [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'BARBERO', label: 'Barbero' },
        { value: 'CLIENTE', label: 'Cliente' },
      ],
    },
    {
      key: 'qr', label: 'QR', type: 'select', placeholder: 'Todos',
      options: [
        { value: 'conQr', label: 'Con QR' },
        { value: 'sinQr', label: 'Sin QR' },
      ],
    },
    {
      key: 'cantidadRoles', label: 'Cantidad de roles', type: 'select', placeholder: 'Todos',
      options: [
        { value: 'unRol', label: 'Un rol' },
        { value: 'multiplesRoles', label: 'Múltiples roles' },
      ],
    },
  ] as FilterField[];

  /** true si hay búsqueda por texto o algún filtro activo */
  get hayFiltros(): boolean {
    return this.searchTerm.length > 0 || hayFiltroConsulta(this.filtrosConsulta);
  }

  ngOnInit(): void {
    this.cargarUsuarios(0);
  }

  cargarUsuarios(page: number = 0): void {
    this.cargando = true;
    this.errorCarga = '';

    const request$ = this.isSearchMode && this.searchTerm.length > 0
      ? this.usuarioService.buscar(this.searchTerm, page, this.rows)
      : hayFiltroConsulta(this.filtrosConsulta)
        ? this.usuarioService.filtrar(this.filtrosConsulta, page, this.rows)
        : this.usuarioService.listar(page, this.rows);

    request$.subscribe({
      next: (response: any) => {
        const pageData = response?.data ?? {};
        this.usuarios = (pageData.content ?? []).map(aFilaUsuario);
        this.totalElements = pageData.totalElements ?? this.usuarios.length;
        this.currentPage = pageData.number ?? pageData.pageNumber ?? page;
        this.first = this.currentPage * this.rows;
        this.actualizarStats();
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.errorCarga = 'No se pudo cargar la tabla de usuarios.';
        this.cd.detectChanges();
      },
    });
  }

  onPageChange(event: PaginatorState): void {
    this.rows = event.rows ?? this.rows;
    this.first = event.first ?? 0;
    this.cargarUsuarios(Math.floor(this.first / this.rows));
  }

  onBuscarFiltros(valores: { rol?: string; qr?: string; cantidadRoles?: string }): void {
    this.searchTerm = '';
    this.isSearchMode = false;
    this.filtrosConsulta = aFiltroConsulta(valores);
    this.cargarUsuarios(0);
  }

  onSearch(texto: string): void {
    this.searchTerm = (texto || '').trim();
    this.isSearchMode = this.searchTerm.length > 0;
    if (this.isSearchMode) this.filtrosConsulta = {}; // búsqueda y filtros no se mezclan
    this.cargarUsuarios(0);
  }

  onLimpiar(): void {
    this.searchTerm = '';
    this.isSearchMode = false;
    this.filtrosConsulta = {};
    this.cargarUsuarios(0);
  }

  private actualizarStats(): void {
    const conQr = this.usuarios.filter(u => u.tieneQr).length;
    const conPin = this.usuarios.filter(u => u.tienePin).length;
    const variosRoles = this.usuarios.filter(u => u.roles.length > 1).length;

    this.stats = [
      {
        title: 'Total usuarios', value: this.totalElements, icon: 'pi pi-users',
        description: this.hayFiltros ? 'Según los filtros aplicados' : 'Registrados en el sistema',
      },
      {
        title: 'Con QR', value: conQr, icon: 'pi pi-qrcode', description: 'En esta página',
        accentClass: 'bg-success', iconBgClass: 'bg-success/10', accentTextClass: 'text-success',
      },
      {
        title: 'Con PIN', value: conPin, icon: 'pi pi-lock', description: 'En esta página',
        accentClass: 'bg-info', iconBgClass: 'bg-info/10', accentTextClass: 'text-info',
      },
      {
        title: 'Varios roles', value: variosRoles, icon: 'pi pi-id-card', description: 'En esta página',
        accentClass: 'bg-warning', iconBgClass: 'bg-warning/10', accentTextClass: 'text-warning',
      },
    ];
  }

  // =====================================================
  // MODALES
  // =====================================================

  abrirRegistro(): void {
    this.registroVisible = true;
  }

  abrirVer(usuario: UsuarioFila): void {
    this.usuarioId = usuario.usuarioId;
    this.verVisible = true;
  }

  abrirEditar(usuario: UsuarioFila): void {
    this.usuarioId = usuario.usuarioId;
    this.editarVisible = true;
  }

  /** Lo pide el modal "ver": regenerar = true si el usuario ya tiene QR */
  abrirQr(regenerar: boolean): void {
    this.qrRegenerar = regenerar;
    this.qrVisible = true;
  }

  onUsuarioCreado(): void {
    this.cargarUsuarios(this.currentPage);
  }

  /** Tras editar, asignar PIN o generar QR: recarga la lista y el modal "ver" */
  onUsuarioActualizado(): void {
    this.refrescoVer++;
    this.cargarUsuarios(this.currentPage);
  }
}