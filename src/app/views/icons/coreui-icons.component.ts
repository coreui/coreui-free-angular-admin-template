import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { DocsLinkComponent } from '@docs-components/public-api';

@Component({
    templateUrl: 'coreui-icons.component.html',
    providers: [IconSetService],
    imports: [
        CardComponent,
        CardHeaderComponent,
        CardBodyComponent,
        ColComponent,
        DocsLinkComponent,
        IconDirective,
        RowComponent
    ]
})
export class CoreUIIconsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  iconSet = inject(IconSetService);

  public title = 'CoreUI Icons';
  public icons!: [string, string[]][];

  constructor() {
    const iconSet = this.iconSet;

    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit() {
    const path = this.route?.routeConfig?.path;
    let prefix = 'cil';
    if (path === 'coreui-icons') {
      this.title = `${this.title} - Free`;
      prefix = 'cil';
    } else if (path === 'brands') {
      this.title = `${this.title} - Brands`;
      prefix = 'cib';
    } else if (path === 'flags') {
      this.title = `${this.title} - Flags`;
      prefix = 'cif';
    }
    this.icons = this.getIconsView(prefix);
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
