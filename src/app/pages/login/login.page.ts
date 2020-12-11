import { Component, OnInit } from '@angular/core';
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';

import { AuthenticationService } from '@app/services/api/firebase-authentication.service';
import { AlertController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import { SceService } from '@app/services/sce.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
   user: any = { email: '', password: '' };
   spinner = false;
   disabled = false;
   showAppleSignIn = false;

  constructor(
    private userProvider: InitUserProvider,
    private api: APIService,
    private util: UtilService,

    public authService: AuthenticationService,
    public alertCtrl: AlertController,
    private signInWithApple: SignInWithApple,
    private afs: AngularFirestore,
    public platform: Platform,
    private sce: SceService
  ) {
   }

ngOnInit() {

 }
 
async updateUserData(user, firstName, lastName) {
  const userRef: AngularFirestoreDocument = this.afs.doc(`clients/${user.uid}`);
  let data = {
    'id': user.uid,
    'username': user.email,
    'email': user.email,
    'phone': ''
  };
  if (firstName && lastName) data['name'] = firstName + ' ' + lastName;
  return userRef.set(data, { merge: true });
}

  setSpinner() {
    this.spinner = true;
    this.disabled = true;
  }

  clearSpinner() {
    this.spinner = false;
    this.disabled = false;
  }

 login() {
   if (this.user.email !== 'admin@luminoustec.net') {
     this.presentAlert();
     return;
   }
    this.setSpinner();
    this.api.logIn(this.user.email, this.user.password).subscribe(async res => {
          this.userProvider.setToken(res['id']);
          this.api.getUser().subscribe((responseUser: any) => {
            if (responseUser) {
            this.userProvider.setLoggedInUser(responseUser).then(
              res => {
                this.clearSpinner();
                this.util.goToNew('/resto/home');
              }
            ).catch( err => {
              this.clearSpinner();
               console.log('err', err)
            });
          } else this.showMsg("User doesn't exists, please try again");
         });
        },
        async err => {
          this.showMsg(err.message || err.statusText);
        }
      );
  }

  async showMsg(msg) {
    const toast = await this.util.createToast(msg, false, 'top');
    await toast.present();
    this.clearSpinner();
  }
 
    async presentAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Wrong Email or Password',
        message: 'Please try again...',
        buttons: ['OK']
      });
      await alert.present();
    }

  register() {
    this.util.goToNew('/register');
  }
  
}
