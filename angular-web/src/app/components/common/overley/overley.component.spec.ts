import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverleyComponent } from './overley.component';

describe('OverleyComponent', () => {
  let component: OverleyComponent;
  let fixture: ComponentFixture<OverleyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverleyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
