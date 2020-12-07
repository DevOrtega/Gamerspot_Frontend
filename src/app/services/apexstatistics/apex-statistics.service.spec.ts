import { TestBed } from '@angular/core/testing';

import { ApexStatisticsService } from './apex-statistics.service';

describe('ApexstatisticsService', () => {
  let service: ApexStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApexStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
