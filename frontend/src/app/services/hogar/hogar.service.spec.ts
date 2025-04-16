import { TestBed } from '@angular/core/testing';

import { HogarService } from './hogar.service';

describe('HogarService', () => {
  let service: HogarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HogarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
