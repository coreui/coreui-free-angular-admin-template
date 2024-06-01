import { Routes } from '@angular/router';
import { IndicatorsComponent } from './indicators.component';

export const routes: Routes = [
  {
    path: '',
    component: IndicatorsComponent,
    data: {
      title: 'Lista de Indicadores'
    }
  }
];