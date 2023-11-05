import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Product} from '@core/model/product';
import {AuthService} from '@core/services/auth.service';
import {ProductsService} from '@core/services/products.service';
import {ResizeImagesService} from '@core/services/resize-images.service';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestAll,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  ReplaySubject
} from 'rxjs';
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {Router} from "@angular/router";


@Component({
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent implements OnInit {

  products?: Observable<Product[]>

  constructor(readonly productsService: ProductsService,
     readonly authSvc: AuthService,
      private readonly resizeImageService: ResizeImagesService,
      private readonly router: Router) { }

  ngOnInit(): void {
    this.products = this.productsService.fetchProducts(this.authSvc.authenticatedUser?.supplierId!)
    .pipe(map((products:Product[]) => {
      return products.map( p => {
        let defaultImage = of('assets/img/avatars/1.jpg');
        let productResizedImages = p.imagesUrl?.map((image,i) => {
           return fromPromise( this.createFileFromURL(image, `img-${p.name}-${i}`))
              .pipe(
                  mergeMap(file => !!file ? this.resizeImageService.resizeImage2(file, 100, 200, 100, 200) : defaultImage)
              );
        });
        if(productResizedImages && productResizedImages?.length <= 0) {
          // if no images available display at least the default image
          productResizedImages?.push(defaultImage)
        }

        return Object.assign(p, { imagesUrl: productResizedImages})
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

  deepCopy(obj: any, seen?: Map<Object, Object>): any {
    var copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle cycles
    if (!seen) {
      seen = new Map();
    } else {
      const clonedObj = seen.get(obj);
      if (clonedObj) {
        return clonedObj;
      }
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      seen.set(obj, copy);
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i], seen);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      seen.set(obj, copy);
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr], seen);
      }
      Object.setPrototypeOf(copy, Object.getPrototypeOf(obj)); // keep prototype chain (classes)
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }


  clone(product: Product) {
    return JSON.parse(JSON.stringify(product));

  }

  seeDetails(product: Product) {
    let productClone = this.clone(product);
    /*this.imagesClones.get(product.code)?.forEach(obs => obs.subscribe(val => {
      console.log('val is ' + JSON.stringify(val))
    }))*/
    combineLatest(/*this.imagesClones.get(product.code)*/ product.imagesUrl as Observable<any>[]).subscribe(
        (results: any[]) => {
          // 'results' will contain the last emitted value from each Observable in the array
          console.log('All observables have completed:', results);
          // You can perform actions with the resolved values here
          productClone.imagesUrl = results;
          this.router.navigateByUrl(`/products/detail/${product.code}`, {
            state: {
              'product': productClone
            }
          })
        },
        (error) => {
          // Handle errors if any of the Observables fail
          console.error('One or more observables encountered an error:', error);
        }
    );


  }
}
