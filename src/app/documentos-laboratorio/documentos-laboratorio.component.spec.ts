import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosLaboratorioComponent } from './documentos-laboratorio.component';

describe('DocumentosLaboratorioComponent', () => {
  let component: DocumentosLaboratorioComponent;
  let fixture: ComponentFixture<DocumentosLaboratorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosLaboratorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosLaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
