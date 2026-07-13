import { Component, effect, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-docs-link',
  templateUrl: './docs-link.component.html',
  host: {
    class: 'float-end'
  }
})
export class DocsLinkComponent {

  readonly hrefInput = input('https://coreui.io/angular/docs/', { alias: 'href' });

  readonly href = linkedSignal(this.hrefInput);

  readonly name = input<string>();
  readonly text = input<string>();

  readonly #nameEffect = effect(() => {
    const name = this.name();
    this.href.update(href => name ? `https://coreui.io/angular/docs/components/${name}` : href);
  });

}
