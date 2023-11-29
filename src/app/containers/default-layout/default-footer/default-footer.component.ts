import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {

  Company: string = 'Kenya Revenue Authority';
  currentDate: Date = new Date();
  copyrightYear: number = new Date().getFullYear();

  constructor() {
    super();
  }
}
