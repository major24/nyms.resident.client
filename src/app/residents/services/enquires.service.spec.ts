import { TestBed } from '@angular/core/testing';

import { EnquiresService } from './enquires.service';

describe('EnquiresService', () => {
  let service: EnquiresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
