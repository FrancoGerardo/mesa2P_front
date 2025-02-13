import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoComponent } from './cupo.component';

describe('CupoComponent', () => {
  let component: CupoComponent;
  let fixture: ComponentFixture<CupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
