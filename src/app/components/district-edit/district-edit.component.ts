import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { DistrictService } from '../../services/district.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

const URL = 'https://multitier-restaurant.herokuapp.com/api/chatapp/upload-image';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html',
  styleUrls: ['./district-edit.component.css']
})
export class DistrictEditComponent implements OnInit {
	
	uploader: FileUploader = new FileUploader({
    url : URL,
    disableMultipart: true
  });

  selectedFile : any;

  postForm: FormGroup;

  districtId: any;
  district: any;

  districtName: any;
  districtDescription: any;

   constructor(private fb: FormBuilder,
    private districtService: DistrictService,
    private route: ActivatedRoute,
    private router: Router) { }

   ngOnInit() {
	  
	  this.init();

     this.districtId = this.route.snapshot.paramMap.get('id');

    console.log(this.districtId);

    this.GetPost();
	  
  }
  
  init(){
    this.postForm = this.fb.group({
      districtName: ['', Validators.required],
      districtDescription: ['', Validators.required],
    })
  }
  
  GetPost(){
    console.log(this.districtId);
    this.districtService.getDistrict(this.districtId).subscribe( data => {
        console.log(data);
        this.district = data.district;
    });
  }
  
  SubmitPost(){
    let body;

    if(this.postForm.value.districtName =='' || this.postForm.value.districtName == null){
      this.districtName = this.district.districtName;
    }

    if(this.postForm.value.districtName){
      this.districtName = this.postForm.value.districtName;
    }

    if(this.postForm.value.districtDescription =='' || this.postForm.value.districtDescription == null){
      this.districtDescription = this.district.districtDescription;
    }

    if(this.postForm.value.districtDescription){
      this.districtDescription = this.postForm.value.districtDescription;
    }




     body = {
        districtId: this.districtId,
        districtName: this.districtName,
        districtDescription: this.districtDescription,
        userId: this.district.user._id,
		created: this.district.created

     }

     console.log(body);

     this.districtService.editDistrict(body).subscribe(data => {
       console.log(data);

       this.postForm.reset();

       this.router.navigate(['/restaurants/all']);
     });

  }

}
