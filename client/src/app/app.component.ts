import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilCoffee } from '@coreui/icons';

import { iconSubset } from './icons/icon-subset';
import { DbDataService } from 'src/app/service/db-data.service';
import { SeasonService } from 'src/app/service/season.service';
import { TwitchApiService } from './service/twitch-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet />',
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  private dbData = inject(DbDataService);
  private cdr = inject(ChangeDetectorRef);
  private seasonsService = inject(SeasonService);
  private twitchApiService = inject(TwitchApiService);

  title = 'F1 RaceForFederica';

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor() {
    this.#titleService.setTitle(this.title);
    this.#iconSetService.icons = { ...iconSubset, cilCoffee };
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  piloti: any[] = [];

  ngOnInit(): void {
    this.#router.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map((params) => params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0] as string),
        filter((theme) => ['dark', 'light', 'auto'].includes(theme)),
        tap((theme) => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();

    this.cdr.detectChanges();
  }
}
