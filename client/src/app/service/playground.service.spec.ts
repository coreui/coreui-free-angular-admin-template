import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { PlaygroundService } from './playground.service';

describe('DbDataService', () => {
  let service: PlaygroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideNoopAnimations(), ],});
    service = TestBed.inject(PlaygroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
