import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionsComponent } from './accordion/accordions.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselsComponent } from './carousels/carousels.component';
import { CollapsesComponent } from './collapses/collapses.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { NavsComponent } from './navs/navs.component';
import { PaginationsComponent } from './paginations/paginations.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ProgressComponent } from './progress/progress.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { TablesComponent } from './tables/tables.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TabsComponent } from './tabs/tabs.component';
import { PlaceholdersComponent } from './placeholders/placeholders.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Majors',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cards',
      },
      {
        path: 'accordion',
        component: AccordionsComponent,
        data: {
          title: 'SE',
        },
      },
      {
        path: 'breadcrumbs',
        component: BreadcrumbsComponent,
        data: {
          title: 'SS',
        },
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'SA',
        },
      },
      {
        path: 'carousel',
        component: CarouselsComponent,
        data: {
          title: 'AI',
        },
      },
      {
        path: 'collapse',
        component: CollapsesComponent,
        data: {
          title: 'Collapse',
        },
      },
      {
        path: 'list-group',
        component: ListGroupsComponent,
        data: {
          title: 'List-group',
        },
      },
      {
        path: 'navs',
        component: NavsComponent,
        data: {
          title: 'Navs & Tabs',
        },
      },
      {
        path: 'pagination',
        component: PaginationsComponent,
        data: {
          title: 'Pagination',
        },
      },
      {
        path: 'placeholder',
        component: PlaceholdersComponent,
        data: {
          title: 'Placeholder',
        },
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popovers',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress',
        },
      },
      {
        path: 'spinners',
        component: SpinnersComponent,
        data: {
          title: 'Spinners',
        },
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables',
        },
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs',
        },
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}

