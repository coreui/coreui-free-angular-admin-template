import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { CoreUIIconsComponent } from './coreui-icons.component';

const sprite = `<svg><defs>
<symbol id="cil-3d" viewBox="0 0 512 512"></symbol>
<symbol id="cil-4k" viewBox="0 0 512 512"></symbol>
</defs></svg>`;

describe('CoreUIIconsComponent', () => {
  let httpMock: HttpTestingController;

  function setup(path: string) {
    TestBed.configureTestingModule({
      imports: [CoreUIIconsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { routeConfig: { path } } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    const fixture: ComponentFixture<CoreUIIconsComponent> = TestBed.createComponent(CoreUIIconsComponent);
    fixture.detectChanges();
    return fixture;
  }

  afterEach(() => httpMock.verify());

  it('should create', () => {
    const fixture = setup('coreui-icons');
    httpMock.expectOne('assets/icons/free.svg');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it.each([
    ['coreui-icons', 'free', 'Free'],
    ['brands', 'brand', 'Brands'],
    ['flags', 'flag', 'Flags']
  ])('should load the %s sprite', (path, sprite, title) => {
    const fixture = setup(path);
    httpMock.expectOne(`assets/icons/${sprite}.svg`);
    expect(fixture.componentInstance.title).toBe(`CoreUI Icons - ${title}`);
  });

  it('should render an icon for every symbol in the sprite', async () => {
    const fixture = setup('coreui-icons');
    httpMock.expectOne('assets/icons/free.svg').flush(sprite);
    await fixture.whenStable();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const uses = element.querySelectorAll('c-card svg use');
    expect(Array.from(uses, (use) => use.getAttribute('href'))).toEqual([
      'assets/icons/free.svg#cil-3d',
      'assets/icons/free.svg#cil-4k'
    ]);
    expect(element.textContent).toContain('cil-4k');
  });
});
