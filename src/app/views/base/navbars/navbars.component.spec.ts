import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarsComponent } from './navbars.component';

describe('NavbarsComponent', () => {
  let component: NavbarsComponent;
  let fixture: ComponentFixture<NavbarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
