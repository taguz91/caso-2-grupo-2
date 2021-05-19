import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsEstadoComponent } from './tickets-estado.component';

describe('TicketsEstadoComponent', () => {
  let component: TicketsEstadoComponent;
  let fixture: ComponentFixture<TicketsEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
