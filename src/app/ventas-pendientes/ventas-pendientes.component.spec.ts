import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPendientesComponent } from './ventas-pendientes.component';

describe('VentasPendientesComponent', () => {
  let component: VentasPendientesComponent;
  let fixture: ComponentFixture<VentasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
