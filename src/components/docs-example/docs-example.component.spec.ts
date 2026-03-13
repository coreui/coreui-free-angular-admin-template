import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { DocsExampleComponent } from './docs-example.component';
import { iconSubset } from '../../app/icons/icon-subset';

describe('DocsExampleComponent', () => {
  let component: DocsExampleComponent;
  let fixture: ComponentFixture<DocsExampleComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsExampleComponent, IconDirective],
      providers: [
        IconSetService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
          }
        }
      ]
    }).compileComponents();

    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };
    fixture = TestBed.createComponent(DocsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the component correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});
