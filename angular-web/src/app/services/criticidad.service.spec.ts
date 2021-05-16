import { TestBed } from '@angular/core/testing';

import { CriticidadService } from './criticidad.service';

describe('CriticidadService', () => {
  let service: CriticidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
