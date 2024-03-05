import { JsonPipe, NgClass, NgStyle, SlicePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormSelectDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent,
  TextColorDirective,
  ToastBodyComponent,
  ToastComponent,
  ToasterComponent,
  ToasterPlacement,
  ToastHeaderComponent
} from '@coreui/angular';
import { AppToastComponent } from './toast-simple/toast.component';

export enum Colors {
  '' = '',
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  dark = 'dark',
  light = 'light',
}

@Component({
  selector: 'app-toasters',
  templateUrl: './toasters.component.html',
  styleUrls: ['./toasters.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, ToasterComponent, NgClass, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ContainerComponent, ReactiveFormsModule, FormDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormSelectDirective, ButtonDirective, NgStyle, ToastComponent, ToastHeaderComponent, ToastBodyComponent, AppToastComponent, JsonPipe, SlicePipe, TextColorDirective]
})
export class ToastersComponent implements OnInit {

  positions = Object.values(ToasterPlacement);
  position = ToasterPlacement.TopEnd;
  positionStatic = ToasterPlacement.Static;
  colors = Object.keys(Colors);
  autohide = true;
  delay = 5000;
  fade = true;

  toasterForm = new UntypedFormGroup({
    autohide: new UntypedFormControl(this.autohide),
    delay: new UntypedFormControl({ value: this.delay, disabled: !this.autohide }),
    position: new UntypedFormControl(this.position),
    fade: new UntypedFormControl({ value: true, disabled: false }),
    closeButton: new UntypedFormControl(true),
    color: new UntypedFormControl('')
  });

  formChanges: Observable<any> = this.toasterForm.valueChanges.pipe(
    takeUntilDestroyed(),
    filter(e => e.autohide !== this.autohide)
  );

  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;

  ngOnInit(): void {
    this.formChanges.subscribe(e => {
      this.autohide = e.autohide;
      this.position = e.position;
      this.fade = e.fade;
      const control = this.toasterForm?.get('delay');
      this.autohide ? control?.enable() : control?.disable();
      this.delay = control?.enabled ? e.timeout : this.delay;
    });
  }

  addToast() {
    const formValues = this.toasterForm.value;
    const toasterPosition = this.viewChildren.filter(item => item.placement === this.toasterForm.value.position);
    toasterPosition.forEach((item) => {
      const title = `Toast ${formValues.color} ${formValues.position}`;
      const { ...props } = { ...formValues, title };
      const componentRef = item.addToast(AppToastComponent, props, {});
      componentRef.instance['closeButton'] = props.closeButton;
    });
  }
}
