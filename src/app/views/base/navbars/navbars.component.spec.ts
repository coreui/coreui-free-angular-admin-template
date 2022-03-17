import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NavbarsComponent } from './navbars.component';

describe('NavbarsComponent', () => {
  let component: NavbarsComponent;
  let fixture: ComponentFixture<NavbarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarsComponent, CollapseDirective, BsDropdownDirective],
      imports: [NoopAnimationsModule, BsDropdownModule.forRoot()]
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
