import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Components'
    },
    children: [
      {
        path: '',
        redirectTo: 'accordion',
        pathMatch: 'full'
      },
      {
        path: 'accordion',
        loadComponent: () => import('./accordion/accordions.component').then(m => m.AccordionsComponent),
        data: {
          title: 'Accordion'
        }
      },
      {
        path: 'alerts',
        loadComponent: () => import('./alerts/alerts.component').then(m => m.AlertsComponent),
        data: {
          title: 'Alerts'
        }
      },
      {
        path: 'badge',
        loadComponent: () => import('./badges/badges.component').then(m => m.BadgesComponent),
        data: {
          title: 'Badge'
        }
      },
      {
        path: 'breadcrumb',
        loadComponent: () => import('./breadcrumbs/breadcrumbs.component').then(m => m.BreadcrumbsComponent),
        data: {
          title: 'Breadcrumb'
        }
      },
      {
        path: 'buttons',
        loadComponent: () => import('./buttons/buttons.component').then(m => m.ButtonsComponent),
        data: {
          title: 'Buttons'
        }
      },
      {
        path: 'button-group',
        loadComponent: () => import('./button-groups/button-groups.component').then(m => m.ButtonGroupsComponent),
        data: {
          title: 'Buttons Group'
        }
      },
      {
        path: 'cards',
        loadComponent: () => import('./cards/cards.component').then(m => m.CardsComponent),
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'carousel',
        loadComponent: () => import('./carousels/carousels.component').then(m => m.CarouselsComponent),
        data: {
          title: 'Carousel'
        }
      },
      {
        path: 'collapse',
        loadComponent: () => import('./collapses/collapses.component').then(m => m.CollapsesComponent),
        data: {
          title: 'Collapse'
        }
      },
      {
        path: 'dropdowns',
        loadComponent: () => import('./dropdowns/dropdowns.component').then(m => m.DropdownsComponent),
        data: {
          title: 'Dropdowns'
        }
      },
      {
        path: 'list-group',
        loadComponent: () => import('./list-groups/list-groups.component').then(m => m.ListGroupsComponent),
        data: {
          title: 'List group'
        }
      },
      {
        path: 'modals',
        loadComponent: () => import('./modals/modals.component').then(m => m.ModalsComponent),
        data: {
          title: 'Modals'
        }
      },
      {
        path: 'navs-tabs',
        loadComponent: () => import('./navs/navs.component').then(m => m.NavsComponent),
        data: {
          title: 'Navs & Tabs'
        }
      },
      {
        path: 'pagination',
        loadComponent: () => import('./paginations/paginations.component').then(m => m.PaginationsComponent),
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'placeholders',
        loadComponent: () => import('./placeholders/placeholders.component').then(m => m.PlaceholdersComponent),
        data: {
          title: 'Placeholders'
        }
      },
      {
        path: 'popovers',
        loadComponent: () => import('./popovers/popovers.component').then(m => m.PopoversComponent),
        data: {
          title: 'Popovers'
        }
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress.component').then(m => m.AppProgressComponent),
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'spinners',
        loadComponent: () => import('./spinners/spinners.component').then(m => m.SpinnersComponent),
        data: {
          title: 'Spinners'
        }
      },
      {
        path: 'tables',
        loadComponent: () => import('./tables/tables.component').then(m => m.TablesComponent),
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        loadComponent: () => import('./tabs/tabs.component').then(m => m.AppTabsComponent),
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'toasts',
        loadComponent: () => import('./toasters/toasters.component').then(m => m.ToastersComponent),
        data: {
          title: 'Toasts'
        }
      },
      {
        path: 'tooltips',
        loadComponent: () => import('./tooltips/tooltips.component').then(m => m.TooltipsComponent),
        data: {
          title: 'Tooltips'
        }
      }
    ]
  }
];
