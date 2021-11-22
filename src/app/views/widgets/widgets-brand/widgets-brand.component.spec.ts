import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsBrandComponent } from './widgets-brand.component';

describe('WidgetsBrandComponent', () => {
  let component: WidgetsBrandComponent;
  let fixture: ComponentFixture<WidgetsBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
