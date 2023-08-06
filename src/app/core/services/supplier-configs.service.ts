import { Injectable } from '@angular/core';
import { Currency, ProductConfiguration } from '@core/model/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierConfigsService {

  constructor() { }
  
  productConfig(supplier: string) : Observable<ProductConfiguration> {
    // TODO: retrieve the configs per supplier from firestore
    return of(new ProductConfiguration());
  }





}
