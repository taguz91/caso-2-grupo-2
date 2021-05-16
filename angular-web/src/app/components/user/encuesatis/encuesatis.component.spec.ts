import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuesatisComponent } from './encuesatis.component';

describe('EncuesatisComponent', () => {
  let component: EncuesatisComponent;
  let fixture: ComponentFixture<EncuesatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuesatisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuesatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
