import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { FileUploader } from 'ng2-file-upload';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { TokenService } from '../../services/token.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  restaurants = [];

  categoryId: any;
  category: any;

  categoryName: any;
  categoryDescription: any;

  restaurantId: any;
  
  loggedInUser: any;


  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
	private usersService: UsersService,
    private tokenService: TokenService,) { }

  ngOnInit() {
    this.init();

     this.categoryId = this.route.snapshot.paramMap.get('id');

    console.log(this.categoryId);
	
	this.loggedInUser = this.tokenService.GetPayLoad();

    //this.GetAllRestaurant();
	
	this.GetAllUserRestaurant(this.loggedInUser._id);


    this.GetCategory();
  }

  init(){
    this.postForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required],
      restaurantId: ['', Validators.required]
    })
  }

  GetAllRestaurant(){
    this.restaurantService.GetAllRestaurants().subscribe(data => {
      console.log(data);
      this.restaurants = data.restaurants;

      console.log(this.restaurants);
    });
  }
  
  GetAllUserRestaurant(id){
	  
	  this.restaurantService.GetAllUserRestaurant(id).subscribe(data => {
      console.log(data);
      this.restaurants = data.restaurantByUser;

      console.log(this.restaurants);
    });
	  
  }

  GetCategory(){
    console.log(this.categoryId);
    this.categoryService.getCategory(this.categoryId).subscribe( data =>{
        console.log(data);
        this.category = data.category;
    });
  }

  SubmitPost(){
    let body;

    if(this.postForm.value.categoryName == '' || this.postForm.value.categoryName == null){
      this.categoryName = this.category.categoryName;
    }

    if(this.postForm.value.categoryName){
      this.categoryName = this.postForm.value.categoryName;
    }

    if(this.postForm.value.categoryDescription =='' || this.postForm.value.categoryDescription == null){
      this.categoryDescription = this.category.categoryDescription;
    }

    if(this.postForm.value.categoryDescription){
      this.categoryDescription = this.postForm.value.categoryDescription;
    }

    if(this.postForm.value.restaurantId =='' || this.postForm.value.restaurantId == null){
      this.restaurantId = this.category.restaurantId._id;
    }

    if(this.postForm.value.restaurantId){
      this.restaurantId = this.postForm.value.restaurantId;
    }




     body = {
        categoryId: this.categoryId,
        //restaurantId: this.category.restaurantId._id,
        restaurantId: this.restaurantId,
        catImgId: this.category.catImgId,
        catImgVersion: this.category.catImgVersion,
        categoryName: this.categoryName,
        categoryDescription: this.categoryDescription,
        userId: this.category.user._id,

     }

     console.log(body);

     this.categoryService.editCategory(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/category/all']);
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
