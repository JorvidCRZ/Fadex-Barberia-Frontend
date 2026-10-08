import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cortes } from './cortes';

describe('Cortes', () => {
  let component: Cortes;
  let fixture: ComponentFixture<Cortes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cortes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cortes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
