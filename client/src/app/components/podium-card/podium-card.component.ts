import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, TableModule } from '@coreui/angular';
import { TableDirective } from '@coreui/angular';

interface PodiumEntry {
  nome: string;
  img: string;
  colore: string;
  punti: string;
}

interface ClassificaEntry {
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

  private readonly fallbackPalette = ['#d34fa4', '#5f9de5', '#f0c419', '#ff7a18', '#3bb273', '#7c5cff'];

  getDriverAccentColor(entry: PodiumEntry): string {
    const providedColor = entry.colore?.trim();
    if (providedColor) {
      return providedColor;
    }

    const hash = entry.nome
      .split('')
      .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);

    return this.fallbackPalette[Math.abs(hash) % this.fallbackPalette.length];
  }
}
