import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-pc-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CanvasJSAngularChartsModule
  ],
  templateUrl: './pc-card.component.html',
  styleUrl: './pc-card.component.scss'
})
export class PcCardComponent {
  chart: any;

  chartOptions = {
    theme: "dark",
    title: {
      text: "Summery of Expenditure"
    },
    animationEnabled: true,
    toolTip: {
      shared: true
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      reversed: true
    },
    axisY: {
      includeZero: true
    },
    data: [
      {
        type: "stackedColumn",
        name: "BREAKFAST LUNCH",
        showInLegend: true,
        dataPoints: [
          { label: "TO&S Division", y: 19729 },
          { label: "IMD", y: 22127 },
          { label: "CAO", y: 12654 },
          { label: "EPC", y: 5338 },
          { label: "VLA", y: 8670 },
          { label: "IAI", y: 4779 },
          { label: "Investigations", y: 22914 }
        ]
      }, {
        type: "stackedColumn",
        name: "PER DIEM",
        showInLegend: true,
        dataPoints: [
          { label: "TO&S Division", y: 19729 },
          { label: "IMD", y: 22127 },
          { label: "CAO", y: 12654 },
          { label: "EPC", y: 5338 },
          { label: "VLA", y: 8670 },
          { label: "IAI", y: 4779 },
          { label: "Investigations", y: 22914 }
        ]
      },{
        type: "stackedColumn",
        name: "TICKETING TRAVEL",
        showInLegend: true,
        dataPoints: [
          { label: "TO&S Division", y: 19729 },
          { label: "IMD", y: 22127 },
          { label: "CAO", y: 12654 },
          { label: "EPC", y: 5338 },
          { label: "VLA", y: 8670 },
          { label: "IAI", y: 4779 },
          { label: "Investigations", y: 22914 }
        ]
      },{
        type: "stackedColumn",
        name: "CONFERENCE",
        showInLegend: true,
        dataPoints: [
          { label: "TO&S Division", y: 19729 },
          { label: "IMD", y: 22127 },
          { label: "CAO", y: 12654 },
          { label: "EPC", y: 5338 },
          { label: "VLA", y: 8670 },
          { label: "IAI", y: 4779 },
          { label: "Investigations", y: 22914 }
        ]
      },{
        type: "stackedColumn",
        name: "ACCOUNTABLE IMPREST",
        showInLegend: true,
        dataPoints: [
          { label: "TO&S Division", y: 19729 },
          { label: "IMD", y: 22127 },
          { label: "CAO", y: 12654 },
          { label: "EPC", y: 5338 },
          { label: "VLA", y: 8670 },
          { label: "IAI", y: 4779 },
          { label: "Investigations", y: 22914 }
        ]
      }
    ]
  }
}
