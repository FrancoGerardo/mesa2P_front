import { TestBed } from '@angular/core/testing';

import { HorarioMedicoEspecialidadService } from './horario-medico-especialidad.service';

describe('HorarioMedicoEspecialidadService', () => {
  let service: HorarioMedicoEspecialidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioMedicoEspecialidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
