import { TestBed } from '@angular/core/testing';

import { EncuesatisService } from './encuesatis.service';

describe('EncuesatisService', () => {
  let service: EncuesatisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuesatisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
