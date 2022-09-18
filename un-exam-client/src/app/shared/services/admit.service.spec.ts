import { TestBed } from '@angular/core/testing';

import { AdmitService } from './admit.service';

describe('AdmitService', () => {
  let service: AdmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
