import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { FileUploader } from 'ng2-file-upload';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { TokenService } from '../../services/token.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  categories = [];
  
  loggedInUser: any;

  itemId: any;
  item: any;

  itemName: any;
  itemDescription: any;
  itemCategory: any;
  itemAvailable: any;
  itemPrice: any;
  itemStock: any;
  itemPercent: any;


  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
	private tokenService: TokenService,) { }

    ngOnInit() {
      this.init();

       this.itemId = this.route.snapshot.paramMap.get('id');

      console.log(this.itemId);
	  
	  this.loggedInUser = this.tokenService.GetPayLoad();

      this.GetAllCategory(this.loggedInUser._id);


      this.GetItem();
    }

    init(){
      this.postForm = this.fb.group({
        itemName: ['', Validators.required],
        itemDescription: ['', Validators.required],
        itemAvailable: ['', Validators.required],
        itemPrice: ['', Validators.required],
        itemStock: ['', Validators.required],
        itemPercent: ['', Validators.required],
        itemCategory: [ '' , Validators.required],
      })
    }

    GetAllCategory(id){
      this.categoryService.GetAllUserCategory(id).subscribe(data => {
        console.log(data);
        this.categories = data.categoryByUser;

        console.log(this.categories);
      });
    }

    GetItem(){
      console.log(this.itemId);
      this.itemService.getItem(this.itemId).subscribe(data =>{
          console.log(data);
          this.item = data.item;
      });
    }

    SubmitPost(){
      let body;

      if(this.postForm.value.itemName == '' || this.postForm.value.itemName == null){
        this.itemName = this.item.itemName;
      }

      if(this.postForm.value.itemName){
        this.itemName = this.postForm.value.itemName;
      }

      if(this.postForm.value.itemDescription =='' || this.postForm.value.itemDescription == null){
        this.itemDescription = this.item.itemDescription;
      }

      if(this.postForm.value.itemDescription){
        this.itemDescription = this.postForm.value.itemDescription;
      }

      if(this.postForm.value.itemAvailable =='' || this.postForm.value.itemAvailable == null){
        this.itemAvailable = this.item.itemAvailable;
      }

      if(this.postForm.value.itemAvailable){
        this.itemAvailable = this.postForm.value.itemAvailable;
      }

      if(this.postForm.value.itemPrice =='' || this.postForm.value.itemPrice == null){
        this.itemPrice = this.item.itemPrice;
      }

      if(this.postForm.value.itemPrice){
        this.itemPrice = this.postForm.value.itemPrice;
      }

      if(this.postForm.value.itemStock =='' || this.postForm.value.itemStock == null){
        this.itemStock = this.item.itemStock;
      }

      if(this.postForm.value.itemStock){
        this.itemStock = this.postForm.value.itemStock;
      }

      if(this.postForm.value.itemPercent =='' || this.postForm.value.itemPercent == null){
        this.itemPercent = this.item.itemPercent;
      }

      if(this.postForm.value.itemPercent){
        this.itemPercent = this.postForm.value.itemPercent;
      }

      if(this.postForm.value.itemCategory =='' || this.postForm.value.itemCategory == null){
        this.itemCategory = this.item.itemCategory;
      }

      if(this.postForm.value.itemCategory){
        this.itemCategory = this.postForm.value.itemCategory;
      }




       body = {
          itemId: this.itemId,
          //restaurantId: this.category.restaurantId._id,
          itemCategory: this.itemCategory,
          itemImgId: this.item.itemImgId,
          itemImgVersion: this.item.itemImgVersion,
          itemName: this.itemName,
          itemDescription: this.itemDescription,
          itemAvailable: this.itemAvailable,
          itemPrice: this.itemPrice,
          itemStock: this.itemStock,
          itemPercent: this.itemPercent,
          userId: this.item.user._id,

       }

       console.log(body);

       this.itemService.editItem(body).subscribe(data => {
         console.log(data);

         this.postForm.reset();

         this.router.navigate(['/item/all']);
       });

    }


    ReadAsBase64(file): Promise <any> {
      const reader = new FileReader();
      const fileValue = new Promise((resolve ,reject) => {
          reader.addEventListener('load' , () => {
            resolve(reader.result);
          });

          reader.addEventListener('error' , (event) => {
            reject(event);
          });

          reader.readAsDataURL(file);
      });

      return fileValue;
    }

    OnFileSelected(event){
      const file: File = event[0];

      this.ReadAsBase64(file).then(result => {
          this.selectedFile = result;
      }).catch(err => console.log(err));
    }


}
