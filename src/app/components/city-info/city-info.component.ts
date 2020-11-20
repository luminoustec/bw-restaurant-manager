import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CityService } from '../../services/city.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-info',
  templateUrl: './city-info.component.html',
  styleUrls: ['./city-info.component.css']
})
export class CityInfoComponent implements OnInit {
	
	cityId: any;
	city : any;

    constructor(private fb: FormBuilder,
  private cityService : CityService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
	  
	  this.cityId = this.route.snapshot.paramMap.get('id');

    console.log(this.cityId);

    this.GetPost();
	  
  }
  
  GetPost(){
    console.log(this.cityId);
    this.cityService.getCity(this.cityId).subscribe(data =>{
        console.log(data);
        this.city = data.city;
    });
  }
  
  TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }
  
   DeleteCity(city){

    this.cityService.DeleteCity(this.cityId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/restaurants/all']);

     });


  }
  
  
  
  EditCity(city){
      this.router.navigate(['city-edit',city._id]);
  }


}
