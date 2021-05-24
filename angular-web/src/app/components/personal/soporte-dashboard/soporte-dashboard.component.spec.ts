import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteDashboardComponent } from './soporte-dashboard.component';

describe('SoporteDashboardComponent', () => {
  let component: SoporteDashboardComponent;
  let fixture: ComponentFixture<SoporteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoporteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
