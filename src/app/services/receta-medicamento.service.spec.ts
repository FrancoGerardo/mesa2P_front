import { TestBed } from '@angular/core/testing';

import { RecetaMedicamentoService } from './receta-medicamento.service';

describe('RecetaMedicamentoService', () => {
  let service: RecetaMedicamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetaMedicamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
