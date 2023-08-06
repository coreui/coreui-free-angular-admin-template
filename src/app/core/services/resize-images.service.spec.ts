import { TestBed } from '@angular/core/testing';

import { ResizeImagesService } from './resize-images.service';

describe('ResizeImagesService', () => {
  let service: ResizeImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
