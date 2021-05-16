import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistroTicketComponent } from './user-registro-ticket.component';

describe('UserRegistroTicketComponent', () => {
  let component: UserRegistroTicketComponent;
  let fixture: ComponentFixture<UserRegistroTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistroTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistroTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
