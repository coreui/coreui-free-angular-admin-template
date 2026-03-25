import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { DbDataService } from './service/db-data.service';
import { FantaService } from './service/fanta.service';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { TwitchApiService } from './service/twitch-api.service';
import { PlaygroundService } from './service/playground.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt, 'it-IT');

export function initializeApp(dbDataService: DbDataService, twitchApiService: TwitchApiService, playgroundService: PlaygroundService, fantaService: FantaService) {
  return async () => {
    await Promise.all([
      dbDataService.allData(),
      playgroundService.allData(),
      fantaService.loadFantaVotes(),
      twitchApiService.checkStreamStatus().catch(err => {
        console.error('Error during Twitch stream status check:', err);
      })
    ]);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync(),

    provideHttpClient(),
    DbDataService,
    TwitchApiService,
    provideAppInitializer(() => {
        const initializerFn = (initializeApp)(inject(DbDataService), inject(TwitchApiService), inject(PlaygroundService), inject(FantaService));
        return initializerFn();
      })
  ]
};
