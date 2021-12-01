import { Component, Input } from '@angular/core';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-docs-callout',
  templateUrl: './docs-callout.component.html',
  styleUrls: ['./docs-callout.component.scss']
})
export class DocsCalloutComponent {

  @Input() name: string = '';

  constructor() { }

  private _href: string = 'https://coreui.io/angular/docs/';

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = packageJson?.config?.coreui_library_short_version;
    const docsUrl = packageJson?.config?.coreui_library_docs_url ?? 'https://coreui.io/angular/';
    const path: string = version ? `${version}/${value}` : '';
    this._href = `${docsUrl}${path}`;
  }

  get plural() {
    return this.name?.slice(-1) === 's';
  }

}
