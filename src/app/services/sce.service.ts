import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
    ToastController,
    LoadingController,
    AlertController,
    ModalController,
} from '@ionic/angular';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { tap, timeout, retry, catchError, map } from 'rxjs/operators';
import { cc, fav } from '@app/models/user';
import { Storage } from '@ionic/storage';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class SceService {
    private subjectFlag = new Subject<any>();
    isComingFromBlueCartSubject: Subject<boolean> = new Subject<boolean>();
    isComingFromBlueCart;
    _user: any;
    _email: string;
    _loggedInUser: any;
    trip: any = {};
    _rates = [7, 5, 3.7];
    _vehicule = ['Truck', 'SUV', 'Car'];
    _cc: cc = {
        cardName: '',
        cardNumber: null,
        cvv: null,
        expiryDate: null,
        cardType: null,
    };
    _fav: fav = { name: '', companyName: '', phone: '', address: '' };
    _session = null;
    date_placed: any;
    tracking: any = {};
    estimatedTime = '';
    coord = {
        origin: {
            lat: 0,
            lon: 0,
            place: '',
        },

        destination: {
            lat: 0,
            lon: 0,
            place: '',
        },

        center: {
            lat: 0,
            lon: 0,
            place: '',
        },
    };
    vehiclePrice = [0, 0, 0];
    fares: any;
    infoFavIndex: number;
    _showSceOptions = false;
    _counter;
    _minuteDiff = 0;
    _interval = 8;
    _checkRequest = true;
    _showHideFooter = false;
    _showHideHeader = true;
    _showPaypal = true;
    _mode = false;
    signInToken = '';
    _home = false;
    _multiStops = 0;
    timer: any;
    multiStops: any = [];
    stopIndex: number;
    waypoints: any = [];
    _showSelf = true;
    _showNow = true;
    _showWelcomeMsg = true;
    _gotoCart = true;
    cart: any = [];
    p: any = [];
    pIndex = 0;
    prodCate: any = [];
    banner: any = [];
    selectedSubCategory: any = {};
    selectedProd: any;
    selectedCategoryId: number;
    selectedCategoryName: string;
    selectedCategoryTotalPages: any;
    selectedOrderBy: any = 5;
    selectedPage: any = 1;
    selectedItemsPerPage: any = 10;
    pagination = 10;
    filter = 0;
    selectedTab = 1;
    baseUrl = 'https://thebluecart.com/api/'; // 'http://cart.nop-station.com/api/';
    rideExist = false;
    startSripe = true;
    currentRideId = '';
    continue = false;
    cartTotal;
    tbcCartTotal;
    servedShippingMethodPrice:number;
    servedShipingMethodPriceReceived:boolean = false;

    restoCat = [];
    restoList = [];
    restoItems = [];
    restoSelectedItem: any;
    restoItemCart = [];
    restoSelectedItems = [];
    restoCartcost = 0;
    restoTax = 0;
    _restoCheckout = false;
    _anim = false;
    restoOrderPlaced = false;
    restoNote = '';
    restoUserLoc = {
       dest : '',
       orig: '',
       lat: null,
       lng: null
    };
    
    constructor(
        private toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private http: HttpClient,
        private modalCtrl: ModalController,
        private storage: Storage,
         // public platform: Platform, // public backgroundMode: BackgroundMode
    ) {
        // this.initializeApp();


        this.signInToken = Math.round(100000000000 * Math.random()).toString();
        // console.log('Sign in toke ===>', this.signInToken );
        this.isComingFromBlueCartSubject.subscribe((value) => {
            this.isComingFromBlueCart = value;
            //console.log('isComingFromBlueCart===> ', this.sce.isComingFromBlueCart);
        });

        this.isComingFromBlueCartSubject.next(false);
    }

    sendFlagMessage(message: any) {
        this.subjectFlag.next(message);
    }

    getFlagMessage(): Observable<any> {
        return this.subjectFlag.asObservable();
    }



    // initializeApp() {
    //   this.platform.ready().then(() => {
    //     this.backgroundMode.enable();
    //     this.backgroundMode.on('activate').subscribe(() => {
    //       this._mode = this.backgroundMode.isActive();
    //     });
    //   });
    // }

    getRemainingTime() {
        this._counter = 'Loading...';
        const rideTimestamp = this.trip.scheduledDate
            ? new Date(this.trip.scheduledDate).getTime()
            : null;
        let timestamp;
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            timestamp = new Date().getTime();
            this._minuteDiff = Math.round((rideTimestamp - timestamp) / 1000) - 60 * this._interval;
            this._counter =  (this._minuteDiff - (this._minuteDiff % 60)) / 60 + 'm ' + (this._minuteDiff % 60) + 's';
            if (this._minuteDiff > 0) {
                this._counter = 'Request Pickup after ' + this._counter;
            } else if (this._minuteDiff < this._interval * -120) {
                this._counter = 'Pickup Expired';
                if (this.timer) clearInterval(this.timer);
            } else {
                this._counter = 'Request Pickup Now';
            }
            this._checkRequest =  this._minuteDiff > 0 || this._minuteDiff < -120 * this._interval  ? true : false;
            // @@@@
            // console.log('counter --->>>', this._minuteDiff, this._counter, this._checkRequest);
        }, 1000);
    }

    setOrigin(lat: any, lon: any) {
        this.coord.origin.lat = lat;
        this.coord.origin.lon = lon;
    }

    setDestination(lat: any, lon: any) {
        this.coord.destination.lat = lat;
        this.coord.destination.lon = lon;
    }

    setCenter(lat: any, lon: any) {
        this.coord.center.lat = lat;
        this.coord.center.lon = lon;
    }

    setOriginLoc(place: string) {
        this.coord.origin.place = place;
    }

    setDestinationLoc(place: string) {
        this.coord.destination.place = place;
    }

    getOrigin() {
        return this.coord.origin;
    }

    getDestination() {
        return this.coord.destination;
    }

    getCenter() {
        return this.coord.center;
    }

    getOriginLoc() {
        return this.coord.origin.place;
    }

    getDestinationLoc() {
        return this.coord.destination.place;
    }

    // toaster
    async openToaster(msg: any, pos: any) {
        const toast = await this.toastCtrl.create({
            header: 'Alert:',
            message: msg,
            duration: 3000,
            position: pos,
            buttons: [
                {
                    text: 'ok',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    },
                },
            ],
        });
        toast.present();
    }

    // loader
    showLoading(msg: any) {
        let loading: any = this.loadingCtrl.create({
            message: msg,
        });
        loading.present();
    }

    // alert
    async showAlert(t: string, msg: any) {
        const alert = await this.alertCtrl.create({
            header: t,
            message: msg,
            buttons: ['Ok'],
        });
        await alert.present();
    }

    laodJson(json: String): Observable<any> {
        return this.http
            .get('assets/json/' + json + '.json')
            .pipe(tap((res) => {
                console.log('----->>>>>>>>>>>', res)
            }));
    }

    /**
     *
     *Get Products Data,
     */
    getData(url: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                "content-type": "application/json",
                "deviceid": "wqewwereee",
                "cache-control": "no-cache",
             }),
        };
        return this.http
            .get<any>(this.baseUrl + url, httpOptions)
            .pipe(
                timeout(6000),
                retry(1),
                catchError(this.handleErr('Error in getting Data'))
            );
    }

    /**
     *
     * @param error
     * @returns error message
     */
    handleErrorMessage(error: HttpErrorResponse): any {
        console.log('handleErrorMessage -->', error);
        let err = '';
        if (error.error && error.error.message) err = error.error.message;
        else if (error && error.message) err = error.message;
        if (error.error instanceof ErrorEvent)
            console.log('--> Client-side or network error:', err);
        else console.log(`--> Server-side error`, err);
        return throwError(err);
    }

    /**
     * @param request operation
     * @returns error message
     */
    private handleErr<T>(operation = 'operation') {
        return (error: HttpErrorResponse): Observable<T> => {
            const message =
                error.error instanceof ErrorEvent
                    ? error.error.message
                    : `server returned code ${error.status} with body "${error.error}"`;
            throw new Error(`${operation} failed: ${message}`);
        };
    }

    getSceOptions() {
        this.laodJson('sceOptions').subscribe(
            (res: any[]) => {
                this.trip.sceOptions = res.sort();
                // console.log('Get Options ----->>>>>>>>>>>>', this.trip.sceOptions);
            },
            (err) => console.log('data err')
        );
    }

    formatPhone($event, source: string) {
        let phone = $event.target.value.replace(/[^\d]/g, '');
        let len = phone.length;
        phone = len > 10 ? phone.substr(0, 10) : phone;
        // console.log('------------> 1 results : ', phone, 'len', phone.length);
        phone = len > 3 ? phone.substr(0, 3) + '-' + phone.substr(3, len) : phone;
        phone = len > 6 ? phone.substr(0, 7) + '-' + phone.substr(7, len + 1) : phone;
        if (source === 'recipient') this.trip.info.rphone = phone;
        else if (source === 'sender') this.trip.info.phone = phone;
    }

    calcPrice(d: number) {
        let price = 0;

        for (let i = 0; i < 3; i++) {
            price = d * this.fares['Mile'][i];

            if (d <= 3) {
                price = this.fares['Minimum Fare'][i];
            }
            price += this.trip.sceOptionsFees ? this.trip.sceOptionsFees : 0;
            this.vehiclePrice[i] = price;

            if(this.isComingFromBlueCart) {
                // Calc Price Based on TBC
                if(this.trip.tbcShippingMethod == 'bibworks-express') {
                    this.trip.price = this.tbcCartTotal + this.vehiclePrice[0];
                } else if (this.trip.tbcShippingMethod == 'bluecart-shipping'){
                    console.log("servedShippingMethodPrice ---> ",this.servedShippingMethodPrice);
                    this.trip.price = this.tbcCartTotal + this.servedShippingMethodPrice;
                }
            }
        }
    }

    generateSceOptionsFees() {
        let total = 0;
        if (this._multiStops == 0) {
            this.trip.sceOptions[0].isChecked = false;
            this.trip.sceOptions[0].price = 0;
        }

        if (this._multiStops > 0) {
            this.trip.sceOptions[0].isChecked = true;
            this.trip.sceOptions[0].price = 2 * this._multiStops;
        }

        this.trip.sceOptions.forEach((val: any) => {
            if (val.isChecked) {
                total += val.price;
            }
        });

        this.trip.sceOptionsFees = total;
    }

    // onNgDestroy() {
    //   this.backgroundMode.disable();
    // }

    public sortAsc(data: any[], fieldName: string): any[] {
        // console.log('sort asc', data);
        const resultData = data
            .sort((a, b) => a[fieldName].localeCompare(b[fieldName]))
            .map((d) => d);
        return resultData;
    }

    public sortDesc(data: any[], fieldName: string): any[] {
        // console.log('sort desc', data);
        const resultData = data
            .sort((a, b) => b[fieldName].localeCompare(a[fieldName]))
            .map((d) => d);
        return resultData;
    }

    public subSortAsc(data: any[], fieldName: string, f: string): any[] {
        const resultData = data
            .sort((a, b) => a[fieldName][f].localeCompare(b[fieldName][f]))
            .map((d) => d);
        return resultData;
    }

    public subSortDesc(data: any[], fieldName: string, f: string): any[] {
        const resultData = data
            .sort((a, b) => b[fieldName][f].localeCompare(a[fieldName][f]))
            .map((d) => d);
        return resultData;
    }

    async createModal(
        component,
        componentProps?,
        cssClass?
    ): Promise<HTMLIonModalElement> {
        const modal = await this.modalCtrl.create({
            component,
            cssClass,
            componentProps
        });
        return modal;
    }

    async store(key: string, action: string, value?: any) {
        let cart = {};
        switch (action) {
            case 'set':
                await this.storage.set(key, value);
                break;
            case 'get':
                cart = await this.storage.get(key);
                break;
            case 'del':
                await this.storage.remove(key);
                break;
        }
        // console.log('storage -->', cart, action)
        return cart;
    }

    localStore(key: string, action: string, value?: any) {
        // console.log('key', key, 'value', value);
        let cart: any;
        if (value) {
            switch (action) {
                case 'set':
                    localStorage.setItem(key, JSON.stringify(value));
                    break;
                case 'get':
                    cart = JSON.parse(localStorage.getItem(key));
                    break;
                case 'del':
                    localStorage.clear();
                    break;
            }
        }
        return cart;
    }

    showHideFooter() {
        this._showHideFooter = !this._showHideFooter;
    }

    uWayP() {
        this.waypoints = [];
        this.multiStops.forEach((el: any) => {
            if (el.location.location.lat && el.location.location.lng) {
                this.waypoints.push(el.location);
            }
        });
    }

    animCart() {
        let t: any;
        let i = 0;
        t = setInterval(() => {
            if(++i>5) {
                clearInterval(t);
                t = null;
            }
            this._anim = !this._anim;
        }, 40);
      }
}
