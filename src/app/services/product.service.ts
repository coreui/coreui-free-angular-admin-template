import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { BehaviorSubject, map, retry } from 'rxjs';
@Injectable({
  providedIn:'root'
})

export class ProductService {
  productInfo = signal<Object>([]);
  form:any;
   private searchTxt = new BehaviorSubject('');
   seacrhProduct = this.searchTxt.asObservable();
  constructor(private http:HttpClient,private route:Router){}

   createProduct(title:string,description:string,rating:string,price:string,image:File,category:string){
        this.form = new FormData();
        this.form.append('title',title);
        this.form.append('description',description);
        this.form.append('rating',rating);
        this.form.append('price',price),
        this.form.append('image',image)
        this.form.append('category',category);
        console.log(this.form)

        this.http.post<{message:string,product:Product}>
        ('http://localhost:8000/api/products/create-product',this.form)
        .subscribe(responseData=>{
          const data = JSON.stringify(responseData.product);
          console.log(data)

          alert("Add Product Successfully")
          this.getAllProducts()
          this.route.navigateByUrl('/');
        },error=>{
          alert("Error");
        })
    }

    getAllProducts(){
      return this.http.get('http://localhost:8000/api/products/get-products')
    }

    deleteProductById(id:any){
       return this.http.delete(`http://localhost:8000/api/products/delete-product/${id}`)
    }

    updateProductById(id:any,title:string,description:string,rating:string,price:string,image:File,category:string){
        this.form = new FormData();
        this.form.append('title',title);
        this.form.append('description',description);
        this.form.append('rating',rating);
        this.form.append('price',price),
        this.form.append('image',image)
        this.form.append('category',category);
        console.log(this.form)
       return this.http.put(`http://localhost:8000/api/products/update-product/${id}`,this.form)
      .subscribe(responseData=>{
          console.log(responseData)
          alert("Update Product Successfully")
          this.getAllProducts();
          this.route.navigateByUrl('/');
       },error=>{
          alert("Error");
        })
    }

    getProductById(id:string){
      return this.http.get(`http://localhost:8000/api/products/get-product/${id}`)
    }

    getSearchProduct(searchNewTxt:any){
      this.searchTxt.next(searchNewTxt)
    }
}
