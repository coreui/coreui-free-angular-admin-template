import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarouselsComponent } from './carousels.component';

describe('CarouselsComponent', () => {
  let component: CarouselsComponent;
  let fixture: ComponentFixture<CarouselsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
