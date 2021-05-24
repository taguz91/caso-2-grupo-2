import { TestBed } from '@angular/core/testing';

import { FilterAdminService } from './filter-admin.service';

describe('FilterAdminService', () => {
  let service: FilterAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
