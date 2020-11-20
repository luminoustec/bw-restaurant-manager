import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { RestaurantService } from '../../services/restaurant.service';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ItemService } from '../../services/item.service';
import { TokenService } from '../../services/token.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  categories = [];
  
  loggedInUser: any;



  constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private categoryService: CategoryService,
    private itemService: ItemService,
	private tokenService: TokenService,) { }

  ngOnInit() {

    this.init();

	this.loggedInUser = this.tokenService.GetPayLoad();
	
    this.GetAllCategory(this.loggedInUser._id);

    const dropDownELement = document.querySelectorAll('select');
    M.FormSelect.init(dropDownELement, {

    });
  }


init(){
    this.postForm = this.fb.group({
      itemName: ['', Validators.required],
      itemDescription: ['', Validators.required],
      itemAvailable: ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemStock: ['', Validators.required],
      itemPercent: ['', Validators.required],
      itemCategory: [this.categories[1]]
    })
  }

  GetAllCategory(id){
    this.categoryService.GetAllUserCategory(id).subscribe(data => {

      this.categories = data.categoryByUser;

      console.log(this.categories);
    });
  }


  SubmitPost(){
    let body;

      body = {
        image: this.selectedFile,
        itemName: this.postForm.value.itemName,
        itemDescription: this.postForm.value.itemDescription,
        itemAvailable: this.postForm.value.itemAvailable,
        itemPrice: this.postForm.value.itemPrice,
        itemStock: this.postForm.value.itemStock,
        itemPercent: this.postForm.value.itemPercent,
        itemCategory: this.postForm.value.itemCategory,

     }



     this.itemService.addItem(body).subscribe(data => {
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
