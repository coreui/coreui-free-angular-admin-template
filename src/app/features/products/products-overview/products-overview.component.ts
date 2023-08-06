import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Product } from '@core/model/product';
import { AuthService } from '@core/services/auth.service';
import { ProductsService } from '@core/services/products.service';
import { ResizeImagesService } from '@core/services/resize-images.service';
import { Observable, map } from 'rxjs';


@Component({
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products?: Observable<Product[]>


  constructor(readonly productsService: ProductsService,
     readonly authSvc: AuthService,
      private readonly resizeImageService: ResizeImagesService,
      private readonly domSanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.products = this.productsService.fetchProducts(this.authSvc.authenticatedUser?.supplierId!)
    .pipe(map((products:Product[]) => {
      return products.map(p => {
        let productResizedImages: any[] = [];
        p.imagesUrl?.forEach(async (image,i) => {
          let file: File | undefined = await this.createFileFromURL(image, `img-${p.name}-${i}`);
          if(file){
            let resizedFile = await this.resizeImageService.resizeImage(file, 100, 200); 
            productResizedImages.push(this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(resizedFile)))
          }
        });
        return Object.assign(p, {imagesUrl: productResizedImages})
      })
    }));
  }

  async createFileFromURL(url: string, filename: string): Promise<File | undefined> {
    try {
      let response = await fetch(url);
      let blob = await response.blob();
      const file = new File([blob], filename);
      return file;  
    }catch(e){
      console.error('Error creating iamge file from URL:', e);
    }
    return undefined;
  }


}
