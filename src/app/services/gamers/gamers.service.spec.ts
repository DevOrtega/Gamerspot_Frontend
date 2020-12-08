import { TestBed } from '@angular/core/testing';

import { GamersService } from './gamers.service';

describe('GamersService', () => {
  let service: GamersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
