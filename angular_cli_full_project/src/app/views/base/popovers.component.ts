import {Component, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  templateUrl: 'popovers.component.html'
})
export class PopoversComponent {

  constructor(sanitizer: DomSanitizer) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html)
  }

  title: string = 'Welcome word';
  content: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
  html: string = `<span class="btn btn-warning">Never trust not sanitized <code>HTML</code>!!!</span>`;
}
