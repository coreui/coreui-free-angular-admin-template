import { Component, computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { IconComponent } from '@coreui/icons-angular';
import { DocsIconsComponent, DocsLinkComponent } from '@docs-components/public-api';

const sets: Record<string, { title: string; sprite: string }> = {
  'coreui-icons': { title: 'Free', sprite: 'free' },
  brands: { title: 'Brands', sprite: 'brand' },
  flags: { title: 'Flags', sprite: 'flag' }
};

@Component({
  templateUrl: 'coreui-icons.component.html',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent,
    DocsIconsComponent,
    DocsLinkComponent,
    IconComponent,
    RowComponent
  ]
})
export class CoreUIIconsComponent {
  readonly #path = inject(ActivatedRoute).routeConfig?.path ?? 'coreui-icons';
  readonly #set = sets[this.#path] ?? sets['coreui-icons'];

  readonly title = `CoreUI Icons - ${this.#set.title}`;
  readonly spriteUrl = `assets/icons/${this.#set.sprite}.svg`;

  readonly #sprite = httpResource.text(() => this.spriteUrl);
  readonly icons = computed(() =>
    Array.from(this.#sprite.value()?.matchAll(/<symbol id="([^"]+)"/g) ?? [], (match) => match[1])
  );
}
