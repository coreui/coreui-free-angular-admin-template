import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

import packageJson from '../../../package.json';

@Component({
  selector: 'app-docs-example',
  templateUrl: './docs-example.component.html',
  styleUrls: ['./docs-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsExampleComponent implements AfterContentInit, AfterViewInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @Input() fragment?: string;

  private _href = 'https://coreui.io/angular/docs/';

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = packageJson?.config?.coreui_library_short_version;
    const docsUrl = packageJson?.config?.coreui_library_docs_url ?? 'https://coreui.io/angular/';
    // const path: string = version ? `${version}/#/${value}` : '#';
    const path: string = version ? `${version}/${value}` : '';
    this._href = `${docsUrl}${path}`;
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.markForCheck();
  }
}
