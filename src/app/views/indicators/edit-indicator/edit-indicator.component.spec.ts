import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndicatorComponent } from './edit-indicator.component';

describe('EditIndicatorComponent', () => {
  let component: EditIndicatorComponent;
  let fixture: ComponentFixture<EditIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
