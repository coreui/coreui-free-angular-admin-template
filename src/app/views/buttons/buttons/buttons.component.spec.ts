import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;
  let iconSetService: IconSetService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardModule, GridModule, ButtonModule, RouterTestingModule, IconModule, ButtonsComponent],
    providers: [IconSetService]
})
    .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
