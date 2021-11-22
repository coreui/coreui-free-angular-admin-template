import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
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
  styleUrls: ['./toasters.component.scss']
})
export class ToastersComponent implements OnInit {

  positions = Object.values(ToasterPlacement);
  position = ToasterPlacement.TopEnd;
  positionStatic = ToasterPlacement.Static;
  colors = Object.keys(Colors);
  autohide = true;
  delay = 5000;
  fade = true;

  formChanges!: Observable<any>;

  toasterForm = new FormGroup({
    autohide: new FormControl(this.autohide),
    delay: new FormControl({value: this.delay, disabled: !this.autohide}),
    position: new FormControl(this.position),
    fade: new FormControl({value: true, disabled: false}),
    closeButton: new FormControl(true),
    color: new FormControl('')
  });

  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;

  ngOnInit(): void {
    this.formChanges = this.toasterForm.valueChanges.pipe(filter(e => e.autohide !== this.autohide));
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
      const {...props} = {...formValues, title};
      const componentRef = item.addToast(AppToastComponent, props, {});
      componentRef.instance['closeButton'] = props.closeButton;
    });
  }
}
