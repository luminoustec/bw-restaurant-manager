import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApartmentService } from '../../services/apartment.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-info',
  templateUrl: './apartment-info.component.html',
  styleUrls: ['./apartment-info.component.css']
})
export class ApartmentInfoComponent implements OnInit {

  apartmentId: any;
	apartment : any;

    constructor(private fb: FormBuilder,
  private apartmentService : ApartmentService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
	  
	  this.apartmentId = this.route.snapshot.paramMap.get('id');

    console.log(this.apartmentId);

    this.GetPost();
	  
  }
  
  GetPost(){
    console.log(this.apartmentId);
    this.apartmentService.getApartment(this.apartmentId).subscribe(data =>{
        console.log(data);
        this.apartment = data.apartment;
    });
  }
  
  TimeFromNow(time){
    //return moment(time).fromNow();

    return moment(time).format("MMM Do YYYY")
  }
  
   DeleteApartment(apartment){

    this.apartmentService.DeleteApartment(this.apartmentId).subscribe(data =>{
        console.log(data);

        this.router.navigate(['/restaurants/all']);

     });


  }
  
  
  
  EditApartment(apartment){
      this.router.navigate(['apartment-edit',apartment._id]);
  }

}
