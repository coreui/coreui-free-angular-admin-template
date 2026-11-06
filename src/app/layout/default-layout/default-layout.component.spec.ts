import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';
import { navItems } from './_nav';
import { DefaultLayoutComponent } from './default-layout.component';

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLayoutComponent],
      providers: [IconSetService, provideRouter([])]
    }).compileComponents();

    TestBed.inject(IconSetService).icons = { ...iconSubset };

    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use a copy of the nav items', () => {
    expect(component.navItems).toEqual(navItems);
    expect(component.navItems).not.toBe(navItems);
  });

  it('should render the sidebar, header, footer and router outlet', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('c-sidebar')).toBeTruthy();
    expect(element.querySelector('app-default-header')).toBeTruthy();
    expect(element.querySelector('app-default-footer')).toBeTruthy();
    expect(element.querySelector('router-outlet')).toBeTruthy();
  });
});
