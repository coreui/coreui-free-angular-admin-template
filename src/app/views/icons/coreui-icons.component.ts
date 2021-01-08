import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@angular/cdk/platform';

import { IconSetService } from '@coreui/icons-angular';

@Component({
  templateUrl: 'coreui-icons.component.html',
  styleUrls: ['coreui-icons.component.scss']
})
export class CoreUIIconsComponent implements OnInit {
  public title = 'CoreUI Icons';
  public icons = [];

  constructor(
    public platform: Platform,
    private route: ActivatedRoute,
    public iconSet: IconSetService
  ) {}

  ngOnInit() {
    const path = this.route.routeConfig.path;
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

  toKebabCase(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }
}
