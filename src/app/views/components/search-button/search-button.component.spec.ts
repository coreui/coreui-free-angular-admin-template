import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  OffcanvasModule,
  SearchButtonModule
} from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { AppSearchButtonComponent } from './search-button.component';

describe('AppSearchButtonComponent', () => {
  let component: AppSearchButtonComponent;
  let fixture: ComponentFixture<AppSearchButtonComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchButtonModule, ModalModule, OffcanvasModule, AlertModule, BadgeModule, ListGroupModule, FormModule, ButtonModule, CardModule, GridModule, AppSearchButtonComponent],
      providers: [IconSetService, provideRouter([])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(AppSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
