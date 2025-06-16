import { Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CalloutComponent } from '@coreui/angular';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-docs-callout',
  templateUrl: './docs-callout.component.html',
  imports: [CalloutComponent, NgTemplateOutlet]
})
export class DocsCalloutComponent {

  readonly name = input('');

  readonly hrefInput = input<string>('https://coreui.io/angular/docs/', { alias: 'href' });

  readonly plural = computed(() => this.name()?.slice(-1) === 's');

  readonly href = computed(() => {
    const version = packageJson?.config?.coreui_library_short_version;
    const docsUrl = packageJson?.config?.coreui_library_docs_url ?? 'https://coreui.io/angular/';
    const href = this.hrefInput();
    // const path: string = version ? `${version}/${href}` : `${href}`;
    const path: string = href;
    return `${docsUrl}${path}`;
  });
}
