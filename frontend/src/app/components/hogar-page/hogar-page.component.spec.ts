import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarPageComponent } from './hogar-page.component';

describe('HogarPageComponent', () => {
  let component: HogarPageComponent;
  let fixture: ComponentFixture<HogarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HogarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HogarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
