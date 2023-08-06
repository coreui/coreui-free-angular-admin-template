import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '@core/model/product';
import { Observable, of, tap } from 'rxjs';
import {NgxImageCompressService} from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly afs: AngularFirestore,  private readonly domSanitizer: DomSanitizer,  private readonly imageCompressService: NgxImageCompressService) { }

  fetchProducts(customerId: string): Observable<Product[]> {

    return this.afs.collection<Product>(`suppliers/${customerId}/products`)
    .valueChanges()
    
    // JUST FOR TEST
    /*return of([
      {
        code: '123',
        name: 'Aglianico Rosso Bonito',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino rosso',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date(),
      } as Product,
      {
        code: '124',
        name: 'Falaghina Bianca',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino bianco',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product,
      {
        code: '125',
        name: 'Coda di volpe beneventatna',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino bianco',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product,
      {
        code: '126',
        name: 'Fiano di avellino',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino bianco',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product,
      {
        code: '127',
        name: 'Taurasi Rosso Bonito',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino rosso',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product,
      {
        code: '128',
        name: 'Monte Pulciano',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino rosso',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product,
      {
        code: '129',
        name: 'Piede di palumbo',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino rosso',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product,
      {
        code: '130',
        name: 'Piede di palumbo del taburno',
        description: 'te va bell ind a cap e mort pecche se ne scenno comma cioccolata',
        type: 'vino rosso',
        producerName: 'Fratelli Di Nunzio',
        unitPrice: 2.5,
        stock: 400,
        stockLastIncrement: 20,
        stockLastUpdateDate: new Date()
      } as Product
    ]).pipe(tap(res => res.forEach(p => this.fakeImages2(p))))*/

  }

  fakeImages2(p: Product) {
    const fakeImages = ['./assets/img/brand/logo.svg','./assets/img/brand/sygnet.svg']
    p.imagesUrl = ['./assets/img/brand/logo.svg','./assets/img/brand/sygnet.svg'];

  }

  fakeImages(p: Product){
    let result: any[] = [];
    p.imagesUrl = [];
    [new File(['./assets/img/brand/logo.svg'], './assets/img/brand/logo.svg')].forEach((file: File) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        //const base64String = e.target.result.toString().split(',')[1];
        //const encodedUrl = 'data:image/svg;base64,' + base64String
        p.imagesUrl!.push(this.domSanitizer.bypassSecurityTrustUrl(reader.result as string))   
      }
      reader.readAsDataURL(file);
    })
  }

  compressFile(imagePath: String) {
    
    this.imageCompressService.uploadFile().then(({image, orientation}) => {
        imagePath = image;
        console.log('Size in bytes of the uploaded image was:', this.imageCompressService.byteCount(image));

        this.imageCompressService
            .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
            .then(compressedImage => {
                imagePath = compressedImage;
                console.log('Size in bytes after compression is now:', this.imageCompressService.byteCount(compressedImage));
            });
    });
  }

  
}

