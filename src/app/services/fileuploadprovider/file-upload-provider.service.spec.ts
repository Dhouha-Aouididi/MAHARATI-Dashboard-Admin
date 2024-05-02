import { TestBed } from '@angular/core/testing';

import { FileUploadProviderService } from './file-upload-provider.service';

describe('FileUploadProviderService', () => {
  let service: FileUploadProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
