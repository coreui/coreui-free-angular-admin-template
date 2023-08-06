import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      //{ path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: 'create', component: CreateProductComponent },
      { path: 'overview', component: ProductsOverviewComponent }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
