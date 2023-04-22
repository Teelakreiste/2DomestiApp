import { TestBed } from '@angular/core/testing';

import { BdDomestiAppService } from './bd-domesti-app.service';

describe('BdDomestiAppService', () => {
  let service: BdDomestiAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdDomestiAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
