import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page500Component } from './page500.component';

describe('Page500Component', () => {
  let component: Page500Component;
  let fixture: ComponentFixture<Page500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page500Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
