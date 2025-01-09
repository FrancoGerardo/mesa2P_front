import { TestBed } from '@angular/core/testing';

import { MedicoHorarioEspecialidadService } from './medico-horario-especialidad.service';

describe('MedicoHorarioEspecialidadService', () => {
  let service: MedicoHorarioEspecialidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicoHorarioEspecialidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
