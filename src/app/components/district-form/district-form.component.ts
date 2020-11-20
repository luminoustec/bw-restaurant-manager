import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { RestaurantService } from '../../services/restaurant.service';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { DistrictService } from '../../services/district.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.css']
})
export class DistrictFormComponent implements OnInit {
	
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
	private districtService: DistrictService) { }

  ngOnInit() {
	  
	  this.init();
  }
  
   init(){
    this.postForm = this.fb.group({
      districtName: ['', Validators.required],
      districtDescription: ['', Validators.required],
    })
  }
  
  SubmitPost(){
    let body;

      body = {
        districtName: this.postForm.value.districtName,
        districtDescription: this.postForm.value.districtDescription,
     }

     //console.log(body);

     this.districtService.addDistrict(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/category/all']);
     });

  }
  

}
