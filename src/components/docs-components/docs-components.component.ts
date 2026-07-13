import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-docs-components',
  imports: [NgOptimizedImage],
  templateUrl: './docs-components.component.html'
})
export class DocsComponentsComponent {
  readonly href = input('');
}
