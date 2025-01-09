import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosDePagoComponent } from './metodos-de-pago.component';

describe('MetodosDePagoComponent', () => {
  let component: MetodosDePagoComponent;
  let fixture: ComponentFixture<MetodosDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodosDePagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
