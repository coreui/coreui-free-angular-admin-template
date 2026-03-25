import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, ListGroupModule } from '@coreui/angular';
import { FantaService } from '../../service/fanta.service';

@Component({
  selector: 'app-fanta-rules',
  imports: [CommonModule, CardModule, ListGroupModule],
  templateUrl: './fanta-rules.component.html',
  styleUrls: ['./fanta-rules.component.scss']
})
export class FantaRulesComponent {
  readonly positionPoints = FantaService.CORRECT_RESPONSE_POINTS;
  readonly fastLapPoints = FantaService.CORRECT_RESPONSE_FAST_LAP_POINTS;
  readonly dnfPoints = FantaService.CORRECT_RESPONSE_DNF_POINTS;
  readonly teamPoints = FantaService.CORRECT_RESPONSE_TEAM;

  readonly exactPositionPoints = this.positionPoints[0];
  readonly oneOffPoints = this.positionPoints[1];
  readonly twoOffPoints = this.positionPoints[2];
}
