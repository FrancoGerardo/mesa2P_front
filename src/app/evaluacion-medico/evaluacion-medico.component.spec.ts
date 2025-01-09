import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionMedicoComponent } from './evaluacion-medico.component';

describe('EvaluacionMedicoComponent', () => {
  let component: EvaluacionMedicoComponent;
  let fixture: ComponentFixture<EvaluacionMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
