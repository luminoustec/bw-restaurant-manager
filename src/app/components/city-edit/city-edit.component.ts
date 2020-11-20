import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { CityService } from '../../services/city.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  cityId: any;
  city: any;

  cityName: any;
  cityDescription: any;


  constructor(private fb: FormBuilder,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
	  
	  this.init();

     this.cityId = this.route.snapshot.paramMap.get('id');

    console.log(this.cityId);

    this.GetPost();
	  
  }
  
  init(){
    this.postForm = this.fb.group({
      cityName: ['', Validators.required],
      cityDescription: ['', Validators.required],
    })
  }
  
  GetPost(){
    console.log(this.cityId);
    this.cityService.getCity(this.cityId).subscribe( data => {
        console.log(data);
        this.city = data.city;
    });
  }
  
  SubmitPost(){
    let body;

    if(this.postForm.value.cityName =='' || this.postForm.value.cityName == null){
      this.cityName = this.city.cityName;
    }

    if(this.postForm.value.cityName){
      this.cityName = this.postForm.value.cityName;
    }

    if(this.postForm.value.cityDescription =='' || this.postForm.value.cityDescription == null){
      this.cityDescription = this.city.cityDescription;
    }

    if(this.postForm.value.cityDescription){
      this.cityDescription = this.postForm.value.cityDescription;
    }




     body = {
        cityId: this.cityId,
        cityName: this.cityName,
        cityDescription: this.cityDescription,
        userId: this.city.user._id,
		created: this.city.created

     }

     console.log(body);

     this.cityService.editCity(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/restaurants/all']);
     });

  }

}
