import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DocsCalloutComponent } from './docs-callout.component';
import { CalloutModule } from '@coreui/angular';

describe('DocsCalloutComponent', () => {
  let component: DocsCalloutComponent;
  let fixture: ComponentFixture<DocsCalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), ],
    imports: [CalloutModule, DocsCalloutComponent]
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
