import { LanguageService } from './language.service';
/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

describe('Service: Language', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });
  });

  it('should ...', inject([LanguageService], (service: LanguageService) => {
    expect(service).toBeTruthy();
  }));
});
