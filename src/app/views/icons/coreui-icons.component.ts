import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { DocsIconsComponent, DocsLinkComponent } from '@docs-components/public-api';

@Component({
  templateUrl: 'coreui-icons.component.html',
  providers: [IconSetService],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ColComponent,
    DocsIconsComponent,
    DocsLinkComponent,
    IconDirective,
    RowComponent,
  ]
})
export class CoreUIIconsComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly iconSet = inject(IconSetService);

  readonly title = signal('CoreUI Icons');
  readonly icons = signal<[string, string[]][]>([]);

  constructor() {
    this.iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit() {
    const path = this.route?.routeConfig?.path;
    let prefix = 'cil';
    if (path === 'coreui-icons') {
      this.title.update(title => `${title} - Free`);
      prefix = 'cil';
    } else if (path === 'brands') {
      this.title.update(title => `${title} - Brands`);
      prefix = 'cib';
    } else if (path === 'flags') {
      this.title.update(title => `${title} - Flags`);
      prefix = 'cif';
    }
    this.icons.set(this.getIconsView(prefix));
  }

  toKebabCase(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }
}
