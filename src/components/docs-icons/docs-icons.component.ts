import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-docs-icons',
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './docs-icons.component.html'
})
export class DocsIconsComponent {

}
