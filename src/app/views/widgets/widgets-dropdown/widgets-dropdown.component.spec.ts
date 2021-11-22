import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDropdownComponent } from './widgets-dropdown.component';

describe('WidgetsDropdownComponent', () => {
  let component: WidgetsDropdownComponent;
  let fixture: ComponentFixture<WidgetsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
