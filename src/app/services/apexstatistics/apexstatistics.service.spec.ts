import { TestBed } from '@angular/core/testing';

import { ApexstatisticsService } from './apexstatistics.service';

describe('ApexstatisticsService', () => {
  let service: ApexstatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApexstatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
