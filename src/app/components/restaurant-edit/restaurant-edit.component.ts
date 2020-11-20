import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  restaurantId: any;
  restaurant: any;

  restaurantName: any;
  restaurantAddress: any;
  restaurantLat: any;
  restaurantLng: any;
  restaurantPhone: any;

  constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.init();

     this.restaurantId = this.route.snapshot.paramMap.get('id');

    console.log(this.restaurantId);

    this.GetPost();
  }

  init(){
    this.postForm = this.fb.group({
      restaurantName: ['', Validators.required],
      restaurantAddress: ['', Validators.required],
      restaurantLat: ['', Validators.required],
      restaurantLng: ['', Validators.required],
      restaurantPhone: ['', Validators.required]
    })
  }

  GetPost(){
    console.log(this.restaurantId);
    this.restaurantService.getRestaurant(this.restaurantId).subscribe( data => {
        console.log(data);
        this.restaurant = data.restaurant;
    });
  }

  SubmitPost(){
    let body;

    if(this.postForm.value.restaurantName =='' || this.postForm.value.restaurantName == null){
      this.restaurantName = this.restaurant.restaurantName;
    }

    if(this.postForm.value.restaurantName){
      this.restaurantName = this.postForm.value.restaurantName;
    }

    if(this.postForm.value.restaurantAddress =='' || this.postForm.value.restaurantAddress == null){
      this.restaurantAddress = this.restaurant.restaurantAddress;
    }

    if(this.postForm.value.restaurantAddress){
      this.restaurantAddress = this.postForm.value.restaurantAddress;
    }

    if(this.postForm.value.restaurantLat =='' || this.postForm.value.restaurantLat == null){
      this.restaurantLat = this.restaurant.restaurantLat;
    }

    if(this.postForm.value.restaurantLat){
      this.restaurantLat = this.postForm.value.restaurantLat;
    }

    if(this.postForm.value.restaurantLng =='' || this.postForm.value.restaurantLng == null){
      this.restaurantLng = this.restaurant.restaurantLng;
    }

    if(this.postForm.value.restaurantLng){
      this.restaurantLng = this.postForm.value.restaurantLng;
    }

    if(this.postForm.value.restaurantPhone =='' || this.postForm.value.restaurantPhone == null){
      this.restaurantPhone = this.restaurant.restaurantPhone;
    }

    if(this.postForm.value.restaurantPhone){
      this.restaurantPhone = this.postForm.value.restaurantPhone;
    }

/**
      body = {
        restaurantId: this.restaurantId,
        resImgId: this.restaurant.resImgId,
        resImgVersion: this.restaurant.resImgVersion,
        restaurantName: this.postForm.value.restaurantName,
        restaurantAddress: this.postForm.value.restaurantAddress,
        restaurantLat: this.postForm.value.restaurantLat,
        restaurantLng: this.postForm.value.restaurantLng,
        restaurantPhone: this.postForm.value.restaurantPhone,
        userId: this.restaurant.user._id,

     }
     */


     body = {
        restaurantId: this.restaurantId,
        resImgId: this.restaurant.resImgId,
        resImgVersion: this.restaurant.resImgVersion,
        restaurantName: this.restaurantName,
        restaurantAddress: this.restaurantAddress,
        restaurantLat: this.restaurantLat,
        restaurantLng: this.restaurantLng,
        restaurantPhone: this.restaurantPhone,
        userId: this.restaurant.user._id,

     }

     console.log(body);

     this.restaurantService.editRestaurant(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/restaurants/all']);
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
