import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import {ProductDetailComponent} from "@features/products/product-detail/product-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'create', component: CreateProductComponent },
      { path: 'overview', component: ProductsOverviewComponent },
      { path: 'detail/:code', component: ProductDetailComponent, outlet: 'primary' }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
