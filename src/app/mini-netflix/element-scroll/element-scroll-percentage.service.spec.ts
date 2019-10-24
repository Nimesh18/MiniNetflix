import { TestBed } from '@angular/core/testing';

import { ElementScrollPercentageService } from './element-scroll-percentage.service';

describe('ElementScrollPercentageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementScrollPercentageService = TestBed.get(ElementScrollPercentageService);
    expect(service).toBeTruthy();
  });
});
