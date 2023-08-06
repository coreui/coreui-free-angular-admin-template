import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOverviewComponent } from './products-overview.component';

describe('ProductsOverviewComponent', () => {
  let component: ProductsOverviewComponent;
  let fixture: ComponentFixture<ProductsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
