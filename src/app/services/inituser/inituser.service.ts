import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';
import { Storage } from '@ionic/storage';
import { User } from '@app/models/user';
import { StorageService } from '../api/firestorage.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
import { UtilService } from '@app/services/util/util.service';
import { SceService } from '../sce.service';
 
@Injectable()
export class InitUserProvider {
  private loggedInUser: User;
  private checkSignedInUserInterv;;
  constructor(
    private storage: Storage,
    private api: APIService,
    private storageServ: StorageService,
    private loadingCtrl: LoadingController,
    public util: UtilService,
    private toastCtrl: ToastController,
    private sce: SceService,
    private navCtrl: NavController
  ) {
    this.createNewEmptyUser();
  }

  getUserData(): User {
    return this.loggedInUser;
  }

  createNewEmptyUser() {
    this.loggedInUser = {
      id: null,
      name: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      password: '',
      location_lat: 0,
      location_lng: 0,
      token: '',
      profile_img: '',
      rideId: 0,
      location: '',
      home: '',
      work: '',
      isChecked: false
    };
  }

  load() {
    return new Promise((resolve, reject) => {
      this.getToken().then(token => {
        this.api.updateToken(token);
        this.api.getUser().subscribe((user: any) => {
          if (user) {
            this.sce._loggedInUser = user;
            this.setLoggedInUser(user);
            resolve(true);
          } else resolve(false);
        }, err => {
          resolve(false);
          console.log(err);
        });
      });
    });
  }

  async setRideId(rideId) {
    this.loggedInUser.rideId = rideId;
    await this.storage.set('rideId', rideId);
  }

  async clearRideId() {  // TODO
    this.loggedInUser.rideId = null;
    await this.storage.remove('rideId');
  }

  async getRideId() {
    const rideId = await this.storage.get('rideId');
    return rideId;
  }

  async setToken(token) {
    this.api.updateToken(token);
    await this.storage.set('token', token);
  }

  async getToken() {
    const token = await this.storage.get('token');
    return token;
  }

  async setLoggedInUser(user: any) {
    Object.assign(this.loggedInUser, user);
    this.loggedInUser.token = await this.getToken();
    this.loggedInUser.rideId = await this.getRideId();
    await this.storage.set('id', user.id);
    this.sce._loggedInUser = this.loggedInUser;
    this.initSession();
  }

  initSession() {
    if (!this.sce._loggedInUser.favorite) this.sce._loggedInUser.favorite = [];
    if (!this.sce._loggedInUser._cc) this.sce._loggedInUser._cc = [];
    this.sce.trip = this.sce._loggedInUser.trip ? this.sce._loggedInUser.trip : {};
    if (!this.sce._session) {
      this.sce.trip = {
        info: {},
        sceOptions: [],
        sceOptionsFees: null,
        scheduledDate: '',
        scheduledTime: ''
      }
      if (!this.sce.trip.info.name) {
        this.sce.trip.info = {
          name: this.sce._loggedInUser.name,
          phone: this.sce._loggedInUser.phone,
          rname: this.sce._loggedInUser.name,
          rphone: this.sce._loggedInUser.phone,
          driverNote: ''
        };
      }
      console.log('>>>>>>>> trip info ', this.sce.trip.info);
      if (!this.sce.trip.info.rname) this.sce.trip.info.rname = '';
      if (!this.sce.fares) {
        this.api.getDbCollection('fares', 'wkqL2Hc8ZStGEZ48fizI').subscribe((resp: any) => {
          this.sce.fares = resp;
        }, err => console.log('err getting fares -->', err)); 
      }

      this.sce._loggedInUser.trip = this.sce.trip;
      this.sce._loggedInUser.signInToken = this.sce.signInToken;
      this.api.updateUser(this.sce._loggedInUser.id, this.sce._loggedInUser).subscribe(async (updatedUser) => {
      this.checkSignedInUserInterv = setInterval(() => {
            this.checkSignedInUser();
        }, 5000);
       });
    }
  }
  
  checkSignedInUser() {
    if (!this.loggedInUser.id) clearInterval(this.checkSignedInUserInterv);
    else {
    this.api.getUser().subscribe((res: any) => {
      if (res && (!res.signInToken || res.signInToken !== this.sce.signInToken)) {
        clearInterval(this.checkSignedInUserInterv);
        this.navCtrl.navigateRoot('/loginPage');
      }}, err => console.log('3 - checkSignedInUser===>', err));
    }
  }

  onNgDestroy() {
    clearInterval(this.checkSignedInUserInterv);
  }
  
  async logout(): Promise<any> {
    this.createNewEmptyUser();
    await this.api.logout();
    return this.storage.clear();
  }

  getLocalUrl(_imagePath): Promise<{ url: string; nativeUrl: string; }> {
    return new Promise((resolve, reject) => {
      const name = _imagePath.split('/');
      this.makeFileIntoBlob(_imagePath, name[name.length - 1]).then((image) => {
        resolve({ url: window.URL.createObjectURL(image), nativeUrl: _imagePath });
      }).catch(error => {
        reject(error);

      });
    });
  }

  makeFileIntoBlob(_imagePath, fileName) {
    return new Promise((resolve, reject) => {
      window['resolveLocalFileSystemURL'](_imagePath, (fileEntry) => {
        fileEntry['file']((resFile) => {
          const reader = new FileReader();
          reader.onload = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };
          reader.onerror = (e) => {
            reject(e);
          };
          reader.readAsArrayBuffer(resFile);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
      });
    });
  }

  async createLoader(message): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingCtrl.create({
      message
    });
    return loader;
  }

  async createToast(message, showCloseButton = false, position = 'bottom' as 'top' | 'bottom' | 'middle', duration = 2000): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration,
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    return toast;
  }

  // openCamera() {
  //   const options: CameraOptions = {
  //     quality: 60,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then((url) => {
  //     const name = UUID.UUID();
  //     this.makeFileIntoBlob(url, name).then(imageData => {
  //       this.createLoader('waiting...');
  //       this.storageServ.uploadContent(imageData, name).then(async success => {
  //         await this.loadingCtrl.dismiss();
  //         this.createToast('image uploded', true, 'bottom', 2100);
  //         this.loggedInUser.profile_img = success.url;
  //       }).catch(async err => {
  //         await this.loadingCtrl.dismiss();
  //         this.createToast(`${err}`, true, 'bottom', 2100);
  //       });
  //     });
  //   }).catch(err => { console.log('err', err); });
  // }

  // openGallery() {
  //   const options: CameraOptions = {
  //     quality: 60,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };
  //   this.camera.getPicture(options).then((url) => {
  //     const name = UUID.UUID();
  //     this.makeFileIntoBlob(url, name).then(imageData => {
  //       this.createLoader('waiting...');
  //       this.storageServ.uploadContent(imageData, name).then(async success => {
  //         await this.loadingCtrl.dismiss();
  //         this.createToast('image uploded', true, 'bottom', 2100);
  //         this.loggedInUser.profile_img = success.url;
  //       }).catch(async err => {
  //         await this.loadingCtrl.dismiss();
  //         this.createToast(`${err}`, true, 'bottom', 2100);
  //         console.log('err', err);
  //       });
  //     });
  //   }).catch(err => {
  //     console.log('err', err);
  //   });
  // }

}
