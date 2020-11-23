import { TestBed } from '@angular/core/testing';

import { LolStatisticsService } from './lol-statistics.service';

describe('LolStatisticsService', () => {
  let service: LolStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LolStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
