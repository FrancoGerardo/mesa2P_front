import { TestBed } from '@angular/core/testing';

import { PermisoPostergacionService } from './permiso-postergacion.service';

describe('PermisoPostergacionService', () => {
  let service: PermisoPostergacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoPostergacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
