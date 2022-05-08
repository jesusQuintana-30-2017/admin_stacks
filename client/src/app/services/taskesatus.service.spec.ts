import { TestBed } from '@angular/core/testing';

import { TaskesatusService } from './taskesatus.service';

describe('TaskesatusService', () => {
  let service: TaskesatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskesatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
