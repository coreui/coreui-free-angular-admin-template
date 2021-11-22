import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { getStyle, rgbToHex } from '@coreui/utils/src';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private renderer: Renderer2
  ) {
  }

  public themeColors(): void {
    Array.from(this.document.querySelectorAll('.theme-color')).forEach(
      // @ts-ignore
      (el: HTMLElement) => {
        const background = getStyle('background-color', el);
        const table = this.renderer.createElement('table');
        table.innerHTML = `
          <table class='table w-100'>
            <tr>
              <td class='text-muted'>HEX:</td>
              <td class='font-weight-bold'>${rgbToHex(background)}</td>
            </tr>
            <tr>
              <td class='text-muted'>RGB:</td>
              <td class='font-weight-bold'>${background}</td>
            </tr>
          </table>
        `;
        this.renderer.appendChild(el.parentNode, table);
        // @ts-ignore
        // el.parentNode.appendChild(table);
      }
    );
  }

  ngOnInit(): void {
    // this.themeColors();
  }

  ngAfterViewInit(): void {
    this.themeColors();
  }
}

@Component({
  selector: 'app-theme-color',
  template: `
    <c-col xl='2' md='4' sm='6' xs='12' class='my-4 ms-4'>
      <div [ngClass]='colorClasses' style='padding-top: 75%;'></div>
      <ng-content></ng-content>
    </c-col>
  `
})
export class ThemeColorComponent implements OnInit {
  @Input() color = '';
  public colorClasses = {
    'theme-color w-75 rounded mb-3': true
  };

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {
    this.colorClasses = {
      ...this.colorClasses,
      [`bg-${this.color}`]: !!this.color
    };
  }
}

