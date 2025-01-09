import { TestBed } from '@angular/core/testing';

import { DocumentosLaboratorioService } from './documentos-laboratorio.service';

describe('DocumentosLaboratorioService', () => {
  let service: DocumentosLaboratorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentosLaboratorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
