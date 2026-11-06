import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSampleIconComponent } from './toast-sample-icon.component';

describe('ToastSampleIconComponent', () => {
  let fixture: ComponentFixture<ToastSampleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastSampleIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastSampleIconComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the sample svg', () => {
    expect(fixture.nativeElement.querySelector('svg')).toBeTruthy();
  });
});
