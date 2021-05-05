import { TestBed } from '@angular/core/testing';

import { SpendCategoryService } from './spend-category.service';

describe('SpendCategoryService', () => {
  let service: SpendCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
