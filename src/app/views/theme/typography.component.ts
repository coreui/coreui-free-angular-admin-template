import { Component } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { ProductService } from '../../services/product.service';

@Component({
  templateUrl: 'typography.component.html',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent
  ]
})
export class TypographyComponent{
    products:any;
    totalPrice: number = 0;
    prod:any;
    isLoading = false;
    constructor(private productService:ProductService){

    }
   ngOnInit() {
     this.isLoading = true;
     this.productService.getAllAddToCartProduct()
     .subscribe((response:any)=>{
       this.products = response.products;
       this.calculateTotal(this.products)
       this.isLoading = false;
     },error=>{
        console.log(error)
        this.isLoading = false;
     });

   }
   handleRemoveProduct(id:any){
     this.isLoading = true;
     this.productService.getRemoveAddToCart(id).subscribe((response:any)=>{
           alert(response.message)
             this.isLoading = false;
              this.productService.getAllAddToCartProduct();
       },error=>{
          alert(error)
           this.isLoading = false;
       })
   }
   calculateTotal(products:any): void {
    console.log(products)
    this.totalPrice = products.reduce((acc:any, item:any) => {
      return acc + (item.price);
    }, 0);
  }
}
