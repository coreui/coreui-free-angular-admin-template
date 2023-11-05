import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { CoreUiDepsModule } from '@coreui-deps/coreui-deps.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead'
import { SharedModule } from '@shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {CoreModule} from "@core/core.module";

@NgModule({
  declarations: [
    CreateProductComponent,
    ProductsOverviewComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CoreUiDepsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedModule,
    CdkStepperModule,
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),
    CoreModule,
  ]
})
export class ProductsModule { }
