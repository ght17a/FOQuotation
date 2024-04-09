import { TestBed } from '@angular/core/testing';

import { FetchQuotationsService } from './fetch-quotations.service';

describe('FetchQuotationsService', () => {
  let service: FetchQuotationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchQuotationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
