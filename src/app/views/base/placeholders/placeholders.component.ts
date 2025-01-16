import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  BgColorDirective,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardTextDirective,
  CardTitleDirective,
  ColComponent,
  ColDirective,
  PlaceholderAnimationDirective,
  PlaceholderDirective,
  RowComponent
} from '@coreui/angular';

@Component({
    selector: 'app-placeholders',
    templateUrl: './placeholders.component.html',
    styleUrls: ['./placeholders.component.scss'],
    imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, CardImgDirective, CardTitleDirective, CardTextDirective, ButtonDirective, ColDirective, RouterLink, PlaceholderAnimationDirective, PlaceholderDirective, BgColorDirective]
})
export class PlaceholdersComponent {

}
