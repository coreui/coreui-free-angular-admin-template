import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { BehaviorSubject, map, retry } from 'rxjs';
@Injectable({
  providedIn:'root'
})

export class ProductService {
  TOKEN = localStorage.getItem('token');
  productInfo = signal<Object>([]);
  form:any;
   private searchTxt = new BehaviorSubject('');
   seacrhProduct = this.searchTxt.asObservable();
  constructor(private http:HttpClient,private route:Router){}

  //  createProduct(title:string,description:string,rating:string,price:string,image:File,category:string){
  //   const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
  //   this.form = new FormData();
  //       this.form.append('title',title);
  //       this.form.append('description',description);
  //       this.form.append('rating',rating);
  //       this.form.append('price',price),
  //       this.form.append('image',image)
  //       this.form.append('category',category);

  //  this.http.post<{message:string,product:Product}>
  //       ('http://localhost:8000/api/products/create-product',
  //         {headers},this.form).subscribe((resp:any)=>{
  //            console.log(this.form)
  //              alert(resp)
  //         },error=>{
  //              alert(error.message)
  //         })

  //   }

   createProduct(title:string,description:string,rating:string,price:string,image:File,category:string){
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      this.form = new FormData();
        this.form.append('title',title);
        this.form.append('description',description);
        this.form.append('rating',rating);
        this.form.append('price',price),
        this.form.append('image',image)
        this.form.append('category',category);
        console.log(title)
        console.log(description)
        console.log(rating)
        console.log(price)
        console.log(image)
        console.log(category)
        this.http.post<{message:string,product:Product}>
                (`http://localhost:8000/api/products/create-product`,
                  this.form).subscribe((responseData:any)=>{
                       console.log(responseData)
                        alert("Add Product Successfully")
                        this.getAllProducts();
                        this.route.navigateByUrl('/');
                  },error=>{
                    alert(error.message)
                  })
      }

    getAllProducts(){
      return this.http.get('http://localhost:8000/api/products/get-products')
    }

    deleteProductById(id:any){
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
       return this.http.delete(`http://localhost:8000/api/products/delete-product/${id}`,)

    }

    updateProductById(id:any,title:string,description:string,rating:string,price:string,image:File,category:string){
   //  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      this.form = new FormData();
        this.form.append('title',title);
        this.form.append('description',description);
        this.form.append('rating',rating);
        this.form.append('price',price),
        this.form.append('image',image)
        this.form.append('category',category);
        console.log(this.form)
      this.http.put(`http://localhost:8000/api/products/update-product/${id}`,this.form)
      .subscribe((response:any)=>{
         //console.log
         alert("Product Updated Successfully");
         //this.getAllProducts();
         this.route.navigateByUrl('/');
    },error=>{
         alert("Product Updated Failure");
      })

    }

    getProductById(id:string){
      return this.http.get(`http://localhost:8000/api/products/get-product/${id}`)
    }

    getSearchProduct(searchNewTxt:any){
      this.searchTxt.next(searchNewTxt)
    }

    getAddToCartProduct(product:any){
      this.form = new FormData();
        this.form.append('title',product?.title);
        this.form.append('price',product?.price),
        this.form.append('image',product?.image)
        console.log(this.form)
       return this.http.post(`http://localhost:8000/api/products/create-addToCart`,this.form)
    }

    getRemoveAddToCart(id:any){
      return this.http.delete(`http://localhost:8000/api/products/deleteToCart/${id}`)
      
    }

    getAllAddToCartProduct(){
     return this.http.get(`http://localhost:8000/api/products/getToProductCart`)
    }

}
