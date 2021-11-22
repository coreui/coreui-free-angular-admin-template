import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingLabelsComponent } from './floating-labels.component';

describe('FloatingLabelsComponent', () => {
  let component: FloatingLabelsComponent;
  let fixture: ComponentFixture<FloatingLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
