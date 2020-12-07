import { TestBed } from '@angular/core/testing';

import { ProfilephotosService } from './profilephotos.service';

describe('ProfilephotosService', () => {
  let service: ProfilephotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilephotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
