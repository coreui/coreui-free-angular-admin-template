import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/compat/firestore';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {OrigoSupplierUser} from '@core/model/OrigoSupplierUser';
import {Product, ProductConfiguration} from '@core/model/product';
import {AuthService} from '@core/services/auth.service';
import {ResizeImagesService} from '@core/services/resize-images.service';
import {StorageService} from '@core/services/storage.service';
import {SupplierConfigsService} from '@core/services/supplier-configs.service';
import {Result, UserActionNotificationService} from '@core/services/user-action-notification.service';
import {
  minLength,
  prop,
  propArray,
  propObject,
  ReactiveFormConfig,
  required,
  RxFormBuilder
} from '@rxweb/reactive-form-validators';
import {StepperComponent} from '@shared/stepper/stepper.component';
import {firstErrorMessage} from '@shared/utils/reactive-forms-utils';
import {getDownloadURL, UploadTaskSnapshot} from 'firebase/storage';
import {combineLatest, filter, flatMap, forkJoin, map, mergeMap, of} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {getSHA256Hash} from "boring-webcrypto-sha256";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{

  firstErroMessage = firstErrorMessage

  @ViewChild('cdkStepper')
  cdkStepper: StepperComponent | undefined = undefined;

  productForm!: FormGroup;
  // Data Model
  pInfo = new ProductInfo()
  user: OrigoSupplierUser | undefined = undefined;
  
  categories!: Observable<{ name: string; }[]>;
  imageUrlsDirect: SafeUrl[] = [];
  productConfig: ProductConfiguration = new ProductConfiguration();

  constructor(
     private readonly storageService: StorageService,
     private readonly authService: AuthService,
     private readonly fb: RxFormBuilder,
     private readonly afs: AngularFirestore,
     private readonly domSanitizer: DomSanitizer,
     private readonly supplierConfigService: SupplierConfigsService,
     private actionNotificationService: UserActionNotificationService,
     private router: Router) {
      // Set up the message configuration
      ReactiveFormConfig.set({
        "validationMessage": {
          "no-category": "nessun risultato",
          "required": "campo obbligatorio", 
          "minLength": "inserisci almeno 3 caratteri",
          "descriptionMinLength": "La descrizione del prodotto deve contenere almeno 10 caratteri",
          "picturesMinLength": "scegli almeno 1 fotografia del prodotto"
        }
      })
      
      authService.userDomainSubscribe(user =>  {
        this.user = user;
        this.supplierConfigService.productConfig(user.supplier).subscribe(config => {
          this.productConfig = config;
          this.pInfo.stockAndPrice.stock = config.defaultStockIncrement;
          this.pInfo.stockAndPrice.unitPrice = config.defaultPrice;
        })
      })
  
      

  }
  

  filterName = (value: {name?: string | undefined},index: number): boolean => {
    return !!value.name && value.name !== ''
  }

  ngOnInit(): void {
    
    
    this.productForm = this.fb.formGroup(this.pInfo);
    let $emptyCategory = of({name : ''})
    let $categories = this.afs.collection<{name: string}>('categories').valueChanges();
    this.categories = combineLatest([$emptyCategory, $categories])
    .pipe(
      map(([object, array]) => {
        // Push the object into the array in 1 position
        array.unshift(object)
        return array;
      })
   )
   this.picturesControl.valueChanges.subscribe(next => {
    if((next as FormArray).length === 0) {
      // The form can be reset by the stepper component via reset button. 
      // For picturesControl we need to clean the images src used in the carousel.
      this.imageUrlsDirect = [];
    }
   })
     
  }

  get selectedStep() {
    return this.cdkStepper?.selectedIndex ?? 0;
  }

  get basicInfoControl() : FormGroup{
    return this.productForm.get('basicInfo') as FormGroup;
  }

  get docsControl() : FormGroup {
    return this.productForm.get('docs') as FormGroup;
  }

  get picturesControl() : FormArray {
    return !!(this.docsControl.get('pictures')) ?  (this.docsControl.get('pictures') as FormArray) : new FormArray([]);
  }

  get pictures() : Picture [] {
    return this.picturesControl.controls.map(control => control.value as Picture)
  }


  get groupControls(): FormGroup[] {
    return [this.basicInfoControl, this.docsControl, this.stockAndPriceControl]
  }

  get category() {
    return this.productForm.get('basicInfo')?.get('category')
  }

  get description() {
    return this.productForm.get('basicInfo')?.get('description')
  }

  get categoryValue() {
    return this.category?.value
  }

  get productName() {
    return this.productForm.get('basicInfo')?.get('name')
  }

  get productCode() {
    return this.productForm.get('basicInfo')?.get('code')
  }

  get stockAndPriceControl() : FormGroup {
    return this.productForm.get('stockAndPrice') as FormGroup;
  }

  get stockControl() : FormControl {
    return this.stockAndPriceControl.get('stock') as FormControl;
  }

  get priceControl() : FormControl {
    return this.stockAndPriceControl.get('price') as FormControl;
  }

  onProductImagesSelected = (event: any) => {
    const naturalSizeImages = Array.from(event.target.files as any[]);
    
    naturalSizeImages
   .forEach( file => {
      this.imageUrlsDirect.push(this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
      const pic = new Picture();
      pic.src = file
      this.pInfo.docs.pictures.push(pic);
      this.picturesControl.updateValueAndValidity();
    });
    
  }

  onSubmit() {
    if(this.productForm.valid === false) {
      return;
    }
    console.log('User is ' + JSON.stringify(this.user))   
    const productsRef: AngularFirestoreCollection<any> = this.afs.collection(`suppliers/${this.user?.supplierId}/products`);
    this.uploadImages(this.pInfo)
    .pipe(
      map(urls => this.productFormDataToModel(this.pInfo, urls)),
      flatMap((product: Product) => {
        const obj = Object.assign({}, product)
        return productsRef.add(obj)
      })
    )
    .subscribe({
      next: (s: DocumentReference) => {
        this.actionNotificationService.pushNotification({ message: `Prodotto creato con success!`, result: Result.SUCCESS, title: 'Gestione Prodotto' })
      },
      error: e => {
        this.actionNotificationService.pushNotification({ message: `Creazione del prodotto fallita!`, result: Result.ERROR, title: 'Gestione Prodotto' })
      },
      complete: () => {
        this.router.navigateByUrl('/products/overview')
      }
    });

  }

  private uploadImages(pData: ProductInfo): Observable<String[]> {
      let ts: Observable<UploadTaskSnapshot>[] = pData.docs.pictures
      .map(pFile => {
        return fromPromise(pFile.src?.text()!)
            .pipe(
                mergeMap(content => fromPromise(getSHA256Hash(content))), // Is important to create a univoque path to store the images in datastore. Consider to embed this in the service
                mergeMap(fileHash => this.storageService.uploadImage(`products/${fileHash}/images/`, pFile.src!)[1])
            )
      })
    
      let finalUrls: Observable<String>[] = []; 
      ts.forEach( _ts => 
        {
          let res: Observable<String> = _ts.pipe(
            filter( _item => _item.state === 'success' && _item.totalBytes === _item.bytesTransferred),
            flatMap(_item => getDownloadURL(_item.ref))       
          )
          finalUrls.push(res);
        } 
      )
      return forkJoin(finalUrls);
  }

  private productFormDataToModel(pData: ProductInfo, imagesUrl: String[]): Product {
    
    return new Product(
      pData.basicInfo.code!,
      pData.basicInfo.name!,
      pData.basicInfo.category!,
      this.user!.supplier,
      pData.basicInfo.description!,
      pData.stockAndPrice.unitPrice!,
      pData.stockAndPrice.stock!,
      pData.stockAndPrice.stock!,
      new Date(),
      this.productConfig.currency,
      imagesUrl
    )
  }

  /*uploadFile(file: File): Observable<string> {
    const filePath = `uploads/${file.name}`;
    
    const storageRef = this.storageService.ref(filePath);
    const uploadTask = this.angularFireStorage.upload(filePath, file);
  
    return uploadTask.snapshotChanges().pipe(
      finalize(() => {
        // After the upload is complete, get the download URL
        const downloadURL$ = storageRef.getDownloadURL();
        return downloadURL$;
      }),
      map((snapshot) => {
        // Extract the download URL from the snapshot
        const downloadURL = snapshot?.downloadURL || '';
        return downloadURL;
      })
    );
  }*/


}

export class BasicProductInfo {
  
  @required({messageKey: 'required'})
  code?: string;

  //@required({messageKey: 'required'})
  @minLength({value: 3, messageKey: 'minLength'})
  name: string = '';

  @required({messageKey: 'required'})
  @prop()
  category?: string;
  
  @prop()
  @required({messageKey: 'required'})
  @minLength({value:10, messageKey: 'descriptionMinLength'})
  description?: string;

}

export class Picture {

  @prop()
  src?: File;
    
}

export class StockAndPrice {
  @prop()
  @required()
  unitPrice?: number;

  @prop()
  @required()
  stock?: number;

}

export class ProductPictures {
  @propArray(Picture, {allowMaxIndex: 5})
  @minLength({value: 1, messageKey: 'picturesMinLength'})
  pictures: Picture[] = [];
}

export class ProductInfo {
  @propObject(BasicProductInfo)
  basicInfo:BasicProductInfo = new BasicProductInfo();
  
  @propObject(ProductPictures)
  docs:ProductPictures = new ProductPictures();

  @propObject(StockAndPrice)
  stockAndPrice: StockAndPrice = new StockAndPrice();
}




