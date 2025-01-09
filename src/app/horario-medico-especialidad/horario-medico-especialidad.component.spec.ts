import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioMedicoEspecialidadComponent } from './horario-medico-especialidad.component';

describe('HorarioMedicoEspecialidadComponent', () => {
  let component: HorarioMedicoEspecialidadComponent;
  let fixture: ComponentFixture<HorarioMedicoEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioMedicoEspecialidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioMedicoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
