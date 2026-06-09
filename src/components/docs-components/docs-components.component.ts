import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-docs-components',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './docs-components.component.html'
})
export class DocsComponentsComponent {
  readonly href = input('');
}
