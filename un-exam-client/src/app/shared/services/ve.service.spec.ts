import { TestBed } from '@angular/core/testing';

import { VEService } from './ve.service';

describe('VEService', () => {
  let service: VEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
