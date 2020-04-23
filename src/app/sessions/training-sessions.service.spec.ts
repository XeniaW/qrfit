import { TestBed } from '@angular/core/testing';

import { TrainingSesionsService } from './training-sesions.service';

describe('TrainingSesionsService', () => {
  let service: TrainingSesionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingSesionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
