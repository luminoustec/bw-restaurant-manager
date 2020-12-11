import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SceService } from '@app/services/sce.service';

import { UtilService } from '@app/services/util/util.service';
import { APIService } from '@app/services/api/api.service';
import { from, Observable } from 'rxjs';
import { FirestoreService } from '@app/services/api/firestore.service';

declare let google;

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	public user: any;
	public shops: any;
	_resto = false;
	err = '';
	sliderOpts = {
		autoplay: true,
		speed: 3000,

	};

	filters = [
		{ f: 'Rating 4.8+', isChecked: false },
		{ f: 'Open Now', isChecked: false },
		{ f: 'Popularity', isChecked: false },
		{ f: 'Nearest To Me', isChecked: false }
	];

	popular = [];
	categories = [];
	restaurants = [];
	_showViewAll = false;
	searchItem = '';
	restoStart = -10;
	restoPage = [];
	pagination = '';
	totalPages = 0;
	currentPage = 0;
	cost = '';
	checked1 = false;
	checked2 = false;
	currentDate: any;
	lat = 37.7749;
	lng = -122.4194;
	_searchResto = false;
	restoName = '';
	editCat: any;
	editResto: any;
	_editCat = false;
	_editResto = false;
	_selectedCatId: string;
	_selectedCatIndex: number;
	_selectedRestoId: string;
	_selectedRestoIndex: number;
	action = '';

	constructor(
		public toastCtrl: ToastController,
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public sce: SceService,
		private datePipe: DatePipe,
		private util: UtilService,
		public router: Router,
		private api: APIService,
		private firestore: FirestoreService) { }

	ngOnInit() {
		this._resto = true;
		this.getRestoCategoryApi('resto-category', '').subscribe((res: any) => {
			if (res) {
				this.sce.restoCat = res;
				this.categories = res;
				console.log('category -->>', this.categories);
				this._resto = false;
			} else console.log('category data err');
		},
			(err) => {
				console.log('category data err');
				this._resto = false;
			});
	}

	loadResto(cat: string, restoName: string) {
		this.restaurants = [];
		this.restoPage = [];
		this._searchResto = true;
		this.searchItem = '';
		this.restoName = restoName;
		this._editCat = false;
		this._editResto = false;
		console.log('id -->>>', cat);
		this.getRestoListApi('resto-list', cat).subscribe((res: any) => {
			this._searchResto = false;
			this.sce.restoList = res;
			console.log('resto list', res);
			if (res && res.length > 0) {
				this.restaurants = this.sce.restoList[0].list
				this.initPagination();
			} else console.log('resto data err');
		},
			(err) => {
				console.log('resto data err');
				this._searchResto = false;
			});
		this._showViewAll = true;

	}

	// ------------------- edit/save category

	editCategory(index: number) {
		this.action = 'edit';
		this.editCat = Object.assign({}, this.categories[index]);
		this._selectedCatId = this.categories[index].id;
		this._selectedCatIndex = index;
		console.log('editCat-->>', this.editCat);
		this._editCat = true;
		this._editResto = false;
	}

	addCategory() {
		this.action = 'save';
		this.editCat = {};
		this.editCat.active = true;
		this._editCat = true;
		this._editResto = false;
	}

	saveCategory() {
		if (this.action === 'edit') {
			if (this._selectedCatId && this._editCat) {
				this.updateDataApi('resto-category', this._selectedCatId, this.editCat);
				this.categories[this._selectedCatIndex] = this.editCat
				this._editCat = false;
				this._editResto = false;
			}
		} else if (this.action === 'save') {
			this.saveDataApi('resto-category', this.editCat).subscribe(
				res => {
					this.categories.push(this.editCat);
				} 
			);
			this.categories
			this._editCat = false;
			this._editResto = false;
		}
	}

	async delCategory(id: string, index: number) {
		const alert = await this.util.createAlert(
			'Confirm',
			false,
			'Do you want to delete ' + id,
			{
				text: 'No',
				role: 'cancel',
				cssClass: 'secondary',
			},
			{
				text: 'Yes',
				handler: () => {
					this.delDataApi('resto-category', id).subscribe(
						res => {
							this.categories.splice(index, 1);
						}
					);
					}
				}
		);
		await alert.present();
	}

	// ------------------- edit/save resto

	editRestaurant(index: number) {
		this.action = 'edit';
		this.editResto = this.restoPage[index];
		console.log('editResto-->>', this.editResto);
		this._editCat = false;
		this._editResto = true;
	}

	addResto() {
		this.action = 'save';
		this.editResto = {};
		this._editCat = false;
		this._editResto = true;
	}

	saveResto() {
		if (this.action === 'edit') {
			if (this._selectedCatId && this._editCat) {
				this.updateDataApi('resto-category', this._selectedCatId, this.editCat);
				this.categories[this._selectedCatIndex] = this.editCat
				this._editCat = false;
				this._editResto = false;
			}
		} else if (this.action === 'save') {
			this.saveDataApi('resto-category', this.editCat);
			this._editCat = false;
			this._editResto = false;
		}
	}

	// ---------------------

	private initPagination() {
		this.restoStart = -10;
		this.restoPage = [];
		this.pagination = '';
		this.currentPage = 0;
		this.totalPages = Math.ceil(this.restaurants.length / 10);
		this.next();
	}

	private next() {
		if (this.currentPage < this.totalPages) {
			this.restoStart += 10;
			++this.currentPage;
			this.pagination = 'Page ' + this.currentPage + ' of ' + this.totalPages;
			this.restoPage = this.restaurants.filter((el, index) => index >= this.restoStart && index <= this.restoStart + 9);
		}
	}

	private prev() {
		if (this.currentPage > 1) {
			this.restoStart -= 10;
			--this.currentPage;
			this.pagination = 'Page ' + this.currentPage + ' of ' + this.totalPages;
			this.restoPage = this.restaurants.filter((el, index) => index >= this.restoStart && index <= this.restoStart + 9);
		}
	}

	openItems(index: number, disabled: string) {
		if (!disabled) {
			this.sce.restoSelectedItem = this.restaurants[index];
			this.router.navigateByUrl('/resto/category');
		}
	}

	checkRestoOpeningTime(restoTime: string, delivery_time: string, resto_id: string): boolean {
		const time = restoTime.split('-');
		const aDate = time[0] ? time[0].trim() : null;
		const bDate = time[0] ? time[1].trim() : null;
		let a: any;
		let b: any;
		const myDate = new Date();
		const timestamp = Math.round((myDate.getTime() / 60000));
		this.currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
		if (aDate) a = this.currentDate + ' ' + aDate;
		if (bDate) b = this.currentDate + ' ' + bDate;
		let disabled = true;
		const deliveryTime = delivery_time ? Number(delivery_time) : 30;
		const aMinutes = Math.round(new Date(a).getTime() / 60000);
		const baMinutes = Math.round(new Date(b).getTime() / 60000);
		disabled = aMinutes &&
			baMinutes &&
			deliveryTime &&
			aMinutes < timestamp &&
			timestamp < baMinutes - Number(delivery_time) ? false : true;
		return disabled;
	}

	// ----------------------- APIs

	getRestoCategoryApi(dbDoc: string, searchStr: string): Observable<any> {
		return this.firestore.find(dbDoc, ref => ref
			.where('active', '==', true));
	}

	getRestoListApi(dbDoc: string, searchStr: string): Observable<any> {
		return this.firestore.find(dbDoc, ref => ref
			.where('category_id', '==', searchStr));
	}

	updateDataApi(collection: string, id: string, data: any): Observable<any> {
		console.log('update data', data);
		return from(this.firestore.update(collection, id, data));
	}

	saveDataApi(collection: string, data: any): Observable<any> {
		console.log('save data', data);
		return from(this.firestore.create(collection, data));
	}

	delDataApi(collection: string, id: string): Observable<any> {
		console.log('delete', id);
		return from(this.firestore.delete(collection, id));
	}
}
