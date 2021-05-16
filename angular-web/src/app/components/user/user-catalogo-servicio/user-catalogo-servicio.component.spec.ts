import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatalogoServicioComponent } from './user-catalogo-servicio.component';

describe('UserCatalogoServicioComponent', () => {
  let component: UserCatalogoServicioComponent;
  let fixture: ComponentFixture<UserCatalogoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCatalogoServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCatalogoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
