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
import { MastersService, CityApiResponse, StateApiResponse, CountryApiResponse } from '../../../services/masters.service';

// Interface for our component
interface CityDisplay {
  id: number;
  name: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  isActive: boolean;
}

@Component({
  selector: 'app-citymaster',
  templateUrl: './citymaster.component.html',
  styleUrls: ['./citymaster.component.scss'],
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
export class CitymasterComponent implements OnInit {
  // Data properties
  cities: CityDisplay[] = [];
  states: StateApiResponse[] = [];
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
    this.loadCities();
  }

  private initializeGrid(): void {
    this.pageSettings = { pageSize: 10, pageSizes: [10, 20, 30] };
    this.toolbar = ['Search'];
    this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false };
    this.filterSettings = { type: 'Menu' };
  }

  loadCities(): void {
    this.loading = true;
    this.error = '';

    this.mastersService.getCities().subscribe({
      next: (cities: CityApiResponse[]) => {
        this.cities = this.mapCitiesForDisplay(cities);
        this.data = this.cities;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load cities';
        this.loading = false;
      }
    });
  }

  private loadStates(): void {
    this.mastersService.getStates().subscribe({
      next: (states: StateApiResponse[]) => {
        this.states = states;
      },
      error: (error: any) => {
        this.error = 'Failed to load states';
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

  private mapCitiesForDisplay(apiCities: CityApiResponse[]): CityDisplay[] {
    return apiCities.map(city => {
      const state = this.states.find(s => s.stateId === city.stateId);
      const country = this.countries.find(c => c.countryId === (state?.countryId || 0));
      
      return {
        id: city.cityId,
        name: city.cityName,
        stateId: city.stateId,
        stateName: state?.stateName || '',
        countryId: state?.countryId || 0,
        countryName: country?.countryName || '',
        isActive: city.isActive
      };
    });
  }
}
