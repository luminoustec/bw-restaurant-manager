import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { RestaurantService } from '../../services/restaurant.service';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ApartmentService } from '../../services/apartment.service';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.css']
})
export class ApartmentFormComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  apartments = [];

  SelectId: any;

  constructor(private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private categoryService: CategoryService,
	private apartmentService: ApartmentService) { }

  ngOnInit() {
	  this.init();
  }
  
   init(){
    this.postForm = this.fb.group({
      apartmentName: ['', Validators.required],
      apartmentDescription: ['', Validators.required],
    })
  }
  
  SubmitPost(){
    let body;

      body = {
        apartmentName: this.postForm.value.apartmentName,
        apartmentDescription: this.postForm.value.apartmentDescription,
     }

     //console.log(body);

     this.apartmentService.addApartment(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/category/all']);
     });

  }

}
