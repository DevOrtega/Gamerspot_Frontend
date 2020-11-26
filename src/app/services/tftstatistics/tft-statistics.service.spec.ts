import { TestBed } from '@angular/core/testing';

import { TftStatisticsService } from './tft-statistics.service';

describe('TftStatisticsService', () => {
  let service: TftStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TftStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
