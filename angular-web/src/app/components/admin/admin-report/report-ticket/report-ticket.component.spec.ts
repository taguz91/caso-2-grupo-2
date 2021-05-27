import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTicketComponent } from './report-ticket.component';

describe('ReportTicketComponent', () => {
  let component: ReportTicketComponent;
  let fixture: ComponentFixture<ReportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
