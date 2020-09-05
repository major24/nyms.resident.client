import { TestBed } from '@angular/core/testing';

import { CarehomeService } from './carehome.service';

describe('CarehomeService', () => {
  let service: CarehomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarehomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
