import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsComponentsComponent } from './docs-components.component';

describe('DocsComponentsComponent', () => {
  let component: DocsComponentsComponent;
  let fixture: ComponentFixture<DocsComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
