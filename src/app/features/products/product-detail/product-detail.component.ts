import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product, ProductConfiguration} from "@core/model/product";
import {minLength, prop, ReactiveFormConfig, required, RxFormBuilder} from "@rxweb/reactive-form-validators";
import {FormControl, FormGroup} from "@angular/forms";
import {firstErrorMessage} from "@shared/utils/reactive-forms-utils";
import {AuthService} from "@core/services/auth.service";
import {SupplierConfigsService} from "@core/services/supplier-configs.service";
import {OrigoSupplierUser} from "@core/model/OrigoSupplierUser";
import {Colors} from "../../../views/notifications/toasters/toasters.component";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  productForm?: FormGroup;
  editProductModel?: EditProductModel;
  user: OrigoSupplierUser | undefined = undefined;
  productConfig?: ProductConfiguration;
  firstErroMessage = firstErrorMessage
  constructor(private router: Router, private readonly fb: RxFormBuilder, private readonly authService: AuthService,  private readonly supplierConfigService: SupplierConfigsService) {
    let state = router.getCurrentNavigation()?.extras.state;
    this.product = state?.['product'];

    ReactiveFormConfig.set({
      "validationMessage": {
        "required": "campo obbligatorio",
        "descriptionMinLength": "La descrizione del prodotto deve contenere almeno 10 caratteri"
      }
    })

  }

  ngOnInit(): void {
    // TODO: code repeated also in create-product.component. Please refactor caching the call in a storage service
    this.authService.userDomainSubscribe(user =>  {
      this.user = user;
      this.supplierConfigService.productConfig(user.supplier).subscribe(config => {
        this.productConfig = config;
        this.editProductModel = Object.assign(new EditProductModel(), {...this.product})
        this.productForm = this.fb.formGroup(this.editProductModel!);
      })
    })

  }

  get priceControl() : FormControl {
    return this.productForm?.get('unitPrice') as FormControl;
  }


  get stockControl() : FormControl {
    return this.productForm?.get('stock') as FormControl;
  }

  get descriptionControl() : FormControl {
    return this.productForm?.get('description') as FormControl;
  }


  stockInfo(): Colors | undefined {
    let result: Colors | undefined = undefined;
    if(this.productConfig?.dangerLowStockTreshold && this.stockControl.value < this.productConfig?.dangerLowStockTreshold) {
         result = Colors.danger;
    }else if(this.productConfig?.dangerLowStockTreshold && this.productConfig?.warningLowStockTreshold &&
        this.stockControl.value >= this.productConfig?.dangerLowStockTreshold && this.stockControl.value <= this.productConfig?.warningLowStockTreshold
    ){
      result = Colors.warning;
    }
    return result;
  }

  protected readonly firstErrorMessage = firstErrorMessage;
}

export class EditProductModel {
  @prop()
  @required()
  unitPrice?: number;

  @prop()
  @required()
  stock?: number;

  @required({messageKey: 'required'})
  @minLength({value:10, messageKey: 'descriptionMinLength'})
  description?: string

}