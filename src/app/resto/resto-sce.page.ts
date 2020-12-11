import { Component , OnInit } from '@angular/core';
import { Platform, MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'; // add this
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'resto-app-root',
  templateUrl: 'resto-sce.page.html',
  styleUrls: ['resto-sce.page.scss']
})

export class RestoAppComponent {
  menu = [];
  user: any;
  public fireAuth: any;
  public userProfiles: any;	
  public selectedIndex = 0;
  constructor(
    public toastCtrl: ToastController,
    public menuCtrl: MenuController, 
    private translate: TranslateService
  ) {
		let userLang = navigator.language.split('-')[0];
    userLang = /(english|deutsch)/gi.test(userLang) ? userLang : 'english';
    this.translate.use(userLang);
  }
}
