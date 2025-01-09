import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoEspecialidadComponent } from './medico-especialidad.component';

describe('MedicoEspecialidadComponent', () => {
  let component: MedicoEspecialidadComponent;
  let fixture: ComponentFixture<MedicoEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoEspecialidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
