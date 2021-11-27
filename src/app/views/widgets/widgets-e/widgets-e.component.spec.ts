import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsEComponent } from './widgets-e.component';

describe('WidgetsEComponent', () => {
  let component: WidgetsEComponent;
  let fixture: ComponentFixture<WidgetsEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
