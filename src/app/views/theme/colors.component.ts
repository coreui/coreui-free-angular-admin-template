import { AfterViewInit, Component, computed, DOCUMENT, forwardRef, inject, input, OnInit, Renderer2 } from '@angular/core';
import { NgClass } from '@angular/common';

import { getStyle, rgbToHex } from '@coreui/utils';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';

@Component({
  templateUrl: 'colors.component.html',
  imports: [CardComponent, CardHeaderComponent, CardBodyComponent, RowComponent, forwardRef(() => ThemeColorComponent)]
})
export class ColorsComponent implements OnInit, AfterViewInit {
  private document = inject<Document>(DOCUMENT);
  private renderer = inject(Renderer2);

  public themeColors(): void {
    Array.from(this.document.querySelectorAll('.theme-color')).forEach(
      (element: Element) => {
        const htmlElement = element as HTMLElement;
        const background = getStyle('background-color', htmlElement) ?? '#fff';
        const table = this.renderer.createElement('table');
        table.innerHTML = `
          <table class="table w-100">
            <tr>
              <td class="text-muted">HEX:</td>
              <td class="font-weight-bold">${rgbToHex(background)}</td>
            </tr>
            <tr>
              <td class="text-muted">RGB:</td>
              <td class="font-weight-bold">${background}</td>
            </tr>
          </table>
        `;
        this.renderer.appendChild(htmlElement.parentNode, table);
        // @ts-ignore
        // el.parentNode.appendChild(table);
      }
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.themeColors();
  }
}

@Component({
  selector: 'app-theme-color',
  template: `
    <c-col xl="2" md="4" sm="6" xs="12" class="my-4 ms-4">
      <div [ngClass]="colorClasses()" style="padding-top: 75%;"></div>
      <ng-content />
    </c-col>
  `,
  imports: [ColComponent, NgClass],
  host: {
    style: 'display: contents;'
  }
})
export class ThemeColorComponent {
  readonly color = input('');

  readonly colorClasses = computed(() => {
    const color = this.color();
    return {
      'theme-color w-75 rounded mb-3': true,
      [`bg-${color}`]: !!color
    };
  });
  
}

