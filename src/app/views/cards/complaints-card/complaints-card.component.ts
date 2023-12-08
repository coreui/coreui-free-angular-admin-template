import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-complaints-card',
  standalone: true,
  imports: [
    CommonModule,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './complaints-card.component.html',
  styleUrl: './complaints-card.component.scss'
})
export class ComplaintsCardComponent {
  chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  title:{
		text: "Complaints Reported"
	  },
	  data: [{
		type: "pie",
		startAngle: 45,
		indexLabel: "{name}: {y}",
		indexLabelPlacement: "inside",
		yValueFormatString: "#,###.##",
		dataPoints: [
		  { y: 1593, name: "Reported" },
		  { y: 157, name: "Unresolved" }
		]
	  }]
	}	
}
