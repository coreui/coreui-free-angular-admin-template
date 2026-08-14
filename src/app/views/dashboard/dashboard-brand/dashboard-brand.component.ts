import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ColComponent, RowComponent, WidgetStatDComponent } from '@coreui/angular';

type BrandData = {
  icon: string
  values: { title: string, value: string }[]
  capBg: Record<string, string>
};

@Component({
  selector: 'app-dashboard-brand',
  templateUrl: './dashboard-brand.component.html',
  imports: [RowComponent, ColComponent, WidgetStatDComponent, IconDirective]
})
export class DashboardBrandComponent {
  brandData: BrandData[] = [
    {
      icon: 'cibFacebook',
      values: [{ title: 'friends', value: '89K' }, { title: 'feeds', value: '459' }],
      capBg: { '--cui-card-cap-bg': '#3b5998' }
    },
    {
      icon: 'cibYoutube',
      values: [{ title: 'subscribers', value: '973k' }, { title: 'new comments', value: '1.792' }],
      capBg: { '--cui-card-cap-bg': '#ff0132' }
    },
    {
      icon: 'cibLinkedin',
      values: [{ title: 'contacts', value: '500+' }, { title: 'feeds', value: '292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' }
    }
  ];
}
