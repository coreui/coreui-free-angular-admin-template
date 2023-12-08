import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [
    CommonModule,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss'
})
export class BudgetCardComponent {
  chartOptions = {
	  animationEnabled: true,
	  title:{
		text: "ISOI&E Staff"
	  },
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 60, name: "Male" },
		  { y: 40, name: "Female" }
		]
	  }]
	}	
}         
