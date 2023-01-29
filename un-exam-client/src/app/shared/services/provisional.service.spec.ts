import { TestBed } from '@angular/core/testing';

import { ProvisionalService } from './provisional.service';

describe('ProvisionalService', () => {
  let service: ProvisionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvisionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
