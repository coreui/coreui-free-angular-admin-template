import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    CommonModule,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  chart: any;
	
	chartOptions = {
	  animationEnabled: true,
	  theme: "dark",
	  title:{
		text: "Commissioner's PC Implimentation"
	  },
	  axisY: {
		title: "Performance",
		includeZero: true
	  },
	  axisY2: {
		title: "Actual Scores",
		includeZero: true,
		labelFormatter: (e:any) => {
			var suffixes = ["", "K", "M", "B"];
 
			var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
			if(order > suffixes.length - 1)
				order = suffixes.length - 1;
 
			var suffix = suffixes[order];
			return '' + (e.value / Math.pow(1000, order)) + suffix;
		}
	  },
	  toolTip: {
		shared: true
	  },
	  legend: {
		cursor: "pointer",
		itemclick: function (e: any) {
			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			} 
			e.chart.render();
		}
	  },
	  data: [{
		type: "column",
		showInLegend: true,
		name: "Actual Score",
		axisYType: "secondary",
		yValueFormatString: "#,###",
		dataPoints: [
			{ label: "Jul", y: 74 },
			{ label: "Aug", y: 50 },
			{ label: "Sep", y: 52 },
			{ label: "Oct", y: 73 },
			{ label: "Nov", y: 51 },
			{ label: "Dec", y: 31 },
			{ label: "Jan", y: 0 },
			{ label: "Feb", y: 0 },
			{ label: "Mar", y: 0 },
			{ label: "Apr", y: 0 },
			{ label: "May", y: 0 },
			{ label: "Jun", y: 0 },
		]
	  },{
		type: "spline",
		showInLegend: true,
		name: "Monthly Scores",
		dataPoints: [
			{ label: "Jul", y: 94 },
			{ label: "Aug", y: 90 },
			{ label: "Sep", y: 52 },
			{ label: "Oct", y: 73 },
			{ label: "Nov", y: 51 },
			{ label: "Dec", y: 31 },
			{ label: "Jan", y: 0 },
			{ label: "Feb", y: 0 },
			{ label: "Mar", y: 0 },
			{ label: "Apr", y: 0 },
			{ label: "May", y: 0 },
			{ label: "Jun", y: 0 },
		]
	  }]
	}	
}              
