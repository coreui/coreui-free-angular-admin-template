import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  RowComponent,
  RowDirective
} from '@coreui/angular';
import {  DocsExampleComponent } from '@docs-components/public-api';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss'],
  imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, RowDirective]
})
export class FormControlsComponent implements OnInit{
  form:FormGroup | any;
  imagePreview!: string | ArrayBuffer | any;
  updatedImagePreview!: string | ArrayBuffer | any;
  paramsObject:any;
  public favoriteColor = signal('#26ab3c');
  id:any;
  title:any;description:any;price:any;rating:any;image:any;category:any;
  constructor(private productService:ProductService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.form = new FormGroup({
        title:new FormControl(null,{validators:[Validators.required]}),
        description: new FormControl(null,{validators:[Validators.required]}),
        rating:new FormControl(null,{validators:[Validators.required]}),
        price:new FormControl(null,{validators:[Validators.required]}),
        category:new FormControl(null,{validators:[Validators.required]}),
        image:new FormControl(null,{validators:[Validators.required]})
    });
    this.route.queryParamMap.subscribe(params => {
       this.paramsObject = params;
       this.id = params.get('id')
       if(params.get('id')){
          this.form.get('title')?.setValue(params.get('title'));
          this.form.get('description')?.setValue(params.get('description'));
          this.form.get('price')?.setValue(params.get('price'));
          this.form.get('rating')?.setValue(params.get('rating'));
          this.form.get('category')?.setValue(params.get('category'));
          this.form.get('image')?.setValue(params.get('image'));
          this.updatedImagePreview = params.get('image');
          console.log(this.updatedImagePreview)
       }else{
          this.form.get('title')?.setValue('');
          this.form.get('description')?.setValue('');
          this.form.get('price')?.setValue('');
          this.form.get('rating')?.setValue('');
          this.form.get('category')?.setValue('');
          this.form.get('image')?.setValue('');
          this.updatedImagePreview = '';
       }
     })
    }

   onImagePicked(event:any){
      const file = event.target.files[0];
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(file)
    }

  handleEditAddProduct(){
     // alert("***********" + this.id)
     if(this.form.invalid){
      return
     }
    console.log(this.form.value.category);
     if(!this.id){
      this.productService.createProduct(this.form.value.title,
      this.form.value.description,this.form.value.rating,
      this.form.value.price,this.form.value.image,this.form.value.category)
     }else{
       this.productService.updateProductById(this.id,this.form.value.title,
      this.form.value.description,this.form.value.rating,
      this.form.value.price,this.form.value.image,this.form.value.category)
     }
    }

}
