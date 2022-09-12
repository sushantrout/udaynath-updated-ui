import { TestBed } from '@angular/core/testing';

import { ProcessExcelService } from './process-excel.service';

describe('ProcessExcelService', () => {
  let service: ProcessExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
