import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonModule, CardModule, GridModule, PopoverModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { PopoversComponent } from './popovers.component';

describe('PopoversComponent', () => {
  let component: PopoversComponent;
  let fixture: ComponentFixture<PopoversComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CardModule, GridModule, PopoverModule, ButtonModule, RouterTestingModule, PopoversComponent],
    providers: [IconSetService]
})
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(PopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
