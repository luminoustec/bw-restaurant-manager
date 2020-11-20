import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DistrictService } from '../../services/district.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-district-info',
  templateUrl: './district-info.component.html',
  styleUrls: ['./district-info.component.css']
})
export class DistrictInfoComponent implements OnInit {
	
	districtId: any;
	district : any;

    constructor(private fb: FormBuilder,
  private districtService : DistrictService,
  private route: ActivatedRoute,
  private router: Router) { }

  

  ngOnInit() {
	  
	   this.districtId = this.route.snapshot.paramMap.get('id');

    console.log(this.districtId);

    this.GetPost();
  }
  
  GetPost(){
    console.log(this.districtId);
    this.districtService.getDistrict(this.districtId).subscribe(data =>{
        console.log(data);
        this.district = data.district;
    });
  }
  
  TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }
  
   DeleteDistrict(district){

    this.districtService.DeleteDistrict(this.districtId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/restaurants/all']);

     });


  }
  
  
  
  EditDistrict(district){
      this.router.navigate(['district-edit',district._id]);
  }

}
