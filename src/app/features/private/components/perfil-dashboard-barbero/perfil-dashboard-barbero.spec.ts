import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDashboardBarbero } from './perfil-dashboard-barbero';

describe('PerfilDashboardBarbero', () => {
  let component: PerfilDashboardBarbero;
  let fixture: ComponentFixture<PerfilDashboardBarbero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilDashboardBarbero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDashboardBarbero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
