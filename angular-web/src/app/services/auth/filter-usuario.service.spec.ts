import { TestBed } from '@angular/core/testing';

import { FilterUsuarioService } from './filter-usuario.service';

describe('FilterUsuarioService', () => {
  let service: FilterUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
