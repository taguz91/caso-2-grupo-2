import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCatalogoComponent } from './report-catalogo.component';

describe('ReportCatalogoComponent', () => {
  let component: ReportCatalogoComponent;
  let fixture: ComponentFixture<ReportCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
