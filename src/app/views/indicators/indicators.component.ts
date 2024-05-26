import { Component } from '@angular/core';
import {
  AvatarComponent,
  ButtonDirective,
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
         CardHeaderComponent,
          TableDirective,
           AvatarComponent],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {

  public users: IUser[] = [];

}
