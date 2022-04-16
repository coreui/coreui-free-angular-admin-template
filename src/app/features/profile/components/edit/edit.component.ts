import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { AppToastComponent } from '@coreui-deps/components/toast-simple/toast.component';
import { ToastComponent, ToasterComponent } from '@coreui/angular';
import { ChangeProfileNotificationService, Result } from '@features/profile/change-profile-notification.service';

import { alphaNumeric, image, mask, ReactiveFormConfig, required, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, Subject } from 'rxjs';
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
export class EditComponent implements OnInit {
  readonly PHONE_UPDATE_ERROR = `Phone number update failed with error: `;

  formGroup!: FormGroup;
  user: OrigoSupplierUser | null = null;
  verificationPhoneId: string = '';
  updateSuccess = false;
  uploadProgress: Observable<number> = new Observable();
  profileImageUrl: Promise<string> | undefined = undefined;
  showProgressImageProfile = false;


  constructor(
    private formBuilder: RxFormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private storageService: StorageService,
    private profileNotificationService: ChangeProfileNotificationService) {
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
    this.authService.userDomainSubscribe(user => {
      if (!!user) {
        this.user = user;
        this.formGroup.controls['displayName'].setValue(user.displayName);
        this.formGroup.controls['phone'].setValue(user.phoneNumber);
      }
    })
  }

  async onSubmitCredentials() {
    this.formGroup.disable();
    let userUpdate: Partial<OrigoSupplierUser> = {}
    if (!!this.formGroup.controls['profilePhoto'].value && !!this.profileImageUrl) {
      userUpdate.photoURL = await this.profileImageUrl;
    }
    if (this.formGroup.controls['displayName'].dirty) {
      userUpdate.displayName = this.formGroup.controls['displayName'].value;
    }
    let result = await this.authService.updateDomainUser2(userUpdate);
    this.updateSuccess = result[0];

    this.updateSuccess ? this.profileNotificationService.pushNotification({ message: `Profile updated with success!`, result: Result.SUCCESS }) : this.profileNotificationService.pushNotification({ message: `Profile update failed!`, result: Result.ERROR })
    this.formGroup.enable();
  }

  startPhonNumberVerification() {
    let phoneChanged = !!this.user && this.formGroup.controls['phone'].value !== this.user.phoneNumber
    console.log('phonechanged = ' + phoneChanged)
    if (/*this.formGroup.controls['phone'].dirty*/ phoneChanged) {
      this.formGroup.controls['otp'].enable({ onlySelf: true, emitEvent: false });

      let phone = `+${this.formGroup.controls['phone'].value}`;
      this.authService.verifyPhoneWithRecaptcha('recaptcha', phone).then(
        (vId) => {
          console.log("verification id is " + vId);
          this.verificationPhoneId = vId;
          this.cd.detectChanges()
        },
        (e) => {

          this.profileNotificationService.pushNotification({ message: this.PHONE_UPDATE_ERROR + e, result: Result.ERROR });
          //console.log("Phone number update failed with "+ e) 
        }).catch(e => this.profileNotificationService.pushNotification({ message: this.PHONE_UPDATE_ERROR + e, result: Result.ERROR }));
    }
  }

  async updatePhoneNumber() {
    let otpValue = this.formGroup.controls['otp'].value;
    let phoneControl = this.formGroup.controls['phone'];
    if (otpValue.length === 6 && phoneControl.valid) {
      try {
        this.authService.updatePhoneNUmber(phoneControl.value, otpValue, this.verificationPhoneId)
      } finally {
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
    if (valErr) {
      errMsg = Object.values(valErr).map(err => err.message).join()
    }
    return errMsg;
  }

  onProfilePhotoSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      let progress = this.storageService.uploadImage(`users/${this.user?.uid}/images/profile`, file);
      this.uploadProgress = progress[0];

      progress[1].pipe(tap(value => {
        if (value.state === 'success' && value.totalBytes === value.bytesTransferred) {
          this.profileImageUrl = getDownloadURL(value.ref);
          this.showProgressImageProfile = false;
        } else {
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
  @required({ messageKey: 'displayName-required' })
  @alphaNumeric({ messageKey: 'displayName-invalid' })
  public displayName: string = '';
  @mask({ mask: "(+99)(999)(9999999)", messageKey: 'phone-invalid' }) public phone: string = '';
  @mask({ mask: "9.9.9.9.9.9", messageKey: 'otp-invalid' }) public otp: string = '';
  //@url() 
  @image({ maxHeight: 48, maxWidth: 48, messageKey: 'photo-invalid' })
  public profilePhoto = ''
}

