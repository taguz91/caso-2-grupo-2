import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarComponent } from './modal-asignar.component';

describe('ModalAsignarComponent', () => {
  let component: ModalAsignarComponent;
  let fixture: ComponentFixture<ModalAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsignarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
