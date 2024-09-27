import { TestBed } from '@angular/core/testing';

import { OmnivaLatviaService } from './omniva-latvia.service';

describe('OmnivaLatviaService', () => {
  let service: OmnivaLatviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmnivaLatviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
