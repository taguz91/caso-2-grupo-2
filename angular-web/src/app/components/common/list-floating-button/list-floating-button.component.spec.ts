import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloatingButtonComponent } from './list-floating-button.component';

describe('ListFloatingButtonComponent', () => {
  let component: ListFloatingButtonComponent;
  let fixture: ComponentFixture<ListFloatingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFloatingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
