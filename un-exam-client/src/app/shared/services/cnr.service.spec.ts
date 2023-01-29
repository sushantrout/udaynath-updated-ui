import { TestBed } from '@angular/core/testing';

import { CnrService } from './cnr.service';

describe('CnrService', () => {
  let service: CnrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
