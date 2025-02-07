import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ColDirective,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  GutterDirective,
  RowComponent,
  RowDirective,
  TextColorDirective
} from '@coreui/angular';

@Component({
    selector: 'app-form-controls',
    templateUrl: './form-controls.component.html',
    styleUrls: ['./form-controls.component.scss'],
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle, RowDirective, GutterDirective, ColDirective]
})
export class FormControlsComponent {

  public favoriteColor = '#26ab3c';
  
}
