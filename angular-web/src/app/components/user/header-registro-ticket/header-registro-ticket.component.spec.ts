import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRegistroTicketComponent } from './header-registro-ticket.component';

describe('HeaderRegistroTicketComponent', () => {
  let component: HeaderRegistroTicketComponent;
  let fixture: ComponentFixture<HeaderRegistroTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderRegistroTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRegistroTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
