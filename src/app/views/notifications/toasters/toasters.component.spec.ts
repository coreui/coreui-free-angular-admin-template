import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule, CardModule, FormModule, GridModule, ProgressModule, ToastModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { DocsComponentsModule } from '../../../../components';
import { ToastersComponent } from './toasters.component';
import { AppToastComponent } from './toast-simple/toast.component';

describe('ToastersComponent', () => {
  let component: ToastersComponent;
  let fixture: ComponentFixture<ToastersComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToastersComponent, AppToastComponent],
      imports: [NoopAnimationsModule, GridModule, ToastModule, CardModule, FormModule, ButtonModule, ProgressModule, FormsModule, ReactiveFormsModule, DocsComponentsModule],
      providers: [IconSetService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(ToastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
