import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/environment';
import { IonicStorageModule } from '@ionic/storage';
import { InitUserProvider } from '@app/services/inituser/inituser.service';

import { StorageService } from '@app/services/api/firestorage.service';
import { AuthenticationService } from '@app/services/api/firebase-authentication.service';
import { FirestoreService } from '@app/services/api/firestore.service';
import { APIService } from './services/api/api.service';
import { DatePipe } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule, FunctionsRegionToken } from 'angularfire2/functions';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({ name: environment.IONIC_STORAGE }),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AgmDirectionModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.config),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireFunctionsModule,
        AngularFireStorageModule,
        NoopAnimationsModule
    ],
    providers: [
        StatusBar,
        Geolocation,
        SplashScreen,
        AuthenticationService,
        FirestoreService,
        APIService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: FunctionsRegionToken, useValue: 'us-central1' },
        InitUserProvider,
        StorageService,
        DatePipe,
        {
            provide: APP_INITIALIZER,
            useFactory: initUserProviderFactory,
            deps: [InitUserProvider],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

export function initUserProviderFactory(provider: InitUserProvider) {
    return () => provider.load();
}
