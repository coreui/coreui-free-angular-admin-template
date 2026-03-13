import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import { BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ListGroupModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { ListGroupsComponent } from './list-groups.component';

describe('ListGroupsComponent', () => {
  let component: ListGroupsComponent;
  let fixture: ComponentFixture<ListGroupsComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroupModule, ButtonModule, ReactiveFormsModule, BadgeModule, FormModule, GridModule, CardModule, ListGroupsComponent],
      providers: [IconSetService, provideRouter([])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ListGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
