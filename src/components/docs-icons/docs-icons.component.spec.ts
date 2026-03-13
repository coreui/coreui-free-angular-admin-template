import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsIconsComponent } from './docs-icons.component';

describe('DocsIconsComponent', () => {
  let component: DocsIconsComponent;
  let fixture: ComponentFixture<DocsIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocsIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
