import { TestBed } from '@angular/core/testing';

import { QuestionCollectorService } from './question-collector.service';

describe('QuestionCollectorService', () => {
  let service: QuestionCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
