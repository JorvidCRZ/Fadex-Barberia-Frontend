import { Component, Input } from '@angular/core';
import { Divider } from "primeng/divider";


@Component({
  selector: 'app-header-perfil-barbero',
  imports: [Divider],
  templateUrl: './header-perfil-barbero.html',
  styleUrl: './header-perfil-barbero.css',
})
export class HeaderPerfilBarbero {
  @Input() barberoNombre = 'Barbero';
  @Input() barberoIniciales = 'BR';
  @Input() barberoDescripcion = 'Sin descripción disponible';
  @Input() volver: () => void = () => window.history.back();
}
