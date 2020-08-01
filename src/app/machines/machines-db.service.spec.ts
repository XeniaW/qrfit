import { TestBed } from '@angular/core/testing';

import { MachinesDbService } from './machines-db.service';

describe('MachinesDbService', () => {
  let service: MachinesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachinesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
