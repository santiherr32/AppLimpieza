import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesdetalleComponent } from './habitaciones-detalle.component';

describe('HabitacionesdetalleComponent', () => {
  let component: HabitacionesdetalleComponent;
  let fixture: ComponentFixture<HabitacionesdetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitacionesdetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitacionesdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
