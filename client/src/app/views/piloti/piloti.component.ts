import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DbDataService } from '../../service/db-data.service';
import { ConstructorService } from '../../service/constructor.service';
import { 
  ColComponent,
  RowComponent,
  Tabs2Module,
} from '@coreui/angular';
import type { Constructor, DriverData } from '@f123dashboard/shared';
import { PilotCardComponent } from '../../components/pilot-card/pilot-card.component';
import { ConstructorCardComponent } from '../../components/constructor-card/constructor-card.component';

@Component({
    selector: 'app-cards',
    templateUrl: './piloti.component.html',
    styleUrls: ['./piloti.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    Tabs2Module,
    PilotCardComponent,
    ConstructorCardComponent
]
})

export class PilotiComponent implements OnInit {
  private dbData = inject(DbDataService);
  private constructorService = inject(ConstructorService);

  piloti = signal<DriverData[]>([]);
  constructors = signal<Constructor[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    try {
      this.isLoading.set(true);
      
      // Fetch data from service
      const drivers = this.dbData.allDrivers();
      const constructorsData = this.dbData.constructors();

      // Calculate points for constructors based on drivers data
      const constructorsWithPoints = this.constructorService.calculateConstructorPoints(constructorsData, drivers);
      
      this.piloti.set(drivers);
      this.constructors.set(constructorsWithPoints);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
