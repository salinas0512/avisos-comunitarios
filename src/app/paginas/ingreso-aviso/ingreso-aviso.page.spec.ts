import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoAvisoPage } from './ingreso-aviso.page';

describe('IngresoAvisoPage', () => {
  let component: IngresoAvisoPage;
  let fixture: ComponentFixture<IngresoAvisoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
