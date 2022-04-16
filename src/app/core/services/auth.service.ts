import { Injectable, NgZone } from '@angular/core';
import { OrigoSupplierUser } from "../model/OrigoSupplierUser";
import { Auth, User, createUserWithEmailAndPassword, PhoneAuthProvider, RecaptchaVerifier, signInWithEmailAndPassword, updatePhoneNumber } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from "@angular/router";
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { sendEmailVerification, signOut, updateProfile, UserCredential } from 'firebase/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authenticatedUser: OrigoSupplierUser | null = null;//firebase.default.auth.UserCredential["user"] | null = null; // Save logged in user data
  private domainUserSubject: Subject<OrigoSupplierUser> = new Subject<OrigoSupplierUser>();
  private domainUserObservable: Observable<OrigoSupplierUser> = this.domainUserSubject.asObservable();
  private applicationVerifier: RecaptchaVerifier | null = null;

  public get authenticatedUser(): OrigoSupplierUser | null {
    if(this._authenticatedUser === null){
      let serializedUser = localStorage.getItem('origoUser');
      if(serializedUser != null){
        this._authenticatedUser = JSON.parse(serializedUser) as OrigoSupplierUser;
      }
    } 
    return this._authenticatedUser;
  }
  private set authenticatedUser(value: OrigoSupplierUser | null) {
    console.log('setted authenticatedUser with ' + value);
    this._authenticatedUser = value;
    this.saveUserLocally()
  }


  saveUserLocally(){
     // store data into local storage before browser refresh
    localStorage.setItem('origoUser', JSON.stringify(this._authenticatedUser));
  }
  
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public auth: Auth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.subscribeToRouterEvents();

    // TODO: use native firebase storage https://github.com/angular/angularfire/blob/HEAD/docs/auth/getting-started.md
    // maybe is enough the _authenticatedUser property
    this.subscribeToFirebasAuthEvents();
  }

  userDomainSubscribe(next: (value: OrigoSupplierUser) => any): Subscription {
    if (this.authenticatedUser) {
      next(this.authenticatedUser);
    }
    return this.domainUserObservable.subscribe(next);
  }

  private subscribeToFirebasAuthEvents() {
    this.auth.onAuthStateChanged(user => {
      if(user) {
       // user logged in
       console.log(`User ${user.email} just signed in!`)
      }else{
        // user logged out
        this.authenticatedUser = null;
      }
    })
  }

  private subscribeToRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar      
        console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar
        // Present error to user
        console.log(event.error);
      }
    });
  }

  async signIn(email: string, password: string) : Promise<string | undefined> {
    let userCreds = null
    try {
      userCreds = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(`usercreds ${JSON.stringify(userCreds)}`)
      await this.afs.doc(`users/${userCreds.user?.uid}`).set(this.authToDomainUser(userCreds.user), { merge: true })
    }catch(e){
      return e as string;
    }

    let document = await this.afs.doc(`users/${userCreds.user?.uid}`).get().toPromise()
    if (document?.data()) {
      this.authenticatedUser = document.data() as OrigoSupplierUser;
      //localStorage.setItem('user', JSON.stringify(this.authenticatedUser));
      return undefined;
    } else {
      return 'failed to sync origo domain userdata'
    }     

  }

  // Sign up with email/password
  async signUp(user: Partial<OrigoSupplierUser>, password: string) {
    try {
      
      if(!user.email || !password || !user.name || !user.surname || !user.supplier) {
        throw Error('One or more field required for registration are missing!');
      }

      let credentials: UserCredential = await createUserWithEmailAndPassword(this.auth, user.email!, password);
      if(!!user.displayName) {
        await updateProfile(credentials.user, { displayName: user.displayName });
        Object.assign(credentials.user, { displayName: user.displayName });
      } 
      await this.decorateAndStoreDomainUser(user, credentials.user.uid);
      await sendEmailVerification(credentials.user);
    } catch (error) {
      window.alert(`signup FireAuth User profile with email ${user.email} failed with reason: ${JSON.stringify(error)}`)
    }
  }



  // Reset Forggot password
  /*forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }*/

   /* Setting up user domain model data in Firestore database using AngularFirestore + AngularFirestoreDocument service */


  private async decorateAndStoreDomainUser(user: Partial<OrigoSupplierUser>, uid: string) {

    try {
      let decoratedUser = {...user, uid:uid};
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      await userRef.set(decoratedUser, { merge: true })
      let doc = await userRef.get().toPromise();
      const userFromDocument = doc?.data();
      if(!!userFromDocument) {
        this.authenticatedUser = userFromDocument;
        this.domainUserSubject.next(userFromDocument);
      }else{
        console.log(`error: document with id = ${uid} not found`);
      }
    } catch (error) {
      console.log(`Error ${error} updating user profile`)
    }
  }

  async updatePhoneNUmber(phoneNumber: string, otp: string, verificationId: string): Promise<void> {

    if (!this.auth.currentUser || !this.authenticatedUser) {
      throw Error('current authenticated user is null. Can not update phone number');
    }

    try {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);
      await updatePhoneNumber(this.auth.currentUser, phoneCredential);
      await this.decorateAndStoreDomainUser({...this.authenticatedUser, phoneNumber:phoneNumber}, this.authenticatedUser?.uid)
    }catch(e) {
      console.log(`error while updating phone number - ${e}`)
    }finally{
      if(!!this.applicationVerifier) {
        this.applicationVerifier.clear();
        this.applicationVerifier = null;
      }
    }
  }

  async verifyPhoneWithRecaptcha(recaptchaContainerId: string, phoneNumber: string): Promise<string> {
    if (!this.auth.currentUser) {
      throw Error('current authenticated user is null. Can not verify phone number');
    }
    // 'recaptcha-container' is the ID of an element in the DOM.
    this.applicationVerifier = new RecaptchaVerifier(recaptchaContainerId, {}, this.auth);
    const provider = new PhoneAuthProvider(this.auth);
    // return the verificationId to be associated with the otp in order to generate the creds to update the phone.
    const verificationId = await provider.verifyPhoneNumber(phoneNumber, this.applicationVerifier);
    return verificationId;
  }

  async updateDomainUser2(user: Partial<OrigoSupplierUser>): Promise<[boolean, OrigoSupplierUser | undefined]> {

    if (!this.auth.currentUser) {
      console.log('authenticated user is null')
      throw Error(" authenticated user is null")
    }
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.authenticatedUser?.uid}`);
    //let updatedProfile = null
    try {
      await userRef.update(user);
      /*updatedProfile = Object.create(null);
      if(user.phoneNumber !== this.authenticatedUser?.phoneNumber) {
        updatedProfile['phoneNumber'] = user.phoneNumber;
      }
      if(user.photoURL !== this.authenticatedUser?.photoURL) {
        updatedProfile['photoURL'] = user.photoURL;
      }*/
      /*console.log("update profile before the update " + updatedProfile);
      //await this.authenticatedUser?.updateProfile(updatedProfile);*/
      await updateProfile(this.auth.currentUser, user);
      this.authenticatedUser = Object.assign(this.authenticatedUser, this.authToDomainUser(this.auth.currentUser));
      //localStorage.setItem('user', JSON.stringify(this.authenticatedUser));
      console.log(`Updating FireAuth User profile with ${JSON.stringify(user)} succeeded. New Profile is: ${JSON.stringify(this.auth.currentUser)}`);
      this.domainUserSubject.next(this.authenticatedUser);
      return [true, this.authenticatedUser]
    } catch (error) {
      console.log(`Updating FireAuth User profile failed with reason: ${JSON.stringify(error)}`)
      return [false, undefined];
    }

  }

  // Sign out
  signOut(): Promise<void> {
    console.log(`logged in user is ${this.auth}`);
    return signOut(this.auth);
  }

  private authToDomainUser(user:User): Partial<OrigoSupplierUser> {
    return  {
      uid: user?.uid,
      email: user?.email!,
      displayName: user?.displayName!,
      photoURL: user?.photoURL!,
      phoneNumber: user?.phoneNumber!
    }
  }

}






