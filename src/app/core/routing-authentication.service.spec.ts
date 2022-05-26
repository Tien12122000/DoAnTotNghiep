import { TestBed } from '@angular/core/testing';

import { RoutingAuthenticationService } from './routing-authentication.service';

describe('RoutingAuthenticationService', () => {
  let service: RoutingAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
