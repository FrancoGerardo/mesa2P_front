import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoPostergacionComponent } from './permiso-postergacion.component';

describe('PermisoPostergacionComponent', () => {
  let component: PermisoPostergacionComponent;
  let fixture: ComponentFixture<PermisoPostergacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisoPostergacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisoPostergacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
