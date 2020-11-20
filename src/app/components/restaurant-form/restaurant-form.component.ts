import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit() {
    this.init();
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

  SubmitPost(){
    let body;

      body = {
        image: this.selectedFile,
        restaurantName: this.postForm.value.restaurantName,
        restaurantAddress: this.postForm.value.restaurantAddress,
        restaurantLat: this.postForm.value.restaurantLat,
        restaurantLng: this.postForm.value.restaurantLng,
        restaurantPhone: this.postForm.value.restaurantPhone,


     }

     //console.log(body);

     this.restaurantService.addRestaurant(body).subscribe(data => {
       //console.log(data);

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
