import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'country',
    loadComponent: () => import('./countrymaster/countrymaster.component').then(m => m.CountrymasterComponent),
    data: {
      title: 'Country Master'
    }
  },
  {
    path: 'state',
    loadComponent: () => import('./statemaster/statemaster.component').then(m => m.StatemasterComponent),
    data: {
      title: 'State Master'
    }
  },
  {
    path: 'city',
    loadComponent: () => import('./citymaster/citymaster.component').then(m => m.CitymasterComponent),
    data: {
      title: 'City Master'
    }
  }
]; 