import { TestBed } from '@angular/core/testing';

import { FilterPersonalService } from './filter-personal.service';

describe('FilterPersonalService', () => {
  let service: FilterPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
