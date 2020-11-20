import { TestBed } from '@angular/core/testing';

import { TrackerggInterceptor } from './trackergg.interceptor';

describe('TrackerggInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TrackerggInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TrackerggInterceptor = TestBed.inject(TrackerggInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
