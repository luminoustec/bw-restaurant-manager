import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { ApartmentService } from '../../services/apartment.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-apartment-edit',
  templateUrl: './apartment-edit.component.html',
  styleUrls: ['./apartment-edit.component.css']
})
export class ApartmentEditComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  apartmentId: any;
  apartment: any;

  apartmentName: any;
  apartmentDescription: any;

  constructor(private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
	  
	   this.init();

     this.apartmentId = this.route.snapshot.paramMap.get('id');

    console.log(this.apartmentId);

    this.GetPost();
	  
  }
  
  init(){
    this.postForm = this.fb.group({
      apartmentName: ['', Validators.required],
      apartmentDescription: ['', Validators.required],
    })
  }
  
  GetPost(){
    console.log(this.apartmentId);
    this.apartmentService.getApartment(this.apartmentId).subscribe( data => {
        console.log(data);
        this.apartment = data.apartment;
    });
  }
  
  SubmitPost(){
    let body;

    if(this.postForm.value.apartmentName =='' || this.postForm.value.apartmentName == null){
      this.apartmentName = this.apartment.apartmentName;
    }

    if(this.postForm.value.apartmentName){
      this.apartmentName = this.postForm.value.apartmentName;
    }

    if(this.postForm.value.apartmentDescription =='' || this.postForm.value.apartmentDescription == null){
      this.apartmentDescription = this.apartment.apartmentDescription;
    }

    if(this.postForm.value.apartmentDescription){
      this.apartmentDescription = this.postForm.value.apartmentDescription;
    }




     body = {
        apartmentId: this.apartmentId,
        apartmentName: this.apartmentName,
        apartmentDescription: this.apartmentDescription,
        userId: this.apartment.user._id,
		created: this.apartment.created

     }

     console.log(body);

     this.apartmentService.editApartment(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/restaurants/all']);
     });

  }

}
