import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { RestaurantService } from '../../services/restaurant.service';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { StreetService } from '../../services/street.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-street-form',
  templateUrl: './street-form.component.html',
  styleUrls: ['./street-form.component.css']
})
export class StreetFormComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  streets = [];

  restaurantSelectId: any;

   constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private categoryService: CategoryService,
	private streetService: StreetService) { }

  ngOnInit() {
	  
	  this.init();
  }
  
  init(){
    this.postForm = this.fb.group({
      streetName: ['', Validators.required],
      streetDescription: ['', Validators.required],
    })
  }
  
  SubmitPost(){
    let body;

      body = {
        streetName: this.postForm.value.streetName,
        streetDescription: this.postForm.value.streetDescription,
     }

     //console.log(body);

     this.streetService.addStreet(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/category/all']);
     });

  }

}
