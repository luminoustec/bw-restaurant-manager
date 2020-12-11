import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SceService } from '@app/services/sce.service';
import { FirestoreService } from '@app/services/api/firestore.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  categoryList: any;
	id: any;
	restaurantName: any;
	owner_id: any;
	socket: any;
	_anim = false;
	_restoItems = false;
	itemsList: any[] = [];
	_items = false;
	_editItem = false;
	editItem: any;
  constructor(
		public loadingCtrl: LoadingController, 
		private route: ActivatedRoute,
		public toastCtrl: ToastController, 
		private storage: Storage,
		public sce: SceService,
		private firestore: FirestoreService
        ) {}

ngOnInit() {}

ionViewWillEnter() {
	this._items = true;
	this.getRestoItems('resto-items', this.sce.restoSelectedItem.resto_id).subscribe((res: any) => {
		this._items = false;
		if (res && res.length > 0) {
			this.itemsList = res[0].items;
			console.log('items -->>', this.itemsList );
		} else console.log('items data err');
	},
	(err) => {
		this._items = false;
		console.log('items data err');
	});
  }

getRestoItems(dbDoc: string, searchStr: string): Observable<any> {
	return this.firestore.find(dbDoc, ref => ref
	 .where('resto_id', '==', searchStr)); 
}

editItemData(index: number) {
	this.editItem = this.itemsList[index];
	console.log('Edit Item-->>', index, this.editItem);
	this.editItem.image = this.editItem.image ? this.editItem.image : '';
	this._editItem = true;
}

saveItem() {

}

}
