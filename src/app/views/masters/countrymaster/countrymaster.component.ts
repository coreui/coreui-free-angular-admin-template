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
import { MastersService, CountryApiResponse } from '../../../services/masters.service';

// Interface for our component
interface CountryDisplay {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

@Component({
  selector: 'app-countrymaster',
  templateUrl: './countrymaster.component.html',
  styleUrls: ['./countrymaster.component.scss'],
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
export class CountrymasterComponent implements OnInit {
  // Data properties
  countries: CountryDisplay[] = [];
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
    this.loadCountries();
  }

  private initializeGrid(): void {
    this.pageSettings = { pageSize: 10, pageSizes: [10, 20, 30] };
    this.toolbar = ['Search'];
    this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false };
    this.filterSettings = { type: 'Menu' };
  }

  loadCountries(): void {
    this.loading = true;
    this.error = '';

    this.mastersService.getCountries().subscribe({
      next: (countries: CountryApiResponse[]) => {
        this.countries = this.mapCountriesForDisplay(countries);
        this.data = this.countries;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load countries';
        this.loading = false;
      }
    });
  }

  private mapCountriesForDisplay(apiCountries: CountryApiResponse[]): CountryDisplay[] {
    return apiCountries.map(country => ({
      id: country.countryId,
      name: country.countryName,
      code: country.countryCode,
      isActive: country.isActive
    }));
  }
}
