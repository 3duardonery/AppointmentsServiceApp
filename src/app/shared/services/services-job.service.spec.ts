import { TestBed } from '@angular/core/testing';

import { ServicesJobService } from './services-job.service';

describe('ServicesJobService', () => {
  let service: ServicesJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
