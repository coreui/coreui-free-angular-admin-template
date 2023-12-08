import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pc-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule
  ],
  templateUrl: './pc-card.component.html',
  styleUrl: './pc-card.component.scss'
})
export class PcCardComponent {

}
