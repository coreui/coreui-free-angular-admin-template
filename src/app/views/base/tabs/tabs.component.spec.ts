import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { AppTabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: AppTabsComponent;
  let fixture: ComponentFixture<AppTabsComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTabsComponent, NoopAnimationsModule], providers: [IconSetService], teardown: { destroyAfterEach: false }   // <- add this line
    }).compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(AppTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
