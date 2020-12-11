
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '@app/services/api/firebase-authentication.service';
import * as firebase from 'firebase/app';

import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})

export class RegisterPage implements OnInit {
  public dialCodes = environment.COUNTRY_DIAL_CODES;
  spinner = false;
  disabled = false;
  confirm = '';
  isChecked  = false;
  user = { first_name: '', last_name: '', email: '', area: '', phone: '', password: '' };

  public customAlertOptions: any = {
    header: 'Contact Number',
    subHeader: 'Select Area Code',
    translucent: true
  };

  showAppleSignIn = false;

  constructor(
    private userProvider: InitUserProvider,
    private menuCtrl: MenuController,
    private api: APIService,
    private util: UtilService,
    public authService: AuthenticationService,
    private afs: AngularFirestore,

    public platform: Platform,
    private signInWithApple: SignInWithApple
  ) { }

  ngOnInit() {

     }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  setSpinner() {
    this.spinner = true;
    this.disabled = true;
  }

  clearSpinner() {
    this.spinner = false;
    this.disabled = false;
  }

async updateUserData(user, firstName, lastName) {
  const userRef: AngularFirestoreDocument = this.afs.doc(`clients/${user.uid}`);
  let data = {
    'id': user.uid,
    'username': user.email,
    'email': user.email,
    'phone': ''
  };
  // console.log('data -->', data);
  if (firstName && lastName) data['name'] = firstName + ' ' + lastName;
  return userRef.set(data, { merge: true });
}
 

  async registerUser() {

    // console.log('saving registered user --->', this.user);
    if (this.user.password !== this.confirm) {
      const toast = await this.util.createToast('Please confirm password', false, 'middle');
      await toast.present();
    return;
    }

    // console.log('is checked ===>', this.isChecked);
    if (!this.isChecked ) {
      const toast = await this.util.createToast('Please Agree to the Terms & Conditions', false, 'middle');
      await toast.present();
    return;
    }

    this.setSpinner();

    this.api.signUp(this.user)
      .subscribe(
        res => {
          // console.log(res);
          this.userProvider.setToken(res['id']);
          this.api.getUser().subscribe((user: any) => {
            this.userProvider.setLoggedInUser(user)
              .then(res => {
                this.clearSpinner();
                this.util.goToNew('/resto/home');
              },
              ).catch(
                async err => {
                const toast = await this.util.createToast(err.message || err.statusText, false, 'top');
                await toast.present();
                this.clearSpinner();
                console.log('err', err)
              });
          });
        },
        async err => {
          const toast = await this.util.createToast(err.message || err.statusText, false, 'top');
          await toast.present();
          this.clearSpinner();
        }
      );
  }

  formatPhone($event) {
    let phone = $event.target.value.replace(/[^\d]/g, ''); 
    let len = phone.length;
    phone = len > 10 ? phone.substr(0, 10) : phone;
    // console.log('------------> 1 results : ', phone, 'len', phone.length);
    phone = len > 3 ? phone.substr(0, 3) + '-' + phone.substr(3, len ) : phone;
    phone = len > 6 ? phone.substr(0, 7) + '-' + phone.substr(7, len + 1) : phone;  
    this.user.phone = phone;
   }

}
