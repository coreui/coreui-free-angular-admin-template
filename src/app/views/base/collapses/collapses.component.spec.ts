import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsesComponent } from './collapses.component';

describe('CollapsesComponent', () => {
  let component: CollapsesComponent;
  let fixture: ComponentFixture<CollapsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
