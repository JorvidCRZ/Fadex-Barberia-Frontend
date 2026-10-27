import { AvatarModule } from 'primeng/avatar';
import { RouterOutlet } from '@angular/router';
import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-private-shell',
  imports: [SidebarComponent, RouterOutlet, AvatarModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="relative flex min-h-screen overflow-hidden bg-brand-black">
    @if (sidebarOpen()) {
      <div class="fixed inset-0 z-30 bg-black/60 md:hidden" (click)="toggleSidebar()"></div>
    }

    <aside class="fixed inset-y-0 left-0 z-40 w-72.5 shrink-0 border-r border-ui-border bg-brand-black transition-transform duration-300 md:hidden"
      [class.-translate-x-full]="!sidebarOpen()"
      [class.translate-x-0]="sidebarOpen()">
      <app-sidebar class="block h-full" [collapsed]="false" />
    </aside>

    <aside class="hidden h-screen overflow-hidden border-r border-ui-border transition-all duration-300 md:block"
      [class.w-72.5]="!sidebarCollapsed()"
      [class.w-20]="sidebarCollapsed()">
      <app-sidebar class="block h-full" [(collapsed)]="sidebarCollapsed" />
    </aside>

    <div class="flex min-h-screen min-w-0 flex-1 flex-col">
      <div class="flex h-16 items-center justify-between gap-3 border-b border-ui-border bg-ui-black px-3 md:px-6">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <span class="inline-flex shrink-0 md:hidden">
            <app-button variant="sidebar-toggle" icon="bars"
              ariaLabel="Abrir o cerrar menú" (clicked)="toggleSidebar()" />
          </span>

          <span class="hidden shrink-0 md:inline-flex">
            <app-button variant="sidebar-toggle"
              [icon]="sidebarCollapsed() ? 'angle-double-right' : 'angle-double-left'"
              [ariaLabel]="sidebarCollapsed() ? 'Expandir sidebar' : 'Contraer sidebar'"
              (clicked)="toggleSidebarCollapsed()" />
          </span>

          <div class="flex min-w-0 items-center gap-3">
            <span [class]="'h-6 w-1 shrink-0 rounded-full ' + roleAccentClass()"></span>
            <div class="min-w-0">
              <span class="block truncate text-sm font-semibold text-text-primary sm:text-base">{{ title() }}</span>
              <span class="hidden truncate text-xs text-text-muted sm:block">{{ roleLabel() }}</span>
            </div>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-3">
          @if (userFullName()) {
            <div class="hidden max-w-48 truncate whitespace-nowrap text-sm text-text-secondary md:block">
              {{ userFullName() }}
            </div>
          }
          <p-avatar icon="pi pi-user" size="large"></p-avatar>
        </div>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto bg-brand-black p-4 md:p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
})
export class PrivateShellComponent {
  readonly title = input('Panel');
  readonly roleLabel = input('Área privada');
  readonly userFullName = input('');
  readonly roleAccentClass = input('bg-brand-gold');

  readonly sidebarOpen = signal(false);
  readonly sidebarCollapsed = signal(false);

  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  toggleSidebarCollapsed() { this.sidebarCollapsed.update(v => !v); }
}