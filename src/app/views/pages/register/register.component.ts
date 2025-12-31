import { Component, OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule,ContainerComponent,RowComponent,
            ColComponent, CardComponent, CardBodyComponent,
            FormDirective, InputGroupComponent, InputGroupTextDirective,
            IconDirective, FormControlDirective, ButtonDirective,ReactiveFormsModule]
})
export class RegisterComponent implements OnInit{
      form:FormGroup | any;
      imagePreview!: string | ArrayBuffer | any;

      constructor(private authService:AuthService){}
      ngOnInit(): void {
        this.form = new FormGroup({
        username: new FormControl(null,{validators:[Validators.required]}),
        email: new FormControl(null,{validators:[Validators.required]}),
        password: new FormControl(null,{validators:[Validators.required]}),
        image: new FormControl(null,{validators:[Validators.required]})
      });
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

      handleRegistration(){
         if(this.form.invalid){
            return
         }
        this.authService.registerUser(this.form.value.username,
        this.form.value.password,this.form.value.email,this.form.value.image
        )
      }
}
