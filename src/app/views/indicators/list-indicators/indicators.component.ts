import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  TextColorDirective,
  PageLinkDirective,
  PaginationComponent,
  PageItemDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';

import { IndicatorsService } from 'src/app/services/indicators/indicators.service';

interface indicator {
  id: number;
  name: string;
  index: number;
  description: string;
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
          ThemeDirective,
          PageItemDirective,
          PageLinkDirective,
          PaginationComponent,
          IconDirective,
          RouterLink],
  templateUrl: './indicators.component.html',
  styleUrl: './indicators.component.scss'
})
export class IndicatorsComponent {

  constructor(
    private router: Router,
    private indicatorsService: IndicatorsService
    ) { }

  currentId = 0;
  public visible = false;

  public indicators: indicator[] = []

  toggleLiveDemo(id: number) {
    this.currentId = id;
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  getPaginatedIndicator(): void {
    this.indicatorsService.getPaginatedIndicator().subscribe({
      next: (response) => {
        console.log(response);
        this.indicators = response.data;
      },
      error: (error) => console.error('Error al realizar la solicitud:', error),
    });
  }

  deleteIndicator(): void {
    this.indicatorsService.deleteIndicator(this.currentId).subscribe({
      next: () => {
        this.getPaginatedIndicator();
        this.visible = !this.visible;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  redirectToEdit(id: number): void {
     this.router.navigate([`editIndicators/${id}`]);
  }

  ngOnInit(): void {
     this.getPaginatedIndicator();
 }

}
