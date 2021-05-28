import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEncuestasComponent } from './admin-encuestas.component';

describe('AdminEncuestasComponent', () => {
  let component: AdminEncuestasComponent;
  let fixture: ComponentFixture<AdminEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEncuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
