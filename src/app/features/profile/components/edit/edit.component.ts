import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { alphaNumeric, image, mask, ReactiveFormConfig, required, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { OrigoSupplierUser } from 'src/app/core/model/OrigoSupplierUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit/*, AfterViewInit*/ {

  formGroup!: FormGroup;
  user: OrigoSupplierUser | null = null;
  verificationPhoneId: string = '';
  updateSuccess = false;
  uploadProgress: Observable<number> = new Observable();
  profileImageUrl: Promise<string> | undefined = undefined;
  showProgressImageProfile = false;

  constructor(readonly formBuilder: RxFormBuilder, private readonly authService: AuthService, readonly cd: ChangeDetectorRef, readonly storageService: StorageService) { 
    this.createForm();
        
  }

  ngOnInit(): void {
      this.initForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.formGroup(new ProfileEditFormModel);  
    ReactiveFormConfig.set({
      "validationMessage": {
        "displayName-invalid": "displayName must be alphanumeric",
        "phone-invalid": "phone number not valid",
        "otp-invalid": "otp code invalid",
        "displayName-required": "display name cannot be empty",
        "photo-invalid": "photo should be smaller tha 100x100 px"
      }
    })
  }

  initForm() {
    this.authService.userDomainSubscribe( user => {
      if(!!user) {
        this.user = user;
        this.formGroup.controls['displayName'].setValue(user.displayName);
        this.formGroup.controls['phone'].setValue(user.phoneNumber);
      }  
    })
  }


  async onSubmitCredentials () {
    this.startPhonNumberVerification();
    let userUpdate: Partial<OrigoSupplierUser> = {}
    if(!!this.formGroup.controls['profilePhoto'].value && !!this.profileImageUrl) {
      userUpdate.photoURL = await this.profileImageUrl;
    }
    if(this.formGroup.controls['displayName'].dirty) {
      
      userUpdate.displayName = this.formGroup.controls['displayName'].value;
    }
    let result = await this.authService.updateDomainUser2(userUpdate);
    this.updateSuccess = result[0];
  }

  private startPhonNumberVerification() {
    if (/*this.formGroup.controls['phone'].dirty*/ !!this.user && this.formGroup.controls['phone'].value !== this.user.phoneNumber) {
      
      let phone = `+${this.formGroup.controls['phone'].value}`;

      this.authService.verifyPhoneWithRecaptcha('recaptcha', phone).then(
        (vId) => {
           console.log("verification id is "+ vId); 
           this.verificationPhoneId = vId;
           this.cd.detectChanges()
      },
      (e) => {
        console.log("Phone number update failed with "+ e) 
      }).catch(e => console.log("Phone number update failed with "+ e) );
    }
  }

  //TODO: to be called
  resetControls() {
    this.formGroup.reset();

  }

  async updatePhoneNumber() {
    let otpValue = this.formGroup.controls['otp'].value;
    let phoneControl = this.formGroup.controls['phone'];
    if(otpValue.length === 6 && phoneControl.valid) {
      try {
        this.authService.updatePhoneNUmber(phoneControl.value, otpValue, this.verificationPhoneId)
      }finally {
        this.verificationPhoneId = '';
        this.formGroup.enable();
        this.cd.detectChanges();
      }
    }
  }

  getControlErrors(name: string): ValidationErrors | null {
    return this.formGroup.controls[name].errors
  }

  getCntrolErroMessage(control: string) {
    let valErr = this.getControlErrors(control);
    let errMsg = ''
    if(valErr) {
      errMsg = Object.values(valErr).map(err => err.message).join()
    }
    return errMsg;  
  }

  onProfilePhotoSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        let progress = this.storageService.uploadImage(`users/${this.user?.uid}/images/profile`, file);
        this.uploadProgress = progress[0];

        progress[1].pipe(tap(value => {
          if(value.state === 'success' && value.totalBytes === value.bytesTransferred) {
            this.profileImageUrl = getDownloadURL(value.ref);
            this.showProgressImageProfile = false;
          }else{
            this.showProgressImageProfile = true;
          }
        })).subscribe();

        this.formGroup.controls['profilePhoto'].setValue(file.name);

        /*const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();*/
    }
  }

}

class ProfileEditFormModel {
  @required({messageKey: 'displayName-required'}) 
  @alphaNumeric({messageKey: 'displayName-invalid'})
  public displayName: string = '';
  @mask({ mask: "(+99)(999)(9999999)", messageKey: 'phone-invalid'}) public phone: string = '';
  @mask({ mask: "9.9.9.9.9.9" , messageKey: 'otp-invalid'}) public otp: string = '';
  //@url() 
  @image({maxHeight:48  ,maxWidth:48, messageKey: 'photo-invalid' }) 
  public profilePhoto = ''
}
