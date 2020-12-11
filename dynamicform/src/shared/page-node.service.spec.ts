import { TestBed } from '@angular/core/testing';

import { PageNodeService } from './page-node.service';

describe('PageNodeService', () => {
  let service: PageNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
