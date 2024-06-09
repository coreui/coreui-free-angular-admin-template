import { Component } from '@angular/core';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { CardBodyComponent,
   CardComponent,
    FormDirective,
     FormLabelDirective,
      FormSelectDirective,
       FormControlDirective,
       ButtonDirective,
       ButtonGroupComponent,
       ButtonCloseDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';

import { IndicatorsService } from 'src/app/services/indicators/indicators.service';

@Component({
  selector: 'app-edit-indicator',
  standalone: true,
  imports: [CardBodyComponent,
    CardComponent,
    FormsModule,
      FormDirective,
       FormLabelDirective,
        FormControlDirective,
         FormSelectDirective,
        ButtonDirective,
       ButtonGroupComponent,
      ButtonCloseDirective,
    RouterLink],
  templateUrl: './edit-indicator.component.html',
  styleUrl: './edit-indicator.component.scss'
})
export class EditIndicatorComponent {

  currentId = 0;
  currentName = '';

  name= "";
  index = 1;
  description = "";
  constructor(
    private indicatorsService: IndicatorsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getIndicatorById(id: number): void {
    this.indicatorsService.getIndicatorById(id).subscribe({
      next: (response) => {
        this.name = response.name;
        this.index = response.index;
        this.description = response.description;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  editIndicator(): void {
    this.indicatorsService.editIndicator( this.currentId,
       { name: this.name, index: this.index, description: this.description }).subscribe({
     next: (response) => {
       console.log(response);
     },
     error: (error) => {
       console.log(error);
     },
   });
 }

 ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.currentId = params['id'];
    this.currentName = params['name'];
  });

  this.getIndicatorById(this.currentId);
}


}
