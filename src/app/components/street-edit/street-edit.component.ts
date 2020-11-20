import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { StreetService } from '../../services/street.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-street-edit',
  templateUrl: './street-edit.component.html',
  styleUrls: ['./street-edit.component.css']
})
export class StreetEditComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  streetId: any;
  street: any;

  streetName: any;
  streetDescription: any;

  constructor(private fb: FormBuilder,
    private streetService: StreetService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
	  
	   this.init();

     this.streetId = this.route.snapshot.paramMap.get('id');

    console.log(this.streetId);

    this.GetPost();
  }
  
  init(){
    this.postForm = this.fb.group({
      streetName: ['', Validators.required],
      streetDescription: ['', Validators.required],
    })
  }
  
   GetPost(){
    console.log(this.streetId);
    this.streetService.getStreet(this.streetId).subscribe( data => {
        console.log(data);
        this.street = data.street;
    });
  }
  
    SubmitPost(){
    let body;

    if(this.postForm.value.streetName =='' || this.postForm.value.streetName == null){
      this.streetName = this.street.streetName;
    }

    if(this.postForm.value.streetName){
      this.streetName = this.postForm.value.streetName;
    }

    if(this.postForm.value.streetDescription =='' || this.postForm.value.streetDescription == null){
      this.streetDescription = this.street.streetDescription;
    }

    if(this.postForm.value.streetDescription){
      this.streetDescription = this.postForm.value.streetDescription;
    }




     body = {
        streetId: this.streetId,
        streetName: this.streetName,
        streetDescription: this.streetDescription,
        userId: this.street.user._id,
		created: this.street.created

     }

     console.log(body);

     this.streetService.editStreet(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/restaurants/all']);
     });

  }


}
