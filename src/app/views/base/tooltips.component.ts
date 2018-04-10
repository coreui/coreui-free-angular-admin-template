import {Component, SecurityContext} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  templateUrl: 'tooltips.component.html'
})
export class TooltipsComponent {

  constructor(sanitizer: DomSanitizer) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html)
  }

  content: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
  html: string = `<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;
}
