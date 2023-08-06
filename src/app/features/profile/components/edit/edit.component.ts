import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDownloadURL } from '@angular/fire/storage';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { UserActionNotificationService, Result } from '@core/services/user-action-notification.service';

import { alphaNumeric, image, mask, prop, ReactiveFormConfig, required, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { flatMap, map, mergeMap, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest, tap } from 'rxjs';
import { OrigoSupplierUser } from 'src/app/core/model/OrigoSupplierUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Supplier } from '@core/model/supplier';


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
  suppliers$: Observable<SupplierView[]> = of();
  //supplier: SupplierView | undefined;
  suppliers: SupplierView[] = [];

  constructor(
    private formBuilder: RxFormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private storageService: StorageService,
    private afs: AngularFirestore,
    private profileNotificationService: UserActionNotificationService) {
    this.createForm();
  }


  ngOnInit(): void {
    //this.retrieveSuppliers();
    this.initForm();
  }

  private retrieveSuppliersAndManageDefault(supplier: SupplierView | undefined) {
    
    let $suppliers = this.afs.collection<{name: string}>('suppliers').valueChanges({idField: 'id'});
    
    if(supplier){
      // supplier already associated to the user. Update the control when all the values will be available
      this.suppliers$=$suppliers;
    }else{
      // need to show an empty entry in the select to avoid to select an unwanted supplier
      let $emptyCategory = of({name : '', id: ''});
      this.suppliers$ = combineLatest([$emptyCategory, $suppliers])
      .pipe(
        map(([object, array]) => {
          // Push the object into the array in 1 position
          array.forEach( s => console.log(JSON.stringify(s)));
          array.unshift(object)
          return array;
        })
      )  
    }

    this.suppliers$.subscribe(suppliers => {
      this.suppliers = suppliers
      // set the default option. Note that we have to use the obejct from the list (instead of supplier) in order to work
      let filteredSupplier = this.suppliers.filter(s => s.id === supplier?.id)[0];
      this.formGroup.controls['supplier'].patchValue(filteredSupplier);
    })
  }

  createForm() {
    this.formGroup = this.formBuilder.formGroup(new ProfileEditFormModel);
    ReactiveFormConfig.set({
      "validationMessage": {
        "displayName-invalid": "displayName must be alphanumeric",
        "phone-invalid": "phone number not valid",
        "otp-invalid": "otp code invalid",
        "displayName-required": "display name cannot be empty",
        "photo-invalid": "photo should be smaller tha 100x100 px",
        "supplier-missing": "devi selezionare un supplier per poter iniziare a lavorare"
      }
    })
  }

  initForm() {
    this.authService.userDomainSubscribe(user => {
      if (!!user) {
        this.user = user;
        this.formGroup.controls['displayName'].setValue(user.displayName);
        this.formGroup.controls['phone'].setValue(user.phoneNumber);
        
        let supplierView$: Observable<SupplierView | undefined>;
        if(!!user.supplier && !!user.supplierId) {
          // If a supplier is already associated with the user verify it and in case create the preselected entry
          supplierView$ = this.afs.doc<Supplier>(`suppliers/${this.user?.supplierId}`).valueChanges({idField: 'id'})
          .pipe(
            map((sup: Supplier & { id: string; } | undefined) => {            
              return (!!sup?.name && !!sup.id) ? new SupplierView(sup?.name, sup.id) : undefined;
            })            
          )  
        }else{
          // No supplier associated yet. Empty entry by default
          supplierView$ = of(undefined);
        }
        supplierView$.pipe(tap( (sup: SupplierView | undefined) => {
          
          this.retrieveSuppliersAndManageDefault(sup)
        })).subscribe();
      }

    })
  }

  async onSubmitCredentials() {
    this.formGroup.disable();
    //const modelValue = this.formGroup.value as ProfileEditFormModel;
    let userUpdate: Partial<OrigoSupplierUser> = {}
    if (!!this.formGroup.controls['profilePhoto'].value && !!this.profileImageUrl) {
      userUpdate.photoURL = await this.profileImageUrl;
    }
    if (this.formGroup.controls['displayName'].dirty) {
      userUpdate.displayName = this.formGroup.controls['displayName'].value;
    }
    userUpdate.supplier = (this.formGroup.controls['supplier'].value as {name: string}).name; //modelValue.supplier?.name;
    userUpdate.supplierId = (this.formGroup.controls['supplier'].value as {id: string}).id; //modelValue.supplier?.id;
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
  @required({messageKey: 'supplier-missing'})
  supplier?: {name: string, id: string};
}

export class SupplierView {
  constructor(public readonly name: string, public readonly id: string){}
}

