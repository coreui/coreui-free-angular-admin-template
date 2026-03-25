import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, TableModule } from '@coreui/angular';
import { TableDirective } from '@coreui/angular';

interface PodiumEntry {
  posizione: number;
  nome: string;
  img: string;
  colore: string;
  punti: string;
}

interface ClassificaEntry {
  posizione: string;
  nome: string;
  punti: string;
}

@Component({
  selector: 'app-podium-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CardModule, TableModule, TableDirective],
  templateUrl: './podium-card.component.html',
  styleUrls: ['./podium-card.component.scss']
})
export class PodiumCardComponent {
  podio = input<PodiumEntry[]>([]);
  classifica = input<ClassificaEntry[]>([]);
  championshipTitle = input<string>('');
}