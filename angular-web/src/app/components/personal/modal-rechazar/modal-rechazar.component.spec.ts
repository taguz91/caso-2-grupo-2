import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRechazarComponent } from './modal-rechazar.component';

describe('ModalRechazarComponent', () => {
  let component: ModalRechazarComponent;
  let fixture: ComponentFixture<ModalRechazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRechazarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
