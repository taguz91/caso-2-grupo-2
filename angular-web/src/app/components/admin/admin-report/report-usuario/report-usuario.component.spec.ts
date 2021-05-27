import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsuarioComponent } from './report-usuario.component';

describe('ReportUsuarioComponent', () => {
  let component: ReportUsuarioComponent;
  let fixture: ComponentFixture<ReportUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
