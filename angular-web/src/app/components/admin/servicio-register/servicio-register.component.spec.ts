import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioRegisterComponent } from './servicio-register.component';

describe('ServicioRegisterComponent', () => {
  let component: ServicioRegisterComponent;
  let fixture: ComponentFixture<ServicioRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
