import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { RestaurantService } from '../../services/restaurant.service';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CityService } from '../../services/city.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  restaurants = [];

  restaurantSelectId: any;

  constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private categoryService: CategoryService,
	private cityService: CityService) { }

  ngOnInit() {
	  
	  this.init();
  }
  
  
   init(){
    this.postForm = this.fb.group({
      cityName: ['', Validators.required],
      cityDescription: ['', Validators.required],
    })
  }
  
  SubmitPost(){
    let body;

      body = {
        cityName: this.postForm.value.cityName,
        cityDescription: this.postForm.value.cityDescription,
     }

     //console.log(body);

     this.cityService.addCity(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/category/all']);
     });

  }

}
