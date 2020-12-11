import { Component, Pipe, PipeTransform } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { User } from '@app/models/user';
import { UtilService } from './services/util/util.service';
import { SceService } from './services/sce.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    user: User;

    constructor(
        private userProvider: InitUserProvider,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private util: UtilService,
        private sce: SceService
    ) {
        this.initializeApp();
        this.user = this.userProvider.getUserData();
        if (this.user.id) this.util.goToNew('/resto/home');
        else this.util.goToNew('/loginPage');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    getFirstName(value: string){
        if (value == null) {
            return value;
        }
        const words = value.split(' ');
        return words.length > 0 ? words[0] : value;
    }

    logout() {
        this.userProvider.logout().then(res => {
          this.util.goToNew('/loginPage');
        });
    }

    openSelectedHome(page) {
         this.sce.isComingFromBlueCart = page === '' ? true : false;
         this.sce._restoCheckout = page === '' ? true : false;
         this.sce.selectedTab = 1;
         this.util.goToNew(page);
    }
}



