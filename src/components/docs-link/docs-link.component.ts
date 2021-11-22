import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs-link',
  templateUrl: './docs-link.component.html',
  styleUrls: ['./docs-link.component.scss']
})
export class DocsLinkComponent implements OnInit {

  @Input() href?: string = 'https://coreui.io/angular/docs/';
  @Input() name?: string;
  @Input() text?: string;

  constructor() { }

  @HostBinding('class')
  get hostClasses(): any {
    return {
      'float-end': true
    };
  }

  ngOnInit(): void {
    this.href = this.name ? `https://coreui.io/angular/docs/components/${this.name}` : this.href;
  }

}
