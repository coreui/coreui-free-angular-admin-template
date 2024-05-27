import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndicatorComponent } from './add-indicator.component';

describe('AddIndicatorComponent', () => {
  let component: AddIndicatorComponent;
  let fixture: ComponentFixture<AddIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
