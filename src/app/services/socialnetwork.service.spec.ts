import { TestBed } from '@angular/core/testing';

import { SocialnetworkService } from './socialnetwork.service';

describe('SocialnetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialnetworkService = TestBed.get(SocialnetworkService);
    expect(service).toBeTruthy();
  });
});
