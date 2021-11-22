import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCalloutComponent } from './docs-callout.component';

describe('DocsCalloutComponent', () => {
  let component: DocsCalloutComponent;
  let fixture: ComponentFixture<DocsCalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsCalloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
