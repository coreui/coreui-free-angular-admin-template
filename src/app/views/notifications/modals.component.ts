import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'modals.component.html'
})
export class ModalsComponent {
  @ViewChild('myModal', {static: false}) public myModal: ModalDirective;
  @ViewChild('largeModal', {static: false}) public largeModal: ModalDirective;
  @ViewChild('smallModal', {static: false}) public smallModal: ModalDirective;
  @ViewChild('primaryModal', {static: false}) public primaryModal: ModalDirective;
  @ViewChild('successModal', {static: false}) public successModal: ModalDirective;
  @ViewChild('warningModal', {static: false}) public warningModal: ModalDirective;
  @ViewChild('dangerModal', {static: false}) public dangerModal: ModalDirective;
  @ViewChild('infoModal', {static: false}) public infoModal: ModalDirective;
}
