import { Component } from '@angular/core';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalModule,
  ThemeDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { CommonModule } from '@angular/common';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-indicators',
  standalone: true,
  imports: [ TextColorDirective,
          CardComponent,
          CardBodyComponent,
          RowComponent,
          ColComponent,
          ButtonDirective,
          ButtonGroupComponent,
          FormCheckLabelDirective,
          CardFooterComponent,
          GutterDirective,
          ProgressBarDirective,
          ProgressComponent,
          CommonModule,
          CardHeaderComponent,
          TableDirective,
          ButtonCloseDirective,
          ButtonDirective,
          ModalModule,
          ModalBodyComponent,
          ModalComponent,
          ModalFooterComponent,
          ModalHeaderComponent,
          ModalTitleDirective,
          ThemeDirective],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {

  currentId = 1;
  public visible = false;

  public users: IUser[] = []

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}
