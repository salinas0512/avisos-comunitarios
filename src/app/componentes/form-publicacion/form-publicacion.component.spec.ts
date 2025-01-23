import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormPublicacionComponent } from './form-publicacion.component';

describe('FormPublicacionComponent', () => {
  let component: FormPublicacionComponent;
  let fixture: ComponentFixture<FormPublicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormPublicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
