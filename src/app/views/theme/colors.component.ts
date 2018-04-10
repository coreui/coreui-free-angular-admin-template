import { Component, OnInit } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/coreui/js/src/utilities/'

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  public themeColors(): void {
    Array.from(document.querySelectorAll('.theme-color')).forEach(function(el) {
      let elem = document.getElementsByClassName(el.classList[0])[0];
      let background = getStyle('background-color', elem);

      let table = document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
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

      el.parentNode.appendChild(table);
    });

  }

  ngOnInit(): void {
    this.themeColors();
  }
}
