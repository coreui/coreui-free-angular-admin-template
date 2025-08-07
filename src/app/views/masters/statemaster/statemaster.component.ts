import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


// CoreUI Components
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  ButtonDirective
} from '@coreui/angular';

// Syncfusion Grid
import { GridModule, PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';

// Services
import { MastersService, StateApiResponse, CountryApiResponse } from '../../../services/masters.service';

// Interface for our component
interface StateDisplay {
  id: number;
  name: string;
  isActive: boolean;
}

@Component({
  selector: 'app-statemaster',
  templateUrl: './statemaster.component.html',
  styleUrls: ['./statemaster.component.scss'],
  imports: [
    CommonModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    GridModule
  ],
  providers: [PageService, SortService, FilterService, EditService, ToolbarService]
})
export class StatemasterComponent implements OnInit {
  // Data properties
  states: StateDisplay[] = [];
  countries: CountryApiResponse[] = [];
  loading = false;
  error = '';
  
  // Syncfusion Grid properties
  public data: object[] = [];
  public pageSettings: object = {};
  public toolbar: string[] = [];
  public editSettings: object = {};
  public filterSettings: object = {};

  constructor(
    private mastersService: MastersService
  ) {}

  ngOnInit(): void {
    this.initializeGrid();
    this.loadStates();
  }

  private initializeGrid(): void {
    this.pageSettings = { pageSize: 10, pageSizes: [10, 20, 30] };
    this.toolbar = ['Search'];
    this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false };
    this.filterSettings = { type: 'Menu' };
  }

  loadStates(): void {
    this.loading = true;
    this.error = '';

    this.mastersService.getStates().subscribe({
      next: (states: StateApiResponse[]) => {
        this.states = this.mapStatesForDisplay(states);
        this.data = this.states;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load states';
        this.loading = false;
      }
    });
  }

  private loadCountries(): void {
    this.mastersService.getCountries().subscribe({
      next: (countries: CountryApiResponse[]) => {
        this.countries = countries;
      },
      error: (error: any) => {
        this.error = 'Failed to load countries';
      }
    });
  }

  private mapStatesForDisplay(apiStates: StateApiResponse[]): StateDisplay[] {
    return apiStates.map(state => ({
      id: state.stateId,
      name: state.stateName,
      isActive: state.isActive
    }));
  }
}
